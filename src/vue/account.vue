<template lang="html">
	<q-layout view="hHh Lpr lFf" container class="account shadow-2 bg-grey-1">
		<q-header>
			<topbar useMenu @toggleMenu="openLeftPanel = !openLeftPanel"></topbar>
		</q-header>

		<q-drawer
			v-model="openLeftPanel"
			:width="200"
			bordered
			content-class="bg-grey-2">
			<q-scroll-area class="fit">
				<q-list>
					<q-item clickable @click="tab = 'setting' " :active="tab === 'setting'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="settings_applications" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">帳號設定</q-item-label>
						</q-item-section>
					</q-item>

					<q-item clickable @click="tab = 'favorite' " :active="tab === 'favorite'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="star_border" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">追蹤清單</q-item-label>
						</q-item-section>
					</q-item>

					<q-item clickable tag="a" href="/auth/logout">
						<q-item-section avatar>
							<q-icon name="keyboard_return" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">登出</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
				
			</q-scroll-area>
		</q-drawer>

		<q-page-container>
			<q-tab-panels v-model="tab" animated transition-prev="slide-right" transition-next="slide-left" class="transparent">
				<q-tab-panel name="setting">
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
											<td class="text-right text-subtitle1">Email</td>
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
							<q-btn flat class="bg-grey-8 text-white q-px-sm" icon="add_photo_alternate" label="變更圖片" @click="ChangePhoto();"></q-btn>
							<q-btn flat class="bg-grey-8 text-white q-px-sm" icon="edit" label="修改資料" @click="openInputPanel = true;"></q-btn>
							<input type="file" ref="uploadBt" v-on:change="UploadPhoto" hidden>
						</q-card-actions>
					</q-card>

					<q-dialog v-model="openInputPanel">
						<q-card>
							<q-card-section>
							  <div class="text-h6">修改資料</div>
							</q-card-section>

							<q-card-section>
								<q-form>
									<q-input class="q-my-sm" outlined dense v-model="user.name" placeholder="請輸入姓名">
										<template v-slot:before>
											姓名
										</template>
									</q-input>
									<q-input class="q-my-sm" outlined dense v-model="user.contactEmail" placeholder="請輸入Email">
										<template v-slot:before>
											Email
										</template>
									</q-input>
								</q-form>
							</q-card-section>

							<q-card-actions align="right">
								<q-btn flat label="儲存" color="primary" v-close-popup @click="SubmitUserInfo();" />
								<q-btn flat label="取消" color="primary" v-close-popup />
							</q-card-actions>
						</q-card>
					</q-dialog>
					
				</q-tab-panel>

				<q-tab-panel name="favorite">
					<div class="text-h5 q-mb-md">追蹤清單</div>
					
				</q-tab-panel>
			</q-tab-panels>

		</q-page-container>
	</q-layout>
</template>

<script>
import "../scss/main.scss"
import util from "../js/util.js"
import topbar from "./topbar.vue"

export default {
	name:"account",
	components:{
		"topbar":topbar
	},
	data: function () {
		return {
			tab: "setting",
			user: {},
		    userStatistic: {},
		    uploadPhoto: false,
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
			if(this.uploadPhoto) return;
			var elem = this.$refs.uploadBt;
			elem.click();
		},
		UploadPhoto: function(){
			if(event.target.files.length == 0) return;
			this.uploadPhoto = true;
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
				success: function(result) {
					if(result.status != "ok") return alert("更新圖片失敗");
					this.uploadTitle = false;
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
}
</style>