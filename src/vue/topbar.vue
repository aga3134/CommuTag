<template lang="html">
	<div class="topbar">
		<q-toolbar square class="bg-primary text-white q-px-md">
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
			<q-btn v-if="user == null" dense flat icon="account_box" size="lg" color="teal-1">
				<a href="/login">登入</a>
			</q-btn>
			<q-btn v-else dense flat icon="account_box" size="lg" color="teal-1">
				<a href="/account" class="text-white">{{user.name}}</a>
			</q-btn>

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
		color: #ffffff;
	}
}
</style>