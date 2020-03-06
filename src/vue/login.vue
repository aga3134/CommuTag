<template lang="html">
	<div class="login">
		<form ref="loginForm" :action="pwLoginAction" method="POST" class="q-pa-xl" v-show="mode === 'login'">
			<div class="column" v-if="method.google || method.facebook">
				<div class="text-h5 text-center">社群登入</div>
				<q-btn v-if="method.google" class="q-ma-sm q-pa-xs full-width" color="red" label="Google 登入" @click="LoginByGoogle();"></q-btn>
				<q-btn v-if="method.facebook" class="q-ma-sm q-pa-xs full-width" color="blue-9" label="Facebook 登入" @click="LoginByFacebook();"></q-btn>
			</div>

			<q-separator v-if="method.google || method.facebook" class="q-my-md"></q-separator>
			
			<div class="column">
				<div class="text-h5 text-center">信箱登入</div>
				<q-input name="email" class="q-my-sm" outlined dense v-model="email" placeholder="請輸入電子信箱">
					<template v-slot:before>
						帳號
					</template>
				</q-input>
				<q-input name="password" class="q-my-sm" type="password" outlined dense v-model="password" placeholder="請輸入密碼" @keyup.enter="LoginByPassword();">
					<template v-slot:before>
						密碼
					</template>
				</q-input>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="grey-9" label="信箱登入" @click="LoginByPassword();"></q-btn>

				<div class="row">
					<q-chip class="col" clickable color="orange" text-color="white" icon="alarm_on" label="忘記密碼" @click="ForgetPassword();"></q-chip>
					<q-chip class="col" clickable color="brown" text-color="white" icon="face" label="註冊新帳號" @click="ChangeMode('signup');"></q-chip>
				</div>
				<q-item clickable tag="a" href="/">
					<q-item-section avatar>
						<q-icon name="home" />
					</q-item-section>
					<q-item-section>
						<q-item-label class="text-subtitle1">回首頁</q-item-label>
					</q-item-section>
				</q-item>
			</div>
			
		</form>

		<form ref="signupForm" :action="pwSignupAction" method="POST" class="q-pa-xl" v-show="mode === 'signup'">
			<div class="column" v-if="method.google || method.facebook">
				<div class="text-h5 text-center">快速註冊</div>
				<q-btn v-if="method.google" class="q-ma-sm q-pa-xs full-width" color="red" label="Google 登入" @click="LoginByGoogle();"></q-btn>
				<q-btn v-if="method.facebook" class="q-ma-sm q-pa-xs full-width" color="blue-9" label="Facebook 登入" @click="LoginByFacebook();"></q-btn>
			</div>
			<q-separator v-if="method.google || method.facebook" class="q-my-md"></q-separator>
			<div class="column">
				<div class="text-h5 text-center">信箱登入</div>
				<q-input name="email" class="q-my-sm" outlined dense v-model="email" placeholder="請輸入電子信箱">
					<template v-slot:before>
						帳號
					</template>
				</q-input>
				<q-input name="name" class="q-my-sm" outlined dense v-model="name" placeholder="請輸入姓名">
					<template v-slot:before>
						姓名
					</template>
				</q-input>
				<q-input name="password" class="q-my-sm" type="password" outlined dense v-model="password" placeholder="請輸入密碼">
					<template v-slot:before>
						密碼
					</template>
				</q-input>
				<q-input class="q-my-sm" type="password" outlined dense v-model="passwordConfirm" placeholder="請再次確認密碼" @keyup.enter="SignupByPassword();">
					<template v-slot:before>
						確認密碼
					</template>
				</q-input>
				<q-btn class="q-ma-sm q-pa-xs full-width" color="grey-9" label="註冊" @click="SignupByPassword();"></q-btn>

				<q-item clickable @click="ChangeMode('login');">
					<q-item-section avatar>
						<q-icon name="keyboard_backspace" />
					</q-item-section>
					<q-item-section>
						<q-item-label class="text-subtitle1">返回登入</q-item-label>
					</q-item-section>
				</q-item>

			</div>
		</form>

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
		    pwSignupAction: "/auth/signup-by-password",
		    method: {}
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
			alert(decodeURIComponent(urlParam.message));
		}

		$.get("/auth/method",function(result){
			console.log(result);
			if(result.status != "ok") return;
			this.method = result.data;
		}.bind(this));
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

			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.email = this.email;
			data._csrf = csrfToken;
			$.post("/auth/forget-password", data, function(data){
				//console.log(data);
				if(data.status == "ok"){
					this.$q.notify("修改密碼的連結已寄至您的信箱，請點擊連結並更新密碼");
				}
			});
		},
		ResetPassword: function(){
			if(this.password == "") return alert("請輸入密碼");
			else if(this.password != this.passwordConfirm) return alert("請確認密碼一致");

			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.password = this.password;
			data.token = this.token;
			data._csrf = csrfToken;
			$.post("/auth/reset-password", data, function(data){
				//console.log(data);
				if(data.status == "ok"){
					this.$q.notify("密碼已更新，請重新登入");
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