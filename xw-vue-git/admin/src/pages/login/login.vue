<template>
    <div class="bg">
        <div class="login">
            <h1>欢迎登陆后台管理系统</h1>
            <le-form ref="form1">
                <le-input v-model="username" on required msg="账号必填" label="账号"></le-input>
                <le-input v-model="password" vType="password" on required msg="密码必填" label="密码"></le-input>
                <input  class="login-btn" type="button" value="登 录" @click="login('loginForm')" />
            </le-form>
        </div>
    </div>
</template>

<script>
    import commonUtil from "../../core/tool/commonUtil";

    export default {
        name: "Login",
        data(){
            return {
                username:"wupeng5",
                password:""
            }
        },
        methods:{
            login() {
                this.$refs["form1"].validate().then(x=>{
                    this.ajax.postFetch("/login",{userid:this.username,password:this.password}).then(d=>{
                    commonUtil.cookie.setCookie("userName",d.data.uname);
                    this.$router.push({path:"/tree"});
                })
                }).catch(error=>{
                    
                })
                
            }
        }
    }
</script>

<style scoped>
.refreImg img {
        border-radius: 2px;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    .frechBox {
        display: block;
        margin-top: -10px;
    }

    .refreImg {
        width: 38.2%;
        height: 40px;
        /* line-height: 20px; */
        position: absolute;
        z-index: 1000;
        right: 0;
        top: -1px;
    }

    .bg{
        background: url(../../static/images/login-bg.png) no-repeat;
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
    }
    .login{
        padding-top:200px;
        margin: 0 auto;
    }

    .login h1{
        font-size:20px;
        color: #145eb3;
        line-height: 24px;
        font-weight: bold;
        margin-bottom: 28px;
    }

    .login-item{
        width: 368px;
        margin: 0 auto;
        height: 40px;
        margin-bottom: 16px;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .login-item input{
        width: 100%;
        line-height: 38px;
        background: #fff;
        font-size: 16px;
        color: rgba(0,0,0,0.25);
        padding: 0 0 0 36px;        
        display: block;
        border: none;
        outline: none;
    }

    .login-btn{
        width: 368px;
        line-height: 40px;
        background: rgba(24,144,255,1);
        text-align: center;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
        padding: 0;
        border: none;
    }
    .forgot-password{
        color: rgba(24,144,255,1);
        width: 368px;
        margin: 0 auto;
        text-align: right;
        line-height: 22px;
        margin-bottom: 4px;
    }

    .forgot-password label{
        font-weight:400!important;
        font-size:14px;
        cursor:pointer;
    }
</style>