<template lang="html">
	<div class="tag-select">
		<q-select filled dense bg-color="grey-2" v-model="selectTag" use-input hide-selected fill-input input-debounce="0" :options="tagArr" @filter="FilterTag" @input="SelectTag"></q-select>
		
	</div>
</template>

<script>

export default {
	name:"tag-select",
	props: {
		dataset: Object
	},
	components:{
		
	},
	data: function () {
		return {
			tagArr:[],
			selectTag:""
		};
	},
	created: function(){
		
	},
	methods: {
		FilterTag: function(val, update, abort){
			update(function(){
				this.tagArr = this.dataset.tagArr.filter(function(v){
					return v.indexOf(val)>-1;
				}.bind(this));
			}.bind(this));
		},
		SelectTag: function(value){
			this.selectTag = value;
			this.$emit("change");
		}
	}
}
</script>

<style lang="scss">
.tag-select{
	width: 100%;
}
</style>