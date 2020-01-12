<template lang="html">
	<q-card class="dataset-editor">
		<q-card-section>
			<div class="text-h6" v-if="info._id == null">新增資料集</div>
			<div class="text-h6" v-else>編輯資料集</div>
		</q-card-section>

		<q-card-section>
			<q-form>
				<q-item>
					<q-img src="https://cdn.quasar.dev/img/parallax2.jpg" style="max-width: 300px" :ratio="4/3">
						<q-btn class="absolute-bottom full-width dimmed text-white" label="上傳封面"></q-btn>
					</q-img>
				</q-item>
				<div class="row">
					<q-input class="col-12 q-pa-sm" v-model="info.name" label="資料集名稱" :rules="[
						val => !!val || '資料集名稱不能空白'
					]"/>
					<q-input class="col-12 col-sm-6 q-pa-sm" type="number"  v-model="info.maxWidth" label="最大寬度" :rules="[
						val => !!val || '最大寬度不能空白',
						val => val > 0 || '最大寬度不能小於等於0',
						val => val <= 1920 || '最大寬度不能大於1920'
					]"/>
					<q-input class="col-12 col-sm-6 q-pa-sm" type="number"  v-model="info.maxHeight" label="最大高度" :rules="[
						val => !!val || '最大高度不能空白',
						val => val > 0 || '最大高度不能小於等於0',
						val => val <= 1920 || '最大高度不能大於1920'
					]"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.isPublic" label="公開資料集"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableUpload" label="開放上傳影像"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableDownload" label="開放下載資料集"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableGPS" label="儲存位置資訊"/>

					<q-select class="col-12 col-sm-6 q-pa-sm" v-model="info.annotationType" :options="annotationTypeOption" label="標註方式" />

					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableAddTag" label="開放新增標籤"/>

					<q-input class="col-12 q-pa-sm" v-model="tagName" label="新增標籤" @keyup.enter="AddTag();">
						<template v-slot:append>
							<q-btn round dense flat icon="add" @click="AddTag();" />
						</template>
				    </q-input>
				    <div class="full-width">
						<q-chip removable v-for="(tag,i) in info.tagArr" @remove="RemoveTag(i);">{{tag}}</q-chip>
					</div>
				</div>
			</q-form>
		</q-card-section>
		
		<q-card-actions align="right">
			<q-btn flat v-if="info._id == null" label="新增" color="primary" @click="CreateDataset();" />
			<q-btn flat v-else label="儲存" color="primary" @click="UpdateDataset();" />
			<q-btn flat label="取消" color="primary" v-close-popup />
		</q-card-actions>
	</q-card>
</template>

<script>

export default {
	name:"dataset-editor",
	props: {
		info: Object
	},
	data: function () {
		return {
			annotationTypeOption: [
				{"label":"框選標註","value":"bbox"},
				{"label":"整張標註","value":"image"}
			],
			tagName: ""
		};
	},
	created: function(){

	},
	methods: {
		CreateDataset: function(){

		},
		UpdateDataset: function(){

		},
		AddTag: function(){
			if(!this.info.tagArr) Vue.set(this.info,"tagArr",[]);
			if(this.info.tagArr.includes(this.tagName)){
				alert("此標籤已存在");
			}
			else this.info.tagArr.push(this.tagName);
			this.tagName = "";
		},
		RemoveTag: function(i){
			this.info.tagArr.splice(i,1);
		}
	}
}
</script>

<style lang="scss">
.dataset-editor{
	width: 100%;
}
</style>