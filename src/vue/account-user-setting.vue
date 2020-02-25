<template lang="html">
	<div class="user-setting">
		<q-card flat class="q-ma-md transparent">
			<div class="row q-pa-md justify-center">
					<q-avatar size="200px">
						<img :src="user.photo"/>
					</q-avatar>

					<div class="row items-end">
						<q-markup-table class="transparent text-grey-9" flat separator="vertical">
							<tr>
								<td class="text-right text-subtitle1">姓名</td>
								<td class="text-left text-subtitle1">{{user.name}}</td>
							</tr>
							<tr>
								<td class="text-right text-subtitle1">聯絡信箱</td>
								<td class="text-left text-subtitle1">{{user.contactEmail}}</td>
							</tr>
							<tr>
								<td class="text-right text-subtitle1">上傳照片數</td>
								<td class="text-left text-subtitle1">{{userStatistic.uploadNum}}</td>
							</tr>
							<tr>
								<td class="text-right text-subtitle1">標註數</td>
								<td class="text-left text-subtitle1">{{userStatistic.annotationNum}}</td>
							</tr>
						</q-markup-table>
					</div>
				
			</div>
			<q-card-actions align="center">
				<q-btn flat class="bg-grey-8 text-white q-px-sm" icon="add_photo_alternate" label="變更圖片" @click="ChangePhoto();" :loading="uploadPhoto"></q-btn>
				<q-btn flat class="bg-grey-8 text-white q-px-sm" icon="edit" label="修改資料" @click="EditUserInfo();"></q-btn>
			</q-card-actions>
			<image-upload :maxResW="640" :maxResH="640" ref="uploader"></image-upload>
		</q-card>

		<q-dialog v-model="openInputPanel">
			<q-card class="full-width">
				<q-card-section>
				  <div class="text-h6">修改資料</div>
				</q-card-section>

				<q-card-section>
					<q-form>
						<q-input class="q-my-sm" v-model="editInfo.name" label="姓名">
						</q-input>
						<q-input class="q-my-sm" v-model="editInfo.contactEmail" label="Email">
						</q-input>
					</q-form>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="儲存" color="primary" @click="SubmitUserInfo();" />
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
		    userStatistic: {},
		    uploadPhoto: false,
		    openInputPanel: false,
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
			if(!this.editInfo.contactEmail){
				return alert("請輸入您的Email");
			}
			else if(!util.ValidateEmail(this.editInfo.contactEmail)){
				return alert("請輸入正確的Email格式");
			}

			//console.log(this.user.profession);
			var csrfToken = $("meta[name='csrf-token']").attr("content");

			$.post("/user/edit", {data: this.editInfo, _csrf: csrfToken}, function(result){
				alert(result.status == "ok"?"修改成功":"修改失敗");
				window.location.reload();
			}.bind(this));
		}
	}
}
</script>

<style lang="scss">
.user-setting{
	width: 100%;
}
</style>