<template>
    <div class="bottomexten">
        <div class="bfooter1">
            <ul class="bflex-box">
                <li class="bflex" @click="_home" :class="{'act': 0 == indexsum }">
                    <i class="iconfont icon-shouye" :class="{'act': 0 == indexsum }"></i>
                    <p>投注大厅</p>
                </li>
                <li class="bflex" @click="_sumresults" :class="{'act': 1 == indexsum }">
                    <i style="font-size: 2.05rem;" class="iconfont icon-jiangbei" :class="{'act': 1 == indexsum }"></i>
                    <p>开奖结果</p>
                </li>
				<li class="bflex"  @click="goAnalysis"  v-if="analysisStatus == 1" :class="{'act': 4 == indexsum }">
				    <i class="iconfont icon-shujubaobiao" style="font-weight: 900;" :class="{'act': 1 == indexsum }"></i>
				    <p>数据分析</p>
				</li>
                <li class="bflex" @click="_onlineservice" :class="{'act': 2 == indexsum }">
                    <i class="iconfont icon-wodekefu" :class="{'act': 2 == indexsum }"></i>
                    <p id="kf">
                        <font color="#DC174C">在</font>
                        <font color="#CC33FF">线</font>
                        <font color="#c23f1f">客</font>
                        <font color="#3333FF">服</font>
                    </p>
                </li>
                <li class="bflex" @click="_personalcenter" :class="{'act': 3 == indexsum }">
                    <i class="iconfont icon-huiyuan" :class="{'act': 3 == indexsum }"></i>
                    <p>个人中心</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        filters: {},//过滤器
        components: {},//组件注册
        computed: {},//计算属性
        props: {
            indexsum: {
                type: Number,
            }
        },
        created() {
        },
        data() {
            return {
				analysisStatus: 0,
			};
        },
        mounted() {
            this._movekf();
			this.getDataAnalysis();
        },
        methods: {
            _movekf() {
                clearInterval(window._runcolor);
                var ic = 0;
                function Dcolor() {
                    var Tname = "在线客服";
                    var Tlen = Tname.length;
                    if(!document.getElementById('kf')) {//不存在节点就不显示
                        return;
                    }
                    var kf = document.getElementById('kf');
                    kf.innerHTML = Tname;
                    var col = new Array("#c23f1f", "#3333FF", "#ffb400", "#DC174C", "#DC174C", "#CC33FF");
                    var Strname = "";
                    for(var i = 0; i < Tlen; ++i) {
                        Strname += "<font color=" + col[ic] + ">" + Tname.substring(i, i + 1) + "</font>";
                        ic = ic + 1;
                        if(ic == col.length) ic = 0;
                    }
                    kf.innerHTML = Strname;
                }
                Dcolor();
                window._runcolor = setInterval(() => {
                    Dcolor();
                }, 400);
            },
            _home() {
                this.$router.push("/");
            },
            _sumresults() {
                this.$router.push("/sumresults");
            },
            _onlineservice() {
                window.location.href = localStorage.getItem("kf");
            },
            _personalcenter() {
                this.$router.push("/personalcenter");
            },
			getDataAnalysis() {//获取数据分析权限
				///Api/Zixun/enable
				$api.$post('Api/Zixun/enable').then((res) => {
					this.analysisStatus = res.data.data;
				});
			},
			goAnalysis() {//跳转数据分析页面
				this.$router.push("/consultation/index");
			}
        },
        destroyed() {
            clearInterval(window._runcolor);
        }
    };
</script>
