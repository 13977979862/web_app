<template>
    <div class="_rengong">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-left cw">
                    <i class="iconfont icon-fanhui" @click="_backpage"></i>
                </span>
                <p class="title" v-if="wtfStatus" id="title">云闪付</p>
                <p class="title" v-else id="title">银行转账</p>
            </div>
        </header>
        <!---->
        <div class="popup" style="margin-bottom: 200px;">
            <div id="rengong">
                <div class="popupinternal order-submit2">
                    <!---->
                    <div class="col-left">
                        <!---->
                        <div v-if="data_all.paytype != 10">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td colspan="3">
                                            <img class="rechImg" src="../../../static/img/zfb.jpg" v-if="data_all.paytype == 4">
                                            <img class="rechImg" src="../../../static/img/wx.jpg" v-if="data_all.paytype == 2">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="_bank_td1">姓名：</td>
                                        <td style="text-align: left;">
                                            <span class="_bank_input">{{data_all.signkey}}</span>
                                            <input id="copy_username" readonly="readonly" :value="data_all.signkey" class="_bank_input2">
                                        </td>
                                        <td><a class='cp copy' @click="_copytexts('copy_username')">复制</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>帐号：</td>
                                        <td style="text-align: left;">
                                            <span class="_bank_input">{{data_all.mch_id}}</span>
                                            <input id="copy_cardid" readonly="readonly" :value="data_all.mch_id" class="_bank_input2">
                                        </td>
                                        <td><a class='cp copy' @click="_copytexts('copy_cardid')">复制</a></td>
                                    </tr>
                                    <tr v-if="data_all.paytype == 4">
                                        <td>支行：</td>
                                        <td style="text-align: left;">
                                            <span class="_bank_input">{{data_all.appsecret}}</span>
                                            <input id="copy_zhihang" readonly="readonly" :value="data_all.appsecret" class="_bank_input2">
                                        </td>
                                        <td><a class='cp copy' @click="_copytexts('copy_zhihang')">复制</a></td>
                                    </tr>
                                    <tr class="">
                                        <td></td>
                                        <td colspan="2" align="left" style="text-align:left;">
                                            <span>{{data_all.pay_remark}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <img :src="codeimg" style="width:90%; margin-bottom:10px;border: 1px solid #b9b9b9!important">
                        </div>
                        <!---->
                        <div v-if="data_all.paytype == 10">
                            <table class="table" style="height: 150px; margin-bottom: 10px">
                                <tbody>
                                    <tr>
                                        <td colspan="3">
                                            <h4 style="color: #e61d38;font-size: 14px;text-indent: 15px;">人工网银转账</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="_bank_td1">银行：</td>
                                        <td><input type="text" :value="data_all.title" class="_bank_input" disabled></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>支行：</td>
                                        <td><input type="text" :value="data_all.appsecret" class="_bank_input" disabled></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>收款人：</td>
                                        <td style="text-align: left;">
                                            <span class="_bank_input">{{data_all.signkey}}</span>
                                            <input id="_signkey" readonly="readonly" :value="data_all.signkey" class="_bank_input2">
                                        </td>
                                        <td><a class="cp copy" @click="_copytexts('_signkey')">复制</a></td>
                                    </tr>
                                    <tr>
                                        <td>账号：</td>
                                        <td style="text-align: left;">
                                            <span class="_bank_input">{{data_all.mch_id}}</span>
                                            <input id="_mch_id" readonly="readonly" :value="data_all.mch_id" class="_bank_input2">
                                        </td>
                                        <td><a class="cp copy" @click="_copytexts('_mch_id')">复制</a></td>
                                    </tr>
                                    <tr class="">
                                        <td></td>
                                        <td colspan="2" align="left" style="text-align:left;">
                                            <span>{{data_all.pay_remark}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!---->
                        <div class="three-second">
                            <h4>存款信息</h4>
                            <div class="post-info">
                                <p>
                                    <span class="nickname_desc"><span style="color: red;">* </span>存款金额</span>：
                                    <input type="number" @keyup="_showMoney($event)" id="money" name="money" v-model="monetys" maxlength="7">
                                </p>
                                <p>
                                    <span class="nickname_desc"><span style="color: red;">* </span>实名姓名</span>：
                                    <input type="text" name="zzr" v-model="truename" maxlength="20">
                                </p>
								<p v-if="wtfStatus">
								    <span class="nickname_desc"><span style="visibility: hidden;">* </span>凭证号码</span>：
								    <input type="text" v-model="certificate">
								</p>
								<!-- wtfStatus -->
                                <p>
                                    <span class="nickname_desc"><span style="visibility: hidden;">* </span>存款时间</span>：
                                    <input id="zztimes" type="text" size="10" v-model="noewtime" disabled>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!---->
                    <div class="list-new list-wx">
                        <div class="btns-flex">
                            <a class="btn btn-primary paySubmit" @click="_nextup">
                                提交订单
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <bottomnav :indexsum="3"></bottomnav>
    </div>
</template>
<script>
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
                data_all: {},
                monetys: 0,
                truename: "",//用户真实姓名
                noewtime: "",
                codeimg: "",//beijing图片
				wtfStatus: false,
				certificate: null,
            };
        },
        mounted() {
			console.log(this.$route.params)
            if(!this.$route.params.data) {//不存在参数
                this.$router.push("/");//去个人中心
                return false;
            }
            this.data_all = this.$route.params.data;
            this.monetys = this.data_all.money;
            this.codeimg = this.data_all.img;//背景图片
            this.noewtime = this.data_all.inputTime;
			if(this.data_all.paytype === 6 && this.data_all.code === 'rengong') {
				this.wtfStatus = true;
			}
			
            this._checkall();
        },
        methods: {
            _checkall() {//不存在参数就返回主页
                if(!this.data_all.id) {
                    this.$router.push("/");
                }
            },
            _showMoney(obj) {//只能显示一个小数点且只能输入数字
                obj.target.value = obj.target.value.replace(/[^\d.]/g, ""); //先把非数字的都替换掉，除了数字和.
                obj.target.value = obj.target.value.replace(/^\./g, ""); //必须保证第一个为数字而不是.
                obj.target.value = obj.target.value.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
                obj.target.value = obj.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //保证.只出现一次，而不能出现两次以上
            },
            _backpage() {
                window.history.back(-1);
            },
            _nextup() {//下一步提交
                var _money = document.querySelector("#money").value;
				if(_money === "") {
					layer.open({//询问框
					    content: '存款金额必填！',
					    btn: ['确认'],
					    shadeClose: false,
					    yes: function(index) {
					        layer.close(index);
					    }
					});
					return;
				}
				if(this.truename === "") {
					layer.open({//询问框
					    content: '实名姓名为必填！',
					    btn: ['确认'],
					    shadeClose: false,
					    yes: function(index) {
					        layer.close(index);
					    }
					});
					return;
				}
                var _data = {
                    id: this.data_all.id,
                    money: _money,
                    rechType: this.data_all.paytype,
                    rechName: this.data_all.title,
                    inputName: this.truename,
                    inputTime: this.data_all.inputTime,
                };
				this.certificate !== null ? _data['certificate'] = this.certificate : '';
                $api.$post("Api/Bank/rengongHandle", _data).then((res) => {
                    this.$router.push("/recharge");
                });
            }
        },//方法调用
    };
</script>
