<template>
    <div class="loginpage _allpage">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" @click="_backpage"></span>
                <p class="title" id="title">登录</p>
            </div>
        </header>
        <!---->
        <main class="masthead" role="main">
            <section>
                <div class="login">
                    <div class="photo" style="margin-bottom:0;">
                        <img src="../../static/img/pic.png">
                    </div>
                    <div id="form1">
                        <div class="set-account" style="position: relative">
                            <p style="position: relative">
                                <input @blur="setScreen" class="form-control" v-model="username" type="text" placeholder="请输入账号">
                            </p>
                            <p><input @blur="setScreen" class="form-control" v-model="password" type="password" placeholder="请输入密码"></p>
                            <p>
                                <!--@focus="_verifying"-->
                                <input @blur="setScreen" class="form-control" v-model="verify" type="tel" placeholder="请输入验证码" @keyup.enter="_logoin" maxlength="4">
                                <img class="codeimg" :src="verifyimg" @click="_verifying" alt="获取验证码">
                            </p>
                        </div>
                        <div class="btns-flex">
                            <a @click="_logoin" class="btn btn-primary" id="subbtn" style="width:80%;margin:1rem auto;">登录</a>
                        </div>
                        <div class="zform-control" style="margin-top:11px;text-align:center;font-size:1.2rem;">
                            <a style="color:#0000ff;" @click="_register">立即注册</a>&nbsp;&nbsp;&nbsp;&nbsp;
                            <a style="color:#333;" @click="_onlineservice">在线客服</a>
                        </div>
                        <div style="width: 10rem;margin: 0 auto;text-align: center;height: 31px;line-height: 31px;
                        margin-top: 2rem;font-size: 1.5rem;color: #ffffff;background: #e61d38;border-radius: 3px;" @click="_checkLine">手动选择线路
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
    export default {
        filters: {},//过滤器
        components: {},//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {
                id: "",
                verifyimg: "",
                username: "",
                password: "",
                verify: "",
                fade: false,
            };
        },
        mounted() {
            this._verifying();
        },
        methods: {
            _logoin() {
                var _data = {
                    username: this.username,
                    password: this.password,
                    code: this.verify,
                    id: this.id,
                };
                $api.$post('Api/Ajax/check_login', _data).then((res) => {
                    if(res.data.code == 200) {
                        localStorage.setItem("username", res.data.data.username);
                        localStorage.setItem("coin", res.data.data.coin);
                        localStorage.setItem("uid", res.data.data.uid);
                        localStorage.setItem("thumb", res.data.data.thumb);
                        localStorage.setItem("sessionkey", res.data.data.session_key);
                        localStorage.setItem("isCoinPassword", res.data.data.isCoinPassword);
                        if(res.data.data.phone) {//如果存在就添加
                            localStorage.setItem("phone", res.data.data.phone);
                        }
                    } else {//密码,校验码错误,需要重新查询
                        this._verifying();
                        this.plainalert(res.data.msg);//错误弹框
                    }
                });
            },
            _checkLine() {//手动选择线路
                var _this = this;
                if(this.fade == true) {
                    this.infotips("需要几秒检测网络情况<br>不要重复检查!");
                    return;
                }
                checkLine();
                this.fade = true;
                setTimeout(() => {
                    _this.fade = false;
                }, 4000);
            },
            _verifying() {//获取验证码
                $api.$post("Api/Ajax/get_code").then((res) => {
                    this.verifyimg = res.data.data.url;
                    this.id = res.data.data.id;
                });
            },
            _register() {//跳转注册
                this.$router.push('/register');//跳转注册
            },
            _backpage() {
                window.history.back(-1);
            },
            _onlineservice() {
                window.location.href = localStorage.getItem("kf");
            },
			setScreen() {
				setTimeout(() => {
					let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				}, 100)
			}
        },
    };
</script>
