<template lang="html">
	<div class="annotator-bbox bg-grey-9">
		<div class="text-h6 text-white q-pa-md">請框選出影像中的物件並給予標籤</div>
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
		
	}
}
</script>

<style lang="scss">
.annotator-bbox{
	width: 100%;
	height: 100%;
}
</style>