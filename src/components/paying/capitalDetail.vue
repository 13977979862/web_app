<template>
	<div style="background: #fff;min-height: 100vh;">
		<header class="top">
			<div class="backPage iconfont icon-jiantou-copy" onclick="window.history.back(-1);"></div>
			<span class="title">资金明细</span>
		</header>
		<div style="clear: both;"></div>
		<main class="content-body">
            <div style="height: 27px;line-height: 27px;padding-left: 17px;background: #F2F2F2;color: #334C66;font-size: 12px;"><p>小贴士：敢于投入才能有高回报！</p></div>
            <div style="padding-top: 10px;">
                <div class="f_div_flex">
                    <div class="f_div_felxbox">
                        <select class="_sfelxse" v-model="starttime">
                            <option :value="item" v-for="(item,index) in datelist1" :key = "index">{{item}}</option>
                        </select>
                    </div>
                    <div class="f_div_felxbox">
                        <select class="_sfelxse" v-model="endtime">
                            <option :value="item" v-for="(item,index) in datelist1" :key = "index">{{item}}</option>
                        </select>
                    </div>
                    <div class="f_div_felxbox">
                        <div class="reca" @click="getcapitalDetailData" style="width: 72px;margin: 0 auto;background: #F8522F; border-radius: 4px;font-size: 14px; color: #fff;">查询</div>
                    </div>
                </div>
            </div>
            <div style=" color: #9E98A2;padding: 0 16px;">
                <div style="display: flex;text-align: center;padding-top: 14px;">
                    <div style="flex: 0 0 45%">单号</div>
                    <div style="flex: 0 0 25%">类型</div>
                    <div style="flex: 0 0 30%">金额</div>
                </div>
                <div v-if="tableData.length === 0" style="display: flex;text-align: center;padding-top: 28px;">
                    <div style="margin: 0 auto;">
                        <img style="width: 94px;" src="../../../static/img/src_assets_imgs_empty.png" alt="">
                        <p style="color: #334C66;font-size: 15px;margin-top: 25px;">暂无资金明细</p>
                    </div>
                </div>
                <template v-if="tableData.length !== 0">
                    <div v-for = "(item, index) in tableData" :key = "index" style="display: flex;text-align: center;padding-top: 28px;">
                        <div style="flex: 0 0 45%; text-align: left;position: relative;">
                            <span style="position: absolute;top: 8px;">
                                <img v-if = "item.type === '转入'" style="width: 20px;" src="../../../static/img/icon_intto_money_n.png" alt="">
                                <img v-else-if = "item.type === '转出'" style="width: 20px;" src="../../../static/img/icon_outto_money_n.png" alt="">
                                <img v-else style="width: 20px;" src="../../../static/img/icon_add_money_n.png" alt="">
                            </span>
                            <div style="padding-left: 30px;">
                                <p style="font-size: 15px; color: #2D3764;">{{ item.wid }}</p>
                                <p style="padding-top: 8px;font-size: 12px;">{{ item.time }}</p>
                            </div>
                            
                        </div>
                        <div style="flex: 0 0 25%; display: flex;justify-content: center;align-items: center;">{{ item.type }}</div>
                        <div style="flex: 0 0 30%; display: flex;justify-content: center;align-items: center;font-size: 18px; color: #FD4333;">{{ item.type === '转出' ? `-${item.money}` : `+${item.money}` }}</div>
                    </div>
                </template>
            </div>
		</main>
		
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
                datelist1: [],//日期列表
                recdate: "",//日期
                tableData: [],
			};
		},
		mounted() {
            this._get15tian(30);//最近一个月
		},
		methods: {
            getcapitalDetailData() {//获取资金明细
                let params = {
                    starttime: this.starttime,
                    endtime: this.endtime
                }
                $api.$post('api/yuebao/detail', params).then((res) => {
                    this.tableData = res.data.data;
				});
            },
            _get15tian(day) {//设置日期时间
                var _arr1 = [];
                for(var i = 0; i < day; i++) {//其他彩种
                    var _date = new Date();
                    _date.setTime(_date.getTime() - 24 * 60 * 60 * 1000 * i);
                    var _n = _date.getFullYear();
                    var _y = (_date.getMonth() + 1) > 9 ? (_date.getMonth() + 1) : "0" + (_date.getMonth() + 1);
                    var _r = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
                    var s1 = _n + "-" + _y + "-" + _r;
                    _arr1.push(s1);
                }
                this.datelist1 = _arr1;
                this.starttime = _arr1[0];//默认显示今天日期
                this.endtime = _arr1[0];//默认显示今天日期
            },
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
	
</style>
