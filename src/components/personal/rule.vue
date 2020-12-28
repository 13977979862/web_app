<template>
    <div class="rule">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p class="title" id="title">游戏规则</p>
            </div>
        </header>
        <!---->
        <main style="margin-top: 4.5rem;">
            <div>
                <div class="tips-charge" style="margin:-1px 0 0 0;">
                    <img src="../../../static/img/tupian/tips.png" style="max-width:3.0rem;">
                    <p>1. 请选择要查看的游戏规则<br>2. 规则研究透了会让收益翻倍哦^_^</p>
                </div>
                <!--结果-->
                <section>
                    <div class="f_div">
                        <table class="f_table" cellpadding="0" cellspacing="0" style="width: 95%; margin: auto;">
                            <tbody>
                                <tr>
                                    <td>
                                        <select id="lottery_type" v-model="type" class="_ruleform" @change="_selectdate($event)">
                                            <option :value="item.id" v-for="(item,index) in lottery">{{item.title}}</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!---->
                    <div class="f_div">
                        <div v-html="content" class="f_div_html"></div>
                    </div>
                </section>
            </div>
            <!---->
        </main>
        <bottomnav :type="3"></bottomnav>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomnav from "../bottmnav/bottomnav";

    export default {
        filters: {},//过滤器
        components: {
            bottomnav
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created() {
        },
        data() {
            return {
                lottery: [],
                type: 81,
                content: "",
            };
        },
        mounted() {
            if(this.$route.params.gameid) {
                this.type = this.$route.params.gameid;
            }
            this._getrulelist();
            this._getrule();
        },
        methods: {
            _getrulelist() {//获取所有彩种列表
                this.lottery = JSON.parse(localStorage.getItem("lotterylist"));
            },
            _getrule() {
                var _data = {
                    type: this.type
                };
                $api.$other('api/user/played_rule', _data).then((res) => {
                    this.content = res.data.data[0].content;
                });
            },
            _selectdate(val) {
                this.type = val.target.value;
                this._getrule();
            },
        },
    };
</script>
