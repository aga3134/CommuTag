import zipfile

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
						tag = "未分類"
					else:
						tag = image["annotation"]["annotation"]

					imageFile = imagePath+str(image["_id"])+".jpg"
					outputZip.write(imageFile, tag+"/"+str(serial).zfill(5)+".jpg")
					serial+=1

