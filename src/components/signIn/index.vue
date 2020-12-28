<template>
	<div id="body-content">
		<header class="top">
			<div class="backPage iconfont icon-jiantou-copy" onclick="window.history.back(-1);"></div>
			<span class="title">签到活动</span>
		</header>
		<main class="body">
			<div class="sign-info">
				<img v-if="setCardData != null && setCardData.isSignToday == 1" style="width: 40%;margin-top: 5%;" src="../../../static/img/signIn/jryqdcg_01.png" alt="">
				<img v-else style="width: 40%;margin-top: 5%;" src="../../../static/img/signIn/jryqdcg_02.png" alt="">
			</div>
			<div class="sign-container">
				<div class="img-sing-img" v-for="(item,index) in signCardData">
					<span class="sing-card-span">
						<!-- <img src="../../../static/img/signIn/baoxiang3.jpg" alt=""> -->
						<img src="../../../static/img/signIn/qdddkang_01.png" alt="">
						<img class="baoxiang" v-if="setCardData != null && (index + 1) <= setCardData.numberOfContinuouslySign" style="position: absolute;top: 28px;width: 60%;left: 20%;" src="../../../static/img/signIn/yiqiandao_02.png" alt="">
						<img class="baoxiang" v-else style="position: absolute;top: 28px;width: 60%;left: 20%;" src="../../../static/img/signIn/yiqiandao_01.png" alt="">
						<div class="text-top">第{{index + 1}}天</div>
						<div class="sing-bg" v-if="setCardData != null && (index + 1) <= setCardData.numberOfContinuouslySign"> 
							<span class="yi-qian-dao">已签到</span>
						</div>
						<div v-if="setCardData != null && (index + 1) <= setCardData.numberOfContinuouslySign" class="text-bottom">（+{{setCardData.records[index].money}}元）</div>
						<div v-else class="text-bottom">未签到</div>
					</span>
					<!-- <span class="has-sing" v-if="setCardData != null && (index + 1) <= setCardData.numberOfContinuouslySign">奖励 ({{setCardData.records[index].money}})</span>
					<span class="has-sing" v-else v-text="item"></span> -->
				</div>
				<!-- <div class="img-7-big">
					<span class="sing-card-span">
						<img src="../../../static/img/signIn/baoxiang3.jpg" alt="">
						<div class="sing-bg" v-if="setCardData != null && setCardData.numberOfContinuouslySign == 7"> 
							<span class="sing-yes-span iconfont icon-gouxuan1"></span> 
							<span class="yi-qian-dao">已签到</span>
						</div>
					</span>
					<span class="has-sing" v-if="setCardData != null && setCardData.numberOfContinuouslySign == 7">奖励 ({{setCardData.records[6].money}})</span>
					<span class="has-sing" v-else>第7天签到奖励</span>
				</div> -->
				<div class="awards-bottom-div">
					<!-- <span class="awards-msg">连续签到7天，可获大金额奖励！</span> -->
					<div class="awards-money">
						<span @click="getReward" class="awards-money-span">
							<img src="../../../static/img/signIn/dianjqiandao_01.png" alt="">
						</span> 
					</div>
				</div>
			</div>
		</main>
		<bottomnav :indexsum="3"></bottomnav>
	</div>
</template>

<script>
	import bottomnav from "../../components/bottmnav/bottomnav";


	export default {
		components: {
			bottomnav
		}, //组件注册
		data() {
			return {
				signCardData: [
					'第1天签到奖励',
					'第2天签到奖励',
					'第3天签到奖励',
					'第4天签到奖励',
					'第5天签到奖励',
					'第6天签到奖励',
					'第7天签到奖励',
				],
				setCardData: null,
			};
		},
		mounted() {
			this.getSignCard();
		},
		methods: {
			getReward() { //领取奖励
				$api.$post('Api/Sign/signIn').then((res) => {
					this.getSignCard();
				});

			},
			getSignCard() { //获取已签到天数
				$api.$post('Api/Sign/signCardRecord').then((res) => {
					let resData = res.data;
					this.setCardData = resData.data;
				});
			}
		},
	};
</script>

<style scoped="scoped">
	.backPage {
		position: absolute;
		left: 0;
		top: 0;
		width: 2.5rem;
		font-size: 1rem;
		color: #ffffff;
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.title {
		font-size: 1.3rem;
		color: #fff;
		letter-spacing: 1px;
	}

	.icon-jiantou-copy:before {
		content: "\E607";
	}

	.body {
		width: 100%;
		text-align: center;
		position: relative;
		top: 4.5rem;
		padding: 0 0.8rem 4rem 0.8rem;
		background: url(../../../static/img/signIn/qddbjtc.jpg) no-repeat;
		background-size: 100% 100%;
		height: 88vh;
	}

	.sign-info {
		font-size: 1.6rem;
		font-weight: 700;
		padding: 0.4rem 0;
	}

	.sign-container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		align-items: center;
	}

	.img-sing-img {
		border-radius: 50%;
		flex: 0 0 33.33%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 1rem;
		flex-direction: column;
	}

	.img-sing-img .sing-card-span {
		margin: 0.5rem 0.65rem 0 0.65rem;
		max-width: 120px;
		transition: all .3s linear;
	}

	.sing-card-span {
		position: relative;
		z-index: 10;
	}

	.has-sing {
		color: #ffffff;
		font-weight: 700;
		text-shadow: rgb(0, 0, 0) 1px 0 1px, rgb(0, 0, 0) 0 1px 1px, rgb(0, 0, 0) 0 -1px 1px, rgb(0, 0, 0) -1px 0 1px;
		padding-top: 0.5rem;
		font-size: 0.75rem;
	}

	.sing-card-span img {
		display: block;
		width: 100%;
		border-radius: 3px;
	}

	.img-7-big {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		max-width: 20rem;
		width: 14rem;
	}

	.awards-bottom-div {
		width: 100%;
	}

	.awards-msg {
		color: rgba(255,255,222);
		font-weight: 700;
		text-shadow: #ff0808 1px 0 1px, #ff0808 0 1px 1px, #ff0808 0 -1px 1px, #ff0808 -1px 0 1px;
		font-size: 1.5rem;
	}

	.awards-money {
		position: relative;
		padding: .2rem 2.5rem;
	}

	.awards-money-span {
		display: block;
		padding: 0.83rem;
		border-radius: 5px;
		font-size: 1.2rem;
		padding-top: 0.4rem;
	}

	.sing-bg {
		position: absolute;
		top: 22px;
		left: 3.2%;
		width: 93%;
		bottom: 22px;
		background: #00000080;
		border-radius: 3px;
	}

	.sing-yes-span {
		position: absolute;
		z-index: 11;
		color: #ffffff;
		font-size: 4.5rem;
		font-weight: 700;
		text-shadow: rgb(0, 0, 0) 1px 0 1px, rgb(0, 0, 0) 0 1px 1px, rgb(0, 0, 0) 0 -1px 1px, rgb(0, 0, 0) -1px 0 1px;
		top: 15%;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.yi-qian-dao {
		font-size: 1.3rem;
		color: #ffffff;
		width: 100%;
		font-weight: 700;
		text-shadow: rgb(0, 0, 0) 1px 0 1px, rgb(0, 0, 0) 0 1px 1px, rgb(0, 0, 0) 0 -1px 1px, rgb(0, 0, 0) -1px 0 1px;
		transform: translateX(-50%);
		position: relative;
		top: 34%;
	}
	.text-top {
		position: absolute;
		top: 3px;
		width: 100%;
		color: rgba(127,82,11);
	}
	.text-bottom {
		position: absolute;
		bottom: 4px;
		width: 100%;
		color: rgba(252,84,81);
	}
	.baoxiang {
		position: absolute;
		top: 0;
	}
</style>
