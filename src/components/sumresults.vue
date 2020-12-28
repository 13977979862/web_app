<template>
    <div class="sumresults _allpage">
        <!--正文-->
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p class="title" id="title">开奖结果</p>
            </div>
        </header>
        <!---->
        <div class="_opensum">
            <div class="_sumhistory">
                <div class="_select1">
                    <select class="switch" v-model="valid" @change="_selectlottery($event)">
                        <option v-for="(item,index) in gamelist" :value="item.id" :label="item.title">{{item.title}}
                        </option>
                    </select>
                </div>
                <div class="_select2">
                    <!--非6喝彩-->
                    <select class="switch" v-model="date" @change="_selectdate($event)" v-if="valid!=70">
                        <option v-for="(item,index) in datelist1" :label="item" :value="item">{{item}}</option>
                    </select>
                    <!--6喝彩-->
                    <select class="switch" v-model="date" @change="_selectdate($event)" v-if="valid==70">
                        <option v-for="(item,index) in datelist2" :label="item" :value="item">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="_sumtitle">
                <div class="_period">期数</div>
                <div class="_award">开奖号码</div>
            </div>
        </div>
        <!---->
        <div class="_summasthead _scroll">
            <div class="history scroll-content has-header content">
                <ul class="list scroll-content ionic-scroll _scrollul">
                    <li class="row" v-for="(item,index) in all_Data_list">
                        <div class="col col-33 tal">
                            <div class="cont lh">
                                <div class="ng-binding">{{item.number}}</div>
                                <div class="ng-binding">{{item.time}}</div>
                            </div>
                        </div>
                        <div class="col col-67 tal">
                            <div class="cont ng-binding">
                                <div class="nums-wrap">
                                    <canvas v-if="typeid == 4" class="_canvasAll" :class="'canvas'+ item2" v-for="(item2,index2) in item.data">
                                        {{item2}}
                                    </canvas>
                                    <span v-if="typeid == 6" v-for="(item2,index) in item.data" :class="'sumball-'+typeid + ' _sixright_'+ item2">{{item2}}</span>
                                    <span v-if="typeid != 6 && typeid != 4" v-for="(item2,index) in item.data"
                                          :class="'sumball-'+typeid + ' _others_'+ item2">{{item2}}</span>
                                </div>
                                <div class="nums-wrap">
                                    <span v-if="typeid == 6" v-for="(item2,index2) in item.data2" :class="'shengxiao-'+index2">{{item2}}</span>
                                </div>
                                <div class="result-wrap">
                                    <span class="resultData" v-if="typeid!=6" v-for="(item3,index) in item.date_info"
                                          :class="{'_red':(item3 == '龙') || (item3 == '双') || (item3 == '大')}">{{item3}}</span>
                                    <span class="resultData" v-if="typeid==6" v-for="(item3,index) in item.date_info"
                                          :class="{'_red':(item3 == '双') || (item3 == '大')}">{{item3}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="_lastchild">已经到底了!</li>
                </ul>
            </div>
        </div>
        <!---->
        <bottomnav :indexsum="1"></bottomnav>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomnav from "../components/bottmnav/bottomnav";

    export default {
        filters: {},//过滤器
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
                allcolor: [],//6喝彩数字取色
                all_Data_list: [],//开奖结果列表
                gamelist: [],
                datelist1: [],//普通彩种日期选择
                datelist2: [],//6喝彩
                valid: 81,//初始化显示的彩种
                date: "",//日期
                page: 1,//初始化页码
                typeid: 1,//初始化类型(是否6喝彩)
            };//自定义变量
        },
        mounted () {
            this._initScroll();
            this._resize();
            if (this.$route.params.gameid) {
                this.valid = this.$route.params.gameid;
            }
            this.allcolor = allcolor;
            this.gamelist = JSON.parse(localStorage.getItem("lotterylist"));//拿取缓存的数据列表
            this._get15tian(15, 15);
        },
        methods: {
            _get15tian (day, yue) {//设置日期时间
                var _arr1 = [];
                var _arr2 = [];
                for (var i = 0; i < day; i++) {//其他彩种
                    var _date = new Date();
                    _date.setTime(_date.getTime() - 24 * 60 * 60 * 1000 * i);
                    var _n = _date.getFullYear();
                    var _y = (_date.getMonth() + 1) > 9 ? (_date.getMonth() + 1) : "0" + (_date.getMonth() + 1);
                    var _r = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
                    var s1 = _n + "-" + _y + "-" + _r;
                    _arr1.push(s1);
                }
                var data2 = new Date();
                //获取年
                var year = data2.getFullYear();
                //获取月
                var mon = data2.getMonth() + 2;
                for (var i = 0; i < yue; i++) {//香港六合彩
                    mon = mon - 1;
                    if (mon <= 0) {
                        year = year - 1;
                        mon = mon + 12;
                    }
                    if (mon < 10) {
                        mon = "0" + mon;
                    }
                    _arr2.push(year + "-" + mon);
                }
                this.datelist1 = _arr1;
                this.datelist2 = _arr2;
                if (this.valid == 70) {//香港6喝彩
                    this.date = _arr2[0];//默认显示今天日期
                } else {
                    this.date = _arr1[0];//默认显示今天日期
                }
                this._getAjaxdata();
            },
            _selectlottery (val) {//切换彩种
                this.valid = val.target.value;
                if (this.valid == 70) {
                    this.date = this.datelist2[0];
                } else {
                    this.date = this.datelist1[0];
                }
                this._referdate();
            },
            _referdate () {//重置
                this.page = 1;
                this.delay = false;
                this.all_Data_list = [];
                document.body.onscroll = (e) => {
                    return false;
                };
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
                var _sel_h = document.querySelector("._opensum").offsetHeight;//选择器高度
                var _bot_h = document.querySelector(".bottomexten").offsetHeight;//底部高度
                var _li_h = document.querySelector("._lastchild").offsetHeight;//最后一个li高度值
                var _see_h = _s_h - _head_h - _sel_h - _bot_h;//实际显示区域
                document.body.onscroll = (e) => {//滑动
                    var _ul = document.querySelector("._scroll ._scrollul");//ul节点
                    var _ul_h = _ul.clientHeight;//ul高度值
                    var _height = Math.ceil(_ul_h - _see_h);//可以滑动距离
                    var _top = Math.ceil(e.target.scrollingElement.scrollTop);//滑动值
                    if (Math.ceil(_top - (_height - _li_h * 2.2)) > 0 && this.delay == false) {//当触发到最后一个高度之前查询新的数据
                        this.page++;
                        this.delay = true;//防止一直在查询
                        this._getAjaxdata();
                    }
                };
            },
            _selectdate (val) {//切换日期
                this.date = val.target.value;
                this._referdate();
            },
            _getAjaxdata () {//具体某一天彩种开奖数据
                var _data = {
                    page: this.page,
                    date: this.date,
                    type: this.valid,
                };
                $api.$other('Api/Ajax/history', _data).then((res) => {
                    this.typeid = res.data.data.typeid;
                    this._initScroll();//重新初始化执行
                    var _list = res.data.data.list;
                    if (_list.length > 0) {//数据非空就行
                        this.all_Data_list = this.all_Data_list.concat(_list);
                        this.delay = false;
                    }
                    if (res.data.data.typeid == 4) {//快三类型
                        this.$nextTick(() => {
                            _commonK3_canvas();//canvas绘图
                        });
                    }
                });
            },
            sixcolor (val) {//6喝彩
                var _co = ["_red", "_blue", "_green"];
                for (var i = 0; i < this.allcolor.length; i++) {
                    for (var j = 0; j < this.allcolor[i].length; j++) {
                        if (this.allcolor[i][j] == val) {
                            return "" + _co[i];
                        }
                    }
                }
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
