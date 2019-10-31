var g_LoginAPP = new Vue({
  el: "#loginApp",
  data: {
    intentUrl: "",
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    token: "",
    mode: "login",
    pwLoginAction: "/auth/login-by-password",
    pwSignupAction: "/auth/signup-by-password"
  },
  created: function () {
    var urlParam = g_Util.GetUrlParameter();
    if(urlParam.intentUrl){
      this.intentUrl = encodeURIComponent(urlParam.intentUrl);
    }

    if(urlParam.reset == 1){
      this.mode = "resetPassword";
      this.token = urlParam.token;
    }
    if(urlParam.message){
      g_Util.ShowMessage(urlParam.message);
    }
  },
  methods: {
    LoginByGoogle: function(){
      var str = "/auth/login-by-google";
      if(this.intentUrl) str += "?intentUrl="+this.intentUrl;
      window.location.href = str;
    },
    LoginByFacebook: function(){
      var str = "/auth/login-by-facebook";
      if(this.intentUrl) str += "?intentUrl="+this.intentUrl;
      window.location.href = str;
    },
    LoginByPassword: function(){
      if(this.email == "") return alert("請輸入電子信箱");
      else if(!g_Util.ValidateEmail(this.email))  return alert("請輸入正確的電子信箱");
      else if(this.password == "") return alert("請輸入密碼");
      if(this.intentUrl) this.pwLoginAction = "/auth/login-by-password?intentUrl="+this.intentUrl;
      this.$refs.loginForm.submit();
    },
    SignupByPassword: function(){
      if(this.email == "") return alert("請輸入電子信箱");
      else if(!g_Util.ValidateEmail(this.email))  return alert("請輸入正確的電子信箱");
      else if(this.password == "") return alert("請輸入密碼");
      else if(this.name == "") return alert("請輸入姓名");
      else if(this.password != this.passwordConfirm) return alert("請確認密碼一致");
      if(this.intentUrl) this.pwSignupAction = "/auth/signup-by-password?intentUrl="+this.intentUrl;
      this.$refs.signupForm.submit();
    },
    ForgetPassword: function(){
      if(this.email == "") return alert("請輸入電子信箱");
      else if(!g_Util.ValidateEmail(this.email))  return alert("請輸入正確的電子信箱");

      $.post("/auth/forget-password", {email: this.email}, function(data){
        //console.log(data);
        if(data.status == "ok"){
          alert("修改密碼的連結已寄至您的信箱，請點擊連結並更新密碼");
        }
      });
    },
    ResetPassword: function(){
      if(this.password == "") return alert("請輸入密碼");
      else if(this.password != this.passwordConfirm) return alert("請確認密碼一致");

      $.post("/auth/reset-password", {password: this.password, token: this.token}, function(data){
        //console.log(data);
        if(data.status == "ok"){
          alert("密碼已更新，請重新登入");
        }
        else{
          //console.log(data.message);
          switch(data.message){
            case "invalid token": alert("連結已失效"); break;
            default: alert("密碼更新失敗"); break;
          }
        }
        window.location.href="/auth/login";
        
      });
    }
  }
});

window.addEventListener('load', function() {
  
});

window.addEventListener('resize', function(e) {
  
});