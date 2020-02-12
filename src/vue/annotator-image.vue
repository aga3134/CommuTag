<template lang="html">
	<div class="annotator-image bg-grey-9">
		<q-layout view="lHh lpr lFf" container>
			<q-page-container>
				<q-page class="row items-center bg-grey-7">
					<q-img class="image" :src="image.url"></q-img>
				</q-page>
			</q-page-container>

			<q-footer class="row items-center text-white">
				<q-banner inline-actions class="bg-grey-8 fit" v-if="task =='annotate' ">
					<div class="text-h6 inline-block">
						請選擇符合此影像的標籤
					</div>
					<tag-select class="tag-select" :dataset="dataset" ref="tagSelect"></tag-select>
					<template v-slot:action>
						<q-btn class="q-ma-xs bg-primary" label="確定" @click="SetAnnotation();"></q-btn>
						<q-btn class="q-ma-xs bg-primary" label="略過" @click="SkipTask();"></q-btn>
					</template>
				</q-banner>

				<q-banner inline-actions class="bg-grey-8 fit" v-if="task =='verify' ">
					<div class="text-h6 inline-block">
						請驗證此影像是否為 {{image.annotation.annotation}}?
					</div>
					
					<template v-slot:action>
						<q-btn class="q-ma-xs bg-primary" label="是" @click="SetVerification(true);"></q-btn>
						<q-btn class="q-ma-xs bg-primary" label="否" @click="SetVerification(false);"></q-btn>
						<q-btn class="q-ma-xs bg-primary" label="略過" @click="SkipTask();"></q-btn>
					</template>
				</q-banner>

			</q-footer>
		</q-layout>

		<q-dialog v-model="openHelp">
			<q-card class="full-width q-pa-sm">
				<q-card-section>
					<div class="text-h6">如何標註</div>
					<div class="text-h6">如何驗證</div>
					<div class="text-h6">參考資料</div>
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
	name:"annotator-image",
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
			return this.$refs.tagSelect.selectTag;
		},
		SkipTask: function(){
			this.$emit("skipTask");
		}
	}
}
</script>

<style lang="scss">
.annotator-image{
	width: 100%;
	height: 100%;
	.image{
		margin: auto;
		max-width: 800px;
		max-height: 100%;
	}
	.tag-select{
		width: 150px;
		display: inline-block;
	}
}
</style>