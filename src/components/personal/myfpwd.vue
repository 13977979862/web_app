<template>
    <div class="myfpwd">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p class="title" id="title">修改密码</p>
            </div>
        </header>
        <!---->
        <div class="" style="padding: 0 1rem;margin-top: 4.5rem;">
            <div class="tips-charge">
                <img src="../../../static/img/tupian/tips.png" style="max-width:3.0rem;">
                <p>请使用复杂点的密码；<br>定期改密码，可以提高账户安全。</p>
            </div>
            <div>
                <div class="set-account" style="margin-top:1rem;">
                    <p>当前账号：<label style="color: #ff0000;">{{username}}</label></p>
                    <p>旧的密码：<input class="_moninput" v-model="passwdold" type="password" maxlength="20" placeholder="请输入旧密码"></p>
                    <p>新的密码：<input class="_moninput" v-model="passwd1" type="password" maxlength="20" placeholder="6-20位的密码，区分大小写"></p>
                    <p>确认密码：<input class="_moninput" v-model="passwd2" type="password" maxlength="20" placeholder="再次输入密码"></p>
                    <div class="btns-flex"><a class="btn btn-primary" id="subbtn" @click="_myfpwd">提交修改</a></div>
                </div>
            </div>
        </div>
        <!---->
        <bottomnav :indexsum="3"></bottomnav>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomnav from "../bottmnav/bottomnav";

    export default {
        filters: {},//过滤器
        components: {
            bottomnav
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {
                username: "",
                passwdold: "",
                passwd1: "",
                passwd2: "",
            };//自定义变量
        },
        mounted() {
            this._initdata();
        },
        methods: {
            _initdata() {
                this.username = localStorage.getItem("username");
            },
            _myfpwd() {
                var _data = {
                    passwdold: this.passwdold,
                    passwd1: this.passwd1,
                    passwd2: this.passwd2,
                };
                if(this.passwdold == "" || this.passwd1 == "" || this.passwd2 == "") {
                    this.infotips('密码不能为空!');//信息提示弹框
                    return false;
                }
                if(this.passwdold.length < 6 || this.passwd1.length < 6 || this.passwd2.length < 6) {
                    this.infotips('密码长度不能小于6位数!');//信息提示弹框
                    return false;
                }
                if(this.passwdold == this.passwd1) {
                    this.infotips('新旧密码不能相同!');//信息提示弹框
                    return false;
                }
                if(this.passwd1 != this.passwd2) {
                    this.infotips('两次新密码不相同!');//信息提示弹框
                    return false;
                }
                $api.$post('Api/User/myfpwd', _data).then((res) => {
                    this.infotips('密码修改成功!');//信息提示弹框
                    this.$router.push("/personalcenter");
                });
            },
        },//方法调用
    };
</script>
