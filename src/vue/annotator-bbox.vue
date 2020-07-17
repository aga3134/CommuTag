<template lang="html">
	<div class="annotator-bbox">
		<img class="hidden" ref="srcImage" :src="image.url" @load="ChangeImage">

		<div class="column fit" v-if="task=='view' ">
			<div class="col" ref="viewCanvas"></div>
		</div>
		<div class="column fit" v-else>
			<div class="col q-ma-auto relative-position">
				<div class="fit" ref="editCanvas"></div>
				<div class="tool-set" v-if="task=='annotate' ">
					<q-btn-toggle v-model="tool" glossy size="sm" :options="toolOption" color="grey-1" text-color="grey-6" @input="ChangeTool();">
						<template v-slot:bbox>
							<q-icon name="aspect_ratio"></q-icon>
						</template>
						<template v-slot:move>
							<q-icon name="pan_tool"></q-icon>
						</template>
					</q-btn-toggle>
				</div>
			</div>

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
					<ul class="text-subtitle2">
						<li>框選出影像中所有符合標籤的物件並選擇對應的標籤，完成後按「確定」送出。</li>
						<li>優良的標註應符合以下條件：
							<ol>
								<li>框選出所有符合標籤的物件並選擇正確的物件標籤</li>
								<li>方框應完整涵蓋該物件可以看到的範圍(不包含被遮住的部分)，並且盡量逼近該物件的大小</li>
								<li>一個方框只能框一個物件，若有多個物件請分不同方框框選</li>
							</ol>
						</li>
					</ul>
					<div class="text-h6">如何驗證</div>
					<ol class="text-subtitle2">
						<li>確認影像中框選出的物件標籤是否正確</li>
						<li>確認方框是否完整涵蓋該物件可以看到的範圍(不包含被遮住的部分)，並且盡量逼近該物件的大小</li>
						<li>確認一個方框只能框一個物件，若有多個物件需分成不同方框框選</li>
						<li>確認是否已框選出所有符合標籤的物件</li>
						<li>若以上條件皆符合即為優良的標註，按「是」送出。反之按「否」。</li>
					</ol>
					<div class="text-h6">參考資料</div>
					<ul>
						<li><a href="http://vision.stanford.edu/pdf/bbox_submission.pdf" target="_blank">Su, H., Deng, J., & Fei-Fei, L. (2012). Crowdsourcing annotations for visual object detection. In AAAI human computation workshop.</a></li>
						<li><a href="https://chtseng.wordpress.com/2019/03/10/ai%e9%a0%98%e5%9f%9f%e7%9a%84%e8%97%8d%e9%a0%98%e5%b7%a5%e4%bd%9c-image-labeling/" target="_blank">AI領域的藍領工作- Image Labeling</a></li>
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
			tool: "move",
			toolOption: [
				{value: "bbox", slot: "bbox"},
				{value: "move", slot: "move"}
			],
			container: null,
			stage: null,
			imageLayer: null,
			bboxLayer: null,
			imageNode: null,
			annotationArr: [],
			gesture: "",
			lastTouch: null,
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
			var binNum = 5;
			var step = 1.0/binNum;
			for(var i=0;i<colorNum;i++){
				var h = (i%binNum)*step;
				var s = 1-(parseInt(i*step)%binNum)*step;
				var v = 1-(parseInt(i*step*step)%binNum)*step;
				var color = this.HSVtoRGB(h,s,v,1);
				var tag = this.dataset.tagArr[i];
				this.labelColor[tag] = color;
			}
		},
		BoundInImage: function(pos){
			var imPos = this.imageNode.absolutePosition();
			var imSize = this.imageNode.size();
			var imScale = this.imageNode.getAbsoluteScale();

			if(pos.x < imPos.x) pos.x = imPos.x;
			if(pos.x >= imPos.x+imSize.width*imScale.x) pos.x = imPos.x+imSize.width*imScale.x;
			if(pos.y < imPos.y) pos.y = imPos.y;
			if(pos.y >= imPos.y+imSize.height*imScale.y) pos.y = imPos.y+imSize.height*imScale.y;
			return pos; 
		},
		BoundStage: function(pos){
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
		},
		InitCanvas: function(){
			this.container = this.task=="view"?this.$refs.viewCanvas:this.$refs.editCanvas;

			this.stage = new Konva.Stage({
				container: this.container,
				width: this.container.clientWidth,
				height: this.container.clientHeight,
				draggable: false,
				dragBoundFunc: this.BoundStage
			});
			//make konva center align
			this.stage.content.style.margin = "auto";
			//手機選標籤時會產生resize，造成canvas變很小
			/*window.addEventListener("resize", function(){
				this.stage.setAttrs({
					width: this.container.clientWidth,
					height: this.container.clientHeight,
				});
			}.bind(this));*/
			//init tool according to task
			this.tool = this.task=="annotate"?"bbox":"move";
			this.ChangeTool();
			
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
				newPos = this.BoundStage(newPos);
				this.stage.position(newPos);
				this.stage.batchDraw();
			}.bind(this));

			this.stage.on('mousedown touchstart', function(e){
				if(e.type == "touchstart" && e.evt.touches.length == 2){
					this.gesture = "pinch";
					this.lastTouch = e;
				}
				else{
					this.gesture = "drag";
					if(this.tool == "bbox"){
						//點到內部的物件，不產生新bbox
						if(e.target.name() != "") return;
						var mousePt = this.GetRelativeMousePos(this.stage);
						mousePt = this.BoundInImage(mousePt);
						this.lastTouch = this.stage.getPointerPosition();

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
						this.bboxLayer.add(this.newRect);
					}
				}
				//console.log(this.gesture);
				this.stage.batchDraw();
			}.bind(this));
			
			this.stage.on('mousemove touchmove', function(e){
				if(this.gesture == "pinch"){
					var p1 = this.lastTouch.evt.touches[0];
					var p2 = this.lastTouch.evt.touches[1];
					var t1 = e.evt.touches[0];
					var t2 = e.evt.touches[1];
					this.lastTouch = e;
					if(!p1 || !p2 || !t1 || !t2) return;
					function ComputeDist(pt1,pt2){
						var diffX = pt1.clientX-pt2.clientX;
						var diffY = pt1.clientY-pt2.clientY;
						return Math.sqrt(diffX*diffX+diffY*diffY);
					}
					var dist1 = ComputeDist(p1,p2);
					var dist2 = ComputeDist(t1,t2);
					var old = this.stage.scaleX();
					var scale = dist2/dist1;
					if(scale > 1.1) scale = 1.1;
					else if(scale < 0.9) scale = 0.9;
					var s = old*scale;
					if(s < 1) s = 1;

					//scale之後，兩指中心點不變
					var centerPt = {
						x: (t1.clientX+t2.clientX)*0.5,
						y: (t1.clientY+t2.clientY)*0.5
					};
					var imagePt = {
						x: (centerPt.x-this.stage.x())/old,
						y: (centerPt.y-this.stage.y())/old
					};
					this.stage.scale({x:s,y:s});
					var newPos = {
						x:-imagePt.x*s+centerPt.x,
						y:-imagePt.y*s+centerPt.y
					};
					newPos = this.BoundStage(newPos);
					this.stage.position(newPos);
				}
				else if(this.gesture == "drag"){
					if(this.tool == "bbox"){	//change bbox size
						if(!this.newRect) return;
						var mousePt = this.GetRelativeMousePos(this.stage);
						mousePt = this.BoundInImage(mousePt);
						var origin = this.newRect.position();
						this.newRect.setAttrs({
							width: mousePt.x-origin.x,
							height: mousePt.y-origin.y
						});
					}
					else if(this.tool == "move"){	//drag stage
						var mousePt = this.stage.getPointerPosition();
						if(!this.lastTouch){
							this.lastTouch = mousePt;
							return;
						}
						var pos = this.stage.position();
						var newPos = {
							x:pos.x+mousePt.x-this.lastTouch.x,
							y:pos.y+mousePt.y-this.lastTouch.y
						};
						this.lastTouch = mousePt;
						newPos = this.BoundStage(newPos);
						this.stage.position(newPos);
					}
				}
				this.stage.batchDraw();
				
			}.bind(this));

			this.stage.on('mouseup touchend', function(e){
				this.lastTouch = null;
				if(this.gesture == "pinch"){
					this.gesture = "";
				}
				else if(this.gesture == "drag"){
					this.gesture = "";
					if(this.tool != "bbox") return;
					if(!this.newRect) return;
					var size = this.newRect.size();
					if(Math.abs(size.width) < 10 || Math.abs(size.height) < 10){
						return this.CancelTagSelect();
					}
					this.openTagSelect = true;
				}

			}.bind(this));

			this.imageLayer = new Konva.Layer();
			this.bboxLayer = new Konva.Layer();
			this.stage.add(this.imageLayer);
			this.stage.add(this.bboxLayer);
		},
		ChangeTool: function(){
			switch(this.tool){
				case "move":
					this.container.style.cursor = "grab";
					//this.stage.setAttr("draggable",true);
					break;
				case "bbox":
					this.container.style.cursor = "default";
					//this.stage.setAttr("draggable",false);
					break;
			}
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
			this.stage.batchDraw();
		},
		CancelTagSelect: function(){
			this.openTagSelect = false;
			this.target = null;
			if(this.newRect){
				this.newRect.destroy();
				this.newRect = null;
			}
			this.stage.batchDraw();
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
			this.bboxLayer.add(group);

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
			label.on("click tap", function(e){
				this.openTagSelect = true;
				this.target = annotation;
				Vue.nextTick(function(){
					this.$refs.tagSelect.selectTag = annotation.tag;
				}.bind(this));
			}.bind(this));
			group.add(label);

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
				var w = maxX-minX;
				var h = maxY-minY;
				bbox.setAttrs({
					x: minX,
					y: minY,
					width: w,
					height: h
				});
				annotation.x = minX;
				annotation.y = minY;
				annotation.width = w;
				annotation.height = h;

				//update label pos
				label.setAttrs({
					x:minX,
					y:minY-20,
				});
				this.stage.batchDraw();
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
						pos.x += offset;
						pos.y += offset;
						pos = this.BoundInImage(pos);
						pos.x -= offset;
						pos.y -= offset;
						return pos; 
					}.bind(this)
				});
				ctl.on("dragmove", function() {
					updateBBox(ctl);
				}.bind(this));

				group.add(ctl);
			}.bind(this);

			AddControl(group,pos.x,pos.y,"LT");
			AddControl(group,pos.x+size.width,pos.y,"RT");
			AddControl(group,pos.x+size.width,pos.y+size.height,"RB");
			AddControl(group,pos.x,pos.y+size.height,"LB");

			this.openTagSelect = false;
			this.newRect.destroy();
			this.newRect = null;
			this.stage.batchDraw();
		},
		RemoveAnnotation: function(){
			if(!this.target) return;
			this.target.node.destroy();
			this.annotationArr.splice(this.target.index,1);
			this.target = null;
			this.openTagSelect = false;
			this.stage.batchDraw();
		},
		ChangeImage: function(){
			if(this.imageNode){
				this.imageNode.destroy();
			}

			for(var i=0;i<this.annotationArr.length;i++){
				var annotation = this.annotationArr[i];
				annotation.node.destroy();
			}
			this.annotationArr = [];

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
			this.imageLayer.add(this.imageNode);
			if(this.task == "view" || this.task == "verify"){
				this.DrawAnnotation();
			}
			this.stage.batchDraw();
		},
		DrawAnnotation: function(){
			if(!this.image.annotation) return;
			var imPos = this.imageNode.position();
			var imSize = this.imageNode.size();
			var srcImage = this.$refs.srcImage;

			for(var i=0;i<this.image.annotation.annotation.length;i++){
				var annotation = this.image.annotation.annotation[i];
				var x = parseFloat(annotation.x);
				var y = parseFloat(annotation.y);
				var w = parseFloat(annotation.width);
				var h = parseFloat(annotation.height);
				var group = new Konva.Group();
				this.bboxLayer.add(group);

				var lt = {x:x,y:y};
				var rb = {x:x+w,y:y+h};
				//從原始影像座標轉到canvas座標
				lt.x = lt.x*imSize.width/srcImage.width+imPos.x;
				lt.y = lt.y*imSize.height/srcImage.height+imPos.y;
				rb.x = rb.x*imSize.width/srcImage.width+imPos.x;
				rb.y = rb.y*imSize.height/srcImage.height+imPos.y;

				//add bbox
				var bbox = new Konva.Rect({
					x: lt.x,
					y: lt.y,
					width: rb.x-lt.x,
					height: rb.y-lt.y,
					fill: "rgba(0,0,0,0)",
					stroke: this.labelColor[annotation.tag],
				});
				group.add(bbox);

				//add annotation label
				var label = new Konva.Label({
					x:lt.x,
					y:lt.y-18,
				});
				label.add(new Konva.Tag({
					fill: this.labelColor[annotation.tag],
				}));
				label.add(new Konva.Text({
					text: annotation.tag,
					padding: 3,
					fill: "#ffffff",
					name: "BBoxLabel"
				}));
				group.add(label);

				var a = {
					tag: annotation.tag,
					x: bbox.x(),
					y: bbox.y(),
					width: bbox.width(),
					height: bbox.height(),
					node: group,
					index: this.annotationArr.length
				};
				this.annotationArr.push(a);
			}
			this.stage.batchDraw();
		},
		SetAnnotation: function(){
			if(this.annotationArr.length == 0){
				return alert("請至少新增一個標籤");
			}
			this.$emit("setAnnotation");
		},
		SetVerification: function(agree){
			this.$emit("setVerification",agree);
		},
		GetAnnotation: function(){
			var result = [];
			var imPos = this.imageNode.position();
			var imSize = this.imageNode.size();
			var srcImage = this.$refs.srcImage;

			for(var i=0;i<this.annotationArr.length;i++){
				var annotation = this.annotationArr[i];
				var bbox = {};
				var lt = {x:annotation.x,y:annotation.y};
				var rb = {x:annotation.x+annotation.width,y:annotation.y+annotation.height};
				//還原成原始影像座標
				lt.x = (lt.x-imPos.x)*srcImage.width/imSize.width;
				lt.y = (lt.y-imPos.y)*srcImage.height/imSize.height;
				rb.x = (rb.x-imPos.x)*srcImage.width/imSize.width;
				rb.y = (rb.y-imPos.y)*srcImage.height/imSize.height;

				bbox.x = lt.x;
				bbox.y = lt.y;
				bbox.width = rb.x-lt.x;
				bbox.height = rb.y-lt.y;
				bbox.tag = annotation.tag;
				result.push(bbox);
			}
			return result;
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
	position: relative;
	.tool-set{
		position: absolute;
		display: inline-block;
		bottom: 10px;
		left: 10px;
	}
}
</style>