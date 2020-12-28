<template>
    <div class="peferential">
        <!--正文-->
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p id="title" class="title">优惠活动</p>
            </div>
        </header>
        <div class="ui-panel-animate">
            <div class="app-list">
                <div class="app-list-box" v-for="(item,index) in listdata">
                    <div class="list-tit">
                        <h3>{{item.title}}</h3>
                        <p>活动时间：{{item.time}}</p>
                    </div>
                    <div class="list-pic" @click="_showdetails(item.content)">
                        <a :href="item.url"><img :src="item.thumb"></a>
                        <p>{{item.desc}}</p>
                    </div>
                    <div class="join">
                        <a @click="_showdetails(item.content)">查看详情
                            <span class="join-icon"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!---->
        <bottomnav :indexsum="-1"></bottomnav>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomnav from "../components/bottmnav/bottomnav";

    export default {
        filters: {
            time (val) {
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
        created () {
        },
        data () {
            return {
                listdata: [],
            };
        },
        mounted () {
            this._getdata();
        },
        methods: {
            _getdata () {//获取首页所有信息参数
                this.listdata = JSON.parse(localStorage.getItem("slidelist"));
            },
            _showdetails (item) {
                this.$router.push({
                    name: 'discountDetails',
                    params: {
                        data: item
                    }
                });
            }
        },
    };
</script>
