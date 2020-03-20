<template lang="html">
	<div class="topbar bg-grey-8 text-white">
		<q-toolbar square class="q-px-md">
			<q-btn flat round icon="menu" v-if="useMenu" @click="ToggleMenu();"></q-btn>
			<a href="/">
				<q-btn flat no-caps>
					<q-avatar size="md" square >
						<img src="/static/image/logo.png">
					</q-avatar>
					<div class="gt-xs q-px-md text-white text-h5 inline">{{title}}</div>
				</q-btn>
			</a>

			<q-space />
			<q-item v-if="!user" clickable tag="a" href="/login">
				<q-icon size="md" name="account_box" />
				<q-item-section>
					<q-item-label class="text-h6">登入</q-item-label>
				</q-item-section>
			</q-item>
	
			<q-item v-else clickable tag="a" href="/account">
				<q-avatar size="lg">
					<img style="object-fit:cover;" :src="user.icon">
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
		user: Object,
		"useMenu":Boolean
	},
	data: function () {
		return {
			title: "",
		};
	},
	created: function(){
		$.get("/site-info", function(result){
			if(result.status != "ok") return;
			this.title = result.data.title;
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