import requests
import datetime
import cv2
import json
import base64
from batchUploadAnnotateBase import BatchUploadAnnotateBase
import os
from bs4 import BeautifulSoup

class BatchUploadAnnotateBBox(BatchUploadAnnotateBase):
	def __init__(self,host,dataset,apiKey):
		super().__init__(host,dataset,apiKey)
		self.imageFolder = ""
		self.annotationFolder = ""

	#imageFolder中存影像檔，annotationFolder存標註檔(跟影像檔同名的xml，voc格式)
	def SetFolder(self,imageFolder,annotationFolder):
		self.imageFolder = imageFolder
		self.annotationFolder = annotationFolder

	def GetAnnotation(self,filename):
		with open(filename,"r", encoding="utf-8-sig") as f:
			content = f.read()
			soup = BeautifulSoup(content,"lxml")

			result = []
			for bbox in soup.find_all("object"):
				tag = bbox.find("name").string
				rect = bbox.find("bndbox")
				xmin = float(rect.find("xmin").string)*self.imageScale
				xmax = float(rect.find("xmax").string)*self.imageScale
				ymin = float(rect.find("ymin").string)*self.imageScale
				ymax = float(rect.find("ymax").string)*self.imageScale
				result.append({
					"x": xmin,
					"y": ymin,
					"width": xmax-xmin,
					"height": ymax-ymin,
					"tag": tag
				})
			return result

	def DoBatchUpload(self):
		for filename in os.listdir(self.imageFolder):
			result = self.UploadImage(self.imageFolder+"/"+filename)
			result = json.loads(result.text)
			if result["status"] != "ok":
				print(result)
				continue

			print("upload image "+self.imageFolder+"/"+filename+" ok")

			#upload annotation
			imageUrl = result["data"]["newName"]
			imageID = imageUrl[imageUrl.rfind("/")+1:imageUrl.rfind(".")]

			annotatePath = os.path.splitext(self.annotationFolder+"/"+filename)[0]+".xml"
			if not os.path.isfile(annotatePath):
				continue
			annotation = self.GetAnnotation(annotatePath)

			result = self.UploadAnnotation(imageID,annotation)
			result = json.loads(result.text)
			if result["status"] != "ok":
				print(result)
				continue

			print("set annotation "+json.dumps(annotation)+" ok")


