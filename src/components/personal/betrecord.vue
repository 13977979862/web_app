<template>
    <div class="betrecord">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p class="title" id="title">投注记录</p>
            </div>
        </header>
        <div class="masthead _scroll" style="margin-bottom: 9rem;">
            <div class="_scrollul">
                <div class="tips-charge">
                    <img src="../../../static/img/tupian/tips.png" style="max-width:3.0rem;">
                    <p>1. 请选择要查看的游戏<br>2. 只显示最近5天的注单</p>
                </div>
                <!--结果-->
                <section>
                    <div class="f_div" style="padding: 0 1rem;">
                        <div class="f_div_flex">
                            <div class="f_div_felxbox">
                                <select class="_sfelxse" v-model="lottery_type" @change="_selectlottery($event)">
                                    <option value="0" selected>全部彩种</option>
                                    <option :value="item.id" v-for="(item,index) in lottery">{{item.title}}
                                    </option>
                                </select>
                            </div>
                            <div class="f_div_felxbox">
                                <select class="_sfelxse" v-model="recdate" @change="_selecttimes($event)">
                                    <option :value="item" v-for="(item,index) in datelist1">{{item}}
                                    </option>
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
                                    <th>期号</th>
                                    <th>品项</th>
                                    <th>金额</th>
                                    <th>赔率</th>
                                    <th>中奖</th>
                                    <th>时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in all_Data_list">
                                    <td>{{item.actionNo}}</td>
                                    <td>
                                        <span class="_gadata">{{item.Groupname | replacetext}}</span>
                                        <span class="_gadata">{{item.actionData}}</span>
                                    </td>
                                    <td>{{item.money}}</td>
                                    <td v-if="!isNaN(Number(item.odds))">{{Number(item.odds).toFixed(2)}}</td>
                                    <td v-else v-html="item.odds"></td>
                                    <td>
                                        <span :class="{'_cr':item.status=='已中奖'}">{{item.status}}</span>
                                        <span v-if="item.status=='已中奖'"><br>{{item.bonus}}元</span>
                                    </td>
                                    <td>
                                        <span class="_gadata" v-html="_time(item.kjTime)"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="_lastchild">已经到底了!</div>
                </section>
            </div>
        </div>
        <!---->
        <div class="_tongji">
            <div class="_tongdiv">
                <span>投注总额</span>
                <span>中奖总额</span>
            </div>
            <div class="_tongdiv">
                <span>{{count_sum.sumtouzhu ? count_sum.sumtouzhu : 0}}元</span>
                <span>{{count_sum.sumzhongjiang ? count_sum.sumzhongjiang : 0}}元</span>
            </div>
        </div>
        <bottomnav :indexsum="3"></bottomnav>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomnav from "../bottmnav/bottomnav";

    export default {
        filters: {
            replacetext (val) {
                return val.replace("、", "&");
            }
        },//过滤器
        components: {
            bottomnav
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created () {
        },
        data () {
            return {
                delay: true,
                lottery: [],//彩种列表
                lottery_type: 0,//选择的彩种
                all_Data_list: [],//开奖列表
                count_sum: {},//总额
                datelist1: [],//日期列表
                recdate: "",//日期
                page: 1,//初始化页码
            };//自定义变量
        },
        mounted () {
            if (this.$route.params.gameid) {
                this.lottery_type = this.$route.params.gameid;
            }
            this._initScroll();
            this._resize();
            this._getTypes(30);
        },
        methods: {
            _time (val) {
                var date = new Date(val * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
                var h = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':';
                var m = (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
                return M + D + '<br>' + h + m;
            },
            _getTypes (sum) {
                $api.$post('Api/ajax/get_type').then((res) => {
                    this.lottery = res.data.data;
                    this._get15tian(sum);
                });
            },
            _get15tian (day) {//设置日期时间
                var _arr1 = [];
                for (var i = 0; i < day; i++) {//其他彩种
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
            _chaxun () {//查询
                this.page = 1;
                this.delay = false;
                this.all_Data_list = [];
                this._getAjaxdata();
            },
            _resize () {//防止用户切换尺寸
                var _this = this;
                window.onresize = () => {
                    _this._initScroll();
                };
            },
            _initScroll () {//初始化滑动
                var _s_h = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;//设备高度值
                var _head_h = document.querySelector(".top").offsetHeight;//头部高度
                var _sel_h = document.querySelector("._tongji").offsetHeight;//选择器高度
                var _bot_h = document.querySelector(".bottomexten").offsetHeight;//底部高度
                var _li_h = document.querySelector("._lastchild").offsetHeight;//最后一个li高度值
                var _see_h = _s_h - _head_h - _sel_h - _bot_h;//实际显示区域
                document.body.onscroll = (e) => {//滑动
                    var _ul = document.querySelector("._scroll ._scrollul");//ul节点
                    var _ul_h = _ul.clientHeight;//ul高度值
                    var _height = Math.ceil(_ul_h - _see_h);//可以滑动距离
                    var _top = Math.ceil(e.target.scrollingElement.scrollTop);//滑动值
                    if (Math.ceil(_top - (_height - _li_h * 2)) > 0 && this.delay == false) {//当触发到最后一个高度之前查询新的数据
                        this.page++;
                        this.delay = true;//防止一直在查询
                        this._getAjaxdata();
                    }
                };
            },
            _getAjaxdata () {
                var _data = {
                    page: this.page,
                    pagesize: 20,
                    lottery_type: this.lottery_type,
                    recdate: this.recdate
                };
                $api.$post('Api/User/betrecord', _data).then((res) => {
                    var _list = res.data.data.list;
                    if (!res.data.data.sum) {
                        console.log("缺少对象");
                    } else {
                        this.count_sum = res.data.data.sum;
                    }
                    if (_list.length > 0) {
                        this.all_Data_list = this.all_Data_list.concat(_list);
                        this.delay = false;
                    }
                });
            },
            _selectlottery (val) {//选择彩种
                this.lottery_type = val.target.value;
                this.page = 1;
            },
            _selecttimes (val) {//选择日期
                this.recdate = val.target.value;
                this.page = 1;
            },
        },
        destroyed () {//离开这个页面就销毁滚动事件
            document.body.onscroll = (e) => {
                return false;
            };
            window.onresize = () => {
                return false;
            };
        }
    };
</script>
