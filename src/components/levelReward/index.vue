<template>
	<div style="background: #fff;">
		<header class="top">
			<div class="backPage iconfont icon-jiantou-copy" onclick="window.history.back(-1);"></div>
			<span class="title">充值等级晋级奖励</span>
		</header>
		<div style="clear: both;"></div>
		<main class="content-body">
			<div>
				<img src="../../../static/img/levelReward/beijinshang_01.png" alt="">
			</div>
			<div class="content-header">
				<span>充值等级: <span style="color: rgba(255,0,16);font-weight: 600;">{{level}}</span></span>
				<span>距下一级: <span style="color: rgba(133,255,2);font-weight: 600;">{{next}}</span></span>
			</div>
			<div class="content-table content-table-th">
				<span style="width: 20%;">等级</span>
				<span>头衔</span>
				<span>成长积分</span>
				<span style="width: 30%;">晋级奖励(元)</span>
				<span>领取状态</span>
			</div>
			<div class="content-table content-table-td" v-for="(item,index) in tableData" :key="index">
				<span class="table-td1" style="width: 20%;">{{item.level_name}}</span>
				<span>{{item.name}}</span>
				<span class="table-td3">{{item.integral}}</span>
				<span style="width: 30%;color: rgba(255,0,16);">{{item.reward}}</span>
				<span v-if="item.receive_status == 0">
					<span style="color: rgba(255,0,16);background: rgba(255,220,30);padding: 4px 6px;border-radius: 4px;" @click="receiveFunc(item)">点击领取</span>
				</span>
				<span style="color: rgba(0,204,255);" v-else-if="item.receive_status == 1">已领取</span>
				<span v-else>
					<span style="color:#fff;background: rgba(165,165,165);padding: 4px 6px;border-radius: 4px;">晋级领取</span>
				</span>
			</div>
		</main>
		<div style="margin: 6px 4px 0px 4px;border-top: 1px solid #ddd;">
		</div>
		<footer class="levelReward-footer">
			<p>活动内容:</p>
			<p>1.会员每晋升一个等级,即可获得奖励,最高可达{{total}}元。</p>
			<p>2.充值1元即可获得1成长积分。</p>
			<p>3.查看等级积分。请登录会员账号,点击充值进入右上角查询。{{web_name}}保留对活动的最终解释权,以及在无通知的情况下修改、终止活动的权利,适用于所有优惠。</p>
		</footer>
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
				tableData: [],
				level: "VIP1",
				next: 600,
				total: 0,
				web_name: '',
			};
		},
		mounted() {
			this.initData();
		},
		methods: {
			async initData() {//获取页面初始化数据
				await $api.$post('api/Jinji/isReward').then((res) => {
					this.tableData = res.data.data.list;
					this.level = res.data.data.vip;
					this.next = res.data.data.next;
					//this.total = 0;
					this.total = this.tableData.reduce((total,num) => {
						return {reward: total.reward + num.reward};
					}).reward;
					this.web_name = localStorage.getItem('web_name')
				});
			},
			async receiveFunc(rows) {//点击领取
				await $api.$post('api/Jinji/getReward', {jid: rows.id}).then(async (res) => {
					await this.initData();
				});
				this.plainalert("领取成功!");
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
	.content-body {
		margin-top: 4.5rem;
	}
	.content-header,.content-table {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.content-header>span {
		flex-grow: 1;
		font-size: 16px;
		margin-bottom: 6px;
		font-weight: 600;
	}
	.content-table>span {
		width: 25%;
	}
	.content-table-th {
		margin: 0 10px;
		background: rgba(255,70,30);
		color: #fff;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}
	.content-table-th>span {
		padding: 6px 0;
	}
	.content-table-td {
		margin: 0 10px;
		border-left: 1px solid #ccc;
	}
	.content-table-td>span {
		border-right: 1px solid #ccc;
		height: 32px;
		line-height: 32px;
	}
	.table-td1 {
		color: rgba(255,0,16);
		font-weight: 600;
	}
	.table-td3 {
		color: rgba(133,255,2);
	}
	.content-table-td:nth-child(odd) {
		background: #eee;
	}
	.content-table-td:last-child {
		border-bottom: 1px solid #ccc;
	}
	.levelReward-footer {
		margin-top: 2px;
		padding: 4px;
		margin-bottom: 5rem;
	}
	.levelReward-footer>p {
		padding: 2px 10px;
	}
	.levelReward-footer>p:first-child {
		padding: 2px 4px;
		font-size: 16px;
		font-weight: 600;
	}
</style>
