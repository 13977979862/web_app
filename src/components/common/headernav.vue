<template>
    <div class="headernav">
        <a @click="_deposit"><i class="iconfont icon-chongzhi1"></i> 充值中心</a>
        <a @click="_sumresults"><i class="iconfont icon-jiangbei"></i> 开奖结果</a>
        <a @click="_betrecord"><i class="iconfont icon-nsiconmy"></i> 投注记录</a>
        <a @click="_home"><i class="iconfont icon-shouye"></i> 投注大厅</a>
        <a @click="_rule"><i class="iconfont icon-taiqiu"></i> 游戏规则</a>
        <a @click="_onlineservice"><i class="iconfont icon-wodekefu"></i> 在线客服</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        filters: {},//过滤器
        components: {},//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {};//自定义变量
        },
        mounted() {
        },
        methods: {
            _deposit() {
                this.$router.push('/bank/deposit');
            },
            _sumresults() {
                this.$router.push({
                    name: "sumresults",
                    params: {
                        gameid: localStorage.getItem("gameid")
                    }
                });
            },
            _betrecord() {
                this.$router.push({
                    name: "betrecord",
                    params: {
                        gameid: localStorage.getItem("gameid")
                    }
                });//投注记录
            },
            _home() {
                this.$router.push("/");
            },
            _rule() {
                this.$router.push({
                    name: "rule",
                    params: {
                        gameid: localStorage.getItem("gameid")
                    }
                });
            },
            _onlineservice() {
                window.location.href = localStorage.getItem("kf");
            },
        },
    };
</script>
