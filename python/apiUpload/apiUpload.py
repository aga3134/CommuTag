import requests
import datetime
import cv2
import json
import base64

#upload parameter
host = "http://localhost"
dataset = "5e58b5f3cef07131c403d007"
apiKey = "uy066y4bopl0nrqqvzg5q"

#prepare image
img = cv2.imread("pi.jpg")
img = cv2.resize(img, (640,480))
encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
_, img_encoded = cv2.imencode(".jpg",img,encode_param)

#prepare posts data
url = host+"/api/upload-image"
data = {}
data["dataset"] = dataset
data["apiKey"] = apiKey
data["lat"] = 23.5
data["lng"] = 121
data["remark"] = "upload by api key"
data["dataTime"] = datetime.datetime.now()
data["uploadImage"] = base64.b64encode(img_encoded)

response = requests.post(url,data=data)
print(response.text)