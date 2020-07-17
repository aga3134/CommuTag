<template lang="html">
	<q-layout view="hHh Lpr lFf" container class="account shadow-2 bg-grey-1">
		<q-header>
			<topbar useMenu  :user="user" @toggleMenu="openLeftPanel = !openLeftPanel"></topbar>
		</q-header>

		<q-drawer
			v-model="openLeftPanel"
			:width="200"
			bordered
			content-class="bg-grey-2">
			<q-scroll-area class="fit">
				<q-list>
					<q-item clickable @click="ChangeTab('setting');" :active="tab === 'setting'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="settings_applications" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">帳號設定</q-item-label>
						</q-item-section>
					</q-item>

					<q-item clickable @click="ChangeTab('favorite');" :active="tab === 'favorite'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="star_border" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">收藏清單</q-item-label>
						</q-item-section>
					</q-item>

					<q-item v-if="user.authType == 'admin' " clickable @click="ChangeTab('data-admin');" :active="tab === 'data-admin'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="view_quilt" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">資料集管理</q-item-label>
						</q-item-section>
					</q-item>

					<q-item v-if="user.authType == 'admin' " clickable @click="ChangeTab('site-admin');" :active="tab === 'site-admin'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="supervisor_account" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">站務管理</q-item-label>
						</q-item-section>
					</q-item>

					<q-item clickable @click="ChangeTab('about');" :active="tab === 'about'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="info" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">關於本站</q-item-label>
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
					<user-setting :user="user"></user-setting>
				</q-tab-panel>

				<q-tab-panel name="favorite">
					<dataset-list mode="favorite"></dataset-list>
				</q-tab-panel>

				<q-tab-panel name="data-admin">
					<dataset-list mode="edit"></dataset-list>
				</q-tab-panel>

				<q-tab-panel name="site-admin">
					<site-admin :user="user"></site-admin>
				</q-tab-panel>

				<q-tab-panel name="about">
					<q-card flat class="full-width bg-green-1">
						<q-card-section>
							<div class="text-h6">關於群眾標註</div>
						
							<div class="text-subtitle1 q-pt-md indent first-letter">
								群眾標註是給公民科學社群分享影像資訊與知識的工具，產出的資料集可以提供機器學習(AI訓練)，也可以提供社群學習(新手訓練)。
								凡舉生態調查、資源盤點、汙染回報、動植物辨識、病蟲害辨識、垃圾分類等，跟影像辨識相關的議題都可以利用此工具協助收集、分析資料。
							</div>
							<div class="text-subtitle1 q-py-md indent">
								本專案為開放原始碼，也提供API讓無人載具上傳影像資料，您可請參考下方的「開放原始碼」取得進一步資訊。若您對本站有任何建議或合作需求，歡迎來信討論 aga3134@gmail.com
							</div>

							<div class="q-pa-md">
								<q-chip clickable icon="code" @click="GoToUrl('https://github.com/aga3134/CommuTag','_blank');">開放原始碼</q-chip>
								<q-chip clickable icon="computer" @click="GoToUrl('https://agawork.tw/','_blank');">其他專案</q-chip>
							</div>
						</q-card-section>
					</q-card>
					
				</q-tab-panel>
			</q-tab-panels>
		</q-page-container>

		<q-footer>
			<q-btn class="full-width bg-grey-8" icon="home" label="回首頁" @click="GoHome();"></q-btn>
		</q-footer>
	</q-layout>
</template>

<script>
import util from "../js/util.js"
import "../scss/main.scss"
import topbar from "./topbar.vue"
import userSetting from "./account-user-setting.vue"
import datasetList from "./dataset-list.vue"
import siteAdmin from "./account-site-admin.vue"

export default {
	name:"account",
	components:{
		"topbar":topbar,
		"user-setting":userSetting,
		"dataset-list":datasetList,
		"site-admin":siteAdmin,
	},
	data: function () {
		return {
			tab: "setting",
			user: {},
			openLeftPanel: $(window).width()>=1024?true:false,
		};
	},
	created: function(){
		var hash = util.GetUrlHash();
		if(hash.tab) this.tab = hash.tab;

		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));
	},
	methods: {
		ChangeTab: function(tab){
			this.tab = tab;
			window.location.hash = "#tab="+tab;
		},
		GoToUrl: function(url,target){
			window.open(url,target);
		},
		GoHome: function(){
			window.location.href="/";
		},
	}
}
</script>

<style lang="scss">

.account{
	width: 100%;
	height: 100%;
	.indent{
		text-indent: 2em;
	}
	.first-letter{
		&:first-letter{
			font-size: 1.3em;
			color: #ff3333;
		}
	}
}
</style>