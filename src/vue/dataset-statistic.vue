<template lang="html">
	<q-layout view="lHh lpr lFf" container class="dataset-statistic bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<q-page class="bg-grey-1">
				<q-tab-panels v-model="tab" class="absolute fit" animated>
					<q-tab-panel class="q-pa-none" name="graph">
						<statistic-graph ref="statisticGraph"></statistic-graph>
					</q-tab-panel>
					<q-tab-panel class="q-pa-none" name="map">
						<statistic-map ref="statisticMap"></statistic-map>
					</q-tab-panel>
				</q-tab-panels>
			</q-page>
		</q-page-container>

		<q-footer>
			<q-tabs v-model="tab" inline-label align="justify" active-bg-color="grey-7" class="bg-grey-8 text-white" @input="InitTabContent();">
				<q-tab name="graph" icon="bar_chart" label="統計圖"></q-tab>
				<q-tab name="map" v-if="info && info.enableGPS" icon="place" label="地圖"></q-tab>
				<q-tab name="home" icon="folder" label="回資料集" @click="GoToDataset();"></q-tab>
			</q-tabs>
		</q-footer>

	</q-layout>
</template>

<script>
import util from "../js/util.js"
import "../scss/main.scss"
import topbar from "./topbar.vue"
import statisticGraph from "./statistic-graph.vue"
import statisticMap from "./statistic-map.vue"

export default {
	name:"dataset-statistic",
	components:{
		"topbar":topbar,
		"statistic-graph":statisticGraph,
		"statistic-map":statisticMap
	},
	data: function () {
		return {
			tab: "graph",
			user: null,
			datasetID: null,
			info: null,
			imageArr: [],
		};
	},
	created: function(){
		var param = util.GetUrlParameter();
		this.datasetID = param.id;
		var hash = util.GetUrlHash();
		if(hash.tab) this.tab = hash.tab;

		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));

		$.get("/dataset/view-dataset?id="+param.id, function(result){
			if(result.status != "ok") return window.location.href="/?message="+encodeURIComponent("無法取得資料集資訊");
			this.info = result.data;
			if(this.info.enableGPS && !hash.tab){
				this.tab = "map";
			}

			$.get("/dataset/list-image?all=1&dataset="+param.id, function(result){
				if(result.status != "ok") return window.location.href="/?message="+encodeURIComponent("無法取得影像資訊");
				this.imageArr = result.data;

				for(var i=0;i<this.imageArr.length;i++){
					var image =this.imageArr[i];
					image.url = "/static/upload/dataset/"+param.id+"/image/"+image._id+".jpg";
				}

				this.InitTabContent();
			}.bind(this));
		}.bind(this));

		
	},
	methods: {
		GoToDataset: function(){
			window.location.href="/view?id="+this.datasetID;
		},
		InitTabContent: function(){
			Vue.nextTick(function(){
				window.location.hash = "#tab="+this.tab;
				switch(this.tab){
					case "graph":
						this.$refs.statisticGraph.SetGraphData(this.info,this.imageArr);
						break;
					case "map":
						this.$refs.statisticMap.SetGraphData(this.info,this.imageArr);
						break;
				}
			}.bind(this));
		}
	}
}
</script>

<style lang="scss">

.dataset-statistic{
	width: 100%;
	height: 100%;
}
</style>