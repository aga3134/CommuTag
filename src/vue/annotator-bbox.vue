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
			labelColor:{}
		};
	},
	mounted: function(){
		this.GenLabelColor();
		this.InitCanvas();
	},
	methods: {
		GetRelativeMousePos: function(node) {
			var transform = node.getAbsoluteTransform().copy();
			transform.invert();
			var pos = node.getStage().getPointerPosition();
			return transform.point(pos);
		},
		HSVtoRGB: function(h,s,v,alpha) {
			var r, g, b, i, f, p, q, t;
			if (arguments.length === 1) {
				s = h.s, v = h.v, h = h.h;
			}
			i = Math.floor(h * 6);
			f = h * 6 - i;
			p = v * (1 - s);
			q = v * (1 - f * s);
			t = v * (1 - (1 - f) * s);
			switch (i % 6) {
				case 0: r = v, g = t, b = p; break;
				case 1: r = q, g = v, b = p; break;
				case 2: r = p, g = v, b = t; break;
				case 3: r = p, g = q, b = v; break;
				case 4: r = t, g = p, b = v; break;
				case 5: r = v, g = p, b = q; break;
			}
			r = Math.round(r * 255);
			g = Math.round(g * 255);
			b = Math.round(b * 255);
			return "rgba("+r+","+g+","+b+","+alpha+")";
		},
		GenLabelColor: function(){
			this.labelColor = {};
			var colorNum = this.dataset.tagArr.length;
			for(var i=0;i<colorNum;i++){
				var h = (i%10)*0.1;
				var s = 1-(parseInt(i*0.1)%10)*0.1;
				var v = 1-(parseInt(i*0.01)%10)*0.1;
				var color = this.HSVtoRGB(h,s,v,1);
				var tag = this.dataset.tagArr[i];
				this.labelColor[tag] = color;
			}
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
				//點到內部的物件，不產生新bbox
				if(e.target.name() != "") return;

				var mousePt = this.GetRelativeMousePos(this.stage);
				this.isDrag = true;
				if(this.newRect){
					this.newRect.destroy();
				}
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
			var color = this.labelColor[tag];
			var bbox = this.target.node.find("Rect")[0];
			bbox.setAttr("stroke",color);
			var label = this.target.node.find("Label")[0];
			label.getTag().setAttr("fill",color);
			label.getText().text(tag);
			
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

			var pos = this.newRect.position();
			var size = this.newRect.size();
			if(size.width < 0){
				pos.x = pos.x+size.width;
				size.width = -size.width;
			}
			if(size.height < 0){
				pos.y = pos.y+size.height;
				size.height = -size.height;
			}

			var group = new Konva.Group();
			this.layer.add(group);

			//add bbox
			var bbox = new Konva.Rect({
				x: pos.x,
				y: pos.y,
				width: size.width,
				height: size.height,
				fill: "rgba(0,0,0,0)",
				stroke: this.labelColor[tag],
			});
			group.add(bbox);

			//add annotation label
			var label = new Konva.Label({
				x:pos.x,
				y:pos.y-20,
			});
			label.add(new Konva.Tag({
				fill: this.labelColor[tag],
			}));
			label.add(new Konva.Text({
				text: tag,
				padding: 5,
				fill: "#ffffff",
				name: "BBoxLabel"
			}));
			group.add(label);

			//add corner control
			var updateBBox = function(active){
				//adjust corner to maintain rect shape
				var lt = group.find(".LT")[0];
				var rt = group.find(".RT")[0];
				var rb = group.find(".RB")[0];
				var lb = group.find(".LB")[0];
				switch(active.getName()){
					case "LT":
						lb.x(active.x());
						rt.y(active.y());
						break;
					case "RT":
						rb.x(active.x());
						lt.y(active.y());
						break;
					case "RB":
						rt.x(active.x());
						lb.y(active.y());
						break;
					case "LB":
						lt.x(active.x());
						rb.y(active.y());
						break;
				}

				//get bbox corner
				var ctlArr = [lt,rt,rb,lb];
				var minX = Number.MAX_VALUE;
				var minY = Number.MAX_VALUE;
				var maxX = Number.MIN_VALUE;
				var maxY = Number.MIN_VALUE;
				for(var i=0;i<ctlArr.length;i++){
					var pos = ctlArr[i].position();
					var size = ctlArr[i].size();
					var cx = pos.x+size.width*0.5;
					var cy = pos.y+size.height*0.5;
					if(cx < minX) minX = cx;
					if(cx > maxX) maxX = cx;
					if(cy < minY) minY = cy;
					if(cy > maxY) maxY = cy;
				}
				//update bbox size
				bbox.setAttrs({
					x: minX,
					y: minY,
					width: maxX-minX,
					height: maxY-minY
				});

				//update label pos
				label.setAttrs({
					x:minX,
					y:minY-20,
				});
			}.bind(this);

			var AddControl = function(group,x,y,name){
				var ctlSize = 10;
				var offset = ctlSize*0.5;
				var ctl = new Konva.Rect({
					x: x-offset,
					y: y-offset,
					width: ctlSize,
					height: ctlSize,
					fill: "#ffffff",
					stroke: "#3333ff",
					name: name,
					draggable:true,
					dragBoundFunc: function(pos){
						var imPos = this.imageNode.absolutePosition();
						var imSize = this.imageNode.size();
						var imScale = this.imageNode.getAbsoluteScale();

						if(pos.x+offset < imPos.x) pos.x = imPos.x-offset;
						if(pos.x+offset >= imPos.x+imSize.width*imScale.x) pos.x = imPos.x+imSize.width*imScale.x-offset;
						if(pos.y+offset < imPos.y) pos.y = imPos.y-offset;
						if(pos.y+offset >= imPos.y+imSize.height*imScale.y) pos.y = imPos.y+imSize.height*imScale.y-offset;
						return pos; 
					}.bind(this)
				});
				ctl.on("dragmove", function() {
					updateBBox(ctl);
					this.layer.batchDraw();
				}.bind(this));

				group.add(ctl);
			}.bind(this);

			AddControl(group,pos.x,pos.y,"LT");
			AddControl(group,pos.x+size.width,pos.y,"RT");
			AddControl(group,pos.x+size.width,pos.y+size.height,"RB");
			AddControl(group,pos.x,pos.y+size.height,"LB");
			
			var annotation = {
				tag: tag,
				x: pos.x,
				y: pos.y,
				width: size.width,
				height: size.height,
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