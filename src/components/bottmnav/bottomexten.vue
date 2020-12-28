<template>
    <div class="bottomexten">
        <div class="bfooter1">
            <ul class="bflex-box">
                <li class="bflex" :class="{'act': 0 == indexsum }">
                    <a @click="_index">
                        <i class="iconfont icon-tuijian"></i>
                        <p>推荐信息</p>
                    </a>
                </li>
                <li class="bflex" :class="{'act': 1 == indexsum }">
                    <a @click="_memberlist">
                        <i class="iconfont icon-huiyuan"></i>
                        <p>会员列表</p>
                    </a>
                </li>
                <li class="bflex" :class="{'act': 2 == indexsum }">
                    <a @click="_spdresultall">
                        <i class="iconfont icon-taiqiu" style="font-size: 2rem;"></i>
                        <p>会员投注</p>
                    </a>
                </li>
                <li class="bflex" :class="{'act': 3 == indexsum }">
                    <a @click="_spdpaybacklist">
                        <i class="iconfont icon-yongjin"></i>
                        <p>佣金记录</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        filters: {},//过滤器
        components: {},//组件注册
        computed: {},//计算属性
        props: {
            indexsum: {
                type: Number,
            },
        },
        created() {
        },
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
            _index() {
                this.$router.push("/exten/index");//
            },
            _memberlist() {
                this.$router.push("/exten/memberlist");//
            },
            _spdresultall() {
                this.$router.push("/exten/spdresultall");//
            },
            _spdpaybacklist() {
                this.$router.push("/exten/spdpaybacklist");//
            },
        },
    };
</script>
