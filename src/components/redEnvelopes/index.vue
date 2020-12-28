<template>
	<div>
		<header class="top">
			<div class="backPage iconfont icon-jiantou-copy" onclick="window.history.back(-1);"></div>
			<span class="title">抢红包</span>
		</header>
		<div class="content">
			<!-- <img style="margin-top: 4.5rem;" src="../../../static/img/redEnvelopes/beijingdi.jpg" alt=""> -->
			<div class="content-top">
				<span class="redenvelopes-text" v-if="dateTime !== '00:00'">红包倒计时:</span>
				<span class="redenvelopes-text" v-else>正在抢红包:</span>
				<span class="redenvelopes-time">{{dateTime}}</span>
			</div>
			<div :class="{redenvelopes:redenvelopesState,setRedenvelopes:!redenvelopesState}">
				<img :class="{hideRedenvelopes:!redenvelopesState}" @click="startRedenvelopes" v-show="qualificationsState" style="width: 42%;margin-top: 32vh;"
				 src="../../../static/img/redEnvelopes/msqhb_01.png" alt="">
				<img :class="{hideRedenvelopes:!redenvelopesState}" v-show="!qualificationsState" style="width: 42%;margin-top: 32vh;"
				 src="../../../static/img/redEnvelopes/msqhb_02.png" alt="">
				 <span v-show="!redenvelopesState" style="display: inherit;position: absolute;top: 20.4vh;width: 100%;color: #FF5050;font-size: 24px;">{{getMoeny}}元</span>
				<div style="position: absolute;top: 60%;left: 0;width:100%;font-size: 18px;">
					<img @click="showRecord" style="width: 120px;" src="../../../static/img/redEnvelopes/qhbnn_01.png" alt="">
					<div v-if="recordList.length != 0" style="position: absolute;bottom: 36px;left: 0;width:100%;font-size: 18px;">
						<div class="record">
							<div class="record-content">
								<span><img src="../../../static/img/redEnvelopes/shijian_01.png" alt=""></span>
								<span><img src="../../../static/img/redEnvelopes/shijian_02.png" alt=""></span>
							</div>
							<div class="record-content" v-for="(item,index) in recordList" :key="index">
								<span>{{item.time}}</span>
								<span>{{item.coin}}</span>
							</div>
							<div>
								<p style="padding-top: 4px;color: #F0BE0A;">只显示最近12条记录</p>
								
								<div>
									<img @click="closeRecord" style="width: 80px;" src="../../../static/img/redEnvelopes/qhbnn_02.png"></img>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="clear: both;"></div>
				<div class="guizhe" style="text-align: left;color: #fff;font-size: 12px;margin-top: 28%;position: absolute;width: 100%;">
					<p style="padding-top: 6px;">抢红包规则简介:</p>
					<p>1、每次整点抢一次，一天24次；</p>
					<p>2、每次抢红包限时为5分钟，过时无法再抢；</p>
					<p>3、抢红包的门槛是过去1小时内至少有流水100元；</p>
					<p style="padding-bottom: 6px;">4、非正常投注者，将会被取消抢红包活动！</p>
				</div>
				<!-- <img style="width: 58%;" src="../../../static/img/redEnvelopes/honbao_02.png" alt=""> -->
				<!-- 
				 -->
			</div>
		</div>
		<bottomnav :indexsum="3"></bottomnav>
	</div>
</template>

<script>
	import bottomnav from "../../components/bottmnav/bottomnav";

	export default {
		components: {
			bottomnav
		},
		data() {
			return {
				qualificationsState: true, //资格状态
				redenvelopesState: true, //红包状态
				dateTime: '00:00',
				getMoeny: 0,
				clearNum: 0,
				timeState: true,
				recordList: [],
				recordStatus: false,
			};
		},
		mounted() {
			this.getPageData();
		},
		methods: {
			startRedenvelopes() { //抢红包
				//this.timeState = false;
				if(this.timeState)//3秒才能点一次
				{
					this.timeState = false;
					setTimeout(() => {
						this.timeState = true;
					},3000)
					if(this.dateTime != "00:00")
					{
						layer.open({
							content: '时间未到，请稍后重试！',
							btn: '确定',
							shadeClose: false,
							yes: function(index) {
								layer.closeAll('loading');//关闭loading
							}
						});
						return;
					}
					$api.$post('Api/gift/grabGift').then((res) => {
						//alert(res.msg + res.data)
						this.getMoeny = res.data.data;
						this.redenvelopesState = false;
					});
				}
			},
			async getPageData() {//获取页面基本数据
				let dateNum = await $api.$post('api/ajax/getTime').then((res) => {
					return res.data.data.time3;
				});
				let dateTimeArr = dateNum.split(" ")[1].split(":").map(n => {
					return Number(n);
				});
				if(dateTimeArr[1] > 4)
				{
					let minute,second;
					if(dateTimeArr[2] == 0)
						minute = 60 - dateTimeArr[1] + "";
					else
						minute = 60 - dateTimeArr[1] - 1 + "";
					second = 60 - dateTimeArr[2] + "";
					if(minute < 10)
					{
						minute = 0 + minute;
					}
					if(second < 10)
					{
						second = 0 + second;
					}
					let dateTime = minute + ":" + second;
					this.dateTime = dateTime;
					let timeInter = setInterval(() => {
						let dateTimeArr = dateTime.split(":").map(n => { return Number(n); });
						if(dateTimeArr[1] == 0)
						{
							if(dateTimeArr[0] != 0)
							{
								dateTimeArr[0] = dateTimeArr[0] - 1;
								dateTimeArr[1] = 59;
							}else
							{
								if(this.clearNum > 300)
								{
									clearInterval(timeInter);
									this.clearNum = 0;
									this.redenvelopesState = true;
									this.getMoeny = 0;
									this.getPageData();
								}else
								{
									this.clearNum ++;
								}
								//clearInterval(timeInter);
							}
						}else
						{
							dateTimeArr[1] --;
						}
						if(dateTimeArr[0] < 10)
						{
							dateTimeArr[0] = "0" + dateTimeArr[0];
						}
						if(dateTimeArr[1] < 10)
						{
							dateTimeArr[1] = "0" + dateTimeArr[1];
						}
						dateTime = dateTimeArr[0] + ":" + dateTimeArr[1];
						this.dateTime = dateTime;
					},1000)
				}
				
				
				 
			},
			formatDateTime(time, format) {//时间格式化
				var t = new Date(time);
				var tf = function(i) {
					return (i < 10 ? '0' : '') + i
				};
				return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
					switch (a) {
						case 'yyyy':
							return tf(t.getFullYear());
							break;
						case 'MM':
							return tf(t.getMonth() + 1);
							break;
						case 'mm':
							return tf(t.getMinutes());
							break;
						case 'dd':
							return tf(t.getDate());
							break;
						case 'HH':
							return tf(t.getHours());
							break;
						case 'ss':
							return tf(t.getSeconds());
							break;
					}
				})
			},
			showRecord() {//显示红包记录
				if(this.recordStatus)
				{
					this.recordStatus = false;
					this.recordList = [];
					return;
				}
				$api.$post('Api/Gift/gift_history').then((res) => {
					let resData = res.data;
					this.recordList = resData.data;
					this.recordStatus = true;
					if(this.recordList.length == 0)
					{
						layer.open({
						    content: '暂时没有红包记录!',
						    btn: '确定',
						    shadeClose: false,
						    yes: function(index) {
						        layer.closeAll('loading');//关闭loading
						    }
						});
						this.recordStatus = false;
					}
				});
			},
			closeRecord() {
				this.recordStatus = false;
				this.recordList = [];
			}
		},
	};
</script>

<style scoped="scoped">
	.title {
		font-size: 1.3rem;
		color: #fff;
		letter-spacing: 1px;
	}

	.icon-jiantou-copy:before {
		content: "\E607";
	}

	.backPage {
		position: absolute;
		left: 0;
		top: 0;
		width: 2.5rem;
		font-size: 16px;
		color: #ffffff;
	}

	.content {
		position: fixed;
		height: 100vh;
		max-width: 640px;
		width: 100vw;
		margin-top: 4.5rem;
		margin-bottom: 5rem;
		background: url(../../../static/img/redEnvelopes/beijingdi.jpg) no-repeat;
		background-size: 100% 84.1%;
	}

	.content-top {
		position: relative;
		height: 4.3rem;
		line-height: 4.3rem;
		text-align: left;
		padding-left: 5.4rem;
	}

	.redenvelopes-text {
		color: #FFD200;
		-webkit-text-stroke: .4px #B40000;
		font-size: 16px;
	}

	.redenvelopes-time {
		color: #FFFFFF;
		font-size: 22px;
		letter-spacing: 2px;
		-webkit-text-stroke: .4px red;
	}

	.redenvelopes {
		height: 77%;
		background: url(../../../static/img/redEnvelopes/honbao_02.png) no-repeat;
		background-size: 55% 65%;
		background-position: center 15%;
		position: relative;
	}

	.setRedenvelopes {
		height: 77%;
		background: url(../../../static/img/redEnvelopes/honbao_01.png) no-repeat;
		background-size: 55% 65%;
		background-position: center 15%;
	}

	.hideRedenvelopes {
		visibility: hidden;
	}
	.record {
		width: 50%;
		background-color: #FFDFB4;
		margin: auto;
		padding: 5px;
		font-size: 12px;
	}
	.record-content {
		border-bottom: 1px solid #F0DC6E;
	}
	.record-content>span {
		display: inline-block;
		height: 22px;
		line-height: 22px;
	}
	.record-content>span:first-child {
		width: 56%;
	}
	.record-content>span:last-child {
		width: 38%;
		color: #FF393F;
	}
	.record-content>span>img {
		width: 32px;
	}
	.guizhe>p{
			width: 80%;
			margin: auto;
			padding-left: 4%;
			background: rgba(0,0,0,0.2);
	}
	@media screen and (min-width: 650px) {
		.content {
			position: fixed;
			height: 100vh;
			max-width: 640px;
			width: 100vw;
			margin-top: 4.5rem;
			margin-bottom: 5rem;
			background: url(../../../static/img/redEnvelopes/beijingdi.jpg) no-repeat;
			background-size: 100% 88%;
		}
	}
	/* .redenvelopes>img:first-child {
		position: absolute;
		left: 23%;
	} */
	/* .redenvelopes>img:last-child {
		position: absolute;
		left: 29%;
		top: 30vh;
	}
	.redenvelopes>div {
		position: absolute;
		top: 50vh;
	} */
</style>
