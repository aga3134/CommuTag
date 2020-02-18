<template lang="html">
	<div class="annotator-bbox">
		<img class="hidden" ref="srcImage" :src="image.url" @load="ChangeImage">

		<div class="column fit" v-if="task=='view' ">
			<div class="col" ref="viewCanvas"></div>
		</div>
		<div class="column fit" v-else>
			<div class="col q-ma-auto" ref="editCanvas"></div>

			<q-banner inline-actions class="bg-grey-6 text-white col-shrink" v-if="task =='annotate' ">
				<div class="text-h6 inline-block">
					請框選出影像中的物件並給予標籤
				</div>
				<template v-slot:action>
					<q-btn class="q-ma-xs bg-primary" label="確定" @click="SetAnnotation();"></q-btn>
					<q-btn class="q-ma-xs bg-primary" label="略過" @click="SkipTask();"></q-btn>
				</template>
			</q-banner>

			<q-banner inline-actions class="bg-grey-6 text-white col-shrink" v-if="task =='verify' ">
				<div class="text-h6 inline-block">
					請驗證此影像框選的物件及標籤是否正確?
				</div>
				
				<template v-slot:action>
					<q-btn class="q-ma-xs bg-primary" label="是" @click="SetVerification(true);"></q-btn>
					<q-btn class="q-ma-xs bg-primary" label="否" @click="SetVerification(false);"></q-btn>
					<q-btn class="q-ma-xs bg-primary" label="略過" @click="SkipTask();"></q-btn>
				</template>
			</q-banner>
		</div>

		<q-dialog v-model="openTagSelect" persistent >
			<q-card>
				<q-card-section>
					<div class="text-h6 q-py-sm">請選擇標籤</div>
					<tag-select :dataset="dataset" ref="tagSelect"></tag-select>
				</q-card-section>
				<q-separator></q-separator>
				<q-card-actions align="around">
					<q-btn flat v-if="newRect" label="新增" @click="AddAnnotation();"></q-btn>
					<q-btn v-else flat label="修改" @click="ConfirmTagSelect();"></q-btn>
					<q-btn flat label="取消" @click="CancelTagSelect();"></q-btn>
					<q-btn v-if="target" flat label="刪除" @click="RemoveAnnotation();"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="openHelp">
			<q-card class="full-width q-pa-sm">
				<q-card-section>
					<div class="text-h6">如何標註</div>
					<div class="text-h6">如何驗證</div>
					<div class="text-h6">參考資料</div>
					<ul>
						<li><a href="http://vision.stanford.edu/pdf/bbox_submission.pdf" target="_blank">Su, H., Deng, J., & Fei-Fei, L. (2012). Crowdsourcing annotations for visual object detection. In AAAI human computation workshop.</a></li>
					</ul>
				</q-card-section>

				<q-card-actions class="justify-center">
					<q-btn flat label="確定" v-close-popup></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		
	</div>
</template>

<script>
import tagSelect from "./tag-select.vue"

export default {
	name:"annotator-bbox",
	components:{
		"tag-select":tagSelect
	},
	props: {
		dataset: Object,
		image: Object,
		task: String
	},
	data: function () {
		return {
			openHelp: false,
			openTagSelect: false,
			container: null,
			stage: null,
			layer: null,
			imageNode: null,
			annotationArr: [],
			isDrag: false,
			newRect: null,
			target: null,
		};
	},
	mounted: function(){
		this.InitCanvas();
	},
	methods: {
		GetRelativeMousePos: function(node) {
			var transform = node.getAbsoluteTransform().copy();
			transform.invert();
			var pos = node.getStage().getPointerPosition();
			return transform.point(pos);
		},
		InitCanvas: function(){
			this.container = this.task=="view"?this.$refs.viewCanvas:this.$refs.editCanvas;

			var BoundStage = function(pos){
				var size = this.stage.size();
				var imSize = this.imageNode.size();
				var scale = this.stage.scale();
				//影像四個角位置
				var left = (size.width-imSize.width)*0.5*scale.x;
				var top = (size.height-imSize.height)*0.5*scale.y;
				var right = (size.width+imSize.width)*0.5*scale.x;
				var bottom = (size.height+imSize.height)*0.5*scale.y;
				//影像scale後寬度>container寬度
				if(imSize.width*scale.x > size.width){
					//讓影像寬cover整個container寬
					if(pos.x+left > 0) pos.x = -left;
					else if(pos.x+right < size.width){
						pos.x = size.width-right;
					}
				}
				else{
					//讓container寬contain整個影像寬
					if(pos.x+left < 0) pos.x = -left;
					else if(pos.x+right > size.width){
						pos.x = size.width-right;
					}
				}
				//影像scale後高度>container高度
				if(imSize.height*scale.y > size.height){
					//讓影像高cover整個container高
					if(pos.y+top > 0) pos.y = -top;
					else if(pos.y+bottom < size.height){
						pos.y = size.height-bottom;
					}
				}
				else{
					//讓container高contain整個影像高
					if(pos.y+top < 0) pos.y = -top;
					else if(pos.y+bottom > size.height){
						pos.y = size.height-bottom;
					}
				}
				return pos;
			}.bind(this);

			this.stage = new Konva.Stage({
				container: this.container,
				width: this.container.clientWidth,
				height: this.container.clientHeight,
				draggable: false,
				dragBoundFunc: BoundStage
			});
			//make konva center align
			this.stage.content.style.margin = "auto";

			this.stage.on("wheel", function(e){
				e.evt.preventDefault();
				var factor = 0.95;
				var old = this.stage.scaleX();
				var s = e.evt.deltaY>0?old*factor:old/factor;
				if(s < 1) s = 1;
				//scale之後，滑鼠還是要指在影像上的同一個pixel
				var mousePt = this.stage.getPointerPosition();
				var imagePt = {
					x: (mousePt.x-this.stage.x())/old,
					y: (mousePt.y-this.stage.y())/old
				};
				this.stage.scale({x:s,y:s});
				var newPos = {
					x:-imagePt.x*s+mousePt.x,
					y:-imagePt.y*s+mousePt.y
				};
				newPos = BoundStage(newPos);
				this.stage.position(newPos);
				this.stage.batchDraw();
			}.bind(this));

			this.stage.on('mousedown touchstart', function(e){
				var mousePt = this.GetRelativeMousePos(this.stage);
				this.isDrag = true;
				this.newRect = new Konva.Rect({
					x: mousePt.x,
					y: mousePt.y,
					width: 0,
					height: 0,
					fill: "rgba(0,0,0,0)",
					stroke: "#ffffff",
				});
				this.layer.add(this.newRect);
				this.layer.batchDraw();
			}.bind(this));
			
			this.stage.on('mousemove touchmove', function(e){
				if(!this.isDrag || !this.newRect) return;
				var mousePt = this.GetRelativeMousePos(this.stage);
				var origin = this.newRect.position();
				this.newRect.setAttrs({
					width: mousePt.x-origin.x,
					height: mousePt.y-origin.y
				});
				this.layer.batchDraw();
			}.bind(this));

			this.stage.on('mouseup touchend', function(e){
				if(!this.isDrag || !this.newRect) return;
				this.isDrag = false;
				var size = this.newRect.size();
				if(Math.abs(size.width) < 10 || Math.abs(size.height) < 10){
					return this.CancelTagSelect();
				}
				this.openTagSelect = true;
			}.bind(this));

			this.layer = new Konva.Layer();
			this.stage.add(this.layer);
		},
		ConfirmTagSelect: function(){
			if(!this.target) return;
			var tag = this.$refs.tagSelect.selectTag;
			if(!tag || tag == "") return alert("請選擇標籤");

			this.target.tag = tag;
			var label = this.target.node.getChildren(function(node){
				return node.getClassName() === "Label";
			});
			label[0].getText().text(tag);
			
			this.target = null;
			this.openTagSelect = false;
			this.layer.batchDraw();
		},
		CancelTagSelect: function(){
			this.openTagSelect = false;
			this.target = null;
			if(this.newRect){
				this.newRect.destroy();
				this.newRect = null;
			}
			this.layer.batchDraw();
		},
		AddAnnotation: function(){
			if(!this.newRect) return;
			var tag = this.$refs.tagSelect.selectTag;
			if(!tag || tag == "") return alert("請選擇標籤");

			var x,y,w,h;
			if(this.newRect.width()>0){
				x = this.newRect.x();
				w = this.newRect.width();
			}
			else{
				x = this.newRect.x()+this.newRect.width();
				w = -this.newRect.width();
			}
			if(this.newRect.height()>0){
				y = this.newRect.y();
				h = this.newRect.height();
			}
			else{
				y = this.newRect.y()+this.newRect.height();
				h = -this.newRect.height();
			}

			var group = new Konva.Group();
			var rect = new Konva.Rect({
				x: x,
				y: y,
				width: w,
				height: h,
				fill: "rgba(0,0,0,0)",
				stroke: "#ff0000",
			});
			var ctlSize = 10;
			var ctlFill = "#ffffff";
			var ctlStroke = "#3333ff";
			var rectTL = new Konva.Rect({
				x: x-ctlSize*0.5,
				y: y-ctlSize*0.5,
				width: ctlSize,
				height: ctlSize,
				fill: "#ffffff",
				stroke: "#3333ff",
			});
			var rectTR = new Konva.Rect({
				x: x+w-ctlSize*0.5,
				y: y-ctlSize*0.5,
				width: ctlSize,
				height: ctlSize,
				fill: ctlFill,
				stroke: ctlStroke,
			});
			var rectBR = new Konva.Rect({
				x: x+w-ctlSize*0.5,
				y: y+h-ctlSize*0.5,
				width: ctlSize,
				height: ctlSize,
				fill: ctlFill,
				stroke: ctlStroke,
			});
			var rectBL = new Konva.Rect({
				x: x-ctlSize*0.5,
				y: y+h-ctlSize*0.5,
				width: ctlSize,
				height: ctlSize,
				fill: ctlFill,
				stroke: ctlStroke,
			});

			var label = new Konva.Label({
				x:x,
				y:y+h-20,
				height:20
			});
			label.add(new Konva.Tag({
				fill: "#ff0000",
			}));
			label.add(new Konva.Text({
				text: tag,
				padding: 5,
				fill: "#ffffff"
			}));

			group.add(rect);
			group.add(label);
			group.add(rectTL);
			group.add(rectTR);
			group.add(rectBR);
			group.add(rectBL);
			
			this.layer.add(group);
			var annotation = {
				tag: tag,
				x: x,
				y: y,
				width: w,
				height: h,
				node: group,
				index: this.annotationArr.length
			};
			this.annotationArr.push(annotation);
			label.on("click tap", function(e){
				this.openTagSelect = true;
				this.target = annotation;
				Vue.nextTick(function(){
					this.$refs.tagSelect.selectTag = annotation.tag;
				}.bind(this));
			}.bind(this));

			this.openTagSelect = false;
			this.newRect.destroy();
			this.newRect = null;
			this.layer.batchDraw();
		},
		RemoveAnnotation: function(){
			if(!this.target) return;
			this.target.node.destroy();
			this.annotationArr.splice(this.target.index,1);
			this.target = null;
			this.openTagSelect = false;
			this.layer.batchDraw();
		},
		ChangeImage: function(){
			if(this.imageNode){
				this.imageNode.destroy();
			}
			var srcImage = this.$refs.srcImage;
			var cw = this.container.clientWidth;
			var ch = this.container.clientHeight;
			var scaleW = cw/srcImage.width;
			var scaleH = ch/srcImage.height;
			var scale = Math.min(scaleW,scaleH);
			var w = srcImage.width*scale;
			var h = srcImage.height*scale;
			
			this.imageNode = new Konva.Image({
				x: (cw-w)*0.5,
				y: (ch-h)*0.5,
				width: w,
				height: h,
				image: srcImage,
			});
			this.layer.add(this.imageNode);
			this.layer.draw();
		},
		SetAnnotation: function(){
			this.$emit("setAnnotation");
		},
		SetVerification: function(agree){
			this.$emit("setVerification",agree);
		},
		GetAnnotation: function(){
			
		},
		SkipTask: function(){
			this.$emit("skipTask");
		}
	}
}
</script>

<style lang="scss">
.annotator-bbox{
	width: 100%;
	height: 100%;
}
</style>