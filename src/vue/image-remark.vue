<template lang="html">
	<q-card class="full-width q-pa-sm">
		<q-card-section>
			<div class="image-remark">
				<div class="text-h6">請輸入備註說明(若無備註說明請直接按確定)</div>
				<q-input v-model="remark" filled type="textarea" @input="UpdateRemark();"></q-input>
			</div>
		</q-card-section>
		<q-card-actions class="justify-center">
			<q-btn flat label="確定" @click="ConfirmSelect();"></q-btn>
			<q-btn flat label="取消" @click="CancelSelect();"></q-btn>
		</q-card-actions>
	</q-card>

	
</template>

<script>

export default {
	name:"image-remark",
	props: {
		
	},
	components:{
		
	},
	data: function () {
		return {
			remark: "",
		};
	},
	mounted: function(){
		
	},
	methods: {
		UpdateRemark: function(){
			this.$emit("change");
		},
		ConfirmSelect: function(){
			this.$emit("confirm");
		},
		CancelSelect: function(){
			this.$emit("cancel");
		}
	}
}
</script>

<style lang="scss">
.image-remark{
	width: 100%;
}
</style>