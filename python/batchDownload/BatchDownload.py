from argparse import ArgumentParser
import pymongo
from pymongo import MongoClient
import json
import os
from bson.objectid import ObjectId

from GenFolderClassify import GenFolderClassify
from GenVOC import GenVOC

if __name__ == "__main__":
	#load verify condition
	with open("config.json","r",encoding="utf-8") as file:
		config = json.load(file)
		verifyCond = config["verify"]

	#parse args
	parser = ArgumentParser()
	parser.add_argument("dataset", help="dataset id")
	parser.add_argument("filter", help="image filter type, the value could be one of ['all','annotateFinish','verifyFinish'] ")
	parser.add_argument("format", help="output format, the value could be one of ['folder','tfrecord'] if annotationType=='image', ['voc','yolo','tfrecord'] is annotationType=='bbox' ")
	args = parser.parse_args()

	#get image data
	conn = MongoClient()
	db = conn["commutag"]
	dataset = db["dataset"].find_one({"_id": ObjectId(args.dataset)})
	if dataset is None:
		print("dataset "+args.dataset+" not found")

	imageArr = db["image"+args.dataset].find()
	filterArr = []
	if args.filter=="all":
		for image in imageArr:
			filterArr.append(image)
	elif args.filter=="annotateFinish":
		for image in imageArr:
			if image["annotation"] is None:
				continue
			filterArr.append(image)
	elif args.filter=="verifyFinish":
		for image in imageArr:
			if image["annotation"] is None:
				continue
			verifyNum = len(image["verification"])
			if verifyNum <= 0 or verifyNum < verifyCond["sample"]:
				continue
			agreeNum = 0
			for verify in image["verification"]:
				if verify["agree"] == "1":
					agreeNum+=1
			rate = agreeNum/verifyNum
			if rate >= verifyCond["accept"]:
				filterArr.append(image)

	#print(len(filterArr))
	
	#generate output folder & file name
	outPath = "static/file/"+args.dataset+"/"
	if not os.path.exists(outPath):
		os.makedirs(outPath)
	ext = "zip"
	outFile = outPath+"batchDownload_"+args.filter+"_"+args.format+"."+ext
	
	#generate file according to args
	if args.format == "folder":
		genFile = GenFolderClassify()
	elif args.format == "voc":
		genFile = GenVOC()

	if genFile is not None:
		genFile.GenFile(dataset,filterArr,outFile)