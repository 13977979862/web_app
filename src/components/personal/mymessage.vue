<template>
    <div class="mymessage">
        <!--正文-->
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" @click="_backpage"></span>
                <p class="title" id="title">我的消息</p>
            </div>
        </header>
        <div class="_megbody _scroll" id="_summasthead">
            <ul class="_scrollul">
                <li v-for="(item,index) in all_Data_list" @click="_showmsg(item.content,item.title)">
                    <span class="_meghead">{{item.title}}</span>
                    <span class="_megtime">{{item.addTime | times}}</span>
                </li>
                <div class="_lastchild"></div>
            </ul>
        </div>
        <!---->
        <bottomnav :indexsum="3"></bottomnav>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomnav from "../bottmnav/bottomnav";

    export default {
        filters: {
            times(val) {
                var date = new Date(val * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + ' ';
                var h = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':';
                var m = (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ':';
                var s = (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
                return Y + M + D + h + m + s;
            }
        },//过滤器
        components: {
            bottomnav
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {
                page: 1,
                all_Data_list: [],
                msgcontent: "",
            };
        },
        mounted() {
            this._initScroll();
            this._resize();
            this._getAjaxdata();//初始化查询
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
                    page: this.page,
                    pagesize: 20
                };
                $api.$post('Api/User/mymessage', _data).then((res) => {
                    var _list = res.data.data.list;
                    if(_list.length > 0) {
                        this.all_Data_list = this.all_Data_list.concat(_list);
                        this.delay = false;
                    }
                });
            },
            _showmsg(_content, _title) {
                layer.open({
                    title: [
                        _title,
                        'background-color:#f5f0f0; color:#080808;border-bottom: 1px solid #D0D0D0;height: 50px;line-height: 50px;'
                    ],
                    content: "<div class='_titlenoice'>" + _content + "</div>",
                    btn: '确定',
                    shadeClose: false,
                });
            },
            _backpage() {
                window.history.back(-1);
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
