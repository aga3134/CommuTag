import datetime
import pytz
from lxml import etree
import json
import re
#using Asia/Taipei will cause offset to be +0806
#taiwan = pytz.timezone('Asia/Taipei')
taiwan = datetime.timezone(offset = datetime.timedelta(hours = 8))


class GenInfo:
	def __init__(self):
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
					line += self.ConvertFieldCSV(image[field])+","
				else:
					line += ","
			if "form" in dataset:
				if isinstance(dataset["form"],dict) and "itemArr" in dataset["form"]:
					for item in dataset["form"]["itemArr"]:
						if "formReply" not in image:
							line += ","
						elif item["id"] not in image["formReply"]:
							line += ","
						else:
							reply = image["formReply"][item["id"]]["value"]
							if isinstance(reply, list):
								reply = (" ".join(reply))
							line += reply+","
			line += self.hostname+"/static/upload/dataset/"+str(dataset["_id"])+"/image/"+str(image["_id"])+".jpg";
			line += "\n"
			return line

		fieldArr = ["imageName","lat","lng","dataTime","remark","createdAt","updatedAt"]
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

		for image in imageArr:
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
			markerName.text = image["imageName"]
			
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
						if "formReply" not in image:
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