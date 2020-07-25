import zipfile
import os
from GenInfo import GenInfo

class GenFolderClassify:
	def __init__(self):
		self.genInfo = GenInfo()
		
	def GenFile(self,dataset,imageArr,outFile):
		if dataset["annotationType"] == "image":
			imagePath = "static/upload/dataset/"+str(dataset["_id"])+"/image/"
			with zipfile.ZipFile(outFile,"w") as outputZip:
				serial = 1
				for image in imageArr:
					if image["annotation"] is None:
						tagArr = ["未分類"]
					else:
						tagArr = []
						for tag in image["annotation"]["annotation"]:
							if tag["value"] == "true":
								tagArr.append(tag["name"])

					imageFile = imagePath+str(image["_id"])+".jpg"
					if not os.path.isfile(imageFile):
						continue
					image["imageName"] = str(serial).zfill(5)+".jpg"
					for tag in tagArr:
						outputZip.write(imageFile, tag+"/"+image["imageName"])
					serial+=1

				csvStr = self.genInfo.GenCSVString(dataset,imageArr)
				outputZip.writestr("info.csv",csvStr)

				kmlStr = self.genInfo.GenKMLString(dataset,imageArr)
				outputZip.writestr("info.kml",kmlStr)

