from pascal_voc_writer import Writer
import zipfile
import cv2
import os
from GenInfo import GenInfo

class GenVOC:
	def __init__(self):
		self.genInfo = GenInfo()
		
	def GenFile(self,dataset,imageArr,outFile):
		if dataset["annotationType"] == "bbox":
			imagePath = "static/upload/dataset/"+str(dataset["_id"])+"/image/"
			with zipfile.ZipFile(outFile,"w") as outputZip:
				serial = 1

				for image in imageArr:
					imageFile = imagePath+str(image["_id"])+".jpg"
					if not os.path.isfile(imageFile):
						continue
					outImageName = "image/"+str(serial).zfill(5)+".jpg"
					outputZip.write(imageFile, outImageName)
					image["imageName"] = outImageName

					if image["annotation"] is not None:
						bboxArr = image["annotation"]["annotation"]
						img = cv2.imread(imageFile)
						(h,w,c) = img.shape
						content = self.CreateContent(outImageName,w,h,bboxArr)
						vocName = "annotation/"+str(serial).zfill(5)+".xml"
						outputZip.writestr(vocName,content)
					
					serial+=1

				csvStr = self.genInfo.GenCSVString(dataset,imageArr)
				outputZip.writestr("info.csv",csvStr)

				kmlStr = self.genInfo.GenKMLString(dataset,imageArr)
				outputZip.writestr("info.kml",kmlStr)


	def CreateContent(self,imageName,w,h,bboxArr):
		writer = Writer(imageName,w,h)
		for bbox in bboxArr:
			tag = bbox["tag"]
			minX = float(bbox["x"])
			minY = float(bbox["y"])
			maxX = minX+float(bbox["width"])
			maxY = minY+float(bbox["height"])
			writer.addObject(tag,minX,minY,maxX,maxY)
		return  writer.annotation_template.render(**writer.template_parameters)