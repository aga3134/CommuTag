<template lang="html">
	<div class="form-editor q-pa-sm">
		<div class="row items-center">
			<div class="col-shrink q-pr-lg">
				<q-btn class="bg-grey-8 text-white" icon="add" label="新增欄位" @click="OpenAddItem();"></q-btn>
			</div>
		</div>
		
		<q-list class="q-my-md" bordered>
			<q-item v-for="(item,i) in editData.itemArr" :key="item.id">
				<q-item-section>
					<div>
						<span v-if="item.canNotEmpty == 'true' " class="text-red">*</span>
						{{item.quest}}
					</div>
				</q-item-section>

				<q-item-section side>
					<div class="row">
						<q-btn flat dense icon="arrow_circle_up" class="text-gray-8" @click="MoveItemUp(i);"></q-btn>
						<q-btn flat dense icon="arrow_circle_down" class="text-gray-8" @click="MoveItemDown(i);"></q-btn>
						<q-btn flat dense icon="edit" class="text-gray-8" @click="EditItem(i);"></q-btn>
						<q-btn flat dense icon="close" class="text-gray-8" @click="RemoveItem(i);"></q-btn>
					</div>
				</q-item-section>
			</q-item>
		</q-list>


		<q-dialog v-model="openEditItem">
			<q-card class="full-width">
				<q-card-section>
					<div v-if="editItem.id" class="text-h6">新增欄位</div>
					<div v-else class="text-h6">編輯欄位</div>
					<div class="row">
						<q-select class="col-12 col-sm-6 q-pa-sm" dense v-model="editItem.type" :options="typeOption" option-value="value" option-label="label" ref="type" emit-value map-options label="填答類型" :disable="editItem.id!=null" :rules="[
							val => !!val || '填答類型不能空白'
						]"></q-select>
						<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="editItem.canNotEmpty" label="必填欄位" true-value="true" false-value="false"></q-toggle>

						<q-input class="col-12 q-pa-sm" v-model="editItem.quest" label="欄位名稱" ref="quest" :rules="[
							val => !!val || '欄位名稱不能空白'
						]"></q-input>

						<div v-if="editItem.type == 'radio' || editItem.type == 'checkbox' ">
							<q-input class="col-12 q-pa-sm" v-model="optionName" label="新增選項" @keyup.enter="AddItemOption();">
								<template v-slot:append>
									<q-btn round dense flat icon="add" @click="AddItemOption();" />
								</template>
							</q-input>
							<div class="full-width">
								<q-chip removable v-for="(op,i) in editItem.option" :key="op" @remove="RemoveItemOption(i);">{{op}}</q-chip>
							</div>
						</div>

						<div class="col-12 row" v-if="editItem.type == 'checkbox' ">
							<q-input class="col q-ma-sm" v-model.number="editItem.attr.minCheck" type="number" label="最少選幾項" :min="0" :max="editItem.option.length"></q-input>
							<q-input class="col q-ma-sm" v-model.number="editItem.attr.maxCheck" type="number" label="最多選幾項" :min="0" :max="editItem.option.length"></q-input>
						</div>

						<div class="col-12 row" v-if="editItem.type == 'number' ">
							<q-input class="col q-ma-sm" v-model.number="editItem.attr.minValue" type="number" label="最小數值"></q-input>
							<q-input class="col q-ma-sm" v-model.number="editItem.attr.maxValue" type="number" label="最大數值"></q-input>
						</div>
					</div>

				</q-card-section>

				<q-card-actions class="justify-center">
					<q-btn flat label="確定" @click="ConfirmEdit();"></q-btn>
					<q-btn flat label="取消" v-close-popup></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

	</div>
</template>

<script>

export default {
	name:"form-editor",
	props: {
		data: Object
	},
	components:{
		
	},
	data: function () {
		return {
			openEditItem: false,
			editData: {},
			editItem: {},
			editIndex: -1,
			typeOption: [
				{label: "文字",value:"text"},
				{label: "單選",value:"radio"},
				{label: "多選",value:"checkbox"},
				{label: "數字",value:"number"},
			],
			optionName:""
		};
	},
	created: function(){
		this.editData = Object.assign({}, this.data);
	},
	methods: {
		OpenAddItem: function(){
			this.openEditItem = true;
			this.editItem = {
				type:"text",
				canNotEmpty:"false",
				option: [],
				attr: {}
			};
		},
		AddItemOption: function(){
			if(!this.editItem.option) Vue.set(this.editItem,"option",[]);
			if(this.editItem.option.includes(this.optionName)){
				alert("此選項已存在");
			}
			else this.editItem.option.push(this.optionName);
			this.optionName = "";
		},
		RemoveItemOption: function(i){
			this.editItem.option.splice(i,1);
		},
		MoveItemUp: function(i){
			if(i<=0) return;
			var temp = this.editData.itemArr[i-1];
			this.editData.itemArr[i-1] = this.editData.itemArr[i];
			this.editData.itemArr[i] = temp;
			this.$forceUpdate();
			this.$emit("update");
		},
		MoveItemDown: function(i){
			if(i>=this.editData.itemArr.length-1) return;
			var temp = this.editData.itemArr[i+1];
			this.editData.itemArr[i+1] = this.editData.itemArr[i];
			this.editData.itemArr[i] = temp;
			this.$forceUpdate();
			this.$emit("update");
		},
		EditItem: function(i){
			this.editIndex = i;
			this.editItem = Object.assign({}, this.editData.itemArr[i]);
			if(!this.editItem.attr) this.editItem.attr = {};
			this.openEditItem = true;
		},
		RemoveItem: function(i){
			this.editData.itemArr.splice(i,1);
			this.$emit("update");
		},
		GenerateID: function(){
			 return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		},
		ConfirmEdit: function(){
			this.$refs.type.validate();
			if(this.$refs.type.hasError){
				return this.$q.notify({
					color: "negative",
					message: "填答類型不能空白"
				});
			}
			this.$refs.quest.validate();
			if(this.$refs.quest.hasError){
				return this.$q.notify({
					color: "negative",
					message: "欄位名稱不能空白"
				});
			}
			if(this.editItem.type == "radio" || this.editItem.type == "checkbox"){
				if(this.editItem.option.length == 0){
					return this.$q.notify({
						color: "negative",
						message: "請新增選項"
					});
				}
			}
			if(this.editItem.attr.minCheck){
				if(this.editItem.attr.minCheck < 1 || this.editItem.attr.minCheck > this.editItem.option.length){
					return this.$q.notify({
						color: "negative",
						message: "最少選幾項超出選項範圍"
					});
				}
			}
			if(this.editItem.attr.maxCheck){
				if(this.editItem.attr.maxCheck < 1 || this.editItem.attr.maxCheck > this.editItem.option.length){
					return this.$q.notify({
						color: "negative",
						message: "最多選幾項超出選項範圍"
					});
				}
			}
			if(this.editItem.attr.minCheck && this.editItem.attr.maxCheck){
				if(this.editItem.attr.minCheck > this.editItem.attr.maxCheck){
					return this.$q.notify({
						color: "negative",
						message: "最少選幾項不能大於最多選幾項"
					});
				}
			}
			if(this.editItem.attr.minValue && this.editItem.attr.maxValue){
				if(this.editItem.attr.minValue > this.editItem.attr.maxValue){
					return this.$q.notify({
						color: "negative",
						message: "最小數值不能大於最大數值"
					});
				}
			}
			this.openEditItem = false;
			if(!this.editData.itemArr){
				this.editData.itemArr = [];
			}
			if(!this.editItem.id){
				this.editItem.id = this.GenerateID();
				this.editData.itemArr.push(this.editItem);
			}
			else{
				this.editData.itemArr[this.editIndex] = Object.assign({}, this.editItem);
				this.editIndex = -1;
			}
			this.$emit("update");
		}
	}
}
</script>

<style lang="scss">
.form-editor{
	width: 100%;
}
</style>