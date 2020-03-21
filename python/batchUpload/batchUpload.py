from batchUploadAnnotateImage import BatchUploadAnnotateImage
from batchUploadAnnotateBBox import BatchUploadAnnotateBBox

#upload parameter
host = "http://localhost"
dataset = "5e624451050538153498a7f7"
apiKey = "6u2y45z44s45q0x5szg809"
maxW = 640
maxH = 480
annotateType = "bbox" #值為image or bbox

#annotateType == image 時使用
dataFolder = "datasetImage"

#annotateType == bbox 時使用
imageFolder = "datasetBBox/image"
annotateFolder = "datasetBBox/annotation"

if __name__ == "__main__":
	if annotateType == "image":
		#整張標註，dataFolder中影像依標籤分成不同資料夾，資料夾名稱為標籤名，裡面放屬於該標籤的影像
		uploader = BatchUploadAnnotateImage(host,dataset,apiKey)
		uploader.SetMaxSize(maxW,maxH)
		uploader.SetFolder(dataFolder)
		uploader.DoBatchUpload()
	elif annotateType == "bbox":
		#框選標註，imageFolder中存影像檔，annotationFolder存標註檔(跟影像檔同名的xml，voc格式)
		uploader = BatchUploadAnnotateBBox(host,dataset,apiKey)
		uploader.SetMaxSize(maxW,maxH)
		uploader.SetFolder(imageFolder,annotateFolder)
		uploader.DoBatchUpload()

