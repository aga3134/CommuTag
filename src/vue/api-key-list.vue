<template lang="html">
	<div class="user-list q-pa-sm">
		<div class="row items-center">
			<div class="col-shrink q-pr-lg">
				<q-btn class="bg-grey-8 text-white" icon="add" label="新增金鑰" @click="openAddKey = true;"></q-btn>
			</div>
		</div>
		
		<q-list class="q-my-md" bordered>
			<q-item v-for="(key,i) in keyArr" :key="key._id">
				<q-item-section>
					<q-item-label>{{key.key}}</q-item-label>
					<q-item-label caption lines="1">{{key.desc}}</q-item-label>
				</q-item-section>

				<q-item-section side>
					<q-btn flat icon="close" class="text-gray-8" @click="DeleteKey(i);"></q-btn>
				</q-item-section>
			</q-item>
		</q-list>

		<q-dialog v-model="openAddKey">
			<q-card class="full-width">
				<q-card-section>
				  <div class="text-h6">新增金鑰</div>
				</q-card-section>

				<q-card-section>
					<q-input class="q-ma-sm" v-model="newKey.key" label="金鑰">
						<template v-slot:append>
							<q-btn flat class="bg-grey-8 text-white" label="亂數產生" @click="GenRandomKey();"></q-btn>
						</template>
					</q-input>
					
					<div class="text-subtitle1">金鑰說明</div>
					<q-input v-model="newKey.desc" filled type="textarea"></q-input>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="新增" color="primary" @click="AddKey();" />
					<q-btn flat label="取消" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

	</div>
</template>

<script>

export default {
	name:"api-key-list",
	props: {
		
	},
	components:{
		
	},
	data: function () {
		return {
			keyArr: [],
			openAddKey: false,
			newKey: {key:"",desc:""}
		};
	},
	created: function(){
		this.LoadKey();
	},
	methods: {
		LoadKey: function(){
			$.get("/api/list-key", function(result){
				if(result.status != "ok") return;
				this.keyArr = result.data;
			}.bind(this));
		},
		GenRandomKey: function(){
			this.newKey.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		},
		AddKey: function(){
			if(!this.newKey.key || this.newKey.key == "") return alert("請輸入金鑰");
			this.openAddKey = false;
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.key = this.newKey.key;
			data.desc = this.newKey.desc;
			data._csrf = csrfToken;
			$.post("/api/add-key",data,function(result){
				if(result.status != "ok") return alert("新增金鑰失敗");
				this.$q.notify("新增金鑰成功");
				this.LoadKey();
			}.bind(this));
		},
		DeleteKey: function(i){
			if(i<0 || i>= this.keyArr.length) return;
			var key = this.keyArr[i];
			if(confirm("確定刪除金鑰 "+key.key+" ?")){
				var csrfToken = $("meta[name='csrf-token']").attr("content");
				var data = {};
				data.id = key._id;
				data._csrf = csrfToken;
				$.post("/api/delete-key",data,function(result){
					if(result.status != "ok") return alert("刪除金鑰失敗");
					this.$q.notify("刪除金鑰成功");
					this.LoadKey();
				}.bind(this));
			}
		}
	}
}
</script>

<style lang="scss">
.user-list{
	width: 100%;
}
</style>