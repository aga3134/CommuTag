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

					<q-item v-if="user.authType == 'admin' " clickable @click="tab = 'data-admin' " :active="tab === 'data-admin'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="view_quilt" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">資料集管理</q-item-label>
						</q-item-section>
					</q-item>

					<q-item v-if="user.authType == 'admin' " clickable @click="tab = 'site-admin' " :active="tab === 'site-admin'" active-class="bg-grey-7 text-white">
						<q-item-section avatar>
							<q-icon name="supervisor_account" />
						</q-item-section>
						<q-item-section>
							<q-item-label class="text-subtitle1">站務管理</q-item-label>
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
					<user-favorite :user="user"></user-favorite>
				</q-tab-panel>

				<q-tab-panel name="data-admin">
					<dataset-list mode="edit"></dataset-list>
				</q-tab-panel>

				<q-tab-panel name="site-admin">
					<site-admin :user="user"></site-admin>
				</q-tab-panel>
			</q-tab-panels>
		</q-page-container>
	</q-layout>
</template>

<script>
import "../scss/main.scss"
import topbar from "./topbar.vue"
import userSetting from "./account-user-setting.vue"
import userFavorite from "./account-user-favorite.vue"
import datasetList from "./dataset-list.vue"
import siteAdmin from "./account-site-admin.vue"

export default {
	name:"account",
	components:{
		"topbar":topbar,
		"user-setting":userSetting,
		"user-favorite":userFavorite,
		"dataset-list":datasetList,
		"site-admin":siteAdmin,
	},
	data: function () {
		return {
			tab: "setting",
			user: {},
			openLeftPanel: false,
		};
	},
	created: function(){
		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));
	},
	methods: {
		
	}
}
</script>

<style lang="scss">

.account{
	width: 100%;
	height: 100%;
}
</style>