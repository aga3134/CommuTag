<template lang="html">
	<div class="topbar">
		<q-toolbar square class="bg-primary text-white q-px-md">
			<q-avatar size="md" square >
        		<img src="/static/image/logo.png">
      		</q-avatar>
			<q-space />
	        <q-btn dense flat round icon="account_box" size="lg" color="teal-1" label="登入"></q-btn>
	    </q-toolbar>
	</div>
</template>

<script>

export default {
	name:"topbar",
	data: function () {
		return {
			
		};
	},
	created: function(){
		
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
.topbar{
	width: 100%;
}
</style>