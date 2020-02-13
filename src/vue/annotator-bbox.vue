<template lang="html">
	<div class="annotator-bbox bg-grey-9">
		<q-layout view="lHh lpr lFf" container>
			<q-page-container>
				<q-page class="row items-center bg-grey-7">
					<q-img class="image" :src="image.url"></q-img>
				</q-page>
			</q-page-container>

			<q-footer class="row items-center text-white">
				<q-banner inline-actions class="bg-grey-6 fit" v-if="task =='annotate' ">
					<div class="text-h6 inline-block">
						請框選出影像中的物件並給予標籤
					</div>
					<template v-slot:action>
						<q-btn class="q-ma-xs bg-primary" label="確定" @click="SetAnnotation();"></q-btn>
						<q-btn class="q-ma-xs bg-primary" label="略過" @click="SkipTask();"></q-btn>
					</template>
				</q-banner>

				<q-banner inline-actions class="bg-grey-6 fit" v-if="task =='verify' ">
					<div class="text-h6 inline-block">
						請驗證此影像框選的物件及標籤是否正確?
					</div>
					
					<template v-slot:action>
						<q-btn class="q-ma-xs bg-primary" label="是" @click="SetVerification(true);"></q-btn>
						<q-btn class="q-ma-xs bg-primary" label="否" @click="SetVerification(false);"></q-btn>
						<q-btn class="q-ma-xs bg-primary" label="略過" @click="SkipTask();"></q-btn>
					</template>
				</q-banner>

			</q-footer>
		</q-layout>

		<div class="text-h6 text-white q-pa-md"></div>
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
			openHelp: false
		};
	},
	mounted: function(){
		
	},
	methods: {
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