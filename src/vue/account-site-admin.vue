<template lang="html">
	<div class="site-admin">
		<div class="text-h6">管理員名單</div>
		<user-list ref="adminList" enableAdd enableSearch enableRemove userAuth="admin" @add="AddAdmin" @remove="RemoveAdmin"></user-list>
		<div class="text-h6">黑名單</div>
		<div class="text-subtitle2 text-grey-7">被列為黑名單者無法上傳、標註、驗證影像</div>
		<user-list ref="blackList" enableAdd enableSearch enableRemove userStatus="blacklist" @add="AddBlacklist" @remove="RemoveBlacklist"></user-list>
		<div class="text-h6">API金鑰</div>
	</div>
</template>

<script>
import userList from "./user-list.vue"
import userSelect from "./user-select.vue"

export default {
	name:"site-admin",
	components:{
		"user-list":userList,
		"user-select":userSelect
	},
	props: {
		user: Object
	},
	data: function () {
		return {
			
		};
	},
	created: function(){
		
	},
	methods: {
		UpdateAuth: function(param){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.id = param.id;
			data.authType = param.authType;
			data.status = param.status;
			data._csrf = csrfToken;
			$.post("/user/update-auth",data,param.callback);
		},
		AddAdmin: function(user){
			if(confirm("確定將 "+user.name+" 加入管理員名單?")){
				var param = {};
				param.id = user._id;
				param.authType = "admin";
				param.callback = function(result){
					if(result.status != "ok") return alert("更新權限失敗");
					this.$q.notify("已將"+user.name+"加入管理員名單");
					this.$refs.adminList.ReloadUserList();
				}.bind(this);
				this.UpdateAuth(param);
			}
		},
		RemoveAdmin: function(i){
			var user = this.$refs.adminList.userArr[i];
			if(!user) return;
			if(confirm("確定將 "+user.name+" 從管理員名單刪除?")){
				var param = {};
				param.id = user._id;
				param.authType = "user";
				param.callback = function(result){
					if(result.status != "ok") return alert("更新權限失敗");
					this.$q.notify("已將"+user.name+"從管理員名單刪除");
					this.$refs.adminList.ReloadUserList();
				}.bind(this);
				this.UpdateAuth(param);
			}
		},
		AddBlacklist: function(user){
			if(confirm("確定將 "+user.name+" 加入黑名單?")){
				var param = {};
				param.id = user._id;
				param.status = "blacklist";
				param.callback = function(result){
					if(result.status != "ok") return alert("黑名單設定失敗");
					this.$q.notify("已將"+user.name+"加入黑名單");
					this.$refs.blackList.ReloadUserList();
				}.bind(this);
				this.UpdateAuth(param);
			}
		},
		RemoveBlacklist: function(i){
			var user = this.$refs.adminList.userArr[i];
			if(!user) return;
			if(confirm("確定將 "+user.name+" 從黑名單刪除?")){
				var param = {};
				param.id = user._id;
				param.status = "valid";
				param.callback = function(result){
					if(result.status != "ok") return alert("黑名單設定失敗");
					this.$q.notify("已將"+user.name+"從黑名單刪除");
					this.$refs.blackList.ReloadUserList();
				}.bind(this);
				this.UpdateAuth(param);
			}
		}
	}
}
</script>

<style lang="scss">
.site-admin{
	width: 100%;
}
</style>