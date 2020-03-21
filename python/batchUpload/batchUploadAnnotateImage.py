import requests
import datetime
import cv2
import json
import base64
from batchUploadAnnotateBase import BatchUploadAnnotateBase
import os

class BatchUploadAnnotateImage(BatchUploadAnnotateBase):
	def __init__(self,host,dataset,apiKey):
		super().__init__(host,dataset,apiKey)
		self.dataFolder = ""

	#dataFolder中影像依標籤分成不同資料夾，資料夾名稱為標籤名，裡面放屬於該標籤的影像
	def SetFolder(self,dataFolder):
		self.dataFolder = dataFolder

	def DoBatchUpload(self):
		for folder in os.listdir(self.dataFolder):
			path = self.dataFolder+"/"+folder
			if not os.path.isdir(path):
				continue
			for filename in os.listdir(path):
				result = self.UploadImage(path+"/"+filename)
				result = json.loads(result.text)
				if result["status"] != "ok":
					print(result)
					continue

				print("upload image "+path+"/"+filename+" ok")

				#upload annotation
				imageUrl = result["data"]["newName"]
				imageID = imageUrl[imageUrl.rfind("/")+1:imageUrl.rfind(".")]
				result = self.UploadAnnotation(imageID,folder)
				result = json.loads(result.text)
				if result["status"] != "ok":
					print(result)
					continue

				print("set annotation "+folder+" ok")