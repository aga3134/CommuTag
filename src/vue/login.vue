<template lang="html">
	<div class="login">
		<q-form class="q-pa-xl" v-show="mode === 'login'">
			<div class="column">
				<div class="text-h5 text-center">社群登入</div>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="red" label="Google 登入" @click="LoginByGoogle();"></q-btn>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="blue-9" label="Facebook 登入" @click="LoginByFacebook();"></q-btn>
			</div>
			<q-separator class="q-my-md"></q-separator>
			<div class="column">
				<div class="text-h5 text-center">信箱登入</div>
				<q-input class="q-my-sm" outlined dense v-model="email" placeholder="請輸入電子信箱">
					<template v-slot:before>
						帳號
					</template>
				</q-input>
				<q-input class="q-my-sm" type="password" outlined dense v-model="password" placeholder="請輸入密碼">
					<template v-slot:before>
						密碼
					</template>
				</q-input>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="grey-9" label="登入" @click="LoginByPassword();"></q-btn>

				<div class="row">
					<q-chip class="col" clickable color="orange" text-color="white" icon="alarm_on" label="忘記密碼" @click="ForgetPassword();"></q-chip>
					<q-chip class="col" clickable color="brown" text-color="white" icon="face" label="註冊新帳號" @click="ChangeMode('signup');"></q-chip>
				</div>
				<a class="q-ma-md text-brown text-center text-h6" href="/">回首頁</a>
			</div>
			
		</q-form>

		<q-form class="q-pa-xl" v-show="mode === 'signup'">
			<div class="column">
				<div class="text-h5 text-center">快速註冊</div>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="red" label="Google 登入" @click="LoginByGoogle();"></q-btn>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="blue-9" label="Facebook 登入" @click="LoginByFacebook();"></q-btn>
			</div>
			<q-separator class="q-my-md"></q-separator>
			<div class="column">
				<div class="text-h5 text-center">信箱登入</div>
				<q-input class="q-my-sm" outlined dense v-model="email" placeholder="請輸入電子信箱">
					<template v-slot:before>
						帳號
					</template>
				</q-input>
				<q-input class="q-my-sm" outlined dense v-model="name" placeholder="請輸入姓名">
					<template v-slot:before>
						姓名
					</template>
				</q-input>
				<q-input class="q-my-sm" type="password" outlined dense v-model="password" placeholder="請輸入密碼">
					<template v-slot:before>
						密碼
					</template>
				</q-input>
				<q-input class="q-my-sm" type="password" outlined dense v-model="passwordConfirm" placeholder="請再次確認密碼">
					<template v-slot:before>
						確認密碼
					</template>
				</q-input>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="grey-9" label="註冊" @click="SignupByPassword();"></q-btn>

				<q-chip class="col" clickable color="brown" text-color="white" icon="face" label="返回登入" @click="ChangeMode('login');"></q-chip>
				
			</div>
		</q-form>

	</div>
</template>

<script>
import util from "../js/util.js"
import "../scss/main.scss"

export default {
	name:"login",
	data: function () {
		return {
			intentUrl: "",
		    email: "",
		    name: "",
		    password: "",
		    passwordConfirm: "",
		    token: "",
		    mode: "login",
		    pwLoginAction: "/auth/login-by-password",
		    pwSignupAction: "/auth/signup-by-password"
		};
	},
	created: function(){
		var urlParam = util.GetUrlParameter();
		if(urlParam.intentUrl){
			this.intentUrl = encodeURIComponent(urlParam.intentUrl);
		}

		if(urlParam.reset == 1){
			this.mode = "resetPassword";
			this.token = urlParam.token;
		}
		if(urlParam.message){
			alert(urlParam.message);
		}
	},
	methods: {
		ChangeMode: function(mode){
			this.mode = mode;
		},
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
			else if(!util.ValidateEmail(this.email))  return alert("請輸入正確的電子信箱");
			else if(this.password == "") return alert("請輸入密碼");
			if(this.intentUrl) this.pwLoginAction = "/auth/login-by-password?intentUrl="+this.intentUrl;
			this.$refs.loginForm.submit();
		},
		SignupByPassword: function(){
			if(this.email == "") return alert("請輸入電子信箱");
			else if(!util.ValidateEmail(this.email))  return alert("請輸入正確的電子信箱");
			else if(this.password == "") return alert("請輸入密碼");
			else if(this.name == "") return alert("請輸入姓名");
			else if(this.password != this.passwordConfirm) return alert("請確認密碼一致");
			if(this.intentUrl) this.pwSignupAction = "/auth/signup-by-password?intentUrl="+this.intentUrl;
			this.$refs.signupForm.submit();
		},
		ForgetPassword: function(){
			if(this.email == "") return alert("請輸入電子信箱");
			else if(!util.ValidateEmail(this.email))  return alert("請輸入正確的電子信箱");

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

			$.post("/auth/reset-password", {password: this.password, token:this.token}, function(data){
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
				window.location.href="/login";
			});
		}
	}
}
</script>

<style lang="scss">
.login{
	width: 100%;
	max-width: 400px;
	margin: auto;
}
</style>