import datetime
import pytz
from lxml import etree
import json
import re
#using Asia/Taipei will cause offset to be +0806
#taiwan = pytz.timezone('Asia/Taipei')
taiwan = datetime.timezone(offset = datetime.timedelta(hours = 8))


class GenInfo:
	def __init__(self,db):
		self.db = db
		with open("config.json","r",encoding="utf-8") as file:
			config = json.load(file)
			self.hostname = config["hostname"]

	def ConvertFieldCSV(self,field):
		if isinstance(field, datetime.datetime):
			t = field.replace(tzinfo=pytz.utc)
			t = t.astimezone(taiwan)
			return t.strftime("%Y-%m-%d %H:%M:%S")
		elif isinstance(field, str):
			s = str(field)
			#若欄位裡有雙引號，用兩個雙引號取代
			s = s.replace("\"","\"\"")
			#把字串用雙引號括住，避免影響分隔跟換行
			return "\""+s+"\""
		else:
			s = str(field)
			return s

	def GenCSVString(self,dataset,imageArr):
		def GenCSVLine(image,fieldArr,formArr):
			line = ""
			for field in fieldArr:
				if field in image:
					d = image[field]
					if isinstance(d, list):
						d = ("|".join(d))
					line += self.ConvertFieldCSV(d)+","
				else:
					line += ","
			if "form" in dataset:
				if isinstance(dataset["form"],dict) and "itemArr" in dataset["form"]:
					for item in dataset["form"]["itemArr"]:
						if "formReply" not in image or image["formReply"] is None:
							line += ","
						elif item["id"] not in image["formReply"]:
							line += ","
						else:
							reply = image["formReply"][item["id"]]["value"]
							if isinstance(reply, list):
								reply = ("|".join(reply))
							line += self.ConvertFieldCSV(reply)+","
			line += self.hostname+"/static/upload/dataset/"+str(dataset["_id"])+"/image/"+str(image["_id"])+".jpg";
			line += "\n"
			return line

		fieldArr = ["imageName","lat","lng","dataTime","remark","上傳者","標註者","驗證者","標籤","createdAt","updatedAt"]

		formArr = []
		if "form" in dataset:
			if isinstance(dataset["form"],dict) and "itemArr" in dataset["form"]:
				for item in dataset["form"]["itemArr"]:
					formArr.append(item["quest"])

		csvStr = (",".join(fieldArr))
		if(len(formArr) > 0):
			csvStr += ","
		csvStr += (",".join(formArr))
		csvStr += ",imageUrl"
		csvStr += "\n"

		#get user name from db (預期影像數會遠大於user數，直接把user全部撈出來應該比從image抓出貢獻者快)
		userArr = self.db["user"].find({},{"name": 1})
		nameHash = {}
		for user in userArr:
			if "name" in user:
				nameHash[str(user["_id"])] = user["name"]
			else:
				nameHash[str(user["_id"])] = ""

		#輸出貢獻者
		for image in imageArr:
			if "uploader" not in image:
				continue
			userID = str(image["uploader"])
			if userID not in nameHash:
				continue
			image["上傳者"] = userID+"_"+nameHash[userID]
			if "annotation" in image and image["annotation"] is not None:
				userID = str(image["annotation"]["user"])
				image["標註者"] = userID+"_"+nameHash[userID]
				image["標籤"] = []
				if dataset["annotationType"] == "image":
					for a in image["annotation"]["annotation"]:
						if "value" not in a:
							continue
						if a["value"] == "true":
							image["標籤"].append(a["name"])
				elif dataset["annotationType"] == "bbox":
					for a in image["annotation"]["annotation"]:
						image["標籤"].append(a["tag"])

			if "verification" in image and image["verification"] is not None:
				image["驗證者"] = []
				for v in image["verification"]:
					userID = str(v["user"])
					image["驗證者"].append(userID+"_"+nameHash[userID])
			
			csvStr += GenCSVLine(image,fieldArr,formArr)
		return csvStr

	def ConvertFieldKML(self,field):
		def remove_control_characters(html):
			def str_to_int(s, default, base=10):
				if int(s, base) < 0x10000:
					return chr(int(s, base))
				return default
			html = re.sub(u"&#(\d+);?", lambda c: str_to_int(c.group(1), c.group(0)), html)
			html = re.sub(u"&#[xX]([0-9a-fA-F]+);?", lambda c: str_to_int(c.group(1), c.group(0), base=16), html)
			html = re.sub(u"[\x00-\x08\x0b\x0e-\x1f\x7f]", "", html)
			return html

		if isinstance(field, datetime.datetime):
			t = field.replace(tzinfo=pytz.utc)
			t = t.astimezone(taiwan)
			return t.strftime("%Y-%m-%d %H:%M:%S")
		else:
			s = str(field)
			s = remove_control_characters(s)
			return s

	def GenKMLString(self,dataset,imageArr):

		def GenPlacemark(doc,image,fieldArr,formArr):
			marker = etree.SubElement(doc,"Placemark")
			markerName = etree.SubElement(marker,"name")
			if "imageName" in image:
				markerName.text = image["imageName"]
			else:
				markerName.text = ""
			
			"""markerDesc = etree.SubElement(marker,"description")
			content = "<img style='max-width:360px;' src='"+markerName.text+"'><br><br>"
			if "remark" in image:
				content += image["remark"]
			markerDesc.text = etree.CDATA(content)
			"""
			
			if "lat" in image and "lng" in image:
				pt = etree.SubElement(marker,"Point")
				coord = etree.SubElement(pt,"coordinates")
				coord.text = str(image["lng"])+","+str(image["lat"])+",0"
			
			extraData = etree.SubElement(marker,"ExtendedData")
			for field in fieldArr:
				if not field in image:
					continue
				data = etree.SubElement(extraData,"Data")
				data.attrib["name"] = field
				value = etree.SubElement(data,"value")
				value.text = self.ConvertFieldKML(image[field])

			
			if "form" in dataset:
				if isinstance(dataset["form"],dict) and "itemArr" in dataset["form"]:
					for item in dataset["form"]["itemArr"]:
						if "formReply" not in image or image["formReply"] is None:
							continue
						elif item["id"] not in image["formReply"]:
							continue
						else:
							reply = image["formReply"][item["id"]]["value"]
							if isinstance(reply, list):
								reply = (" ".join(reply))
							data = etree.SubElement(extraData,"Data")
							data.attrib["name"] = item["quest"]
							value = etree.SubElement(data,"value")
							value.text = reply
			

			data = etree.SubElement(extraData,"Data")
			data.attrib["name"] = "imageUrl"
			value = etree.SubElement(data,"value")
			value.text = self.hostname+"/static/upload/dataset/"+str(dataset["_id"])+"/image/"+str(image["_id"])+".jpg";
			
			
		kml = etree.Element("kml")
		kml.attrib["xmlns"] = "http://www.opengis.net/kml/2.2"
		doc = etree.SubElement(kml, "Document")
		name = etree.SubElement(doc, "name")
		name.text = dataset["name"]

		fieldArr = ["imageName","dataTime","remark","createdAt","updatedAt"]
		formArr = []
		if "form" in dataset:
			if isinstance(dataset["form"],dict) and "itemArr" in dataset["form"]:
				for item in dataset["form"]["itemArr"]:
					formArr.append(item["quest"])
		for image in imageArr:
			GenPlacemark(doc,image,fieldArr,formArr)	

		return etree.tostring(kml, encoding="utf-8", xml_declaration=True)