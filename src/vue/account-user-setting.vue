<template lang="html">
	<div class="user-setting">
		<q-card flat class="q-ma-md transparent">
			<div class="row q-pa-md justify-center">
					<q-avatar size="200px">
						<img style="object-fit:cover;" :src="user.photo"/>
					</q-avatar>

					<div class="row items-end">
						<q-markup-table class="transparent text-grey-9" flat separator="vertical">
							<tr>
								<td class="text-right text-subtitle1">姓名</td>
								<td class="text-left text-subtitle1">
									{{user.name}}
								</td>
							</tr>
							<tr>
								<td class="text-right text-subtitle1">聯絡信箱</td>
								<td class="text-left text-subtitle1">{{user.contactEmail}}</td>
							</tr>
							<tr>
								<td class="text-right text-subtitle1">權限</td>
								<td class="text-left text-subtitle1">{{userAuth}}</td>
							</tr>
							<tr>
								<td class="text-right text-subtitle1">狀態</td>
								<td class="text-left text-subtitle1">{{userStatus}}</td>
							</tr>
						</q-markup-table>
					</div>
				
			</div>
			<q-card-actions align="center">
				<q-btn flat class="bg-grey-8 text-white q-px-sm q-ma-xs" icon="add_photo_alternate" label="變更圖片" @click="ChangePhoto();" :loading="uploadPhoto"></q-btn>
				<q-btn flat class="bg-grey-8 text-white q-px-sm q-ma-xs" icon="edit" label="修改資料" @click="EditUserInfo();"></q-btn>
				<q-btn v-if="user.provider=='local' " flat class="bg-grey-8 text-white q-px-sm q-ma-xs" icon="key" label="變更密碼" @click="openPasswordPanel = true;"></q-btn>
				<q-btn flat class="bg-red-8 text-white q-px-sm q-ma-xs" icon="delete" label="刪除帳號" @click="DeleteUserAccount();"></q-btn>
			</q-card-actions>
			<image-upload :maxResW="640" :maxResH="640" ref="uploader"></image-upload>
		</q-card>

		<q-dialog v-model="openInputPanel">
			<q-card class="full-width">
				<q-card-section>
					<div class="text-h6">修改資料</div>
					<q-form>
						<q-input class="q-my-sm" v-model="editInfo.name" label="姓名">
						</q-input>
						<q-input class="q-my-sm" v-model="editInfo.contactEmail" label="聯絡信箱">
						</q-input>
					</q-form>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="儲存" color="primary" @click="SubmitUserInfo();" />
					<q-btn flat label="取消" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="openPasswordPanel">
			<q-card class="full-width">
				<q-card-section>
					<div class="text-h6">修改密碼</div>
					<q-form>
						<q-input class="q-my-sm" type="password" v-model="editPassword.oldPassword" label="原始密碼">
						</q-input>
						<q-input class="q-my-sm" type="password" v-model="editPassword.newPassword" label="新密碼">
						</q-input>
						<q-input class="q-my-sm" type="password" v-model="editPassword.confirmPassword" label="確認密碼" @keyup.enter="SubmitPassword();">
						</q-input>
					</q-form>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="儲存" color="primary" @click="SubmitPassword();" />
					<q-btn flat label="取消" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import imageUpload from "./image-upload.vue"
import util from "../js/util.js"

export default {
	name:"user-setting",
	props: {
		user: Object
	},
	components:{
		"image-upload":imageUpload
	},
	data: function () {
		return {
			editInfo: {},
			uploadPhoto: false,
			openInputPanel: false,
			editPassword: {},
			openPasswordPanel: false
		};
	},
	created: function(){

	},
	methods: {
		EditUserInfo: function(){
			this.openInputPanel = true;
			this.editInfo.name = this.user.name;
			this.editInfo.contactEmail = this.user.contactEmail;
		},
		ChangePhoto: function(){
			if(this.uploadPhoto) return;

			var uploader = this.$refs.uploader;

			uploader.OnSucc = function(result){
				if(result.status != "ok") return alert("更新圖片失敗");
				this.uploadPhoto = false;
				window.location.reload();
			}.bind(this);

			uploader.OnFail = function(errorMessage){
				console.log(errorMessage);
				switch(errorMessage){
					case "Request Entity Too Large": return alert("影像資料過大");
				}
			}.bind(this);

			uploader.OnChange = function(){
				this.uploadPhoto = true;
				uploader.UploadImage();
			}.bind(this);

			uploader.url = "/user/upload-image";
			uploader.SelectFile();
		},
		SubmitUserInfo: function(){
			if(!this.editInfo.name){
				return alert("請輸入您的姓名");
			}

			//console.log(this.user.profession);
			var csrfToken = $("meta[name='csrf-token']").attr("content");

			$.post("/user/edit", {data: this.editInfo, _csrf: csrfToken}, function(result){
				alert(result.status == "ok"?"修改成功":"修改失敗");
				window.location.reload();
			}.bind(this));
		},
		SubmitPassword: function(){
			if(!this.editPassword.oldPassword){
				return alert("請輸入原始密碼");
			}
			if(!this.editPassword.newPassword){
				return alert("請輸入新密碼");
			}
			if(this.editPassword.newPassword != this.editPassword.confirmPassword){
				return alert("請確認密碼一致");
			}
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			$.post("/auth/change-password", {data:this.editPassword,_csrf: csrfToken}, function(result){
				alert(result.status == "ok"?"修改成功":"修改失敗");
				this.openPasswordPanel = false;
			}.bind(this));
		},
		DeleteUserAccount: function(){
			if(confirm("帳號刪除後您將無法繼續使用本系統，確定繼續?")){
				var csrfToken = $("meta[name='csrf-token']").attr("content");
				$.post("/user/delete", {_csrf: csrfToken}, function(result){
					alert(result.status == "ok"?"刪除成功":"刪除失敗");
					window.location.href="/";
				}.bind(this));
			}
		}
	},
	computed: {
		userAuth: function(){
			switch(this.user.authType){
				case "admin":
					return "管理員";
				case "user":
					return "一般";
			}
		},
		userStatus: function(){
			switch(this.user.status){
				case "blacklist":
					return "黑名單";
				case "valid":
					return "正常";
			}
		}
	}
}
</script>

<style lang="scss">
.user-setting{
	width: 100%;
}
</style>