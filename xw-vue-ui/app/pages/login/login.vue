<template>
    <div>
        <le-button value="登录" type="save" @click="login"></le-button>
    </div>
</template>

<script>
import Ajax from "@util/http.js";
import { $cookie } from "@util/util.js";
export default {
    name: "Login",
    data() {
        return {
            user:{
                username:"",
                password:""
            }
        };
    },
    methods: {
        login() {
            Ajax.postFormData("/login", {
                userid: this.user.username,
                password: this.user.password,
                lang: "en",
                code: ""
            })
                .then(res => {
                    $cookie.setCookie("jid", res.data.jid);
                    $cookie.setCookie("tid", res.data.tid);
                    $cookie.setCookie("userName", res.data.uname);
                    $cookie.setCookie("userid", this.user.username);
                    this.$router.push({ path: "/tree" });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style scoped>
</style>