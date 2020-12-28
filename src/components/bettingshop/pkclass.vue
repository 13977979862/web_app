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
                        <span class="pkclassball" :class="'pk'+item" v-for="(item,index) in last_lottery.content">{{item}}</span>
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
                    <li :class="{'fl-act': menuindex == index}" v-for="(item,index) in menu_list" @click="_checkmenu(index)">{{item.name}}</li>
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
                                    <span class="_it1" :class="'_sumbg'+ index +_checkNumber(item4.name)">
                                        <p>{{item4.name}}</p>
                                    </span>
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
                    <input type="tel" v-model="moneys" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="7"
                        :onblur="upperCase(moneys)" placeholder="输入金额"></div>
                <button @click="_detailed">下注</button>
                <button class="blue" @click="_reset">重置</button>
            </div>
        </div>
        <div class="_fengpan bet_pt" v-if="timefeng<=0">已封盘</div>
        <!---->
    </div>
</template>
<script>
    import headernav from "../common/headernav";

    export default {
        filters: {
            sec_time(val) {
                return opendowntime(val);
            },
            sec_time2(val2) {
                return clockdowntime(val2);
            },
        },//过滤器
        components: {
            headernav,
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
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
                times1: null,//开奖定时器
                times2: null,//封盘定时器
                getopensum: null,//查询开奖倒计时
                getmoneySum: null,//查询余额倒计时
                overtop7: [],//同号码不能超过7个
                arr_one: [],//判断是否在7个内,同行内
                arr_two: [],//判断是否在7个内,同竖内
                index7_1: [],//计数器
                index7_2: [],
                arr_one_7: [],//存放每个数组相加的结果
                arr_two_7: [],
            };//自定义变量
        },
        mounted() {
            this._firstrender();//初始化页面渲染
            for(var i = 0; i < 10; i++) {//特殊玩法数组
                this.arr_one_7[i] = 0;
                this.arr_two_7[i] = [];
            }
            this.id = localStorage.getItem("gameid");//初始化获取id
            this.typeid = localStorage.getItem("typeid");//初始化获取类型
            /*-----------------------防止客户自己随意切换-----------------------*/
//             if((this.typeid != 1) || (window._typeArr[1].indexOf(Number(this.id)) < 0)) {//既不属于该类型也不是该类型的id
//                 this.id = 81;//默认值
//                 this.typeid = 1;//默认值
//             }
            this._initdata();//防止本页刷新数据没有请求
            this._reset();//重置界面
        },
        methods: {
            _firstrender() {
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
                            "next_lottery": {"number": "12345678910", "time": 0, "aciton": 0},
                            "last_lottery": {
                                "time": 0,
                                "number": '12345678910',
                                "action": 0,
                                "content": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                                "content2": ["获", "取", "数", "据,", "请", "稍", "等!"],
                            },
                            "is_open": 1,
                            "info": {
                                "title": "PK类",
                                "close_time": 0,
                                "description": "24\u5c0f\u65f690\u79d2\u4e00\u671f",
                                "type": 1,
                                "video": "",
                            },
                            "menu": [{
                                "menuid": 411,//两面
                                "name": "\u4e24\u9762",
                                "played": [{
                                    "title": "\u51a0\u4e9a\u548c",
                                    "data": [[{"id": 3115, "odds": "2.18", "name": "\u51a0\u4e9a\u5927"}, {
                                        "id": 3116,
                                        "odds": "1.78",
                                        "name": "\u51a0\u4e9a\u5c0f",
                                    }], [{"id": 3117, "odds": "1.78", "name": "\u51a0\u4e9a\u5355"}, {
                                        "id": 3118,
                                        "odds": "2.18",
                                        "name": "\u51a0\u4e9a\u53cc",
                                    }]],
                                }, {
                                    "title": "\u51a0\u519b",
                                    "data": [[{"id": 3119, "odds": "1.99", "name": "\u5355"}, {"id": 3120, "odds": "1.99", "name": "\u5927"}, {
                                        "id": 3121,
                                        "odds": "1.99",
                                        "name": "1V10\u9f99",
                                    }], [{"id": 3122, "odds": "1.99", "name": "\u53cc"}, {"id": 3123, "odds": "1.99", "name": "\u5c0f"}, {
                                        "id": 3124,
                                        "odds": "1.99",
                                        "name": "1V10\u864e",
                                    }]],
                                }, {
                                    "title": "\u4e9a\u519b",
                                    "data": [[{"id": 3125, "odds": "1.99", "name": "\u5355"}, {"id": 3126, "odds": "1.99", "name": "\u5927"}, {
                                        "id": 3127,
                                        "odds": "1.99",
                                        "name": "2V9\u9f99",
                                    }], [{"id": 3128, "odds": "1.99", "name": "\u53cc"}, {"id": 3129, "odds": "1.99", "name": "\u5c0f"}, {
                                        "id": 3130,
                                        "odds": "1.99",
                                        "name": "2V9\u864e",
                                    }]],
                                }, {
                                    "title": "\u7b2c\u4e09\u540d",
                                    "data": [[{"id": 3131, "odds": "1.99", "name": "\u5355"}, {"id": 3132, "odds": "1.99", "name": "\u5927"}, {
                                        "id": 3133,
                                        "odds": "1.99",
                                        "name": "3V8\u9f99",
                                    }], [{"id": 3134, "odds": "1.99", "name": "\u53cc"}, {"id": 3135, "odds": "1.99", "name": "\u5c0f"}, {
                                        "id": 3136,
                                        "odds": "1.99",
                                        "name": "3V8\u864e",
                                    }]],
                                }, {
                                    "title": "\u7b2c\u56db\u540d",
                                    "data": [[{"id": 3137, "odds": "1.99", "name": "\u5355"}, {"id": 3138, "odds": "1.99", "name": "\u5927"}, {
                                        "id": 3139,
                                        "odds": "1.99",
                                        "name": "4V7\u9f99",
                                    }], [{"id": 3140, "odds": "1.99", "name": "\u53cc"}, {"id": 3141, "odds": "1.99", "name": "\u5c0f"}, {
                                        "id": 3142,
                                        "odds": "1.99",
                                        "name": "4V7\u864e",
                                    }]],
                                }, {
                                    "title": "\u7b2c\u4e94\u540d",
                                    "data": [[{"id": 3143, "odds": "1.99", "name": "\u5355"}, {"id": 3144, "odds": "1.99", "name": "\u5927"}, {
                                        "id": 3145,
                                        "odds": "1.99",
                                        "name": "5V6\u9f99",
                                    }], [{"id": 3146, "odds": "1.99", "name": "\u53cc"}, {"id": 3147, "odds": "1.99", "name": "\u5c0f"}, {
                                        "id": 3148,
                                        "odds": "1.99",
                                        "name": "5V6\u864e",
                                    }]],
                                }, {
                                    "title": "\u7b2c\u516d\u540d",
                                    "data": [[{"id": 3149, "odds": "1.99", "name": "\u5355"}, {
                                        "id": 3150,
                                        "odds": "1.99",
                                        "name": "\u5927",
                                    }], [{"id": 3151, "odds": "1.99", "name": "\u53cc"}, {"id": 3152, "odds": "1.99", "name": "\u5c0f"}]],
                                }, {
                                    "title": "\u7b2c\u4e03\u540d",
                                    "data": [[{"id": 3153, "odds": "1.99", "name": "\u5355"}, {
                                        "id": 3154,
                                        "odds": "1.99",
                                        "name": "\u5927",
                                    }], [{"id": 3155, "odds": "1.99", "name": "\u53cc"}, {"id": 3156, "odds": "1.99", "name": "\u5c0f"}]],
                                }, {
                                    "title": "\u7b2c\u516b\u540d",
                                    "data": [[{"id": 3157, "odds": "1.99", "name": "\u5355"}, {
                                        "id": 3158,
                                        "odds": "1.99",
                                        "name": "\u5927",
                                    }], [{"id": 3159, "odds": "1.99", "name": "\u53cc"}, {"id": 3160, "odds": "1.99", "name": "\u5c0f"}]],
                                }, {
                                    "title": "\u7b2c\u4e5d\u540d",
                                    "data": [[{"id": 3161, "odds": "1.99", "name": "\u5355"}, {
                                        "id": 3162,
                                        "odds": "1.99",
                                        "name": "\u5927",
                                    }], [{"id": 3163, "odds": "1.99", "name": "\u53cc"}, {"id": 3164, "odds": "1.99", "name": "\u5c0f"}]],
                                }, {
                                    "title": "\u7b2c\u5341\u540d",
                                    "data": [[{"id": 3165, "odds": "1.99", "name": "\u5355"}, {
                                        "id": 3166,
                                        "odds": "1.99",
                                        "name": "\u5927",
                                    }], [{"id": 3167, "odds": "1.99", "name": "\u53cc"}, {"id": 3168, "odds": "1.99", "name": "\u5c0f"}]],
                                }],
                            }, {
                                "menuid": 423,//冠亚和
                                "name": "\u51a0\u4e9a\u548c",
                                "played": [{
                                    "title": "\u51a0\u3001\u4e9a\u519b \u7ec4\u5408",
                                    "data": [[{"id": 3169, "odds": "2.18", "name": "\u51a0\u4e9a\u5927"}, {
                                        "id": 3170,
                                        "odds": "1.78",
                                        "name": "\u51a0\u4e9a\u5c0f",
                                    }], [{"id": 3171, "odds": "1.78", "name": "\u51a0\u4e9a\u5355"}, {
                                        "id": 3172,
                                        "odds": "2.18",
                                        "name": "\u51a0\u4e9a\u53cc",
                                    }], [{"id": 3173, "odds": "42.00", "name": "3"}, {"id": 3174, "odds": "42.00", "name": "4"}, {
                                        "id": 3175,
                                        "odds": "21.00",
                                        "name": "5",
                                    }], [{"id": 3176, "odds": "21.00", "name": "6"}, {"id": 3177, "odds": "13.80", "name": "7"}, {
                                        "id": 3178,
                                        "odds": "13.80",
                                        "name": "8",
                                    }], [{"id": 3179, "odds": "10.30", "name": "9"}, {"id": 3180, "odds": "10.30", "name": "10"}, {
                                        "id": 3181,
                                        "odds": "8.60",
                                        "name": "11",
                                    }], [{"id": 3182, "odds": "10.30", "name": "12"}, {"id": 3183, "odds": "10.30", "name": "13"}, {
                                        "id": 3184,
                                        "odds": "13.80",
                                        "name": "14",
                                    }], [{"id": 3185, "odds": "13.80", "name": "15"}, {"id": 3186, "odds": "21.00", "name": "16"}, {
                                        "id": 3187,
                                        "odds": "21.00",
                                        "name": "17",
                                    }], [{"id": 3188, "odds": "42.00", "name": "18"}, {"id": 3189, "odds": "42.00", "name": "19"}]],
                                }],
                            }, {
                                "menuid": 425,//1-5名
                                "name": "1-5\u540d",
                                "played": [{
                                    "title": "\u51a0\u519b",
                                    "data": [[{"id": 3190, "odds": "9.95", "name": "1"}, {"id": 3191, "odds": "9.95", "name": "2"}], [{
                                        "id": 3192,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3193, "odds": "9.95", "name": "4"}], [{"id": 3194, "odds": "9.95", "name": "5"}, {
                                        "id": 3195,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3196, "odds": "9.95", "name": "7"}, {"id": 3197, "odds": "9.95", "name": "8"}], [{
                                        "id": 3893,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3896, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u4e9a\u519b",
                                    "data": [[{"id": 3198, "odds": "9.95", "name": "1"}, {"id": 3199, "odds": "9.95", "name": "2"}], [{
                                        "id": 3200,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3201, "odds": "9.95", "name": "4"}], [{"id": 3202, "odds": "9.95", "name": "5"}, {
                                        "id": 3203,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3204, "odds": "9.95", "name": "7"}, {"id": 3205, "odds": "9.95", "name": "8"}], [{
                                        "id": 3899,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3902, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u7b2c\u4e09\u540d",
                                    "data": [[{"id": 3206, "odds": "9.95", "name": "1"}, {"id": 3207, "odds": "9.95", "name": "2"}], [{
                                        "id": 3208,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3209, "odds": "9.95", "name": "4"}], [{"id": 3210, "odds": "9.95", "name": "5"}, {
                                        "id": 3211,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3212, "odds": "9.95", "name": "7"}, {"id": 3213, "odds": "9.95", "name": "8"}], [{
                                        "id": 3905,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3908, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u7b2c\u56db\u540d",
                                    "data": [[{"id": 3214, "odds": "9.95", "name": "1"}, {"id": 3215, "odds": "9.95", "name": "2"}], [{
                                        "id": 3216,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3217, "odds": "9.95", "name": "4"}], [{"id": 3218, "odds": "9.95", "name": "5"}, {
                                        "id": 3219,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3220, "odds": "9.95", "name": "7"}, {"id": 3221, "odds": "9.95", "name": "8"}], [{
                                        "id": 3911,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3914, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u7b2c\u4e94\u540d",
                                    "data": [[{"id": 3222, "odds": "9.95", "name": "1"}, {"id": 3223, "odds": "9.95", "name": "2"}], [{
                                        "id": 3224,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3225, "odds": "9.95", "name": "4"}], [{"id": 3226, "odds": "9.95", "name": "5"}, {
                                        "id": 3227,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3228, "odds": "9.95", "name": "7"}, {"id": 3229, "odds": "9.95", "name": "8"}], [{
                                        "id": 3917,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3920, "odds": "9.95", "name": "10"}]],
                                }],
                            }, {
                                "menuid": 431,//6-10名
                                "name": "6-10\u540d",
                                "played": [{
                                    "title": "\u7b2c\u516d\u540d",
                                    "data": [[{"id": 3230, "odds": "9.95", "name": "1"}, {"id": 3231, "odds": "9.95", "name": "2"}], [{
                                        "id": 3232,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3233, "odds": "9.95", "name": "4"}], [{"id": 3234, "odds": "9.95", "name": "5"}, {
                                        "id": 3235,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3236, "odds": "9.95", "name": "7"}, {"id": 3237, "odds": "9.95", "name": "8"}], [{
                                        "id": 3923,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3926, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u7b2c\u4e03\u540d",
                                    "data": [[{"id": 3238, "odds": "9.95", "name": "1"}, {"id": 3239, "odds": "9.95", "name": "2"}], [{
                                        "id": 3240,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3241, "odds": "9.95", "name": "4"}], [{"id": 3242, "odds": "9.95", "name": "5"}, {
                                        "id": 3243,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3244, "odds": "9.95", "name": "7"}, {"id": 3245, "odds": "9.95", "name": "8"}], [{
                                        "id": 3929,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3932, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u7b2c\u516b\u540d",
                                    "data": [[{"id": 3246, "odds": "9.95", "name": "1"}, {"id": 3247, "odds": "9.95", "name": "2"}], [{
                                        "id": 3248,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3249, "odds": "9.95", "name": "4"}], [{"id": 3250, "odds": "9.95", "name": "5"}, {
                                        "id": 3251,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3252, "odds": "9.95", "name": "7"}, {"id": 3253, "odds": "9.95", "name": "8"}], [{
                                        "id": 3935,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3938, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u7b2c\u4e5d\u540d",
                                    "data": [[{"id": 3254, "odds": "9.95", "name": "1"}, {"id": 3255, "odds": "9.95", "name": "2"}], [{
                                        "id": 3256,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3257, "odds": "9.95", "name": "4"}], [{"id": 3258, "odds": "9.95", "name": "5"}, {
                                        "id": 3259,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3260, "odds": "9.95", "name": "7"}, {"id": 3261, "odds": "9.95", "name": "8"}], [{
                                        "id": 3941,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3944, "odds": "9.95", "name": "10"}]],
                                }, {
                                    "title": "\u7b2c\u5341\u540d",
                                    "data": [[{"id": 3262, "odds": "9.95", "name": "1"}, {"id": 3263, "odds": "9.95", "name": "2"}], [{
                                        "id": 3264,
                                        "odds": "9.95",
                                        "name": "3",
                                    }, {"id": 3265, "odds": "9.95", "name": "4"}], [{"id": 3266, "odds": "9.95", "name": "5"}, {
                                        "id": 3267,
                                        "odds": "9.95",
                                        "name": "6",
                                    }], [{"id": 3268, "odds": "9.95", "name": "7"}, {"id": 3269, "odds": "9.95", "name": "8"}], [{
                                        "id": 3947,
                                        "odds": "9.95",
                                        "name": "9",
                                    }, {"id": 3950, "odds": "9.95", "name": "10"}]],
                                }],
                            }],
                        },
                    },
                };
                this._renderdata(_data, 3);//渲染视图数据
            },
            upperCase(val) {
				setTimeout(() => {
					let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				}, 100)
                this.moneys = val.replace(/[^\d]/g, '');
            },
            _checkgameid(_id, _type) {//切换列表玩法
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
                
                if(this.typeid == _type) {//如果是同一类彩种,重新查询
                    this._changetab();
                    this._initdata();
                    this.live_on = false;
                    this.data_live = '';
                    return false;
                }
                localStorage.setItem("typeid", _type);
                if(_id == 61) {
                    this.$router.push('/betindex/xyncclass');//返回首页
                } else {
                    this.$router.push('/betindex/' + _typeid[_type]);//返回首页
                }
            },
            _initdata() {//查询数据
                $api.$post('Api/Ajax/lottery_bet', {type: this.id}).then((res) => {
                    this._renderdata(res, 1);//渲染视图数据
                    /*-----------------数据特殊玩法数据value------------------*/
                    this.arr_one = [];
                    this.arr_two = [];
                    var _other2 = [res.data.data.menu[2], res.data.data.menu[3]];
                    for(var i = 0; i < _other2.length; i++) {//重新处理数据
                        for(var j = 0; j < _other2[i].played.length; j++) {
                            var _jall = _other2[i].played[j].data;
                            _other2[i].played[j].child = [];
                            for(var m = 0; m < _jall.length; m++) {
                                for(var k = 0; k < _jall[m].length; k++) {
                                    _other2[i].played[j].child.push(_jall[m][k].id);
                                }
                            }
                        }
                    }
                    for(var i = 0; i < _other2.length; i++) {
                        for(var j = 0; j < _other2[i].played.length; j++) {
                            this.arr_one[j + 5 * i] = _other2[i].played[j].child;
                        }
                    }
                    var _arr2 = this.arr_one;
                    for(var i = 0; i < _arr2.length; i++) {
                        this.arr_two[i] = [];
                        for(var k = 0; k < _arr2[i].length; k++) {
                            this.arr_two[i][k] = _arr2[k][i];
                        }
                    }
                    if(res.data.data.is_open == 0) {//未开奖
                        this._initdatanext();//计算倒计时
                    }
                });
            },
            _checklist(e) {//选择已选中的玩法
                if(e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
                    e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
                } else {
                    e.currentTarget.className = "flex-html";//切换按钮样式 //写逻辑
                }
                this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose");//获取所有选中标签
                this.overtop7 = [];
                for(var i = 0; i < this.checkallDom.length; i++) {
                    this.overtop7.push(this.checkallDom[i].getAttribute("data-value"));
                }
                //每个排名最多投7个号码
                this.index7_1 = 0;//重置
                var _index_1 = 0;
                for(var i = 0; i < this.overtop7.length; i++) {
                    for(var j = 0; j < this.arr_one.length; j++) {
                        for(var m = 0; m < this.arr_one[j].length; m++) {
                            if(this.arr_one[j][m] == this.overtop7[i]) {
                                if(_index_1 != j) {
                                    _index_1 = j;
                                    this.index7_1 = 0;
                                }
                                this.index7_1++;
                                this.arr_one_7[j] = this.index7_1;
                                if(this.arr_one_7[j] > 7) {//选择的号码超过7个就不能继续
                                    this.infotips('每个排名最多投7个号码!');//信息提示弹框
                                    this.arr_one_7[j] = 0;
                                    if(e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
                                        e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
                                    } else {
                                        e.currentTarget.className = "flex-html";//切换按钮样式 //写逻辑
                                    }
                                }
                            }
                        }
                    }
                }
                //每个排名最多投7个号码
                this.index7_2 = 0;//重置
                var _index_2 = 0;
                for(var i = 0; i < 10; i++) {
                    this.arr_two_7[i] = [];
                }
                for(var i = 0; i < this.overtop7.length; i++) {
                    for(var j = 0; j < this.arr_two.length; j++) {
                        for(var m = 0; m < this.arr_two[j].length; m++) {
                            if(this.arr_two[j][m] == this.overtop7[i]) {
                                this.arr_two_7[j].push(this.overtop7[i]);
                                if(this.arr_two_7[j].length > 7) {//选择的号码超过7个就不能继续
                                    this.infotips('每个号码最多投7个号码!');//信息提示弹框
                                    if(e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
                                        e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
                                    } else {
                                        e.currentTarget.className = "flex-html";//切换按钮样式 //写逻辑
                                    }
                                }
                            }
                        }
                    }
                }
                //结算完之后再次计算选中的号码
                this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose");//获取所有选中标签
            },
            _checkNumber(_sum) {
                var reg = /^[0-9]+.?[0-9]*$/;
                if(reg.test(_sum)) {
                    return "_" + _sum;
                }
                return "_textbg";
            },
            _renderdata(res, _index) {//渲染的数据(定义在main公用方法)
                _commonRenderData(this, res, _index);
            },
            /*-----下面都是公用方法(main里面function)-----*/
            _resize() {//检测屏幕变化,高度变化(定义在main公用方法)
                _commonResize(this);
            },
            _changetab() {//动画切换(定义在main公用方法)
                _commonChangeTab(this);
            },
            _checkmenu(index) {//切换玩法(定义在main公用方法)
                _commonCheckMenu(this, index);
            },
            _getmoneySum() {//查询开奖之后投注金额结算(定义在main公用方法)
                _commonGetMoneySum(this, '/Api/User/updateUser');
            },
            _initdatanext() {//下一期开奖号码获取(定义在main公用方法)
                _commonInitdataNext(this, 'Api/Ajax/lottery_time');
            },
            _timeset() {//定时器(定义在main公用方法)
                this.$nextTick(() => {
                    _commonSetTimeLottery(this);
                });
            },
            _setheight() {//设置滚动区域高度(在main公用方法function)
                this.$nextTick(() => {
                    _commonSetHeight();
                });
            },
            _show_live() {//开启直播(在main公用方法function)
                _commonShowLive(this);
            },
            _detailed() {//显示清单列表弹框(在main公用方法function)
                _commonDetailed(this);
            },
            _reset() {//重置所有选中(在main公用方法function)
                _commonReset(this);
            },
            _emptyData() {//清空金额和列表(在main公用方法function)
                _commonEmptyData(this);
            },
            _betformdata() {//提交投注(在main公用方法function)
                _commonBetformdata(this, 'Api/Ajax/bet_request');
            },
            _gohome() {//返回上一页(在main公用方法function)
                _commonGoHome();
            },
        },//方法调用
        beforeDestroy() {//离开路由清除定时器和倒计时(在main公用方法function)
            _commonClearAllTime(this);
        },
    };
</script>
