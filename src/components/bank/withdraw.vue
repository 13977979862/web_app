<template>
    <div class="withdraw" id="only-withdraw">
        <!--正文-->
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p id="title" class="title">提款</p>
            </div>
        </header>
        <!---->
        <div class="_iscontent">
            <div class="tips-charge" style="color: #900;">
                <p>1. 提款过程中，有什么问题，请咨询官方客服。</p>
                <p>2. 提款后，如长时间没有到账，也请及时咨询官方客服</p>
                <p>3. 会员当日最高提款10次，超过10次提款金额将在第二日到账</p>
            </div>
            <div class="set-account topUp-pay">
                <p>提款金额：<input type="tel" class="_moninput"
                    v-model="balance" placeholder="请输入整数金额" maxlength="7"
                    onkeyup="value=value.replace(/[^\d]/g,'')" :onblur="upperCase(balance)"></p>
                <p class="tips-text">请选择提款的方式&nbsp;&nbsp; <a class="bank_add" @click="_addbankiframe">添加提款方式</a></p>
                <!---->
                <div class="topUp-pay-box">
                    <ul class="topUp-pay-list">
                        <li v-for="(item,index) in bankList" @click="_selectbank(index,item)">
                            <label class="flex-box">
                                <div class="flex">
                                    <h3>银行卡 : {{item.bankName}}</h3>
                                    <p>{{item.username}} {{item.account}}</p>
                                </div>
                                <div class="topUp-pay-list-radio">
                                    <input name="radio_id" type="radio" v-model="cardid" :value="item.id" :data-val="item.bankId">
                                    <span :class="{'active': index == bankindex}"><i class="iconfont icon-dagou1"></i></span>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="btns-flex">
                    <a class="btn btn-primary cash_next" @click="_shownext">下一步</a>
                </div>
            </div>
        </div>
        <!---->
        <bottomnav :indexsum="3"></bottomnav>
    </div>
</template>
<script>
    import bottomnav from "../../components/bottmnav/bottomnav";

    export default {
        filters: {},//过滤器
        components: {
            bottomnav,
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {
                balance: "",//提款金额
                cardid: "",//提款银卡id
                bankList: [],//用户银行信息
                bankType: [],//银行卡列表
                truename: "",//持卡人姓名
                bankindex: -1,//
				phoneStatus: 0,
            };//自定义变量
        },
        mounted() {
            this._indexdata();
        },
        methods: {
            upperCase(val) {//焦点校验数字
                this.balance = ('' + val).replace(/[^\d]/g, '');
            },
            _indexdata() {//获取提款
                $api.$post('Api/bank/withdraw').then((res) => {
                    this.bankList = res.data.data.bankList;
                    this.bankType = res.data.data.bankType;
                    this.truename = res.data.data.truename;
                });
            },
            _selectbank(index, item) {//支付宝
                this.bankindex = index;
            },
            _addbankiframe() {//添加银行卡弹框
                var _this = this;
                var _type = this.bankType;
                var _select = "<select class='_baninput _my-select niubiya' name='bank_code'>";
                for(var i = 0; i < _type.length; i++) {
                    _select += "<option value='" + _type[i].id + "'>" + _type[i].name + "</option>";
                }
                _select += "<option value='-1'>其他银行</option></select>";
                var _htmls = "<div class='_modalbank'>" +
                    "<div class='bank_item'>" +
                    "     <div class='bank_flex'>" +
                    "        <span>提款方式：</span>" +
                    "        <span><select class='_baninput niubiya'><option>银行卡</option></select></span>" +
                    "     </div>" +
                    "</div>" +
                    "<div class='bank_item'>" +
                    "     <div class='bank_flex'>" +
                    "        <span>持卡人姓名：</span>" +
                    "        <span><input name='bank_account' type='text' class='_baninput niubi' value='" + this.truename + "'></span>" +
                    "     </div>" +
                    "     <div class='bank_flex'>" +
                    "        <span>出款银行：</span>" +
                    "        <span>" + _select + "</span>" +
                    "     </div>" +
                    "     <div class='bank_flex _opnebak'>" +
                    "        <span>开户银行：</span>" +
                    "        <span><input name='bank_name' type='text' class='_baninput niubi'></span>" +
                    "     </div>" +
                    "     <div class='bank_flex'>" +
                    "        <span>开户支行：</span>" +
                    "        <span><input name='countname' type='text' class='_baninput niubi' placeholder='农信社必填'></span>" +
                    "     </div>" +
                    "     <div class='bank_flex'>" +
                    "         <span>银行卡号：</span>" +
                    "         <span><input name='bank_cardno' type='tel' onkeyup=\"value=value.replace(/[^\\d]/g,'')\" maxlength='19' class='_baninput niubi'></span>" +
                    "     </div>" +
                    "</div>" +
                    "</div>";
                layer.open({//询问框
                    title: [
                        '请填写提款信息',
                        'background-color:#cd0005; color:#fff;height: 50px;line-height: 50px;',
                    ],
                    content: _htmls,
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function(index) {
                        var _allname = document.querySelectorAll("._modalbank .bank_flex [name]");
                        var _param = {};
                        for(var i = 0; i < _allname.length; i++) {
                            var _v = _allname[i].value;
                            var _n = _allname[i].name;
                            _param[_n] = _v;
                        }
                        _this._addbankcard(_param);
                        layer.close(index);
                    },
                });
				let roll = document.body.scrollTop;
				document.body.scrollTop = document.body.scrollHeight;
				let inputComponents = document.getElementsByClassName("niubi");
				let selectComponents = document.getElementsByClassName("niubiya");
				for(let key of inputComponents) {
					key.addEventListener("blur", function() {
						setTimeout(() => {
							let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
							window.scrollTo(0, Math.max(scrollHeight - 1, 0));
						}, 100)

						//static
						//document.body.scrollTop = roll;
					})
				}
				for(let key of selectComponents) {
					key.addEventListener("change", function() {
						setTimeout(() => {
							let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
							window.scrollTo(0, Math.max(scrollHeight - 1, 0));
						}, 100)
					})
				}
				
                /*-----------存在用户名----------*/
                var _dom = document.querySelector("input[name='bank_account']");
                _dom.style.background = '#ffffff';
                _dom.disabled = false;
                if(this.truename != "") {
                    _dom.style.background = '#e4e4e4';
                    _dom.disabled = true;
                }
                /*----------其他银行的时候----------*/
                var _o = document.querySelector("._opnebak");
                var _o_i = document.querySelector("._opnebak input");
                var _s = document.querySelector("._my-select");
                _o.style.display = "none";
                _o_i.removeAttribute("name");
                _s.onchange = () => {
                    var val = _s.value;
                    if(val == -1) {//其他
                        _o.style.display = "flex";
                        _o_i.setAttribute("name", "bank_name");
                    } else {
                        _o.style.display = "none";
                        _o_i.removeAttribute("name");
                    }
                };
            },
            _addbankcard(item) {//添加银行卡接口
                $api.$post('Api/bank/pay_card', item).then((res) => {
                    this._indexdata();//重新查询刷新数据
                });
            },
            _drawing(_pass) {//提款接口
                if(!_pass || _pass.length < 6) {
                    this.infotips('密码长度不正确!');
                    return false;
                }
                var _v = document.querySelector("input[name='radio_id']:checked");
                var _data = {
                    balance: this.balance,
                    pincode: _pass,
                    cardid: this.cardid,
                    bankId: _v.getAttribute("data-val"),
                };
                $api.$post('Api/bank/withdrawHandle', _data).then((res) => {
                    this.balance = "";
                    this._indexdata();//重新查询刷新数据
                    this.$router.push("/cash");
                });
            },
            _shownext() {//下一步
                var _this = this;
                if(this.balance <= 0 || !this.cardid) {
                    this.plainalert("金额不能小于0或者必须选择银卡!");
                    return;
                }
                if((!localStorage.getItem("phone") || localStorage.getItem("phone") == 0 || localStorage.getItem("phone") == 1) && this.phoneStatus == 0) {//查询是否存在手机号
                    
					var _htmls = "<p class='_phonenumber'>" +
                        "<input type='tel' id='_numphone' onkeyup=\"value=value.replace(/[^\\d]/g,'')\" maxlength='11' placeholder='手机号码'>" +
                        "</p>";
                    layer.open({//询问框
                        title: [
                            '为了您的资金安全，请先绑定手机',
                            'background-color:#cd0005; color:#fff;height: 50px;line-height: 50px;',
                        ],
                        content: _htmls,
                        btn: ['确认', '取消'],
                        shadeClose: false,
                        yes: function(index) {
							
                            _this._bindphone(document.getElementById("_numphone").value);
                            layer.close(index);
                        },
                        no: function() {
                            //localStorage.setItem("phone", '00000000');//保存手机号
							_this.phoneStatus = 1;
							_this._drawingpass();
                        },
                    });
                } else {
                    this._drawingpass();//提款密码
                }
            },
            _drawingpass() {//弹出提款密码的6个输入框
                var _this = this;
                var _htmls = "<div class='_passdiv'><div class='_passspan'><span>¥ <p>" + this.balance + "</p>元</span></div>" +
                    "<div class='_passbox'>" +
                    "    <div class='_passboxinput'>" +
                    "        <input type='tel' id='_ipt' maxlength='6' />" +
                    "        <span></span>" +
                    "        <span></span>" +
                    "        <span></span>" +
                    "        <span></span>" +
                    "        <span></span>" +
                    "        <span></span>" +
                    "    </div>" +
                    "</div></div>";
                layer.open({//询问框
                    title: [
                        '请输入提款密码',
                        'background-color:#cd0005; color:#fff;height: 50px;line-height: 50px;',
                    ],
                    content: _htmls,
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function(index) {
                        _this._drawing(document.querySelector("#_ipt").value);
                        layer.close(index);
                    },
                });
                //输入提款密码
                var ipt = document.querySelector("#_ipt");
                var span = document.querySelectorAll("._passboxinput span");
                document.querySelector("._passboxinput").onclick = function() {
                    ipt.focus();
                };
                ipt.focus();
                var num = new RegExp(/[0-9.]/);
                ipt.oninput = function() {
                    var valth = this.value.length;
                    for(var k = 0; k < span.length; k++) {
                        span[k].innerText = '';
                    }
                    for(var i = 0; i < valth; i++) {
                        if(!num.test(ipt.value[i])) {
                            ipt.value = ipt.value.substr(0, i);
                            return false;
                        }
                        span[i].innerText = '●';
                    }
                };
            },
            _bindphone(num) {//绑定手机号
				let _this = this;
				this.phoneStatus = 0;
                $api.$post('Api/bank/bindMobile', {phone: num}).then((res) => {
					this.phoneStatus = 1;
                    layer.open({
                        content: '绑定成功!',
                        btn: '确定',
                        shadeClose: false,
                        yes: function(index) {
                            layer.close(index);
							_this._drawingpass();
                        },
                    });
                    localStorage.setItem("phone", num);//保存手机号
                });
            },
        },//方法调用
    };
</script>
<style scoped="scoped">
	/* .withdraw {
		position: fixed;
		top: 0;
		left: 0;
	} */
</style>
