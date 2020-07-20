<template lang="html">
	<q-layout view="lHh lpr lFf" container class="image-view bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<image-control :user="user" :dataset="dataset" :image="image"></image-control>
		</q-page-container>

		<q-footer>
			<q-btn class="full-width bg-grey-8" icon="home" label="回資料集" @click="GoToDataset();"></q-btn>
		</q-footer>

	</q-layout>
</template>

<script>
import util from "../js/util.js"
import "../scss/main.scss"
import topbar from "./topbar.vue"
import imageControl from "./image-control.vue"

export default {
	name:"image-view",
	components:{
		"topbar":topbar,
		"image-control":imageControl
	},
	data: function () {
		return {
			user: null,
			datasetID: null,
			imageID: null,
			dataset: null,
			image: null,
		};
	},
	created: function(){
		var param = util.GetUrlParameter();
		this.datasetID = param.dataset;
		this.imageID = param.image;

		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));

		$.get("/dataset/view-dataset?id="+this.datasetID, function(result){
			if(result.status != "ok") return window.location.href="/?message="+encodeURIComponent("無法顯示資料集");;
			this.dataset = result.data;

			$.get("/dataset/view-image?dataset="+this.datasetID+"&image="+this.imageID, function(result){
				if(result.status != "ok") return window.location.href="/?message="+encodeURIComponent("無法顯示影像");

				var tz = spacetime().name;	//get browser time zone
				this.image = result.data;
				if(this.image.dataTime){
					var t = spacetime(this.image.dataTime).goto(tz);
					this.image.time = t.unixFmt("yyyy-MM-dd HH:mm:ss");
				}
				this.image.url = "/static/upload/dataset/"+this.datasetID+"/image/"+this.imageID+".jpg";
			}.bind(this));
		}.bind(this));
	},
	methods: {
		GoToDataset: function(){
			window.location.href="/dataset?id="+this.datasetID;
		}
	}
}
</script>

<style lang="scss">

.image-view{
	width: 100%;
	height: 100%;
}
</style>