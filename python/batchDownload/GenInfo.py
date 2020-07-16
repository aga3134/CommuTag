import datetime
import pytz
from lxml import etree
#using Asia/Taipei will cause offset to be +0806
#taiwan = pytz.timezone('Asia/Taipei')
taiwan = datetime.timezone(offset = datetime.timedelta(hours = 8))


class GenInfo:
	def __init__(self):
		pass

	def ConvertField(self,field):
		if isinstance(field, datetime.datetime):
			t = field.replace(tzinfo=pytz.utc)
			t = t.astimezone(taiwan)
			return t.strftime("%Y-%m-%d %H:%M:%S")
		else:
			return  str(field)

	def GenCSVString(self,imageArr):
		def GenCSVLine(image,fieldArr):
			line = ""
			for field in fieldArr:
				if field in image:
					line += self.ConvertField(image[field])+"\t"
				else:
					line += "\t"
			line += "\n"
			return line

		fieldArr = ["imageName","lat","lng","dataTime","remark","createdAt","updatedAt"]
		csvStr = ("\t".join(fieldArr))+"\n"

		for image in imageArr:
			csvStr += GenCSVLine(image,fieldArr)
		return csvStr


	def GenKMLString(self,dataset,imageArr):

		def GenPlacemark(doc,image,fieldArr):
			marker = etree.SubElement(doc,"Placemark")
			markerName = etree.SubElement(marker,"name")
			markerName.text = image["imageName"]
			
			markerDesc = etree.SubElement(marker,"description")
			content = "<img style='max-width:360px;' src='"+markerName.text+"'><br><br>"
			if "remark" in image:
				content += image["remark"]
			markerDesc.text = etree.CDATA(content)
			
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
				value.text = self.ConvertField(image[field])

			
		kml = etree.Element("kml")
		kml.attrib["xmlns"] = "http://www.opengis.net/kml/2.2"
		doc = etree.SubElement(kml, "Document")
		name = etree.SubElement(doc, "name")
		name.text = dataset["name"]

		fieldArr = ["imageName","dataTime","remark","createdAt","updatedAt"]
		for image in imageArr:
			GenPlacemark(doc,image,fieldArr)	

		return etree.tostring(kml, encoding="utf-8", xml_declaration=True)