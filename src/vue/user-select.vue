<template lang="html">
	<q-card class="user-select full-width q-pa-sm">
		<q-card-section>
			<div class="text-h6">選擇使用者</div>
	
			<q-scroll-area style="height: 300px;">
				<q-infinite-scroll @load="LoadMoreUser" ref="userScroll">
					<q-input placeholder="輸入篩選文字" outlined dense square v-model="searchKey" @change="ReloadUser();"></q-input>
					<q-list bordered separator>
						<q-item clickable v-for="(user,i) in userArr" :key="i" :active="selectIndex == i" active-class="bg-green-2" @click="SelectItem(i);" @dblclick="ConfirmSelect();">
							<q-item-section avatar>
								<q-avatar>
									<img :src="user.icon">
								</q-avatar>
							</q-item-section>

							<q-item-section>
								<q-item-label>{{user.name}}</q-item-label>
								<q-item-label caption lines="1">{{user.contactEmail}}</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>

					<template v-slot:loading>
						<div class="row justify-center q-my-md">
							<q-spinner-dots color="primary" size="40px" />
						</div>
					</template>
				</q-infinite-scroll>
			</q-scroll-area>
		</q-card-section>

		<q-card-actions class="justify-center">
			<q-btn flat label="確定" @click="ConfirmSelect();"></q-btn>
			<q-btn flat label="取消" @click="CancelSelect();"></q-btn>
		</q-card-actions>
	</q-card>

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
			searchKey:"",
			userArr: [],
			hasMore: true,
			selectIndex: -1
		};
	},
	created: function(){
		
	},
	methods: {
		LoadMoreUser: function(index,done){
			var url = "/user/list-user";
			url += "?page="+(index-1);
			url += "&keyword="+this.searchKey;
			$.get(url,function(result){
				if(result.status != "ok") return;
				this.hasMore = result.data.hasMore;
				if(!this.hasMore){
					this.$refs.userScroll.stop();
				}
				this.userArr = this.userArr.concat(result.data.user);
				done();
			}.bind(this));
		},
		ReloadUser: function(){
			this.userArr = [];
			this.$refs.userScroll.reset();
			this.$refs.userScroll.resume();
			this.selectIndex = -1;
		},
		GetSelectUser: function(){
			if(this.selectIndex < 0 || this.selectIndex >= this.userArr.length) return null;
			else return this.userArr[this.selectIndex];
		},
		SelectItem: function(i){
			this.selectIndex = i;
			this.$emit("change");
		},
		ConfirmSelect: function(){
			if(this.selectIndex < 0 || this.selectIndex >= this.userArr.length) return alert("請選擇使用者");
			this.$emit("confirm");
		},
		CancelSelect: function(){
			this.$emit("cancel");
		}
	}
}
</script>

<style lang="scss">
.user-select{
	width: 100%;
}
</style>