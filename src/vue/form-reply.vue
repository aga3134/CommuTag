<template lang="html">
	<div class="form-reply">
		<q-list bordered>
			<q-item v-for="(item,i) in formData.itemArr" :key="item.id">
				<q-item-section>
					<div>
						<span v-if="item.canNotEmpty == 'true' " class="text-red">*</span>
						{{i+1}}. {{item.quest}}
					</div>
					<div>
						<div v-if="item.type == 'text' ">
							<q-input dense v-model="editReply[item.id].value" :ref="item.id" placeholder="請輸入文字" :rules="item.rule"></q-input>
						</div>
						<div v-if="item.type == 'radio' ">
							<q-radio v-for="(op,j) in item.option" v-model="editReply[item.id].value" :label="op" :key="op" :val="op" ></q-radio>
						</div>
						<div v-if="item.type == 'checkbox' ">
							<div class="text-subtitle2 text-red row">
								<div class="q-mx-sm" v-if="item.attr.minCheck">最少選{{item.attr.minCheck}}項</div>
								<div class="q-mx-sm" v-if="item.attr.maxCheck">最多選{{item.attr.maxCheck}}項</div>
							</div>
							<q-checkbox v-for="(op,j) in item.option" v-model="editReply[item.id].value" :label="op" :key="op" :val="op"></q-checkbox>
						</div>
						<div v-if="item.type == 'number' ">
							<div class="text-subtitle2 text-red row">
								<div class="q-mx-sm" v-if="item.attr.minValue">最小數值{{item.attr.minValue}}</div>
								<div class="q-mx-sm" v-if="item.attr.maxValue">最大數值{{item.attr.maxValue}}</div>
							</div>
							<q-input type="number" dense v-model="editReply[item.id].value" :ref="item.id" placeholder="請輸入數字"  :rules="item.rule"></q-input>
						</div>
					</div>
				</q-item-section>

			</q-item>
		</q-list>

	</div>
</template>

<script>

export default {
	name:"form-editor",
	props: {
		formData: Object,
		formReply: Object
	},
	components:{
		
	},
	data: function () {
		return {
			editReply: {},
		};
	},
	created: function(){
		if(this.formReply){
			this.editReply = Object.assign({}, this.formReply);
		}
		else{
			var initReply = {};
			for(var i=0;i<this.formData.itemArr.length;i++){
				var item = this.formData.itemArr[i];
				var reply = {};
				if(item.type == "checkbox"){
					reply.value = [];
				}
				initReply[item.id] = reply;
			}
			this.editReply = initReply;
		}
		//若沒資料mongodb不會存空物件或空陣列，把空資料放回去避免取資料時出錯
		for(var i=0;i<this.formData.itemArr.length;i++){
			var item = this.formData.itemArr[i];
			if(!item.attr) item.attr = {};
			if(!item.option) item.option = [];
			if(!this.editReply[item.id]){
				var reply = {};
				if(item.type == "checkbox"){
					reply.value = [];
				}
				Vue.set(this.editReply,item.id,reply);
			}
			//依問題產生validate rule
			//radio跟checkbox沒內建validation，另外處理
			item.rule = [];
			switch(item.type){
				case "text":
					if(item.canNotEmpty == "true"){
						item.rule.push(val => !!val || '文字不能空白');
					}
					break;
				case "number":
					item.rule.push(function(){
						var minValue = parseFloat(item.attr.minValue);
						var maxValue = parseFloat(item.attr.maxValue);
						var canNotEmpty = item.canNotEmpty == "true";
						return function(val){
							if(canNotEmpty && val==null) return "數字不能空白";
							if(minValue!=NaN && val < minValue) return "數值不能小於"+minValue;
							if(maxValue!=NaN && val > maxValue) return "數值不能大於"+maxValue;
							return true;
						}
					}());
					break;
			}
		}
		
	},
	methods: {
		ValidateReply: function(){
			var valid = true;
			for(var i=0;i<this.formData.itemArr.length;i++){
				var item = this.formData.itemArr[i];
				var reply = this.editReply[item.id].value;
				switch(item.type){
					case "text": case "number":
						//ref在v-for裡面會自動變array
						var ref = this.$refs[item.id][0];
						ref.validate();
						if(ref.hasError){
							this.$q.notify({
								color: "negative",
								message: "欄位"+(i+1)+" 格式不符"
							});
							valid = false;
						}
						break;
					case "radio":
						if(item.canNotEmpty == "true" && reply == null){
							this.$q.notify({
								color: "negative",
								message: "欄位"+(i+1)+" 不能空白"
							});
							valid = false;
						}
						break;
					case "checkbox":
						if(!reply) reply = [];
						if(item.canNotEmpty == "true" && !reply.length){
							this.$q.notify({
								color: "negative",
								message: "欄位"+(i+1)+" 不能空白"
							});
							valid = false;
						}
						if(reply.length > 0){	//有選擇才check數量
							var minCheck = parseFloat(item.attr.minCheck);
							var maxCheck = parseFloat(item.attr.maxCheck);
							if((minCheck != NaN && reply.length < minCheck) || (maxCheck != NaN && reply.length > maxCheck)){
								this.$q.notify({
									color: "negative",
									message: "欄位"+(i+1)+" 選擇數量不符規定"
								});
								valid = false;
							}
						}
						break;
				}
			}
			return valid;
		}
	}
}
</script>

<style lang="scss">
.form-reply{
	width: 100%;
}
</style>