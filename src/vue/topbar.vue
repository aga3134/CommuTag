<template lang="html">
	<div class="topbar bg-grey-8 text-white">
		<q-toolbar square class="q-px-md">
			<q-btn flat round icon="menu" v-if="useMenu" @click="ToggleMenu();"></q-btn>
			<a href="/">
				<q-btn flat>
					<q-avatar size="md" square >
						<img src="/static/image/logo.png">
					</q-avatar>
					<q-toolbar-title class="text-white">{{title}}</q-toolbar-title>
				</q-btn>
			</a>

			<q-space />
			<q-item v-if="user == null" clickable tag="a" href="/login">
				<q-icon size="md" name="account_box" />
				<q-item-section>
					<q-item-label class="text-h6">登入</q-item-label>
				</q-item-section>
			</q-item>
	
			<q-item v-else clickable tag="a" href="/account">
				<q-avatar size="lg">
					<img :src="user.photo">
				</q-avatar>
				<q-item-section class="q-px-sm">
					<q-item-label class="text-h6">{{user.name}}</q-item-label>
				</q-item-section>
			</q-item>

	    </q-toolbar>
	</div>
</template>

<script>

export default {
	name:"topbar",
	props: {
		"useMenu":Boolean
	},
	data: function () {
		return {
			title: "群眾標註",
			user: null,
		};
	},
	created: function(){
		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));
	},
	methods: {
		ToggleMenu: function(){
			this.$emit("toggleMenu");
		}
	}
}
</script>

<style lang="scss">
.topbar{
	width: 100%;
	a{
		text-decoration: none;
	}
}
</style>