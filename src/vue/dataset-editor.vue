<template lang="html">
	<q-card class="dataset-editor">
		<q-card-section>
			<div class="text-h6">編輯資料集</div>
		</q-card-section>

		<q-card-section>
			<q-form>
				<q-item>
					<div class="cover-container bg-grey-7">
						<image-upload :src="info.picCover || '/static/image/logo-16-9.png' " showPreview :maxResW="parseInt(info.maxWidth)" :maxResH="parseInt(info.maxHeight)" ref="uploader"></image-upload>
						<q-btn class="change-bt" flat label="變更封面" @click="ChangeCover();"></q-btn>
					</div>
					
				</q-item>
				<div class="row">
					<q-input class="col-12 q-pa-sm" v-model="info.name" label="資料集名稱" ref="name" :rules="[
						val => !!val || '資料集名稱不能空白'
					]"/>
					<q-input class="col-12 col-sm-6 q-pa-sm" type="number"  ref="maxWidth" v-model="info.maxWidth" label="最大寬度" :rules="[
						val => !!val || '最大寬度不能空白',
						val => val >= 32 || '最大寬度不能小於32',
						val => val <= 1920 || '最大寬度不能大於1920'
					]"/>
					<q-input class="col-12 col-sm-6 q-pa-sm" type="number"  ref="maxHeight" v-model="info.maxHeight" label="最大高度" :rules="[
						val => !!val || '最大高度不能空白',
						val => val >=32 || '最大高度不能小於32',
						val => val <= 1920 || '最大高度不能大於1920'
					]"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.isPublic" label="公開資料集"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableUpload" label="開放上傳影像"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableDownload" label="開放下載資料集"/>
					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableGPS" label="儲存位置資訊"/>

					<q-select class="col-12 col-sm-6 q-pa-sm" v-model="info.annotationType" :options="annotationTypeOption" option-value="value" option-label="label" emit-value map-options label="標註方式" ref="annotationType" :rules="[
						val => !!val || '標註方式不能空白'
					]"/>

					<q-toggle class="col-12 col-sm-6 q-pa-sm" v-model="info.enableRemark" label="開放備註說明"/>

					<q-input class="col-12 q-pa-sm" v-model="tagName" label="新增標籤" @keyup.enter="AddTag();">
						<template v-slot:append>
							<q-btn round dense flat icon="add" @click="AddTag();" />
						</template>
				    </q-input>
				    <div class="full-width">
						<q-chip removable v-for="(tag,i) in info.tagArr" :key="tag" @remove="RemoveTag(i);">{{tag}}</q-chip>
					</div>
				</div>
			</q-form>
		</q-card-section>
		
		<q-card-actions align="right">
			<q-btn flat label="儲存" color="primary" @click="UpdateDataset();" />
			<q-btn flat label="取消" color="primary" v-close-popup />
		</q-card-actions>
	</q-card>
</template>

<script>
import imageUpload from "./image-upload.vue"

export default {
	name:"dataset-editor",
	props: {
		info: Object
	},
	components:{
		"image-upload":imageUpload
	},
	data: function () {
		return {
			annotationTypeOption: [
				{"label":"框選標註","value":"bbox"},
				{"label":"整張標註","value":"image"}
			],
			tagName: "",
			uploadCover: false
		};
	},
	created: function(){

	},
	methods: {
		ChangeCover: function(){
			if(this.uploadCover) return;
			var uploader = this.$refs.uploader;

			uploader.OnSucc = function(result){
				if(result.status != "ok") return alert("更新圖片失敗");
				this.uploadCover = false;
				this.$emit("reload");
			}.bind(this);

			uploader.OnFail = function(errorMessage){
				console.log(errorMessage);
				switch(errorMessage){
					case "Request Entity Too Large": return alert("影像資料過大");
				}
			}.bind(this);

			uploader.OnChange = function(){
				this.uploadCover = true;
				uploader.UploadImage();
			}.bind(this);
			uploader.url = "/dataset/change-cover";
			uploader.additionData = {
				"dataset":this.info._id
			};
			uploader.SelectFile();
		},
		UpdateDataset: function(){
			this.$refs.name.validate();
			if (this.$refs.name.hasError){
				return this.$q.notify({
					color: "negative",
					message: "資料集名稱無效"
				});
			}
			this.$refs.maxWidth.validate();
			if (this.$refs.maxWidth.hasError){
				return this.$q.notify({
					color: "negative",
					message: "最大寬度無效"
				});
			}
			this.$refs.maxHeight.validate();
			if (this.$refs.maxHeight.hasError){
				return this.$q.notify({
					color: "negative",
					message: "最大高度無效"
				});
			}
			this.$refs.annotationType.validate();
			if (this.$refs.annotationType.hasError){
				return this.$q.notify({
					color: "negative",
					message: "標註方式無效"
				});
			}
			if(this.info.tagArr.length == 0){
				return this.$q.notify({
					color: "negative",
					message: "請至少新增一個標籤"
				});
			}

			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.info = this.info;
			data._csrf = csrfToken;
			$.post("/dataset/update-dataset", data, function(result){
				if(result.status != "ok") return alert("修改失敗");
				this.$q.notify("修改成功");
				this.$emit("reload",true);
			}.bind(this));
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
	.cover-container{
		width: 320px;
		height: 240px;
		position: relative;
		.change-bt{
			position: absolute;
			bottom: 0px;
			left: 0px;
			width: 100%;
			background-color: rgba(0,0,0,0.5);
			color: #ffffff;
		}
	}
}
</style>