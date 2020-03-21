import requests
import datetime
import cv2
import json
import base64

class BatchUploadAnnotateBase:
	def __init__(self,host,dataset,apiKey):
		self.host = host
		self.dataset = dataset
		self.apiKey = apiKey
		self.maxW = 640
		self.maxH = 480
		self.imageScale = 1

	def SetMaxSize(self,width,height):
		self.maxW = width
		self.maxH = height

	def ComputeScale(self,image):
		h = image.shape[0]
		w = image.shape[1]
		scaleW = 1
		scaleH = 1
		if w > self.maxW:
			scaleW = self.maxW/w
		if h > self.maxH:
			scaleH = self.maxH/h
		self.imageScale = min(scaleW,scaleH,1)

	def UploadImage(self,filename):
		#prepare image
		img = cv2.imread(filename)
		self.ComputeScale(img)
		newH = int(img.shape[0]*self.imageScale)
		newW = int(img.shape[1]*self.imageScale)
		img = cv2.resize(img, (newW,newH))
		encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
		_, img_encoded = cv2.imencode(".jpg",img,encode_param)

		#prepare posts data
		url = self.host+"/api/upload-image"
		data = {}
		data["dataset"] = self.dataset
		data["apiKey"] = self.apiKey
		data["remark"] = "batch upload by api key"
		data["uploadImage"] = base64.b64encode(img_encoded)

		response = requests.post(url,data=data)
		return response

	def UploadAnnotation(self,imageID,annotation):
		url = self.host+"/api/set-annotation"
		data = {}
		data["dataset"] = self.dataset
		data["image"] = imageID
		data["annotation"] = annotation
		data["apiKey"] = self.apiKey
		response = requests.post(url,json=data)
		return response

	def DoBatchUpload(self):
		pass


