<template>
    <div class="class">
        <header class="top">
            <div class="inner"><span onclick="history.back();" class="iconfont icon-fanhui cw"></span>
                <p id="title" class="title">额度转换(账户余额{{coin}}元)</p></div>
        </header>
        <!--主题渲染-->
        <div class="game-recharge">
            <div class="game-recharge-flex" v-for="(item,index) in gameList">
                <div class="game-recharge-img">
                    <img :src="item.pic" alt="404" @click="_GameDetails(item,1)">
                </div>
                <div class="game-recharge-div">
                    <div class="game-recharge-head">
                        <div class="game-recharge-title">{{item.title}}</div>
                        <div class="game-recharge-money">余额 ：<b style="color:#f00000;font-weight: 700;">{{item.coin}}</b></div>
                    </div>
                    <div class="game-recharge-body">
                        <div class="game-recharge-icon" @click="_chooseMoney(item,20)">
                            <img src="../../static/img/moneyIcon/20.png" alt="">
                        </div>
                        <div class="game-recharge-icon" @click="_chooseMoney(item,50)">
                            <img src="../../static/img/moneyIcon/50.png" alt="">
                        </div>
                        <div class="game-recharge-icon" @click="_chooseMoney(item,100)">
                            <img src="../../static/img/moneyIcon/100.png" alt="">
                        </div>
                        <div class="game-recharge-icon" @click="_chooseMoney(item,200)">
                            <img src="../../static/img/moneyIcon/200.png" alt="">
                        </div>
                        <div class="game-recharge-icon" @click="_chooseMoney(item,500)">
                            <img src="../../static/img/moneyIcon/500.png" alt="">
                        </div>
                        <!--<div class="game-recharge-icon" @click="_chooseMoney(item,1000)">-->
                        <!--<img src="../../static/img/moneyIcon/1000.png" alt="">-->
                        <!--</div>-->
                    </div>
                    <div class="game-recharge-input">
                        <span>上分/退分金额 ：</span>
                        <input class="_moninput" type="tel" :id="'gamerId'+item.id" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')">
                    </div>
                    <div class="game-recharge-footer">
                        <span class="rechargeScoreOut" @click="_rechargeScoreOut(item)">退分</span>
                        <span class="rechargeScoreIn" @click="_rechargeScoreIn(item)">上分</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                gameList: [],
                coin: "",
            };
        },
		activated() {
		    this.coin = localStorage.getItem("coin");
		},
        mounted() {
            var _this = this;
            //this.coin = localStorage.getItem("coin");
            this._rechargeList();
            window.onresize = () => {
                _this._sOnresize();
            };
        },
        methods: {
            _rechargeList() {
                $api.$post('/api/ajax/show_user_coin').then((res) => {
                    this.gameList = res.data.data;
                    this.$nextTick(()=>{
                        this._sOnresize();
                    })
                });
            },
            _sOnresize() {
                var _w = document.documentElement.scrollWidth || document.body.scrollWidth;
                var _dom = document.querySelectorAll(".game-recharge-icon");
                if(_w <= 320) {
                    for(var i = 0; i < _dom.length; i++) {
                        _dom[i].style.width = '2.25rem';
                    }
                } else {
                    for(var i = 0; i < _dom.length; i++) {
                        _dom[i].style.width = '3rem';
                    }
                }
            },
            _GameDetails(item, _index) {//电子竞技游戏界面
                this.$router.push('/computerGame?gameid=' + item.id + "&ok" + _index);
            },
            _chooseMoney(item, _money) {
                document.getElementById("gamerId" + item.id).value = _money;
            },
            _rechargeScoreIn(item) {//上分
                var _hCoin = localStorage.getItem("coin");
                var _coin = document.getElementById("gamerId" + item.id).value;
                if(!_coin || Number(_coin) <= 0) {
                    this.infotips("上分金额不能小于0");
                    return false;
                }
                if(Number(_coin) > Number(_hCoin)) {
                    this.infotips("超出你现有金额总数!");
                    return false;
                }
                $api.$post('/api/game/up_coin', {coin: _coin, game_id: item.id}).then((res) => {//上分成功
                    localStorage.setItem("coin", (Number(_hCoin) - Number(_coin)).toFixed(2) );
                    this._rechargeList();//刷新页面
                    this.infotips('上分成功!');//信息提示弹框
                    this.coin = localStorage.getItem("coin");
                    document.getElementById("gamerId" + item.id).value = '';
                });
            },
            _rechargeScoreOut(item) {//下分
                var _hCoin = localStorage.getItem("coin");
                var _coin = document.getElementById("gamerId" + item.id).value;
                if(!_coin || Number(_coin) <= 0) {
                    this.infotips("退分点数不能小于0");
                    return false;
                }
                if(Number(_coin) > Number(item.coin)) {
                    this.infotips("棋牌点数不够退分!");
                    return false;
                }
                $api.$post('/api/game/down_coin', {coin: _coin, game_id: item.id}).then((res) => {
                    localStorage.setItem("coin", (Number(_hCoin) + Number(_coin)).toFixed(2) );
                    this._rechargeList();//刷新页面
                    this.infotips('退分成功!');//信息提示弹框
                    this.coin = localStorage.getItem("coin");
                    document.getElementById("gamerId" + item.id).value = '';
                });
            }
        },
        beforeDestroy() {//离开路由清除定时器(在main公用方法function)
            window.onresize = () => {
                return false;
            };
        },
    };
</script>



