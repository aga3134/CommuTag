<template lang="html">
	<div class="annotate-image bg-grey-9">
		<div class="text-h6 text-white q-pa-md">請選擇符合此影像的標籤</div>
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

export default {
	name:"annotate-image",
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
.annotate-image{
	width: 100%;
	height: 100%;
}
</style>