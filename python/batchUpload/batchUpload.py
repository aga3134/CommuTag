from batchUploadAnnotateImage import BatchUploadAnnotateImage
from batchUploadAnnotateBBox import BatchUploadAnnotateBBox

#upload parameter
#請改為你要上傳的網址網址
host = "http://localhost"

#請改為你要上傳的資料集id (在網站上點選資料集進入觀看，網址列後段顯示的id=xxx即為資料集id)
dataset = "5e624451050538153498a7f7"

#請跟網站管理員取得該站使用的 api key
apiKey = "6u2y45z44s45q0x5szg809"

#上傳影像的最大寬高
maxW = 640
maxH = 480

#請依要上傳的資料集設定的標註方式設定，值可為image or bbox
annotateType = "bbox"

#整張標註的資料夾位置，annotateType == image 時使用
#dataFolder中影像依標籤分成不同資料夾，資料夾名稱為標籤名，裡面放屬於該標籤的影像
dataFolder = "datasetImage"

#框選標註的資料夾位置，annotateType == bbox 時使用
#image folder是放置影像的資料夾
imageFolder = "datasetBBox/image"

#annotation folder是放置標註的資料夾，標註檔名稱需與對應的影像檔名稱相同，附檔名為xml，內容格式為voc
annotateFolder = "datasetBBox/annotation"

if __name__ == "__main__":
	if annotateType == "image":
		uploader = BatchUploadAnnotateImage(host,dataset,apiKey)
		uploader.SetMaxSize(maxW,maxH)
		uploader.SetFolder(dataFolder)
		uploader.DoBatchUpload()
	elif annotateType == "bbox":
		uploader = BatchUploadAnnotateBBox(host,dataset,apiKey)
		uploader.SetMaxSize(maxW,maxH)
		uploader.SetFolder(imageFolder,annotateFolder)
		uploader.DoBatchUpload()

