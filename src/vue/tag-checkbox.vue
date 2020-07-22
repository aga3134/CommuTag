<template lang="html">
	<div class="tag-checkbox">
		<q-btn class="q-ma-sm bg-brown-8" @click="openTagSelect = true;">{{btTitle}}</q-btn>
		<q-dialog v-model="openTagSelect">
			<q-card>
				<q-card-section>
					<div class="text-h6">選擇標籤</div>
					<q-checkbox v-for="tag in tagSelect" v-model="tag.value" :label="tag.name" :key="tag.name" @input="UpdateSelect();"></q-checkbox>
				</q-card-section>
				<q-card-actions class="justify-center">
					<q-btn flat label="確定" @click="ConfirmSelect();"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

	</div>
</template>

<script>

export default {
	name:"tag-checkbox",
	props: {
		dataset: Object
	},
	components:{
		
	},
	data: function () {
		return {
			btTitle:"選擇標籤",
			tagSelect: [],
			openTagSelect: false
		};
	},
	created: function(){
		this.tagSelect = [];
		for(var i=0;i<this.dataset.tagArr.length;i++){
			var tag = this.dataset.tagArr[i];
			this.tagSelect.push({"name":tag,"value":false});
		}
	},
	methods: {
		UpdateSelect: function(){
			var selected = 0;
			for(var i=0;i<this.tagSelect.length;i++){
				var tag = this.tagSelect[i];
				if(tag.value) selected++;
			}
			if(selected == 0) this.btTitle = "選擇標籤";
			else this.btTitle = selected+"個選擇";
		},
		ConfirmSelect: function(){
			this.openTagSelect = false;
			this.$emit("confirm");
		},
	}
}
</script>

<style lang="scss">
.tag-select{
	width: 100%;
}
</style>