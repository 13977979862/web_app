<template>
    <div class="class">
        <header class="top">
            <div class="inner"><span onclick="history.back();" class="iconfont icon-fanhui cw"></span>
                <p id="title" class="title">{{titles}}</p></div>
        </header>
        <!--主题渲染-->
        <div class="game-bodys">
            <div class="game-counts" v-for="(item,index) in gameList" @click="_playGame(game_id, index)">
                <span class="game-img">
                    <img :src="item.thumb" alt="">
                </span>
                <span class="game-title">{{item.title}}</span>
            </div>
			<!-- <div v-if="game_id == 1068" v-for="(item,index) in gameList">
				<h2 style="padding: 0 2rem; padding-top: 1rem;">{{item.title}}</h2>
				<div class="game-counts" v-for="(itemC,indexC) in item.data" @click="_playGame(game_id, index, indexC)">
				    <span class="game-img">
				        <img :src="itemC.thumb" alt="">
				    </span>
				    <span class="game-title">{{itemC.title}}</span>
				</div>
				<div style="clear: both;"></div>
			</div> -->
        </div>
        <!--棋牌游戏(pc和web)-->
        <div class="_playgame" v-if="GameOline">
            <span class='_ifclose' v-if="GameOline2"
                @mousedown="_mouseDragDown"
                @mouseup='_mouseDragUp'
                @touchstart="_DragStart"
                @touchmove="_DragMove"
                @touchend="_DragEnd"></span>
            <div class="_gamedangban" v-if="gameCenter">
                <div class="_gameCenter">
                    <div class="_gamehead">我的钱包<p @click="_gameCancer">+</p></div>
                    <div class="_gameflex">
                        <div class="_gameflex1">
                            <span class="user-name-money">
                                <b>{{username}}</b>
                                <b>可用余额：</b>
                                <b class="useMoney">----</b>
                            </span>
                            <span class="refresh-money" style="font-size: 1rem;">
                                <b class="_checkThis iconfont icon-shuaxin" @click="_refreshMoney">余额刷新</b>
                            </span>
                            <span>
                                <p @click="_chongzhiTuifen(0)" :class="{'_checkThis': chong_tui == 0}">充值</p>
                            </span>
                            <span>
                                <p @click="_chongzhiTuifen(1)" :class="{'_checkThis': chong_tui == 1}">退分</p>
                            </span>
                        </div>
                        <!--充值-->
                        <div class="_gameflex2" v-if="chong_tui == 0">
                            <span class="_g2flex1">金额游戏币转化率 1 : 1 <br>(1人民币相当于1游戏币)</span>
                            <span class="_g2flex2 _gameMoney">
                                <p>充值金额:</p>
                                <input type="number" @keyup="_showMoney($event)" class="_gameValue" placeholder="输入金额!" value="10"> 元
                            </span>
                            <span class="_g2flex3">
                                <ul>
                                    <li v-for="(item,index) in MoneyArr">
                                        <p @click="_gameCheckMoney(item,index)" :class="{'_actThis': index_money == index}">{{item}}</p>
                                    </li>
                                </ul>
                            </span>
                        </div>
                        <!--退分-->
                        <div class="_gameflex2" v-if="chong_tui == 1">
                            <span class="_g2flex1">金额游戏币转化率 1 : 1 <br>(1人民币相当于1游戏币)</span>
                            <span class="_g2flex2 _gameMoney">
                                <p>退分点数:</p>
                                <input type="number" @keyup="_showMoney($event)" class="_gameValue" placeholder="输入退分点!"> 点
                            </span>
                        </div>
                        <!---->
                        <div class="_gameflex3">
                            <span class="_g3flex1">
                                <p @click="_outGame">退出游戏</p>
                            </span>
                            <span class="_g3flex2">
                                <p @click="_gameCancer">取消</p>
                            </span>
                            <span class="_g3flex3">
                                <p @click="_gameChongTui">确定</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <iframe class="_iframes" :src="iframUrl" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                game_id: "",
                gameList: [],
                titles: "",
                username: '',
                iframUrl: "",
                MoneyArr: [10, 50, 100, 200, 500, 1000],
                GameOline: false,//棋牌游戏
                GameOline2: false,//棋牌中心
                gameCenter: false,//棋牌游戏(我的钱包)
                chong_tui: 0,//0是代表充值,1代表退分
                index_money: 0,//选择金额li的下标
                coordinate: {},//坐标
                touchTime: {
                    startT: 0,//开始时间
                    endT: 0,//结束时间
                    touchT: 300,//判定是否点击的时间
                    isClick: false,//滑动过程是否为点击
                },
            };//自定义变量
        },
		activated() {
		    this.coin = localStorage.getItem("coin");
		},
        mounted() {
            var _par = window.location.hash.split("=")[1].split("&ok");
            var _id = _par[0];
            var _index = _par[1];
            if(!_id || !_index) {
                this.$router.push('/');
            }
            this.username = localStorage.getItem("username");
            this.game_id = _id;
            var _gl = JSON.parse(localStorage.getItem("Esports"));
			let uData = JSON.parse(localStorage.getItem("funkData"))
            for(var i = 0; i < _gl.length; i++) {
				if(this.game_id == "1068") {
					//_gl[i].gid == 
					if(_gl[i].game_id == this.game_id && _gl[i].gid == uData.gid) {
					    this.gameList = _gl[i].data;
					    this.titles = _gl[i].title;
					}
				}else {
					if(_gl[i].game_id == this.game_id) {
					    this.gameList = _gl[i].data;
					    this.titles = _gl[i].title;
					}
				}
                
            }
            this.lister_H_S();
            window.onresize = () => {//监听这个变化
                this.lister_H_S();
            };
            if(_index == 2) {
                this._playGame(this.game_id);
            }
        },
        methods: {
            lister_H_S() {
                var clientWidth = null;
                var clientHeight = null;
                var myWallet = document.querySelector("._ifclose");
                var myDialog = document.querySelector("._gameCenter");
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
                    clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    if((clientWidth / clientHeight) <= 1) {
                        if(myWallet) {
                            myWallet.style.cssText = `top:60%;right:1.5rem;transform:rotate(90deg);`;
                        }
                        if(myDialog) {
                            myDialog.style.cssText = `width:${clientHeight * 0.8}px;height:${clientWidth * 0.8}px;
                            transform:translate(-50%,-50%) rotate(90deg);`;
                        }
                    } else {//(横屏)
                        if(myWallet) {
                            myWallet.style.cssText = "top:0.8rem;left:60%;transform:rotate(0);";
                        }
                        if(myDialog) {
                            myDialog.style.cssText = `width:${clientWidth * 0.8}px;height:${clientHeight * 0.8}px;
                            transform:translate(-50%,-50%) rotate(0);`;
                        }
                    }
                } else {
                    if(myWallet) {
                        myWallet.style.cssText = `top:40px;left:60%;transform:rotate(0) scale(2);`;
                    }
                    if(myDialog) {//存在
                        clientWidth = 667;
                        clientHeight = 375;
                        myDialog.style.cssText = `width:${clientWidth * 0.8}px;height:${clientHeight * 0.8}px;
                            transform:translate(-50%,-50%) rotate(0) scale(2);`;
                    }
                }
            },
            _playGame(game_id, index, indexc) {//开启游戏
                if(!localStorage.getItem("sessionkey")) {
                    this.gotologin("必须登录才能玩游戏!");
                    return false;
                } else {//登录之后
					let params = {
						game_id: game_id,
						gameCode: this.gameList[index].gameCode
					}
                    $api.$post('/api/game/login', params).then((res) => {
                        this.chong_tui = 0;
                        this.GameOline = true;
						if(this.game_id === '1069') {
							location.href = res.data.data;
							return;
						}
						this.iframUrl = res.data.data + "&joinGamePlay";
                        var _setOut = null;
                        clearTimeout(_setOut);
                        _setOut = setTimeout(() => {
                            this.GameOline2 = true;
                            this.$nextTick(() => {
                                this.lister_H_S();//初始化
                            });
                        }, 4000);
                    });
                }
            },
            _mouseDragDown(ev1) {//鼠标移动事件
                var _this = this;
                var event1 = ev1 || window.event;
                var _target = event1.target;
                var startx = event1.clientX;
                var starty = event1.clientY;
                var sb_bkx = startx - event1.target.offsetLeft;
                var sb_bky = starty - event1.target.offsetTop;
                var ww = document.documentElement.clientWidth;
                var wh = window.innerHeight;
                if(event1.preventDefault) {
                    event1.preventDefault();
                } else {
                    event1.returnValue = false;
                }
                this.touchTime.startT = parseInt(new Date().getTime(), 10);
                document.onmousemove = function(ev2) {
                    var event2 = ev2 || window.event;
                    if(event2.clientY < 0 || event2.clientX < 0 || event2.clientY > wh || event2.clientX > ww) {
                        return false;
                    }
                    var endx = event2.clientX - sb_bkx;
                    var endy = event2.clientY - sb_bky;
                    _target.style.left = endx + 'px';
                    _target.style.top = endy + 'px';
                    _this.touchTime.isClick = true;
                };
            },
            _mouseDragUp(event) {
                document.onmousemove = null;
                this.touchTime.endT = parseInt(new Date().getTime(), 10);
                var _c = this.touchTime.endT - this.touchTime.startT;
                if(_c <= this.touchTime.touchT && this.touchTime.isClick == false) {//超过点击触发的时间300毫秒
                    this._showGameCenter();
                }
                this.touchTime.isClick = false;
            },
            _DragStart(e) {
                e.preventDefault();
                var ev = e || window.event;
                var touch = ev.targetTouches[0];
                this.coordinate.oL = touch.clientX - ev.target.offsetLeft;
                this.coordinate.oT = touch.clientY - ev.target.offsetTop;
                this.touchTime.startT = parseInt(new Date().getTime(), 10);
            },
            _DragMove(e) {
                e.preventDefault();
                var ev = e || window.event;
                var touch = ev.targetTouches[0];
                var oLeft = touch.clientX - this.coordinate.oL;
                var oTop = touch.clientY - this.coordinate.oT;
                var _w = document.documentElement.scrollWidth || document.body.scrollWidth;
                var _h = document.documentElement.scrollHeight || document.body.scrollHeight;
                var _divW = document.querySelector("._ifclose").offsetWidth;
                if(oLeft < 0) {
                    oLeft = 0;
                } else if(oLeft >= (_w - _divW)) {
                    oLeft = (_w - _divW);
                }
                if(oTop < 0) {
                    oTop = 0;
                } else if(oTop >= (_h - _divW)) {
                    oTop = (_h - _divW);
                }
                ev.target.style.left = oLeft + 'px';
                ev.target.style.top = oTop + 'px';
                this.touchTime.isClick = true;
            },
            _DragEnd(e) {
                this.touchTime.endT = parseInt(new Date().getTime(), 10);
                var _c = this.touchTime.endT - this.touchTime.startT;
                e.preventDefault();
                if(_c <= this.touchTime.touchT && this.touchTime.isClick == false) {//超过点击触发的时间300毫秒
                    this._showGameCenter();
                }
                this.touchTime.isClick = false;
            },
            _showGameCenter() {//点击我的钱包按钮
                this.chong_tui = 0;
                this.index_money = 0;
                this.gameCenter = true;//显示弹框
                this.$nextTick(() => {
                    document.querySelector(".useMoney").innerHTML = localStorage.getItem("coin");//显示金额
                    this.lister_H_S();
                });
            },
            _chongzhiTuifen(val) {//选择充值或者退分
                this.chong_tui = val;
                this.index_money = 0;
                document.querySelector("._gameValue").value = 100;//回复默认值
            },
            _gameCancer() {//取消关闭我的钱包
                this.gameCenter = false;
            },
            _gameCheckMoney(item, _index) {//选择充值金额
                document.querySelector("._gameValue").value = item;
                this.index_money = _index;
            },
            _showMoney(obj) {//只能显示一个小数点且只能输入数字
                obj.target.value = obj.target.value.replace(/[^\d.]/g, ""); //先把非数字的都替换掉，除了数字和.
                obj.target.value = obj.target.value.replace(/^\./g, ""); //必须保证第一个为数字而不是.
                obj.target.value = obj.target.value.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
                obj.target.value = obj.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //保证.只出现一次，而不能出现两次以上
            },
            _gameChongTui() {//充值或者退分
                var _coin = document.querySelector("._gameValue").value;//input的金额
                var _hCoin = localStorage.getItem("coin");
                if(Number(_coin) <= 0) {//金额不能小于0
                    this.plainalert('金额不能小于0!');
                    return false;
                }
                if(this.chong_tui == 0) {//充值
                    $api.$post('/api/game/up_coin', {coin: _coin, game_id: this.game_id}).then((res) => {//上分成功
                        localStorage.setItem("coin", (Number(_hCoin) - Number(_coin)).toFixed(2));
                        this.gameCenter = false;
                        this.coin = localStorage.getItem("coin");
                        this.infotips('上分成功!');//信息提示弹框
                    });
                } else {//退分
                    $api.$post('/api/game/down_coin', {coin: _coin, game_id: this.game_id}).then((res) => {
                        localStorage.setItem("coin", (Number(_hCoin) + Number(_coin)).toFixed(2));
                        this.gameCenter = false;
                        this.coin = localStorage.getItem("coin");
                        this.infotips('退分成功!');//信息提示弹框
                    });
                }
            },
            _refreshMoney() {
                $api.$post('Api/User/ucenter').then((res) => {
                    this.coin = res.data.data.coin;
                    localStorage.setItem("coin", res.data.data.coin);
                });
            },
            _outGame() {//退出游戏
				if(this.game_id === '1068') {
					this.GameOline = false;
					this.GameOline2 = false;
					this.iframUrl = false;
					this.gameCenter = false;
					alert("退出棋牌游戏");
				}else {
					$api.$post('/api/game/login_out', {game_id: this.game_id}).then((res) => {
					    this.GameOline = false;
					    this.GameOline2 = false;
					    this.iframUrl = false;
					    this.gameCenter = false;
					    alert("退出棋牌游戏");
					});
				}
                
            },
        },//方法调用
        beforeDestroy() {
            window.onresize = () => {
                return false;
            };
        },
    };
</script>
<style>
    .user-name-money {
        flex: 0 0 26%;
    }
    .refresh-money {
        flex: 0 0 10%;
    }
    .user-name-money {
        display: flex;
        flex-direction: column;
    }
    .user-name-money b {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .refresh-money b {
        font-size: 0.9rem;
        background: linear-gradient(#fafdfd, #cdcdcd);
        color: #464646;
        padding: 0.25rem 1rem;
        border-radius: 1.1rem;
        box-shadow: 1px 1px 3px 0 #5a4949;
        font-weight: 700;
    }
</style>
