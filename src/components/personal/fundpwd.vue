<template>
    <div class="fundpwd">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p class="title" id="title">提款密码修改</p>
            </div>
        </header>
        <div class="content" style="padding: 0 1rem;margin-top: 4.5rem;">
            <div class="tips-charge">
                <img src="../../../static/img/tupian/tips.png" style="max-width:3.0rem;float:left;">
                <p>请使用复杂点的密码；<br>请牢记您的提款密码，提款时需要验证；<br>定期改密码，可以提高账户资金安全。</p>
            </div>
            <div>
                <div class="set-account" style="margin-top:1rem;">
                    <p v-if="showoldpwd">旧的提款密码：<input class="_moninput" maxlength="6" v-model="passwdold" type="password" placeholder="请输入旧密码"></p>
                    <p>新的提款密码：<input class="_moninput" maxlength="6" v-model="passwd1" type="password" placeholder="6位数字的密码">
                    <p>确认提款密码：<input class="_moninput" maxlength="6" v-model="passwd2" type="password" placeholder="再次输入密码"></p>
                    <div class="btns-flex"><a @click="_fundpwd" class="btn btn-primary" id="subbtn">修改提款密码</a></div>
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
            this.isCoinPassword = localStorage.getItem("isCoinPassword");
            if(this.isCoinPassword == "0") {//没有初始密码
                this.showoldpwd = false;
            } else {
                this.showoldpwd = true;
            }
        },
        data() {
            return {
                showoldpwd: false,
                username: "",
                passwdold: "",
                passwd1: "",
                passwd2: "",
                isCoinPassword: ""
            };//自定义变量
        },
        mounted() {
        },
        methods: {
            _fundpwd() {
                var _this = this;
                var _data = {};
                if(this.isCoinPassword == 0) {
                    _data = {
                        passwd1: this.passwd1,
                        passwd2: this.passwd2,
                    };
                    if(this.passwd1 == "" || this.passwd2 == "") {
                        this.infotips('密码不能为空!');//信息提示弹框
                        return false;
                    }
                    if(this.passwd1.length < 6 || this.passwd2.length < 6) {
                        this.infotips('密码长度不能小于6位数!');//信息提示弹框
                        return false;
                    }
                    if(this.passwd1 != this.passwd2) {
                        this.infotips('两次新密码不相同!');//信息提示弹框
                        return false;
                    }
                } else {
                    _data = {
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
                }
                $api.$post('Api/User/fundpwd', _data).then((res) => {
                    layer.open({
                        content: "密码修改成功!",
                        btn: '确定',
                        shadeClose: false,
                        yes: function(index) {
                            _this.$router.push("/personalcenter");
                        }
                    });
                });
            },
        },
    };
</script>
