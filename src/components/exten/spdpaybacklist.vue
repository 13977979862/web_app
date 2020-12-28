<template>
    <div class="spdpaybacklist">
        <!---->
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
            <strong>{{username}}</strong>
            <span class="efr">￥{{coin}}
                <a @click="_withdraw">
                    <i class="iconfont icon-tixian"></i>提款
                </a>
            </span>
        </div>
        <!---->
        <div class="VIPList-tab">
            <ul class="eflex-box emnav">
                <li class="eflex">
                    <a>
                        <h2>一级</h2>
                        <p><strong></strong></p>
                    </a>
                </li>
                <li class="eflex">
                    <a>
                        <h2>二级</h2>
                        <p><strong></strong></p>
                    </a>
                </li>
                <li class="eflex">
                    <a>
                        <h2>时间</h2>
                        <p><strong></strong></p>
                    </a>
                </li>
            </ul>
        </div>
        <!---->
        <div class="VIPList-box _scroll">
            <ul class="_scrollul">
                <li v-for="(item,index) in all_Data_list">
                    <div class="flex-box">
                        <div class="flex">
                            <h2>一级佣金</h2>
                            <p>{{item.yjAmount1}}</p>
                        </div>
                        <div class="flex">
                            <h2>二级佣金</h2>
                            <p>{{item.yjAmount2}}</p>
                        </div>
                        <div class="flex list-date" v-html="item.date"></div>
                    </div>
                </li>
                <div class="_lastchild"></div>
            </ul>
        </div>
        <!---->
        <bottomexten :indexsum="3"></bottomexten>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomexten from "../bottmnav/bottomexten";

    export default {
        filters: {},//过滤器
        components: {
            bottomexten
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {
                page: 1,
                all_Data_list: [],
                username: "",
                coin: "",
                thumb: "",
                money1: 0,
                money2: 0,
                type: 1,
                user: {},
            };
        },
        mounted() {
            this._initScroll();
            this._getAjaxdata();//初始化查询
            this.thumb = localStorage.getItem("thumb");
            this.username = localStorage.getItem("username");
            this.coin = localStorage.getItem("coin");
        },
        methods: {
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
            _getAjaxdata() {
                this.username = localStorage.getItem("username");
                this.coin = localStorage.getItem("coin");
                var _data = {
                    page: this.page,
                    pagesize: 20
                };
                $api.$post('Api/Exten/spdpaybacklist', _data).then((res) => {
                    this.money1 = !res.data.data.money1 ? 0 : res.data.data.money1;
                    this.money2 = !res.data.data.money2 ? 0 : res.data.data.money2;
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
