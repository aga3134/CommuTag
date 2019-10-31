var g_AccountAPP = new Vue({
  el: "#accountApp",
  data: {
    user: {},
    userStatistic: {},
    uploadTitle: "變更圖片",
    openInputPanel: false,
  },
  created: function () {
  	$.get("/user/info",function(result){
  		if(result.status != "ok") return;
  		this.user = result.data;
  	}.bind(this))
  },
  methods: {
    ChangePhoto: function(){
    	if(this.uploadTitle != "變更圖片") return;
      var elem = this.$refs.uploadBt;
      elem.click();
    },
    UploadPhoto: function(){
    	if(event.target.files.length == 0) return;
      this.uploadTitle = "上傳中...";
      var file = event.target.files[0];

      var formData = new FormData();
      formData.append("uploadImage", file);

      var csrfToken = $("meta[name='csrf-token']").attr("content");
      $.ajax({
        url: "/user/upload-image?_csrf="+csrfToken,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        xhr: function(){
          var xhr = $.ajaxSettings.xhr();
          if(xhr.upload){
            xhr.upload.addEventListener("progress",function(event){
              if(event.lengthComputable){
                var percent = parseInt((event.loaded*100)/event.total);
                this.uploadTitle = "上傳中... "+percent+"%";
              }
            }.bind(this), false);
          }
          return xhr;
        }.bind(this),
        success: function(result) {
          if(result.status != "ok") return alert("更新圖片失敗");
          this.uploadTitle = "變更圖片";
          window.location.reload();
        }.bind(this),
        error: function(jqXHR, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    },
    SubmitUserInfo: function(){
      if(!this.user.name){
        return alert("請輸入您的姓名");
      }
      if(!this.user.contactEmail){
        return alert("請輸入您的Email");
      }
      else if(!g_Util.ValidateEmail(this.user.contactEmail)){
        return alert("請輸入正確的Email格式");
      }
      
      //console.log(this.user.profession);
      var csrfToken = $("meta[name='csrf-token']").attr("content");

      $.post("/user/edit", {data: this.user, _csrf: csrfToken}, function(result){
        alert(result.status == "ok"?"修改成功":"修改失敗");
        window.location.reload();
      }.bind(this));
    },
  }
});

window.addEventListener('load', function() {
  
});

window.addEventListener('resize', function(e) {
  
});