import zipfile
import os

class GenFolderClassify:
	def __init__(self):
		pass
		
	def GenFile(self,dataset,imageArr,outFile):
		if dataset["annotationType"] == "image":
			imagePath = "static/upload/dataset/"+str(dataset["_id"])+"/image/"
			with zipfile.ZipFile(outFile,"w") as outputZip:
				serial = 1
				for image in imageArr:
					if image["annotation"] is None:
						tagArr = "未分類"
					else:
						tagArr = []
						for tag in image["annotation"]["annotation"]:
							if tag["value"] == "true":
								tagArr.append(tag["name"])

					imageFile = imagePath+str(image["_id"])+".jpg"
					if not os.path.isfile(imageFile):
						continue
					for tag in tagArr:
						outputZip.write(imageFile, tag+"/"+str(serial).zfill(5)+".jpg")
					serial+=1

