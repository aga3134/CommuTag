<template lang="html">
	<div class="user-select">
		<q-select filled dense bg-color="grey-2" v-model="selectUser" use-input hide-selected fill-input input-debounce="0" dropdown-icon="add" option-label="name" :options="userArr" @filter="ReloadUser" @input="SelectUser">
			<template v-slot:option="scope">
				<q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
					<q-item-section avatar>
						<q-avatar>
							<img :src="scope.opt.icon">
						</q-avatar>
					</q-item-section>
					<q-item-section>
						<q-item-label>{{scope.opt.name}}</q-item-label>
						<q-item-label caption lines="1">{{scope.opt.email}}</q-item-label>
					</q-item-section>
				</q-item>
			</template>
		</q-select>
		
	</div>
</template>

<script>

export default {
	name:"user-select",
	props: {
		
	},
	components:{
		
	},
	data: function () {
		return {
			userArr:[],
			selectUser:""
		};
	},
	created: function(){
		
	},
	methods: {
		ReloadUser: function(val, update, abort){
			var url = "/user/list-user";
			if(val != ""){
				url += "?keyword="+val;
			}
			$.get(url,function(result){
				if(result.status != "ok") return;
				update(function(){
					this.userArr = [];
					for(var i=0;i<result.data.user.length;i++){
						var user = result.data.user[i];
						this.userArr.push({
							id: user._id,
							name: user.name,
							email: user.contactEmail,
							icon: user.icon
						});
					}
				}.bind(this));
			}.bind(this));
		},
		SelectUser: function(value){
			this.$emit("change");
		},
		ClearSelect: function(){
			this.selectUser = null;
		}
	}
}
</script>

<style lang="scss">
.tag-select{
	width: 100%;
}
</style>