<template lang="html">
	<div class="user-list q-pa-sm">
		<div class="row items-center">
			<div v-if="enableAdd" class="col-shrink q-pr-lg">
				<q-btn class="bg-grey-8 text-white" icon="add" label="新增名單" @click="openUserSelect = true;"></q-btn>
			</div>
			<div v-if="enableSearch" class="col-12 col-sm-6 col-md-3">
				<q-input v-model="searchKey" label="搜尋名單" @keyup.enter="ReloadUserList();">
					<template v-slot:append>
						<q-btn class="bg-grey-8 text-white" icon="search" @click="ReloadUserList();"></q-btn>
					</template>
				</q-input>
			</div>
		</div>
		
		<q-list class="q-my-md" bordered>
			<q-item v-for="(user,i) in userArr" :key="user._id">
				<q-item-section avatar>
					<q-avatar>
						<img :src="user.icon">
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label>{{user.name}}</q-item-label>
					<q-item-label caption lines="1">{{user.contactEmail}}</q-item-label>
				</q-item-section>

				<q-item-section side v-if="enableRemove">
					<q-btn flat icon="close" class="text-gray-8" @click="RemoveUser(i);"></q-btn>
				</q-item-section>
			</q-item>
		</q-list>

		<q-btn v-if="!list" class="full-width bg-grey-4 q-ma-sm" v-show="hasMoreUser" label="載入更多" @click="LoadMoreUserList();"></q-btn>

		<q-dialog v-model="openUserSelect">
			<user-select ref="userSelect" @confirm="AddUser();" @cancel="openUserSelect = false;"></user-select>
		</q-dialog>

	</div>
</template>

<script>
import userSelect from "./user-select.vue"

export default {
	name:"user-list",
	props: {
		enableAdd: Boolean,
		enableSearch: Boolean,
		enableRemove: Boolean,
		userAuth: String,
		userStatus: String,
		list: Array
	},
	components:{
		"user-select": userSelect
	},
	data: function () {
		return {
			searchKey:"",
			userArr: [],
			userPage: 0,
			hasMoreUser: true,
			openUserSelect: false
		};
	},
	created: function(){
		if(!this.list){
			this.LoadMoreUserList();
		}
		else{
			this.userArr = this.list;
		}
	},
	methods: {
		LoadMoreUserList: function(){
			var url = "/user/list-user";
			url += "?page="+this.userPage;
			url += "&keyword="+this.searchKey;
			if(this.userAuth){
				url += "&authType="+this.userAuth;
			}
			if(this.userStatus){
				url += "&status="+this.userStatus;
			}

			$.get(url, function(result){
				if(result.status != "ok") return;
				this.hasMoreUser = result.data.hasMore;
				this.userArr = this.userArr.concat(result.data.user);
				this.userPage++;
			}.bind(this));
		},
		ClearUserList: function(){
			this.userArr = [];
			this.userPage = 0;
		},
		ReloadUserList: function(){
			this.ClearUserList();
			if(this.list){
				this.userArr = this.list.filter(function(d){
					if(d.name.indexOf(this.searchKey) != -1) return true;
					if(d.contactEmail.indexOf(this.searchKey) != -1) return true;
					return false;
				});
			}
			else{
				this.LoadMoreUserList();
			}
		},
		AddUser: function(){
			this.openUserSelect = false;
			var user = this.$refs.userSelect.GetSelectUser();
			if(!user) return;
			this.$emit("add",user);
		},
		RemoveUser: function(i){
			this.$emit("remove",i);
		}
	}
}
</script>

<style lang="scss">
.user-list{
	width: 100%;
}
</style>