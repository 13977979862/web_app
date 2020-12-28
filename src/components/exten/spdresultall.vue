<template>
    <div class="spdresultall">
        <div v-if="!showpage2">
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
            <div class="betting-tt">
                <h2>查询时间</h2>
                <p>可提供昨天、今天、本周、上周、本月、上月查询</p>
            </div>
            <!---->
            <div class="betting-query">
                <ul>
                    <li :class="{'act': 0 == index}">
                        <div :value="getYesterdayDate+'|'+ getYesterdayDate" @click="_checktime($event,0)">昨 天</div>
                    </li>
                    <li :class="{'act': 1 == index}">
                        <div :value="getCurrentDate+'|'+ getCurrentDate" @click="_checktime($event,1)">今 天</div>
                    </li>
                    <li :class="{'act': 2 == index}">
                        <div :value="getWeekStartDate+'|'+ getWeekEndDate" @click="_checktime($event,2)">本 周</div>
                    </li>
                    <li :class="{'act': 3 == index}">
                        <div :value="getUpWeekStartDate+'|'+ getUpWeekEndDate" @click="_checktime($event,3)">上 周</div>
                    </li>
                    <li :class="{'act': 4 == index}">
                        <div :value="getMonthStartDate+'|'+ getMonthEndDate" @click="_checktime($event,4)">本 月</div>
                    </li>
                    <li :class="{'act': 5 == index}">
                        <div :value="getLastMonthStartDate+'|'+ getLastMonthEndDate" @click="_checktime($event,5)">上 月
                        </div>
                    </li>
                </ul>
                <p>以查询：<span id="date">{{valtime.split("|")[0]}} 至 {{valtime.split("|")[1]}}</span></p>
            </div>
            <!---->
            <div>
                <a class="betting-btn" @click="_spdresultall">查 询</a>
            </div>
        </div>
        <!--跳转子页面-->
        <div v-if="showpage2">
            <header class="eeheader">
                <div class="eeheader-box">
                    <a class="eeheader-left" @click="_backpage_show">
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
            <!---->
            <div class="VIPList-tab">
                <ul class="eflex-box emnav">
                    <li class="eflex">
                        <a>
                            <h2>用户</h2>
                            <p><strong></strong></p>
                        </a>
                    </li>
                    <li class="eflex">
                        <a>
                            <h2>称号</h2>
                            <p><strong></strong></p>
                        </a>
                    </li>
                </ul>
            </div>
            <!---->
            <div class="betting-box">
                <ul class="betting-list">
                    <li v-for="(item,index) in betlist">
                        <a href="#" class="eflex-box">
                            <div class="betting-list-img">
                                <img :src="thumb" alt="">
                            </div>
                            <div class="betting-list-ct eflex">
                                <h2>用户名:{{item.username | nameshow}}</h2>
                                <h3>投注额</h3>
                                <p>{{item.betAmount}}</p>
                            </div>
                            <strong
                                :class="{'c2': item.zjAmount > item.betAmount , 'c1': (item.zjAmount < item.betAmount) || item.betAmount == '0.00'}">
                                {{item.zjAmount > item.betAmount ? "彩神" : "彩民" }}
                            </strong>
                        </a>
                    </li>
                </ul>
                <div class="betting-bottom">
                    共计
                    <div class="fr">
                        <h2>投注额</h2>
                        <p class="_totles">{{total.toFixed(2)}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!---->
        <bottomexten :indexsum="2"></bottomexten>
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
            //今天
            var getCurrentDate = new Date(nowYear, nowMonth, nowDay);
            this.getCurrentDate = formatDate(getCurrentDate);
            //昨天
            var getYesterdayDate = new Date(nowYear, nowMonth, nowDay - 1);
            this.getYesterdayDate = formatDate(getYesterdayDate);
            //获得本周的开始日期
            var getWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
            this.getWeekStartDate = formatDate(getWeekStartDate);
            //获得本周的结束日期
            var getWeekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
            this.getWeekEndDate = formatDate(getWeekEndDate);
            //获得上周的开始日期
            var getUpWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
            this.getUpWeekStartDate = formatDate(getUpWeekStartDate);
            //获得上周的结束日期
            var getUpWeekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek - 7));
            this.getUpWeekEndDate = formatDate(getUpWeekEndDate);
            //获得本月的开始日期
            var getMonthStartDate = new Date(nowYear, nowMonth, 1);
            this.getMonthStartDate = formatDate(getMonthStartDate);
            //获得本月的结束日期
            var getMonthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
            this.getMonthEndDate = formatDate(getMonthEndDate);
            //获得上月开始时间
            var getLastMonthStartDate = new Date(nowYear, lastMonth, 1);
            this.getLastMonthStartDate = formatDate(getLastMonthStartDate);
            //获得上月结束时间
            var getLastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
            this.getLastMonthEndDate = formatDate(getLastMonthEndDate);
        },
        data() {
            return {
                getCurrentDate: "",//今天
                getYesterdayDate: "",//昨天
                getWeekStartDate: "",//本周开始
                getWeekEndDate: "",//本周结束
                getUpWeekStartDate: "",//上周开始
                getUpWeekEndDate: "",//上周结束
                getMonthStartDate: "",//本月开始
                getMonthEndDate: "",//本月结束
                getLastMonthStartDate: "",//上月开始
                getLastMonthEndDate: "",//上月结束
                valtime: "",
                betlist: [],
                index: 1,
                showpage2: false,
                total: 0,
                user: {},
                thumb: "",
            };//自定义变量
        },
        mounted() {
            this.thumb = localStorage.getItem("thumb");
            var getCurrentDate = new Date(nowYear, nowMonth, nowDay);
            this.valtime = formatDate(getCurrentDate) + '|' + formatDate(getCurrentDate);//初始化时间
        },
        methods: {
            _checktime(val, index) {
                this.index = index;
                this.valtime = val.target.attributes[0].value;
            },
            _spdresultall() {
                this.showpage2 = true;
                var _data = {
                    startdate: this.valtime.split("|")[0],
                    enddate: this.valtime.split("|")[1],
                };
                $api.$post('Api/Exten/spdresultall', _data).then((res) => {
                    this.user = res.data.data.user;
                    this.betlist = res.data.data.list;
                    for(var i = 0; i < this.betlist.length; i++) {
                        this.total += Number(this.betlist[i].betAmount);
                    }
                });
            },
            _backpage_show() {
                this.showpage2 = false;
            },
            _backpage() {
                this.$router.push("/personalcenter");
            },
            _withdraw() {
                this.$router.push('/bank/withdraw');
            },
        },//方法调用
    };
    var now = new Date();                    //当前日期
    var nowDayOfWeek = now.getDay();         //今天本周的第几天
    var nowDay = now.getDate();              //当前日
    var nowMonth = now.getMonth();           //当前月
    var nowYear = now.getYear();             //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;  //
    var lastMonthDate = new Date();  //上月日期
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    var lastYear = lastMonthDate.getYear();
    var lastMonth = lastMonthDate.getMonth();
    //格式化日期：yyyy-MM-dd
    function formatDate(date) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if(mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if(myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }
    //获得某月的天数
    function getMonthDays(myMonth) {
        var monthStartDate = new Date(nowYear, myMonth, 1);
        var monthEndDate = new Date(nowYear, myMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    }
    //获得本季度的开始月份
    function getQuarterStartMonth() {
        var quarterStartMonth = 0;
        if(nowMonth < 3) {
            quarterStartMonth = 0;
        }
        if(2 < 6) {
            quarterStartMonth = 3;
        }
        if(5 < 9) {
            quarterStartMonth = 6;
        }
        if(nowMonth > 8) {
            quarterStartMonth = 9;
        }
        return quarterStartMonth;
    }
</script>
