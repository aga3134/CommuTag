<template lang="html">
	<q-layout view="hHh Lpr lFf" container class="account shadow-2 bg-teal-1">
		<q-header>
			<topbar useMenu @toggleMenu="openLeftPanel = !openLeftPanel"></topbar>
		</q-header>

		<q-drawer
			v-model="openLeftPanel"
			:width="200"
			bordered
			content-class="bg-indigo-1">
			<q-scroll-area class="fit">
				<q-list>
					<q-item clickable v-ripple>
						<q-item-section avatar>
							<q-avatar color="teal" text-color="white" icon="settings_applications" />
						</q-item-section>

						<q-item-section>帳號設定</q-item-section>
					</q-item>

					<a href="/auth/logout">
						<q-item clickable v-ripple>
							<q-item-section avatar>
								<q-avatar color="teal" text-color="white" icon="exit_to_app" />
							</q-item-section>

							<q-item-section>登出</q-item-section>
						</q-item>
					</a>
				</q-list>
			</q-scroll-area>
		</q-drawer>

		<q-page-container>
			

		</q-page-container>

		<!--<div class="account-app" id="accountApp">
			<% include topbar %>

			<div class="info-container">
				<div class="info-box">
					<img class="user-photo" v-bind:src="user.photo">
					<div class="photo-bt" v-on:click="ChangePhoto();">{{uploadTitle}}</div>
					<input type="file" ref="uploadBt" v-on:change="UploadPhoto" hidden>
				</div>
				<div class="info-box grow">
					<div class="info-label">姓名: {{user.name}}</div>
					<div class="info-label">Email: {{user.contactEmail}}</span></div>
					<div class="info-label">上傳照片數: {{userStatistic.uploadNum}}</div>
					<div class="info-label">標註數: {{userStatistic.annotationNum}}</div>
					<hr>
					<div class="bt-container">
						<div class="bt" v-on:click="openInputPanel = true;">修改資料</div>
						<% if(user.authType == "admin"){ %>
							<div class="bt" v-on:click="window.location.href='/admin';">站務管理</div>
						<% } %>
						<a href="/auth/logout"><div class="bt">登出</div></a>
					</div>
				</div>
			</div>

			<transition name="fade">
				<div class="input-panel" v-show="openInputPanel">
					<div class="input-area">
						<div class="area-title">修改個人資料</div>
						<div class="input-item">
							<div class="input-label">姓名:</div>
							<input type="text" v-model="user.name">
						</div>
						<div class="input-item">
							<div class="input-label">Email:</div>
							<input type="email" v-model="user.contactEmail">
						</div>
						<div class="bt-container">
							<div class="bt" v-on:click="SubmitUserInfo();">儲存</div>
							<div class="bt" v-on:click="openInputPanel = false;">取消</div>
						</div>
					</div>
				</div>
			</transition>
				
		</div>
		-->
	</q-layout>
</template>

<script>
import "../scss/main.scss"
import topbar from "./topbar.vue"

export default {
	name:"account",
	components:{
		"topbar":topbar
	},
	data: function () {
		return {
			user: {},
		    userStatistic: {},
		    uploadTitle: "變更圖片",
		    openLeftPanel: false,
		    openInputPanel: false,
		};
	},
	created: function(){
		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));
	},
	methods: {
		ChangePhoto: function(){
			if(this.uploadTitle != "變更圖片") return;
			var elem = this.$refs.uploadBt;
			elem.click();
		},
		UploadPhoto: function(){
			if(event.target.files.length == 0) return;
			this.uploadTitle = "上傳中...";
			var file = event.target.files[0];

			var formData = new FormData();
			formData.append("uploadImage", file);

			var csrfToken = $("meta[name='csrf-token']").attr("content");
			$.ajax({
				url: "/user/upload-image?_csrf="+csrfToken,
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				xhr: function(){
					var xhr = $.ajaxSettings.xhr();
					if(xhr.upload){
						xhr.upload.addEventListener("progress",function(event){
							if(event.lengthComputable){
								var percent = parseInt((event.loaded*100)/event.total);
								this.uploadTitle = "上傳中... "+percent+"%";
							}
						}.bind(this), false);
					}
					return xhr;
				}.bind(this),
				success: function(result) {
					if(result.status != "ok") return alert("更新圖片失敗");
					this.uploadTitle = "變更圖片";
					window.location.reload();
				}.bind(this),
				error: function(jqXHR, textStatus, errorMessage) {
					console.log(errorMessage);
				}
			});
		},
		SubmitUserInfo: function(){
			if(!this.user.name){
				return alert("請輸入您的姓名");
			}
			if(!this.user.contactEmail){
				return alert("請輸入您的Email");
			}
			else if(!util.ValidateEmail(this.user.contactEmail)){
				return alert("請輸入正確的Email格式");
			}

			//console.log(this.user.profession);
			var csrfToken = $("meta[name='csrf-token']").attr("content");

			$.post("/user/edit", {data: this.user, _csrf: csrfToken}, function(result){
				alert(result.status == "ok"?"修改成功":"修改失敗");
				window.location.reload();
			}.bind(this));
		}
	}
}
</script>

<style lang="scss">

.account{
	width: 100%;
	height: 100%;
	a{
		color: #333333;
		text-decoration: none;
	}
}
</style>