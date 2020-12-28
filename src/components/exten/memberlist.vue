<template>
    <div class="memberlist">
        <!--正文-->
        <header class="eeheader">
            <div class="eeheader-box">
                <a class="eeheader-left" @click="_backpage">
                    <i class="iconfont icon-fanhui"></i>
                </a>
                <div class="eheader-center">推广中心</div>
                <a class="eheader-right"></a>
            </div>
        </header>
        <!---->
        <div class="eextend-top">
            <div class="eextend-top-img">
                <img :src="thumb" alt="">
            </div>
            <strong>{{user.username}}</strong>
            <span class="efr">￥{{user.coin}}
                <a @click="_withdraw">
                    <i class="iconfont icon-tixian"></i>提款
                </a>
            </span>
        </div>
        <!---->
        <div class="VIPList-tab">
            <ul class="eflex-box emnav">
                <li class="eflex" :class="{'act': '' == type}">
                    <a @click="_getAjaxdata2('')">
                        <h2>一级会员</h2>
                        <p><strong>{{allLevel1}}</strong>人</p>
                    </a>
                </li>
                <li class="eflex" @click="_getAjaxdata2(2)" :class="{'act': 2 == type}">
                    <a>
                        <h2>二级会员</h2>
                        <p><strong>{{allLevel2}}</strong>人</p>
                    </a>
                </li>
            </ul>
        </div>
        <!---->
        <div class="VIPList-box _scroll" id="_summasthead">
            <ul class="_scrollul">
                <li v-for="(item,index) in all_Data_list">
                    <a class="eflex-box">
                        <div class="VIPList-box-img">
                            <img :src="item.thumb" alt="">
                        </div>
                        <div class="VIPList-box-ct eflex">
                            <div class="VIPList-box-table">
                                <div class="VIPList-box-cell">
                                    <h2>用户名:{{item.username | nameshow}}</h2>
                                    <p v-if="2 == type">推广人：{{item.tjyxzh | nameshow}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="VIPList-box-fr">
                            <h2>注册时间:{{item.updateTime}}</h2>
                            <div class="icon">
                                <span style="color: #ff0000;">财富指数</span>
                                <span><i class="iconfont icon-nsiconmy" v-for="(item3,index3) in item.icoin"></i></span>
                            </div>
                            <div class="state">
                                <span :class="{'bc1': item.isonline == '1'}">{{item.isonline == '1'?'在线':'离线'}}</span>
                            </div>
                        </div>
                    </a>
                </li>
                <div class="_lastchild"></div>
            </ul>
        </div>
        <!---->
        <bottomexten :indexsum="1"></bottomexten>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomexten from "../bottmnav/bottomexten";

    export default {
        filters: {
            nameshow(val) {
                return val.substr(0, 3) + "****";
            },
        },//过滤器
        components: {
            bottomexten
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
            this.allLevel1 = localStorage.getItem("allLevel1");
            this.allLevel2 = localStorage.getItem("allLevel2");
        },
        data() {
            return {
                allLevel1: "",
                allLevel2: "",
                type: "",
                user: {},
                all_Data_list: [],
                page: 1,
                thumb: "",
            };//自定义变量
        },
        mounted() {
            this._initScroll();
            this._resize();
            this._getAjaxdata();//初始化查询
            this.thumb = localStorage.getItem("thumb");
        },
        methods: {
            _resize() {//防止用户切换尺寸
                var _this = this;
                window.onresize = () => {
                    _this._initScroll();
                };
            },
            _initScroll() {//初始化滑动
                var _s_h = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;//设备高度值
                var _head_h = document.querySelector(".eeheader").offsetHeight;//头部高度
                var _sel_h = document.querySelector(".eextend-top").offsetHeight;//选择器高度
                var _bot_h = document.querySelector(".VIPList-tab").offsetHeight / 2;//会员1 2
                var _li_h = document.querySelector("._lastchild").offsetHeight;//最后一个li高度值
                var _see_h = _s_h - _head_h - _sel_h - _bot_h;//实际显示区域
                document.body.onscroll = (e) => {//滑动
                    var _ul = document.querySelector("._scroll ._scrollul");//ul节点
                    var _ul_h = _ul.clientHeight;//ul高度值
                    var _height = _ul_h - _see_h;//可以滑动距离
                    var _top = e.target.scrollingElement.scrollTop;//滑动值
                    if(_top > (_height - _li_h * 2.2) && this.delay == false) {//当触发到最后一个高度之前查询新的数据
                        this.page++;
                        this.delay = true;//防止一直在查询
                        this._getAjaxdata();
                    }
                };
            },
            _getAjaxdata2(val) {
                this.type = val;
                this.page = 1;//重置页码
                this.all_Data_list = [];
                document.body.onscroll = (e) => {
                    return false;
                };
                this._getAjaxdata();
            },
            _getAjaxdata() {
                var _data = {
                    type: this.type,
                    page: this.page,
                    pagesize: 20
                };
                $api.$post('Api/Exten/memberlist', _data).then((res) => {
                    this.user = res.data.data.user;
                    this._initScroll();//重新初始化执行
                    var _list = res.data.data.list;
                    if(_list.length > 0) {
                        this.all_Data_list = this.all_Data_list.concat(_list);
                        this.delay = false;
                    }
                });
            },
            _backpage() {
                this.$router.push("/personalcenter");
            },
            _withdraw() {
                this.$router.push('/bank/withdraw');
            },
        },
        destroyed() {//离开这个页面就销毁滚动事件
            document.body.onscroll = (e) => {
                return false;
            };
            window.onresize = () => {
                return false;
            };
        }
    };
</script>
