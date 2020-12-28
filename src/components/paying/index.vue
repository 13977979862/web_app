<template>
	<div style="background: #fff;min-height: 100vh;">
		<header class="top">
			<div class="backPage iconfont icon-jiantou-copy" onclick="window.history.back(-1);"></div>
			<span class="title">余额宝</span>
			<div style="position: absolute; right: 0;top: 4px;">
				<img @click="ruleStatus = true" style="width: 22px;" src="../../../static/img/icon_earnings_rules_n.png" alt="">
				<img @click="$router.push('/paying/capitalDetail')" style="width: 18px;margin: 0 8px;position: relative; bottom: 1px;" src="../../../static/img/icon_detail_money_n.png" alt="">
			</div>
		</header>
		<div style="clear: both;"></div>
		<main class="content-body">
			<div class="total-moeny">
				<div style="position: relative;">
					<span>总金额(元)</span>
					<div class="icon-position">
						<span>
							<img src="../../../static/img/icon_security_balance_n.png" alt="">
						</span>
						<div>
							资金安全有保障
						</div>
					</div>
				</div>
				<div>
					<span v-if="payingData.money !== undefined" style="font-size: 28px;">{{ (payingData.money).toFixed(2) }}</span>
					<div class = "total-detail-position">
						<div class="total-detail">
							<div>
								<p>昨日收益(元)</p>
								<p>{{ payingData.yesterday }}</p>
								<p>万份收益(元)</p>
								<p>{{ payingData.wan }}</p>
							</div>
							<div>
								<p>累计收益(元)</p>
								<p>{{ payingData.all }}</p>
								<p>日收益率</p>
								<p>{{ payingData.PE }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="margin-bottom: 70px;">
				<div class="table-head">
					<div><span>总金额</span></div>
					<div><span>昨日收益</span></div>
					<div><span>累计收益</span></div>
					<div><span>资金状态</span></div>
				</div>
				<div class="table-content" v-for = "(item, index) in tableData" :key = "index">
					<div>
						<p>{{ item.money }}</p>
						<p>{{ item.wid }}</p>
						<p>{{ item.starttime }}</p>
					</div>
					<div><span>{{ item.yesterday }}</span></div>
					<div><span>{{ item.all }}</span></div>
					<div>
						<span>
							<span class="my-btn" @click = "turnOutFunc(index)" v-if = "item.status === 0">转出</span>
							<span class="my-btn-info" v-else>已转出</span>
						</span>
					</div>
				</div>
			</div>
		</main>
		<div class="bottom-btn-position">
			<div class="bottom-btn" @click="changeInto">
				转入
			</div>
		</div>
		<div v-show="dialogStatus">
			<div class="dialog-div"></div>
			<div class="dialog-content">
				<div style="margin: 0 46px;background: #fff;border-radius: 8px;">
					<div style="font-size: 16px;font-family:Source Han Sans CN;padding-top: 16px;">转入余额宝</div>
					<div style="padding-top: 24px;">
						<input :placeholder="coinTxT" v-model="money" type="text" style="height: 46px; line-height: 46px;border: 1px solid #eee;border-radius: 12px 0 0 12px;"><span @click="money = coin" style="font-size: 14px;display: inline-block;height: 46px; line-height: 46px;background: #eee;width: 76px;border: 1px solid #eee;border-left: none; position: relative; top: 2px;border-radius:0px 12px 12px 0px;">全部转入</span>
					</div>
					<div style="display: flex;padding-top: 24px;padding-bottom: 16px;">
						<div style="flex: 0 0 50%;">
							<span @click="cancel" style="display: inline-block; height: 38px;line-height: 38px; width: 134px;background: #eee;border-radius: 4px;">取消</span>
						</div>
						<div style="flex: 0 0 50%;">
							<span @click="confirmChangeInto" style="display: inline-block; height: 38px;line-height: 38px; width: 134px;background:radial-gradient(circle,#FE3E33,#F45F31);border-radius: 4px;color: #fff;">确认转入</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-show="turnOutStatus">
			<div class="dialog-div"></div>
			<div class="dialog-content">
				<div style="margin: 0 46px;background: #fff;border-radius: 8px;">
					<div style="font-size: 20px;font-family:Source Han Sans CN;padding-top: 16px;">提示</div>
					<div style="padding-top: 24px;">
						<p>您是否确定要转出{{ selRows.wid }}该笔订单？</p>
					</div>
					<div style="display: flex;padding-top: 24px;padding-bottom: 16px;">
						<div style="flex: 0 0 50%;">
							<span @click="cancelTurnOut" style="display: inline-block; height: 38px;line-height: 38px; width: 134px;">取消</span>
						</div>
						<div style="flex: 0 0 50%;">
							<span @click="confirmTurnOutFunc" style="display: inline-block; height: 38px;line-height: 38px; width: 134px;color: #0972EF;">确认</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-show="ruleStatus">
			<div class="dialog-div"></div>
			<div class="dialog-content">
				<div style="margin: 0 46px;background: #fff;border-radius: 8px;">
					<div style="font-size: 18px;font-family:Source Han Sans CN;padding-top: 16px;">收益规则说明</div>
					<div style="padding: 24px 12px 0 12px;text-align: left;font-family:Source Han Sans CN;font-size: 15px;">
						<p>当日转入的余额宝金额，1小时后开始产生收益</p>
						<p>收益计算公式：当日收益 = 余额宝账户资金 * 日收益率 * (资金托管秒数/一天秒数(86400秒))</p>
						<p>如：当日的日收益率为2%，余额宝存入资金为10000，资金托管12小时(43200秒)，当日余额宝收益为：10000 * 2% * (43200/86400)= 100</p>
						<p>收益采用复利计算，即第二天的本金包含前一天的本金和收益</p>
					</div>
					<div style="padding-top: 24px;padding-bottom: 16px;">
						<div @click="ruleStatus = false" style="margin: 0 16px;height: 42p;line-height: 42px;background: radial-gradient(#F55C2E,#FE3C30);color: #fff;font-size: 15px;border-radius: 8px;">了解了</div>
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
				dialogStatus: false,
				turnOutStatus: false,
				ruleStatus: false,
				payingData: {},
				tableData: [],
				coinTxT: '',
				coin: 0,
				money: null,
				selRows: {},
			};
		},
		created () {
			this.getPayingData();
		},
		mounted() {
		},
		methods: {
			getPayingData() {//获取余额宝数据
				$api.$post('api/yuebao/find').then((res) => {
					this.payingData = res.data.data;
					this.tableData = this.payingData.list;
					this.coin = this.payingData.coin;
					localStorage.setItem("coin", this.coin);
					this.coinTxT = `最多可转入${this.coin}元`;
				});
			},
			changeInto() {//转入模态框显示
				this.dialogStatus = true;
			},
			cancel() {//转入模态框显示取消
				this.dialogStatus = false;
				this.money = null;
			},
			confirmChangeInto() {//转入
				$api.$post('api/yuebao/into', { money: this.money }).then((res) => {
// 					this.coin = parseFloat(this.coin) - parseFloat(this.money);
// 					localStorage.setItem("coin", this.coin);
					this.cancel();
					this.getPayingData();
					
				});
			},
			turnOutFunc(index) {//转出模态框显示
				this.selRows = this.tableData[index];
				this.turnOutStatus = true;
			},
			cancelTurnOut() {//转出模态框取消
				this.turnOutStatus = false;
			},
			confirmTurnOutFunc() {//转出
				$api.$post('api/yuebao/out', { yid: this.selRows.yid }).then((res) => {
// 					this.coin = parseFloat(this.coin) + parseFloat(this.selRows.money);
// 					localStorage.setItem("coin", this.coin);
					this.cancelTurnOut();
					this.getPayingData();
				});
			}
		},
	};
</script>

<style scoped="scoped">
	.dialog-content input::-webkit-input-placeholder {
		padding-left: 10px;
    }
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
	.content-body {
		margin-top: 4.5rem;
	}
	.total-moeny {
		color: #fff;
		text-align: center;
		background-image: url(../../../static/img/bg_balance_n.png);
		background-repeat: no-repeat;
		background-size: 100% 166px;
	}
	.total-moeny > div {
		padding-top: 24px;
		letter-spacing: 1px;
	}
	.total-detail-position {
		padding-top: 8px;
		width: 100%;
	}
	.total-detail {
		margin: 0 30px; 
		border-radius: 12px; 
		border:1px solid rgba(158, 158, 158, 0.4);
		background: #fff;color: #333;
		display: flex;
		justify-content: center;

	}
	.total-detail > div {
		flex-grow: 1;
		letter-spacing: 0;
	}
	.total-detail > div > p:first-child {
		padding-top: 16px;
		color: #999;
	}
	.total-detail > div > p:nth-child(2) {
		padding-top: 6px;
		font-size: 16px;
		font-family:Roboto;
		color: #333;
	}
	.total-detail > div > p:nth-child(3) {
		padding-top: 12px;
		color: #999;
	}
	.total-detail > div > p:last-child {
		padding-top: 6px;
		font-size: 16px;
		font-family:Roboto;
		color: #333;
		padding-bottom: 16px;
	}
	.table-head {
		display: flex;
		height: 36px;
		line-height: 36px;
		padding: 0 20px;
		margin-top: 10px;
		color: #9e98a2;
	}
	.table-content {
		display: flex;
		padding: 0 20px;
		color: #A5AABD;
	}
	.table-head > div:first-child, .table-content > div:first-child {
		flex: 0 0 40%;
	}
	.table-head > div:nth-child(2), .table-content > div:nth-child(2) {
		flex: 0 0 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.table-head > div:nth-child(3), .table-content > div:nth-child(3) {
		flex: 0 0 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.table-head > div:last-child, .table-content > div:last-child {
		flex: 0 0 20%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.table-content > div > p {
		margin-top: 6px;
	}
	.table-content > div > p:first-child {
		color: #2d3764;
		font-family:Source Han Sans CN;
	}
	.table-content > div > p:last-child {
		margin-bottom: 6px;
	}
	.my-btn {
		display: inline-block; 
		width: 80px; 
		height: 30px; 
		line-height: 30px;
		background: radial-gradient(#FE3E33,#F45F31);
		text-align: center;
		color: #fff;
		font-size: 14px;
		border-radius: 8px;
	}
	.my-btn-info {
		display: inline-block; 
		width: 80px; 
		height: 30px; 
		line-height: 30px;
		background: #B7B6C4;
		text-align: center;
		color: #fff;
		font-size: 14px;
		border-radius: 8px;
	}
	.bottom-btn-position {
		position: fixed; 
		left: 0;
		background: #fff; 
		bottom: 0; 
		height: 70px;
		line-height: 70px;
		width: 100%;
		padding: 12px 40px;
		border-top: 2px solid rgba(238,238,238,1);
	}
	.bottom-btn {
		background: radial-gradient(#F55C2E,#FE3C30);
		height: 46px;
		line-height: 46px;
		text-align: center;
		color: #fff;
		font-size: 18px;
		border-radius: 6px;
	}
	.icon-position {
		position: absolute; 
		bottom: 0; 
		width: 122px;
		padding-right:4px; 
		right: 0;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		letter-spacing: 0;
		background: #fff;
		color:#787878;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}
	.icon-position > span {
		position: absolute; 
		left: 10px;
		top: 2px;
	}
	.icon-position > span > img {
		width: 20px;
	}
	.icon-position > div {
		text-align: right;
	}
	.dialog-div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #000;
		opacity: 0.4;
		z-index: 99;
	}
	.dialog-content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dialog-content > div {
		flex-grow: 1;
		text-align: center;
	}
</style>
