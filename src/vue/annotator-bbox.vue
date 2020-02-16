<template lang="html">
	<div class="annotator-bbox">
		<img class="hidden" ref="srcImage" :src="image.url" @load="ChangeImage">

		<div class="column fit" v-if="task=='view' ">
			<div class="col" ref="viewCanvas"></div>
		</div>
		<div class="column fit" v-else>
			<div class="col q-my-md" ref="editCanvas"></div>

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

export default {
	name:"annotator-bbox",
	props: {
		dataset: Object,
		image: Object,
		task: String
	},
	data: function () {
		return {
			openHelp: false,
			container: null,
			stage: null,
			imageLayer: null,
			annotationLayer: null,
			imageNode: null,
			annotationNode: null
		};
	},
	mounted: function(){
		this.InitCanvas();
	},
	methods: {
		InitCanvas: function(){
			this.container = this.task=="view"?this.$refs.viewCanvas:this.$refs.editCanvas;
			this.stage = new Konva.Stage({
				container: this.container,
				width: this.container.clientWidth,
				height: this.container.clientHeight
			});
			this.imageLayer = new Konva.Layer();
			this.annotationLayer = new Konva.Layer();
			this.stage.add(this.imageLayer);
			this.stage.add(this.annotationLayer);
		},
		ChangeImage: function(){
			if(this.imageNode){
				this.imageNode.destroy();
			}
			var srcImage = this.$refs.srcImage;
			var w = this.container.clientWidth;
			var h = this.container.clientHeight;
			var scaleW = w/srcImage.width;
			var scaleH = h/srcImage.height;
			var scale = Math.min(scaleW,scaleH);
			this.imageNode = new Konva.Image({
				x: (w-srcImage.width*scale)*0.5,
				y: (h-srcImage.height*scale)*0.5,
				width: srcImage.width*scale,
				height: srcImage.height*scale,
				image: srcImage,
			});
			this.imageLayer.add(this.imageNode);
			this.imageLayer.draw();
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