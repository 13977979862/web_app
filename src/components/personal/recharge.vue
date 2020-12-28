<template>
    <div class="recharge">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" @click="_backpage"></span>
                <p class="title" id="title">充值记录</p>
            </div>
        </header>
        <!---->
        <div class="masthead _scroll">
            <div class="_scrollul">
                <div class="tips-charge">
                    <img src="../../../static/img/tupian/tips.png">
                    <p>小贴士：敢于投入才能有高回报！</p>
                </div>
                <!--结果-->
                <section>
                    <div class="f_div" style="padding: 0 1rem;">
                        <div class="f_div_flex">
                            <div class="f_div_felxbox">
                                <div class="reca">充值日期:</div>
                            </div>
                            <div class="f_div_felxbox">
                                <select class="_sfelxse" v-model="recdate" @change="_selecttimes($event)">
                                    <option :value="item" v-for="(item,index) in datelist1">{{item}}</option>
                                </select>
                            </div>
                            <div class="f_div_felxbox">
                                <div @click="_chaxun" class="btn btn-primary _serchbut">查询</div>
                            </div>
                        </div>
                    </div>
                    <div class="f_div order_derail">
                        <table class="f_table" cellpadding="0" cellspacing="1">
                            <thead>
                                <tr>
                                    <th>订单号</th>
                                    <th>金额</th>
                                    <th width="160">备注</th>
                                    <th>状态</th>
                                    <th>时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in all_Data_list">
                                    <td v-html="_changbr(item.rechargeId)"></td>
                                    <td>{{item.amount}}</td>
                                    <td v-html="_infoText(item.info)"></td>
                                    <td>{{item.status}}</td>
                                    <td v-html="_time(item.rechargeTime)"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="_lastchild">已经到底了!</div>
                </section>
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
            bottomnav,
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {
                all_Data_list: [],
                datelist1: [],//日期列表
                recdate: "",//日期
                page: 1,//初始化页码
            };
        },
        mounted() {
            this._get15tian(30);//最近一个月
            this._initScroll();
            this._resize();
        },
        methods: {
            _infoText(val) {//替换标签
                return val.replace(/,/g, '<br>');
            },
            _time(val) {
                if(val <= 0) {
                    return '---';
                }
                var date = new Date(val * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
                var h = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':';
                var m = (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
                return M + D + '<br>' + h + m;
            },
            _get15tian(day) {//设置日期时间
                var _arr1 = [];
                for(var i = 0; i < day; i++) {//其他彩种
                    var _date = new Date();
                    _date.setTime(_date.getTime() - 24 * 60 * 60 * 1000 * i);
                    var _n = _date.getFullYear();
                    var _y = (_date.getMonth() + 1) > 9 ? (_date.getMonth() + 1) : "0" + (_date.getMonth() + 1);
                    var _r = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
                    var s1 = _n + "-" + _y + "-" + _r;
                    _arr1.push(s1);
                }
                this.datelist1 = _arr1;
                this.recdate = _arr1[0];//默认显示今天日期
                this._getAjaxdata();//初始化查询一次
            },
            _chaxun() {
                this.page = 1;
                this.delay = false;
                this.all_Data_list = [];
                this._getAjaxdata();
            },
            _resize() {//防止用户切换尺寸
                var _this = this;
                window.onresize = () => {
                    _this._initScroll();
                };
            },
            _initScroll() {//初始化滑动
                var _s_h = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;//设备高度值
                var _head_h = document.querySelector(".top").offsetHeight;//头部高度
                var _bot_h = document.querySelector(".bottomexten").offsetHeight;//底部高度
                var _li_h = document.querySelector("._lastchild").offsetHeight;//最后一个li高度值
                var _see_h = _s_h - _head_h - _bot_h;//实际显示区域
                document.body.onscroll = (e) => {//滑动
                    var _ul = document.querySelector("._scroll ._scrollul");//ul节点
                    var _ul_h = _ul.clientHeight;//ul高度值
                    var _height = Math.ceil(_ul_h - _see_h);//可以滑动距离
                    var _top = Math.ceil(e.target.scrollingElement.scrollTop);//滑动值
                    if(Math.ceil(_top - (_height - _li_h * 2.2)) > 0 && this.delay == false) {//当触发到最后一个高度之前查询新的数据
                        this.page++;
                        this.delay = true;//防止一直在查询
                        this._getAjaxdata();
                    }
                };
            },
            _getAjaxdata() {
                var _data = {
                    recdate: this.recdate,
                    page: this.page,
                    pagesize: 20,
                };
                $api.$post('Api/User/recharge', _data).then((res) => {
                    var _list = res.data.data.list;
                    if(_list.length > 0) {
                        this.all_Data_list = this.all_Data_list.concat(_list);
                        this.delay = false;
                    }
                });
            },
            _selecttimes(val) {//选择日期
                this.recdate = val.target.value;
                this.page = 1;
            },
            _changbr(val) {//订单号截取
                var re = '';
                var length = val.length;
                for(var i = 0, j = 1; i < length; i++, j++) {
                    if(j && j % 10 == 0) {
                        re += '<br>';
                    } else {
                        re += val[i];
                    }
                }
                return re;
            },
            _backpage() {//不需要返回上一层页面,这里需要返回到个人中心
                this.$router.push("/personalcenter");
            },
        },
        destroyed() {//离开这个页面就销毁滚动事件
            document.body.onscroll = (e) => {
                return false;
            };
            window.onresize = () => {
                return false;
            };
        },
    };
</script>
