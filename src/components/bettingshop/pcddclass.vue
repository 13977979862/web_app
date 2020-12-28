<template>
    <div class="betallclass _allpage">
        <div class="cebianlist">
            <div class="gamemenu">
                <a @click="_changetab" class="cebian_bar"></a>
                <div class="gamemenu2">
                    <div class="game_module" v-for="(item,index) in game" :class="{'_greybg':index%2==1}">
                        <h5>{{item.title}}</h5>
                        <ul>
                            <li v-for="(item2,index2) in item.data" @click="_checkgameid(item2.id,item2.type)">
                                <a>{{item2.title}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!---->
            <div class="gamemenu2bg" v-if="ctab" @click="_changetab"></div>
        </div>
        <!--正文-->
        <header class="header">
            <div class="header-box">
                <div class="header-left" @click="_gohome">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="header-center">{{info.title}}&nbsp;<p v-if="iscoin" style="display: inline-block;">({{iscoin}}元)</p></div>
                <div class="header-right" @click="shownavtab = !shownavtab"><i class="iconfont icon-weibiaoti15"></i>
                </div>
            </div>
            <div class="header-nav clearfix" v-if="shownavtab">
                <headernav></headernav>
            </div>
        </header>
        <!---->
        <div class="bet-top">
            <div class="class">
                <div class="bet-top-iframe" v-html="data_live" v-show="live_on">
                    <!--直播渲染-->
                </div>
                <div class="bet-past" v-show="!live_on">
                    <h2>{{last_lottery.number}}期</h2>
                    <h3>
                        <span class="pcddclassball" :class="'data-'+sum1">{{sum1}}</span>
                        <span class="pcddclassball addsub">+</span>
                        <span class="pcddclassball" :class="'data-'+sum2">{{sum2}}</span>
                        <span class="pcddclassball addsub">+</span>
                        <span class="pcddclassball" :class="'data-'+sum3">{{sum3}}</span>
                        <span class="pcddclassball addsub">=</span>
                        <span class="pcddclassball" :class="'data-'+sumall">{{sumall}}</span>
                    </h3>
                    <h4>
                        <span v-for="(item,index) in last_lottery.content2">{{item}}</span>
                    </h4>
                    <div class="live" @click="_show_live">
                        <i class="iconfont icon-02"></i>
                        <p>开奖直播</p>
                    </div>
                </div>
                <div class="bet-time">
                    <div>
                        <div style="color: red;margin-right:0;">{{next_lottery.number}}</div>
                        期
                    </div>
                    <div>封盘：<span>{{timefeng | sec_time}}</span></div>
                    <div>开奖：<span>{{timeopen | sec_time2}}</span></div>
                    <span id='iframe-close' v-show="live_on">关闭</span>
                </div>
            </div>
        </div>
        <!---->
        <div class="bet-box">
            <div class="bet-box-fl wrapper">
                <ul class="content">
                    <li :class="{'fl-act': menuindex == index}" v-for="(item,index) in menu_list" @click="_checkmenu(index)">{{item.name}}
                    </li>
                </ul>
            </div>
            <div class="bet-box-fr wrapper">
                <div class="content">
                    <div v-for="(item,index) in menu_list" v-show="menuindex == index">
                        <div class="flex-box-sc" v-for="(item2,index2) in item.played">
                            <div class="flex-title">{{item2.title}}</div>
                            <div class="flex-bodys" v-for="(item3,index3) in item2.data">
                                <div class="flex-html" v-for="(item4,index4) in item3" :data-value="item4.id"
                                    :data-item="item2.title+'|'+item4.name+'|'+item4.odds" @click="_checklist($event)">
                                    <span class="_it1" :class="_checkNumber(item4.name)"><p>{{item4.name}}</p></span>
                                    <span class="_it2">{{item4.odds}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->
        <div class="bet-bottom bet_pt" v-if="timefeng>0">
            <div class="flex-box">
                <div class="flex"><p>已选中<strong>{{ checkallDom.length==0 ? "0": checkallDom.length}}</strong>注</p>
                    <input type="tel" v-model="moneys" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="7" :onblur="upperCase(moneys)"
                        placeholder="输入金额"></div>
                <button @click="_detailed">下注</button>
                <button class="blue" @click="_reset">重置</button>
            </div>
        </div>
        <div class="_fengpan bet_pt" v-if="timefeng<=0">已封盘</div>
        <!---->
    </div>
</template>
<script type="text/ecmascript-6">
    import headernav from "../common/headernav";

    export default {
        filters: {
            sec_time (val) {
                return opendowntime(val);
            },
            sec_time2 (val2) {
                return clockdowntime(val2);
            },
        },//过滤器
        components: {
            headernav,
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created () {
        },
        data () {
            return {
                iscoin: "",//金额
                ctab: false,
                typeid: "",//彩种类型
                live_on: false,//是否显示直播
                data_live: '',//直播渲染iframe标签
                id: "",//彩种id
                menu_list: [],//所有玩法彩种和列表
                bet: [],//提交json格式列表清单
                betlist: [],//列表清单
                game: [],//彩种列表
                menuindex: 0,//当前彩种玩法下标
                last_lottery: {},//本期开奖
                next_lottery: {},//下一期开奖时间和期数
                info: {},
                timeopen: 0,
                timefeng: 0,
                moneys: "",
                checkallDom: [],
                allmoney: 0,
                shownavtab: false,
                sum1: "",
                sum2: "",
                sum3: "",
                sumall: "",
                times1: null,//开奖定时器
                times2: null,//封盘定时器
                getopensum: null,//查询开奖倒计时
                getmoneySum: null,//查询余额倒计时
            };//自定义变量
        },
        mounted () {
            this._firstrender();//初始化页面渲染
            this.id = localStorage.getItem("gameid");//初始化获取id
            this.typeid = localStorage.getItem("typeid");//初始化获取类型
            /*-----------------------防止客户自己随意切换-----------------------*/
            if ((this.typeid != 2) || (window._typeArr[2].indexOf(Number(this.id)) < 0)) {//既不属于该类型也不是该类型的id
                this.id = 66;//默认值
                this.typeid = 2;//默认值
            }
            this._initdata();//防止本页刷新数据没有请求
            this._reset();//重置界面
        },
        methods: {
            _firstrender () {
                var _data = {
                    "data": {
                        "data": {
                            "coin": 0,
                            "game": [{
                                "title": "PK\u7c7b",
                                "data": [{"title": "\u8d85\u7ea7\u8d5b\u8f66", "id": 81, "type": 1}, {
                                    "title": "\u5317\u4eac\u8d5b\u8f66",
                                    "id": 50,
                                    "type": 1,
                                }, {"title": "\u6781\u901fPK\u62fe", "id": 72, "type": 1}, {
                                    "title": "\u5e78\u8fd0\u98de\u8247",
                                    "id": 55,
                                    "type": 1,
                                }],
                            }, {
                                "title": "\u65f6\u65f6\u5f69",
                                "data": [{"title": "\u91cd\u5e86\u65f6\u65f6\u5f69", "id": 1, "type": 3}, {
                                    "title": "\u798f\u5229\u65f6\u65f6\u5f69",
                                    "id": 73,
                                    "type": 3,
                                }, {"title": "\u65b0\u7586\u65f6\u65f6\u5f69", "id": 80, "type": 3}, {
                                    "title": "\u91cd\u5e86\u5e78\u8fd0\u519c\u573a",
                                    "id": 61,
                                    "type": 3,
                                }],
                            }, {
                                "title": "28\u7c7b",
                                "data": [{"title": "PC\u86cb\u86cb", "id": 66, "type": 2}, {"title": "\u52a0\u62ff\u592728", "id": 71, "type": 2}],
                            }, {
                                "title": "\u516d\u5408\u5f69",
                                "data": [{"title": "\u9999\u6e2f\u516d\u5408\u5f69", "id": 70, "type": 6}],
                            }, {
                                "title": "\u5feb\u4e09",
                                "data": [{"title": "\u6c5f\u82cf\u5feb3", "id": 10, "type": 4}, {
                                    "title": "\u5317\u4eac\u5feb3",
                                    "id": 75,
                                    "type": 4,
                                }, {"title": "\u5e7f\u897f\u5feb3", "id": 76, "type": 4}, {
                                    "title": "\u5b89\u5fbd\u5feb3",
                                    "id": 77,
                                    "type": 4,
                                }, {"title": "\u6cb3\u5317\u5feb3", "id": 78, "type": 4}, {"title": "\u6e56\u5317\u5feb3", "id": 79, "type": 4}],
                            }],
                            "next_lottery": {"number": 666, "time": 0, "aciton": 0},
                            "last_lottery": {
                                "time": 0,
                                "number": 666,
                                "action": 0,
                                "content": ["6", "6", "6"],
                                "content2": ["获", "取", "数", "据,", "请", "稍", "等!"],
                            },
                            "is_open": 1,
                            "info": {
                                "title": "28类",
                                "close_time": 0,
                                "description": "\u6bcf\u592909:00-23:55",
                                "type": 2,
                                "video": "",
                            },
                            "menu": [{
                                "menuid": 372,
                                "name": "\u6df7\u5408",
                                "played": [{
                                    "title": "\u6df7\u5408",
                                    "data": [[{"id": 2739, "odds": "1.95", "name": "\u5927"}, {
                                        "id": 2740,
                                        "odds": "1.95",
                                        "name": "\u5c0f",
                                    }], [{"id": 2741, "odds": "1.95", "name": "\u5355"}, {
                                        "id": 2742,
                                        "odds": "1.95",
                                        "name": "\u53cc",
                                    }], [{"id": 2743, "odds": "3.88", "name": "\u5927\u5355"}, {
                                        "id": 2744,
                                        "odds": "3.75",
                                        "name": "\u5927\u53cc",
                                    }], [{"id": 2745, "odds": "3.75", "name": "\u5c0f\u5355"}, {
                                        "id": 2746,
                                        "odds": "3.88",
                                        "name": "\u5c0f\u53cc",
                                    }], [{"id": 2747, "odds": "9.85", "name": "\u6781\u5927"}, {
                                        "id": 2748,
                                        "odds": "9.85",
                                        "name": "\u6781\u5c0f",
                                    }, {"id": 2749, "odds": "88.50", "name": "\u8c79\u5b50"}], [{
                                        "id": 2750,
                                        "odds": "2.75",
                                        "name": "\u7ea2\u6ce2",
                                    }, {"id": 2751, "odds": "2.75", "name": "\u7eff\u6ce2"}, {"id": 2752, "odds": "2.75", "name": "\u84dd\u6ce2"}]],
                                }],
                            }, {
                                "menuid": 374,
                                "name": "\u7279\u7801",
                                "played": [{
                                    "title": "\u7279\u7801",
                                    "data": [[{"id": 2753, "odds": "899.00", "name": "0"}, {"id": 2754, "odds": "311.50", "name": "1"}, {
                                        "id": 2755,
                                        "odds": "131.50",
                                        "name": "2",
                                    }], [{"id": 2756, "odds": "66.50", "name": "3"}, {"id": 2757, "odds": "59.00", "name": "4"}, {
                                        "id": 2758,
                                        "odds": "40.00",
                                        "name": "5",
                                    }], [{"id": 2759, "odds": "30.50", "name": "6"}, {"id": 2760, "odds": "25.50", "name": "7"}, {
                                        "id": 2761,
                                        "odds": "20.55",
                                        "name": "8",
                                    }], [{"id": 2762, "odds": "16.65", "name": "9"}, {"id": 2763, "odds": "14.65", "name": "10"}, {
                                        "id": 2764,
                                        "odds": "13.70",
                                        "name": "11",
                                    }], [{"id": 2765, "odds": "12.70", "name": "12"}, {"id": 2766, "odds": "11.80", "name": "13"}, {
                                        "id": 2767,
                                        "odds": "11.80",
                                        "name": "14",
                                    }], [{"id": 2768, "odds": "12.70", "name": "15"}, {"id": 2769, "odds": "13.70", "name": "16"}, {
                                        "id": 2770,
                                        "odds": "14.65",
                                        "name": "17",
                                    }], [{"id": 2771, "odds": "16.65", "name": "18"}, {"id": 2772, "odds": "20.65", "name": "19"}, {
                                        "id": 2773,
                                        "odds": "25.50",
                                        "name": "20",
                                    }], [{"id": 2774, "odds": "30.50", "name": "21"}, {"id": 2775, "odds": "40.00", "name": "22"}, {
                                        "id": 2776,
                                        "odds": "59.00",
                                        "name": "23",
                                    }], [{"id": 2777, "odds": "66.50", "name": "24"}, {"id": 2778, "odds": "131.50", "name": "25"}], [{
                                        "id": 2779,
                                        "odds": "311.50",
                                        "name": "26",
                                    }, {"id": 2780, "odds": "899.00", "name": "27"}]],
                                }],
                            }],
                        },
                    },
                };
                this._renderdata(_data, 3);//渲染视图数据
            },
            upperCase (val) {
				setTimeout(() => {
					let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				}, 100)
                this.moneys = val.replace(/[^\d]/g, '');
            },
            _checkgameid (_id, _type) {//切换列表玩法
                this.id = _id;
                localStorage.setItem("gameid", _id);
                if (_type == 7) {
					if (_id == 4) {
					this.$router.push("/betindex/gd11x5");
					} else if (_id == 9) {
					this.$router.push("/betindex/jx11x5");
					} else if (_id == 11) {
					this.$router.push("/betindex/js11x5");
					} else if (_id == 12) {
					this.$router.push("/betindex/gx11x5");
					}
					return;
				}
                if (this.typeid == _type) {//如果是同一类彩种,重新查询
                    this._changetab();
                    this._initdata();
                    this.live_on = false;
                    this.data_live = '';
                    return false;
                }
                localStorage.setItem("typeid", _type);
                if (_id == 61) {
                    this.$router.push('/betindex/xyncclass');//返回首页
                } else {
                    this.$router.push('/betindex/' + _typeid[_type]);//返回首页
                }
            },
            _initdata () {//查询数据
                $api.$post('Api/Ajax/lottery_bet', {type: this.id}).then((res) => {
                    this._renderdata(res, 1);//渲染视图数据
                    if (res.data.data.is_open == 0) {//未开奖
                        this._initdatanext();//计算倒计时
                    }
                });
            },
            _checklist (e) {//选择已选中的玩法
                if (e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
                    e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
                } else {
                    e.currentTarget.className = "flex-html";//切换按钮样式 //写逻辑
                }
                this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose");//获取所有选中标签
            },
            _checkNumber (_sum) {
                var reg = /^[0-9]+.?[0-9]*$/;
                if (reg.test(_sum)) {
                    return "_sumbg_pcdd";
                }
                return "_textbg";
            },
            _sumtotle () {
                this.sum1 = this.last_lottery.content[0];
                this.sum2 = this.last_lottery.content[1];
                this.sum3 = this.last_lottery.content[2];
                this.sumall = this.last_lottery.content2[0];
            },
            _renderdata (res, _index) {//渲染的数据(定义在main公用方法)
                _commonRenderData(this, res, _index);
                this.$nextTick(() => {
                    this._sumtotle();
                });
            },
            /*-----下面都是公用方法(main里面function)-----*/
            _resize () {//检测屏幕变化,高度变化(定义在main公用方法)
                _commonResize(this);
            },
            _changetab () {//动画切换(定义在main公用方法)
                _commonChangeTab(this);
            },
            _checkmenu (index) {//切换玩法(定义在main公用方法)
                _commonCheckMenu(this, index);
            },
            _getmoneySum () {//查询开奖之后投注金额结算(定义在main公用方法)
                _commonGetMoneySum(this, '/Api/User/updateUser');
            },
            _initdatanext () {//下一期开奖号码获取(定义在main公用方法)
                _commonInitdataNext(this, 'Api/Ajax/lottery_time');
            },
            _timeset () {//定时器(定义在main公用方法)
                this.$nextTick(() => {
                    _commonSetTimeLottery(this);
                });
            },
            _setheight () {//(在main公用方法function)
                this.$nextTick(() => {
                    _commonSetHeight();
                });
            },
            _show_live () {//开启直播(在main公用方法function)
                _commonShowLive(this);
            },
            _detailed () {//显示清单列表弹框(在main公用方法function)
                _commonDetailed(this);
            },
            _reset () {//重置所有选中(在main公用方法function)
                _commonReset(this);
            },
            _emptyData () {//清空金额和列表(在main公用方法function)
                _commonEmptyData(this);
            },
            _betformdata () {//提交投注(在main公用方法function)
                _commonBetformdata(this, 'Api/Ajax/bet_request');
            },
            _gohome () {//返回上一页(在main公用方法function)
                _commonGoHome();
            },
        },//方法调用
        beforeDestroy () {//离开路由清除定时器(在main公用方法function)
            _commonClearAllTime(this);
        },
    };
</script>
