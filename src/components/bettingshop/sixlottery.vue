<template>
	<div class="betallclass _allpage">
		<div class="cebianlist">
			<div class="gamemenu">
				<a @click="_changetab" class="cebian_bar"></a>
				<div class="gamemenu2">
					<div class="game_module" v-for="(item,index) in game" :class="{'_greybg':index%2==1}">
						<h5>{{item.title}}</h5>
						<ul>
							<li v-for="(item2,index2) in item.data" @click="_checkgameid(item2.id,item2.type)">
								<a>{{item2.title}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!----> 
			<div class="gamemenu2bg" v-if="ctab" @click="_changetab"></div>
		</div>
		<!--正文-->
		<header class="header">
			<div class="header-box">
				<div class="header-left" @click="_gohome">
					<i class="iconfont icon-fanhui"></i>
				</div>
				<div class="header-center">{{info.title}}&nbsp;<p v-if="iscoin" style="display: inline-block;">
						({{iscoin}}元)
					</p>
				</div>
				<div class="header-right" @click="shownavtab = !shownavtab"><i class="iconfont icon-weibiaoti15"></i>
				</div>
			</div>
			<div class="header-nav clearfix" v-if="shownavtab">
				<headernav></headernav>
			</div>
		</header>
		<!---->
		<div class="bet-top">
			<div class="class">
				<div class="bet-top-iframe" v-html="data_live" v-show="live_on">
					<!--直播渲染-->
				</div>
				<div class="bet-past" v-show="!live_on">
					<h2>{{last_lottery.number}}期</h2>
					<h3>
						<span class="sixball" :class="'_sixright_'+item + ' _ball'+index" v-for="(item,index) in last_lottery.content">{{item}}</span>
						<span class="_sixadd">+</span>
					</h3>
					<h4>
						<span class="_Zodiac" v-for="(item,index) in last_lottery.content2">{{item}}</span>
					</h4>
					<div class="live" @click="_show_live">
						<i class="iconfont icon-02"></i>
						<p>开奖直播</p>
					</div>
				</div>
				<div class="bet-time">
					<div>
						<div style="color: red;margin-right:0;">{{next_lottery.number}}</div>
						期
					</div>
					<div>封盘：<span>{{timefeng | sec_time}}</span></div>
					<div>开奖：<span>{{timeopen | sec_time2}}</span></div>
					<span id='iframe-close' v-show="live_on">关闭</span>
				</div>
			</div>
		</div>
		<!---->
		<div class="bet-box">
			<div class="bet-box-fl wrapper">
				<ul class="content">
					<li :class="{'fl-act': menuindex == index}" v-for="(item,index) in menu_list" @click="_checkmenu(index)">{{item.name}}
					</li>
				</ul>
			</div>
			<div class="bet-box-fr wrapper">
				<div class="content">
					<div v-for="(item,index) in menu_list" v-show="menuindex == index">
						<div class="flex-box-sc" v-if="item.menuid != 673 && item.menuid != 676 && item.menuid != 796 && item.menuid != 802 && item.menuid != 808 && item.menuid != 814 " v-for="(item2,index2) in item.played"
						 :class="'waisix'+item.menuid+index2">
							<div class="flex-title">{{item2.title}}</div>
							<div class="flex-bodys" v-for="(item3,index3) in item2.data">
								<div class="flex-html" v-for="(item4,index4) in item3" :data-value="item4.id" :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
								 @click="_checklist($event)">
									<span class="_it1" :class="'sixall'+ item.menuid +' _sixball'+ item.menuid +_checkNumber(item4.name)">
										<p>{{item4.name}}</p>
									</span>
									<span class="_it2" :class="'sixall'+ item.menuid">{{item4.odds}}</span>
									<!--特码头尾数-->
									<div class="sixballright" v-if="((587==item.menuid || 394==item.menuid || 591==item.menuid) && 1==index2)">
										<span v-for="(item5,index5) in _tailnumber(item4.name)" :class="'_sixright_'+item5">{{item5}}</span>
									</div>
									<!--所有肖-->
									<div class="sixballright" v-if="(399==item.menuid || 403==item.menuid || 401==item.menuid || 593==item.menuid || 594==item.menuid || 595==item.menuid)">
										<span
											v-for="(item5,index5) in item4.num"
											:key="index5"
											:class="'_sixright_'+item5"
											>{{item5}}</span>
									</div>
								</div>
							</div>
						</div>



						<div class="flex-box-sc" v-if="item.menuid == 673 || item.menuid == 676" v-for="(item2,index2) in item.played"
						 :class="'waisix'+index+index2">
							<div class="flex-title">{{item2.title}}</div>
							<div :class="'flex-bodys test'+item.menuid" v-for="(item3,index3) in item2.data">
								<div class="flex-html" v-for="(item4,index4) in item3" :data-value="item4.id" :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
								 @click="_checklist($event,item2, item)">
									<span class="_it1" :class="'sixall'+ index +' _sixball'+ index +_checkNumber(item4.name)">
										<p v-if="item4.name.indexOf('@') != -1" v-for="codeData in item4.name.split('@')" style="display: block;">
											<span style="font-weight: 700;" v-if="codeData.indexOf(':') != -1">{{codeData.split(":")[0]}}:</span>
											<span style="font-weight: 700;" v-else>{{codeData.split(":")[0]}}</span>
											<span style="font-size: 14px;color: rgba(0,0,0,.5);font-weight: 400;">{{codeData.split(":")[1]}}</span>
										</p>
										<p v-if="item4.name.indexOf('@') == -1">{{item4.name}}</p>
									</span>
									<p class="_it2" :class="'sixall'+ index" v-if="item2.title === '选择类型' && item4.name.indexOf('@') == -1" style="display: block;">{{item4.odds}}</p>
								</div>
							</div>
						</div>
						
						<!-- 自选不中 -->
						 <div class="flex-box-sc" v-if="item.menuid == 796" v-for="(item2,index2) in item.played"
						  :class="'waisix'+index+index2">
						 	<div class="flex-title">{{item2.title}}</div>
						 	<div :class="'flex-bodys test'+item.menuid" v-for="(item3,index3) in item2.data">
						 		<div class="flex-html" v-for="(item4,index4) in item3" :data-value="item4.id" :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
						 		 @click="_checklist($event, item2, item)">
						 			<span class="_it1" :class="'sixall'+ index +' _sixball'+ index +_checkNumber(item4.name)">
						 				<p v-if="item4.name.indexOf('@') != -1" v-for="codeData in item4.name.split('@')" style="display: block;">
						 					<span style="font-weight: 700;" v-if="codeData.indexOf(':') != -1">{{codeData.split(":")[0]}}:</span>
						 					<span style="font-weight: 700;" v-else>{{codeData.split(":")[0]}}</span>
						 					<span style="font-size: 14px;color: rgba(0,0,0,.5);font-weight: 400;">{{codeData.split(":")[1]}}</span>
						 				</p>
						 				<p v-if="item4.name.indexOf('@') == -1">{{item4.name}}</p>
						 			</span>
						 			<p class="_it2" :class="'sixall'+ index" v-if="item2.title === '选择类型' && item4.name.indexOf('@') == -1" style="display: block;">{{item4.odds}}</p>
						 		</div>
						 	</div>
						 </div>
						 
						<!-- 连尾 -->
						<div class="flex-box-sc" v-if="item.menuid == 808" v-for="(item2,index2) in item.played"
						   :class="'waisix'+index+index2">
						  	<div class="flex-title">{{item2.title}}</div>
						  	<div :class="'flex-bodys test'+item.menuid" v-for="(item3,index3) in item2.data">
						  		<div class="flex-html" v-for="(item4,index4) in item3" :data-value="item4.id" :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
						  		 @click="_checklist($event, item2, item)">
						  			<span class="_it1" :class="'sixall'+ index +' _sixball'+ index +_checkNumber(item4.name)">
						  				<p v-if="item4.name.indexOf('@') != -1" v-for="codeData in item4.name.split('@')" style="display: block;">
						  					<span style="font-weight: 700;" v-if="codeData.indexOf(':') != -1">{{codeData.split(":")[0]}}:</span>
						  					<span style="font-weight: 700;" v-else>{{codeData.split(":")[0]}}</span>
						  					<span style="font-size: 14px;color: rgba(0,0,0,.5);font-weight: 400;">{{codeData.split(":")[1]}}</span>
						  				</p>
						  				<p v-if="item4.name.indexOf('@') == -1">{{item4.name}}</p>
						  			</span>
						  			<p class="_it2" :class="'sixall'+ index" v-if="item2.title === '选择类型' && item4.name.indexOf('@') == -1" style="display: block;">{{item4.odds}}</p>
						  		</div>
						  	</div>
						</div>
						  
						 <!-- 连肖-->
						<div class="flex-box-sc" v-if="item.menuid == 814" v-for="(item2,index2) in item.played"
						   :class="'waisix'+index+index2">
						  	<div class="flex-title">{{item2.title}}</div>
						  	<div :class="'flex-bodys test'+item.menuid" v-for="(item3,index3) in item2.data">
						  		<div class="flex-html" v-for="(item4,index4) in item3" :data-value="item4.id" :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
						  		 @click="_checklist($event,item2, item)">
						  			<span class="_it1" :class="'sixall'+ index +' _sixball'+ index +_checkNumber(item4.name)">
						  				<p v-if="item4.name.indexOf('@') != -1 && codeData.split(':')[0] !== '猪'" v-for="codeData in item4.name.split('@')" style="display: block;">
						  					<!-- <span style="font-weight: 700;" v-if="codeData.indexOf(':') != -1">{{codeData.split(":")[0]}}:</span> -->
											<span>{{codeData.split(":")[0]}}</span>
						  					<!-- <span style="font-size: 14px;color: rgba(0,0,0,.5);font-weight: 400;">{{codeData.split(":")[1]}}</span> -->
						  				</p>
						  				<p v-if="item4.name.indexOf('@') == -1">{{item4.name}}</p>
						  			</span>
						  			<p class="_it2" :class="'sixall'+ index" v-if="item2.title === '选择类型' && item4.name.indexOf('@') == -1" style="display: block;">{{item4.odds}}</p>
						  		</div>
						  	</div>
						</div>
						
						<!-- 合肖 -->
						<div class="flex-box-sc" v-if="item.menuid == 802" v-for="(item2,index2) in item.played"
						 :class="'waisix'+index+index2">
							<div class="flex-title">{{item2.title}}</div>
							<template v-if="item2.title === '选择类型'">
								<div :class="'flex-bodys test'+item.menuid" v-for="(item3,index3) in item2.data">
									<div class="flex-html" v-for="(item4,index4) in item3" :data-value="item4.id" :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
									 @click="_checklist($event, item2, item)">
										<span class="_it1" :class="'sixall'+ index +' _sixball'+ index +_checkNumber(item4.name)">
											<p v-if="item4.name.indexOf('@') != -1" v-for="codeData in item4.name.split('@')" style="display: block;">
												<span style="font-weight: 700;" v-if="codeData.indexOf(':') != -1">{{codeData.split(":")[0]}}:</span>
												<span style="font-weight: 700;" v-else>{{codeData.split(":")[0]}}</span>
												<span style="font-size: 14px;color: rgba(0,0,0,.5);font-weight: 400;">{{codeData.split(":")[1]}}</span>
											</p>
											<p v-if="item4.name.indexOf('@') == -1">{{item4.name}}</p>
										</span>
										<p class="_it2" :class="'sixall'+ index" v-if="selhexiaoData[index4] !== undefined" style="display: block;">{{selhexiaoData[index4].odds}}</p>
									</div>
								</div>
							</template>
							<!-- 选择号码 -->
							<template v-if="item2.title !== '选择类型'">
								<div :class="'flex-bodys test'+item.menuid" v-for="(hexiaoItem,hexiaoIndex) in hexiaoList">
									<div v-for="(heItem, heIndex) in hexiaoItem" @click="_checklist($event, item2, item)" class="flex-html" :data-value="heItem.name" :data-item="heItem.name + '|' + heItem.name">
										<span class="_it1">
											<p>{{ heItem.name }}</p>
										</span>
									</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!---->
		<div class="bet-bottom bet_pt" v-if="timefeng>0">
			<div class="flex-box">
				<div class="flex">
					<p>已选中<strong>{{codeArr.length == 0 ? (checkallDom.length + wubuzhongNum + hexiaoNum + lianweiNum + lianxiaoNum) : (checkallDom.length + 1+ wubuzhongNum + hexiaoNum + lianweiNum + lianxiaoNum)}}</strong>注</p>
					<input type="tel" v-model="moneys" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="7" :onblur="upperCase(moneys)"
					 placeholder="输入金额">
				</div>
				<button @click="_detailed">下注</button>
				<button class="blue" @click="_reset">重置</button>
			</div>
		</div>
		<div class="_fengpan bet_pt" v-if="timefeng<=0">已封盘</div>
		<!---->
	</div>
</template>
<script>
	import headernav from "../common/headernav";

	export default {
		filters: {
			sec_time(val) {
				return opendowntime(val);
			},
			sec_time2(val2) {
				return clockdowntime(val2);
			},
		}, //过滤器
		components: {
			headernav,
		}, //组件注册
		computed: {}, //计算属性
		props: {}, //接受参数
		created() {},
		data() {
			return {
				hexiaoList: [
					[{name: '鼠'}, {name: '牛'}, {name: '虎'}],
					[{name: '兔'}, {name: '龙'}, {name: '蛇'}],
					[{name: '马'}, {name: '羊'}, {name: '猴'}],
					[{name: '鸡'}, {name: '狗'}, {name: '猪'}]
				],
				iscoin: "", //金额
				ctab: false,
				typeid: "", //彩种类型
				live_on: false, //是否显示直播
				data_live: '', //直播渲染iframe标签
				id: "", //彩种id
				menu_list: [], //所有玩法彩种和列表
				bet: [], //提交json格式列表清单
				betlist: [], //列表清单
				game: [], //彩种列表
				menuindex: 0, //当前彩种玩法下标
				last_lottery: {}, //本期开奖
				next_lottery: {}, //下一期开奖时间和期数
				info: {},
				timeopen: 0,
				timefeng: 0,
				moneys: "",
				checkallDom: [],
				checkallSelfDom: [],
				checkallSelfheadDom: [],
				allmoney: 0,
				shownavtab: false,
				times1: null, //开奖定时器
				times2: null, //封盘定时器
				getopensum: null, //查询开奖倒计时
				getmoneySum: null, //查询余额倒计时
				nowNian: 2018,
				codeArr: [],
				wubuzhongNum: 0,
				wubuzhongArr: [],
				selhexiaoData: [],
				hexiaoNum: 0,
				hexiaoSelList: [],
				hexiaoConfirmList: [],
				zixuanbuzhongSel: [],
				zixuanbuzhongList: [],
				lianweiSel: [],
				lianweiList: [],
				lianweiArr: [],
				lianweiNum: 0,
				lianxiaoSel: [],
				lianxiaoList: [],
				lianxiaoArr: [],
				lianxiaoNum: 0,
				
			}; //自定义变量
		},
		mounted() {
			this.nowNian = this._getNian();
			this._firstrender(); //初始化页面渲染
			this.id = localStorage.getItem("gameid"); //初始化获取id
			this.typeid = localStorage.getItem("typeid"); //初始化获取类型
			/*-----------------------防止客户自己随意切换-----------------------*/
			if ((this.typeid != 6) || (window._typeArr[6].indexOf(Number(this.id)) < 0)) { //既不属于该类型也不是该类型的id
				this.id = 70; //默认值
				this.typeid = 6; //默认值
			}
			this._initdata(); //防止本页刷新数据没有请求
			this._reset(); //重置界面
		},
		methods: {
			_firstrender() {
				var _data = {
					"data": {
						"data": {
							"coin": 0,
							"game": [{
								"title": "PK\u7c7b",
								"data": [{
									"title": "\u8d85\u7ea7\u8d5b\u8f66",
									"id": 81,
									"type": 1
								}, {
									"title": "\u5317\u4eac\u8d5b\u8f66",
									"id": 50,
									"type": 1,
								}, {
									"title": "\u6781\u901fPK\u62fe",
									"id": 72,
									"type": 1
								}, {
									"title": "\u5e78\u8fd0\u98de\u8247",
									"id": 55,
									"type": 1,
								}],
							}, {
								"title": "\u65f6\u65f6\u5f69",
								"data": [{
									"title": "\u91cd\u5e86\u65f6\u65f6\u5f69",
									"id": 1,
									"type": 3
								}, {
									"title": "\u798f\u5229\u65f6\u65f6\u5f69",
									"id": 73,
									"type": 3,
								}, {
									"title": "\u65b0\u7586\u65f6\u65f6\u5f69",
									"id": 80,
									"type": 3
								}, {
									"title": "\u91cd\u5e86\u5e78\u8fd0\u519c\u573a",
									"id": 61,
									"type": 3,
								}],
							}, {
								"title": "28\u7c7b",
								"data": [{
									"title": "PC\u86cb\u86cb",
									"id": 66,
									"type": 2
								}, {
									"title": "\u52a0\u62ff\u592728",
									"id": 71,
									"type": 2
								}],
							}, {
								"title": "\u516d\u5408\u5f69",
								"data": [{
									"title": "\u9999\u6e2f\u516d\u5408\u5f69",
									"id": 70,
									"type": 6
								}],
							}, {
								"title": "\u5feb\u4e09",
								"data": [{
									"title": "\u6c5f\u82cf\u5feb3",
									"id": 10,
									"type": 4
								}, {
									"title": "\u5317\u4eac\u5feb3",
									"id": 75,
									"type": 4,
								}, {
									"title": "\u5e7f\u897f\u5feb3",
									"id": 76,
									"type": 4
								}, {
									"title": "\u5b89\u5fbd\u5feb3",
									"id": 77,
									"type": 4,
								}, {
									"title": "\u6cb3\u5317\u5feb3",
									"id": 78,
									"type": 4
								}, {
									"title": "\u6e56\u5317\u5feb3",
									"id": 79,
									"type": 4
								}],
							}],
							"next_lottery": {
								"number": 1234567,
								"time": 0,
								"aciton": 0
							},
							"last_lottery": {
								"time": 0,
								"number": 1234567,
								"action": 0,
								"content": ["01", "02", "03", "04", "05", "06", "07"],
								"content2": ["获", "取", "数", "据,", "请", "稍", "等!"],
							},
							"is_open": 1,
							"info": {
								"title": "六合彩",
								"close_time": 0,
								"description": "\u6bcf\u5468\u4e8c\u3001\u56db\u3001\u516d",
								"type": 6,
								"video": "",
							},
							"menu": [{
								"menuid": 376,
								"name": "\u7279\u7801",
								"played": [{
									"title": "\u7279\u7801",
									"data": [
										[{
											"id": 2781,
											"odds": "48.50",
											"name": "01"
										}, {
											"id": 2782,
											"odds": "48.50",
											"name": "02"
										}, {
											"id": 2783,
											"odds": "48.50",
											"name": "03",
										}],
										[{
											"id": 2784,
											"odds": "48.50",
											"name": "04"
										}, {
											"id": 2785,
											"odds": "48.50",
											"name": "05"
										}, {
											"id": 2786,
											"odds": "48.50",
											"name": "06",
										}],
										[{
											"id": 2787,
											"odds": "48.50",
											"name": "07"
										}, {
											"id": 2788,
											"odds": "48.50",
											"name": "08"
										}, {
											"id": 2789,
											"odds": "48.50",
											"name": "09",
										}],
										[{
											"id": 2790,
											"odds": "48.50",
											"name": "10"
										}, {
											"id": 2791,
											"odds": "48.50",
											"name": "11"
										}, {
											"id": 2792,
											"odds": "48.50",
											"name": "12",
										}],
										[{
											"id": 2793,
											"odds": "48.50",
											"name": "13"
										}, {
											"id": 2794,
											"odds": "48.50",
											"name": "14"
										}, {
											"id": 2795,
											"odds": "48.50",
											"name": "15",
										}],
										[{
											"id": 2796,
											"odds": "48.50",
											"name": "16"
										}, {
											"id": 2797,
											"odds": "48.50",
											"name": "17"
										}, {
											"id": 2798,
											"odds": "48.50",
											"name": "18",
										}],
										[{
											"id": 2799,
											"odds": "48.50",
											"name": "19"
										}, {
											"id": 2800,
											"odds": "48.50",
											"name": "20"
										}, {
											"id": 2801,
											"odds": "48.50",
											"name": "21",
										}],
										[{
											"id": 2802,
											"odds": "48.50",
											"name": "22"
										}, {
											"id": 2803,
											"odds": "48.50",
											"name": "23"
										}, {
											"id": 2804,
											"odds": "48.50",
											"name": "24",
										}],
										[{
											"id": 2805,
											"odds": "48.50",
											"name": "25"
										}, {
											"id": 2806,
											"odds": "48.50",
											"name": "26"
										}, {
											"id": 2807,
											"odds": "48.50",
											"name": "27",
										}],
										[{
											"id": 2808,
											"odds": "48.50",
											"name": "28"
										}, {
											"id": 2809,
											"odds": "48.50",
											"name": "29"
										}, {
											"id": 2810,
											"odds": "48.50",
											"name": "30",
										}],
										[{
											"id": 2811,
											"odds": "48.50",
											"name": "31"
										}, {
											"id": 2812,
											"odds": "48.50",
											"name": "32"
										}, {
											"id": 2813,
											"odds": "48.50",
											"name": "33",
										}],
										[{
											"id": 2814,
											"odds": "48.50",
											"name": "34"
										}, {
											"id": 2815,
											"odds": "48.50",
											"name": "35"
										}, {
											"id": 2816,
											"odds": "48.50",
											"name": "36",
										}],
										[{
											"id": 2817,
											"odds": "48.50",
											"name": "37"
										}, {
											"id": 2818,
											"odds": "48.50",
											"name": "38"
										}, {
											"id": 2819,
											"odds": "48.50",
											"name": "39",
										}],
										[{
											"id": 2820,
											"odds": "48.50",
											"name": "40"
										}, {
											"id": 2821,
											"odds": "48.50",
											"name": "41"
										}, {
											"id": 2822,
											"odds": "48.50",
											"name": "42",
										}],
										[{
											"id": 2823,
											"odds": "48.50",
											"name": "43"
										}, {
											"id": 2824,
											"odds": "48.50",
											"name": "44"
										}, {
											"id": 2825,
											"odds": "48.50",
											"name": "45",
										}],
										[{
											"id": 2826,
											"odds": "48.50",
											"name": "46"
										}, {
											"id": 2827,
											"odds": "48.50",
											"name": "47"
										}],
										[{
											"id": 2828,
											"odds": "48.50",
											"name": "48",
										}, {
											"id": 2829,
											"odds": "48.50",
											"name": "49"
										}]
									],
								}, {
									"title": "\u7279\u7801\u6ce2\u8272",
									"data": [
										[{
											"id": 4039,
											"odds": "2.67",
											"name": "\u7ea2"
										}, {
											"id": 4040,
											"odds": "2.97",
											"name": "\u84dd",
										}, {
											"id": 4041,
											"odds": "2.97",
											"name": "\u7eff"
										}]
									],
								}],
							}, {
								"menuid": 378,
								"name": "\u4e24\u9762",
								"played": [{
									"title": "\u4e24\u9762",
									"data": [
										[{
											"id": 2830,
											"odds": "1.98",
											"name": "\u7279\u5927"
										}, {
											"id": 2831,
											"odds": "1.98",
											"name": "\u7279\u5c0f",
										}],
										[{
											"id": 2832,
											"odds": "1.98",
											"name": "\u7279\u5355"
										}, {
											"id": 2833,
											"odds": "1.98",
											"name": "\u7279\u53cc",
										}],
										[{
											"id": 2834,
											"odds": "1.98",
											"name": "\u7279\u5408\u5927"
										}, {
											"id": 2835,
											"odds": "1.98",
											"name": "\u7279\u5408\u5c0f",
										}],
										[{
											"id": 2836,
											"odds": "1.98",
											"name": "\u7279\u5408\u5355"
										}, {
											"id": 2837,
											"odds": "1.98",
											"name": "\u7279\u5408\u53cc",
										}],
										[{
											"id": 2838,
											"odds": "1.98",
											"name": "\u7279\u5c3e\u5927"
										}, {
											"id": 2839,
											"odds": "1.98",
											"name": "\u7279\u5c3e\u5c0f",
										}],
										[{
											"id": 2840,
											"odds": "3.90",
											"name": "\u7279\u5927\u5355"
										}, {
											"id": 2841,
											"odds": "3.90",
											"name": "\u7279\u5927\u53cc",
										}],
										[{
											"id": 2842,
											"odds": "3.90",
											"name": "\u7279\u5c0f\u5355"
										}, {
											"id": 2843,
											"odds": "3.90",
											"name": "\u7279\u5c0f\u53cc",
										}],
										[{
											"id": 2844,
											"odds": "1.98",
											"name": "\u7279\u5929\u8096"
										}, {
											"id": 2845,
											"odds": "1.98",
											"name": "\u7279\u5730\u8096",
										}],
										[{
											"id": 2846,
											"odds": "1.98",
											"name": "\u7279\u524d\u8096"
										}, {
											"id": 2847,
											"odds": "1.98",
											"name": "\u7279\u540e\u8096",
										}],
										[{
											"id": 2848,
											"odds": "1.98",
											"name": "\u7279\u5bb6\u8096"
										}, {
											"id": 2849,
											"odds": "1.98",
											"name": "\u7279\u91ce\u8096",
										}],
										[{
											"id": 2850,
											"odds": "1.98",
											"name": "\u603b\u548c\u5355"
										}, {
											"id": 2851,
											"odds": "1.98",
											"name": "\u603b\u548c\u53cc",
										}],
										[{
											"id": 2852,
											"odds": "1.98",
											"name": "\u603b\u548c\u5927"
										}, {
											"id": 2853,
											"odds": "1.98",
											"name": "\u603b\u548c\u5c0f",
										}]
									],
								}],
							}, {
								"menuid": 380,
								"name": "\u6b63\u7801",
								"played": [{
									"title": "\u6b63\u7801",
									"data": [
										[{
											"id": 2854,
											"odds": "8.00",
											"name": "01"
										}, {
											"id": 2855,
											"odds": "8.00",
											"name": "02"
										}, {
											"id": 2856,
											"odds": "8.00",
											"name": "03",
										}],
										[{
											"id": 2857,
											"odds": "8.00",
											"name": "04"
										}, {
											"id": 2858,
											"odds": "8.00",
											"name": "05"
										}, {
											"id": 2859,
											"odds": "8.00",
											"name": "06",
										}],
										[{
											"id": 2860,
											"odds": "8.00",
											"name": "07"
										}, {
											"id": 2861,
											"odds": "8.00",
											"name": "08"
										}, {
											"id": 2862,
											"odds": "8.00",
											"name": "09",
										}],
										[{
											"id": 2863,
											"odds": "8.00",
											"name": "10"
										}, {
											"id": 2864,
											"odds": "8.00",
											"name": "11"
										}, {
											"id": 2865,
											"odds": "8.00",
											"name": "12",
										}],
										[{
											"id": 2866,
											"odds": "8.00",
											"name": "13"
										}, {
											"id": 2867,
											"odds": "8.00",
											"name": "14"
										}, {
											"id": 2868,
											"odds": "8.00",
											"name": "15",
										}],
										[{
											"id": 2869,
											"odds": "8.00",
											"name": "16"
										}, {
											"id": 2870,
											"odds": "8.00",
											"name": "17"
										}, {
											"id": 2871,
											"odds": "8.00",
											"name": "18",
										}],
										[{
											"id": 2872,
											"odds": "8.00",
											"name": "19"
										}, {
											"id": 2873,
											"odds": "8.00",
											"name": "20"
										}, {
											"id": 2874,
											"odds": "8.00",
											"name": "21",
										}],
										[{
											"id": 2875,
											"odds": "8.00",
											"name": "22"
										}, {
											"id": 2876,
											"odds": "8.00",
											"name": "23"
										}, {
											"id": 2877,
											"odds": "8.00",
											"name": "24",
										}],
										[{
											"id": 2878,
											"odds": "8.00",
											"name": "25"
										}, {
											"id": 2879,
											"odds": "8.00",
											"name": "26"
										}, {
											"id": 2880,
											"odds": "8.00",
											"name": "27",
										}],
										[{
											"id": 2881,
											"odds": "8.00",
											"name": "28"
										}, {
											"id": 2882,
											"odds": "8.00",
											"name": "29"
										}, {
											"id": 2883,
											"odds": "8.00",
											"name": "30",
										}],
										[{
											"id": 2884,
											"odds": "8.00",
											"name": "31"
										}, {
											"id": 2885,
											"odds": "8.00",
											"name": "32"
										}, {
											"id": 2886,
											"odds": "8.00",
											"name": "33",
										}],
										[{
											"id": 2887,
											"odds": "8.00",
											"name": "34"
										}, {
											"id": 2888,
											"odds": "8.00",
											"name": "35"
										}, {
											"id": 2889,
											"odds": "8.00",
											"name": "36",
										}],
										[{
											"id": 2890,
											"odds": "8.00",
											"name": "37"
										}, {
											"id": 2891,
											"odds": "8.00",
											"name": "38"
										}, {
											"id": 2892,
											"odds": "8.00",
											"name": "39",
										}],
										[{
											"id": 2893,
											"odds": "8.00",
											"name": "40"
										}, {
											"id": 2894,
											"odds": "8.00",
											"name": "41"
										}, {
											"id": 2895,
											"odds": "8.00",
											"name": "42",
										}],
										[{
											"id": 2896,
											"odds": "8.00",
											"name": "43"
										}, {
											"id": 2897,
											"odds": "8.00",
											"name": "44"
										}, {
											"id": 2898,
											"odds": "8.00",
											"name": "45",
										}],
										[{
											"id": 2899,
											"odds": "8.00",
											"name": "46"
										}, {
											"id": 2900,
											"odds": "8.00",
											"name": "47"
										}],
										[{
											"id": 2901,
											"odds": "8.00",
											"name": "48",
										}, {
											"id": 2902,
											"odds": "8.00",
											"name": "49"
										}]
									],
								}],
							}, {
								"menuid": 382,
								"name": "\u6b63\u78011-6",
								"played": [{
									"title": "\u6b63\u7801\u4e00",
									"data": [
										[{
											"id": 2903,
											"odds": "1.98",
											"name": "\u5927\u7801"
										}, {
											"id": 2904,
											"odds": "1.98",
											"name": "\u5c0f\u7801",
										}],
										[{
											"id": 2905,
											"odds": "1.98",
											"name": "\u5355\u7801"
										}, {
											"id": 2906,
											"odds": "1.98",
											"name": "\u53cc\u7801",
										}],
										[{
											"id": 2907,
											"odds": "1.98",
											"name": "\u5408\u5927"
										}, {
											"id": 2908,
											"odds": "1.98",
											"name": "\u5408\u5c0f",
										}],
										[{
											"id": 2909,
											"odds": "1.98",
											"name": "\u5408\u5355"
										}, {
											"id": 2910,
											"odds": "1.98",
											"name": "\u5408\u53cc",
										}],
										[{
											"id": 2911,
											"odds": "1.98",
											"name": "\u5c3e\u5927"
										}, {
											"id": 2912,
											"odds": "1.98",
											"name": "\u5c3e\u5c0f",
										}],
										[{
											"id": 2913,
											"odds": "2.87",
											"name": "\u7ea2\u6ce2"
										}, {
											"id": 2914,
											"odds": "2.97",
											"name": "\u84dd\u6ce2",
										}, {
											"id": 2915,
											"odds": "2.97",
											"name": "\u7eff\u6ce2"
										}]
									],
								}, {
									"title": "\u6b63\u7801\u4e8c",
									"data": [
										[{
											"id": 2916,
											"odds": "1.98",
											"name": "\u5927\u7801"
										}, {
											"id": 2917,
											"odds": "1.98",
											"name": "\u5c0f\u7801",
										}],
										[{
											"id": 2918,
											"odds": "1.98",
											"name": "\u5355\u7801"
										}, {
											"id": 2919,
											"odds": "1.98",
											"name": "\u53cc\u7801",
										}],
										[{
											"id": 2920,
											"odds": "1.98",
											"name": "\u5408\u5927"
										}, {
											"id": 2921,
											"odds": "1.98",
											"name": "\u5408\u5c0f",
										}],
										[{
											"id": 2922,
											"odds": "1.98",
											"name": "\u5408\u5355"
										}, {
											"id": 2923,
											"odds": "1.98",
											"name": "\u5408\u53cc",
										}],
										[{
											"id": 2924,
											"odds": "1.98",
											"name": "\u5c3e\u5927"
										}, {
											"id": 2925,
											"odds": "1.98",
											"name": "\u5c3e\u5c0f",
										}],
										[{
											"id": 2926,
											"odds": "2.87",
											"name": "\u7ea2\u6ce2"
										}, {
											"id": 2927,
											"odds": "2.97",
											"name": "\u84dd\u6ce2",
										}, {
											"id": 2928,
											"odds": "2.97",
											"name": "\u7eff\u6ce2"
										}]
									],
								}, {
									"title": "\u6b63\u7801\u4e09",
									"data": [
										[{
											"id": 2929,
											"odds": "1.98",
											"name": "\u5927\u7801"
										}, {
											"id": 2930,
											"odds": "1.98",
											"name": "\u5c0f\u7801",
										}],
										[{
											"id": 2931,
											"odds": "1.98",
											"name": "\u5355\u7801"
										}, {
											"id": 2932,
											"odds": "1.98",
											"name": "\u53cc\u7801",
										}],
										[{
											"id": 2933,
											"odds": "1.98",
											"name": "\u5408\u5927"
										}, {
											"id": 2934,
											"odds": "1.98",
											"name": "\u5408\u5c0f",
										}],
										[{
											"id": 2935,
											"odds": "1.98",
											"name": "\u5408\u5355"
										}, {
											"id": 2936,
											"odds": "1.98",
											"name": "\u5408\u53cc",
										}],
										[{
											"id": 2937,
											"odds": "1.98",
											"name": "\u5c3e\u5927"
										}, {
											"id": 2938,
											"odds": "1.98",
											"name": "\u5c3e\u5c0f",
										}],
										[{
											"id": 2939,
											"odds": "2.87",
											"name": "\u7ea2\u6ce2"
										}, {
											"id": 2940,
											"odds": "2.97",
											"name": "\u84dd\u6ce2",
										}, {
											"id": 2941,
											"odds": "2.97",
											"name": "\u7eff\u6ce2"
										}]
									],
								}, {
									"title": "\u6b63\u7801\u56db",
									"data": [
										[{
											"id": 2942,
											"odds": "1.98",
											"name": "\u5927\u7801"
										}, {
											"id": 2943,
											"odds": "1.98",
											"name": "\u5c0f\u7801",
										}],
										[{
											"id": 2944,
											"odds": "1.98",
											"name": "\u5355\u7801"
										}, {
											"id": 2945,
											"odds": "1.98",
											"name": "\u53cc\u7801",
										}],
										[{
											"id": 2946,
											"odds": "1.98",
											"name": "\u5408\u5927"
										}, {
											"id": 2947,
											"odds": "1.98",
											"name": "\u5408\u5c0f",
										}],
										[{
											"id": 2948,
											"odds": "1.98",
											"name": "\u5408\u5355"
										}, {
											"id": 2949,
											"odds": "1.98",
											"name": "\u5408\u53cc",
										}],
										[{
											"id": 2950,
											"odds": "1.98",
											"name": "\u5c3e\u5927"
										}, {
											"id": 2951,
											"odds": "1.98",
											"name": "\u5c3e\u5c0f",
										}],
										[{
											"id": 2952,
											"odds": "2.87",
											"name": "\u7ea2\u6ce2"
										}, {
											"id": 2953,
											"odds": "2.97",
											"name": "\u84dd\u6ce2",
										}, {
											"id": 2954,
											"odds": "2.97",
											"name": "\u7eff\u6ce2"
										}]
									],
								}, {
									"title": "\u6b63\u7801\u4e94",
									"data": [
										[{
											"id": 2955,
											"odds": "1.98",
											"name": "\u5927\u7801"
										}, {
											"id": 2956,
											"odds": "1.98",
											"name": "\u5c0f\u7801",
										}],
										[{
											"id": 2957,
											"odds": "1.98",
											"name": "\u5355\u7801"
										}, {
											"id": 2958,
											"odds": "1.98",
											"name": "\u53cc\u7801",
										}],
										[{
											"id": 2959,
											"odds": "1.98",
											"name": "\u5408\u5927"
										}, {
											"id": 2960,
											"odds": "1.98",
											"name": "\u5408\u5c0f",
										}],
										[{
											"id": 2961,
											"odds": "1.98",
											"name": "\u5408\u5355"
										}, {
											"id": 2962,
											"odds": "1.98",
											"name": "\u5408\u53cc",
										}],
										[{
											"id": 2963,
											"odds": "1.98",
											"name": "\u5c3e\u5927"
										}, {
											"id": 2964,
											"odds": "1.98",
											"name": "\u5c3e\u5c0f",
										}],
										[{
											"id": 2965,
											"odds": "2.87",
											"name": "\u7ea2\u6ce2"
										}, {
											"id": 2966,
											"odds": "2.97",
											"name": "\u84dd\u6ce2",
										}, {
											"id": 2967,
											"odds": "2.97",
											"name": "\u7eff\u6ce2"
										}]
									],
								}, {
									"title": "\u6b63\u7801\u516d",
									"data": [
										[{
											"id": 2968,
											"odds": "1.98",
											"name": "\u5927\u7801"
										}, {
											"id": 2969,
											"odds": "1.98",
											"name": "\u5c0f\u7801",
										}],
										[{
											"id": 2970,
											"odds": "1.98",
											"name": "\u5355\u7801"
										}, {
											"id": 2971,
											"odds": "1.98",
											"name": "\u53cc\u7801",
										}],
										[{
											"id": 2972,
											"odds": "1.98",
											"name": "\u5408\u5927"
										}, {
											"id": 2973,
											"odds": "1.98",
											"name": "\u5408\u5c0f",
										}],
										[{
											"id": 2974,
											"odds": "1.98",
											"name": "\u5408\u5355"
										}, {
											"id": 2975,
											"odds": "1.98",
											"name": "\u5408\u53cc",
										}],
										[{
											"id": 2976,
											"odds": "1.98",
											"name": "\u5c3e\u5927"
										}, {
											"id": 2977,
											"odds": "1.98",
											"name": "\u5c3e\u5c0f",
										}],
										[{
											"id": 2978,
											"odds": "2.87",
											"name": "\u7ea2\u6ce2"
										}, {
											"id": 2979,
											"odds": "2.97",
											"name": "\u84dd\u6ce2",
										}, {
											"id": 2980,
											"odds": "2.97",
											"name": "\u7eff\u6ce2"
										}]
									],
								}],
							}, {
								"menuid": 389,
								"name": "\u8272\u6ce2",
								"played": [{
									"title": "7\u8272\u6ce2",
									"data": [
										[{
											"id": 2981,
											"odds": "2.67",
											"name": "\u7ea2\u6ce2"
										}, {
											"id": 2982,
											"odds": "2.97",
											"name": "\u84dd\u6ce2",
										}],
										[{
											"id": 2983,
											"odds": "2.97",
											"name": "\u7eff\u6ce2"
										}, {
											"id": 2984,
											"odds": "26.00",
											"name": "\u548c\u5c40",
										}]
									],
								}, {
									"title": "\u7ea2\u7403",
									"data": [
										[{
											"id": 2985,
											"odds": "5.61",
											"name": "\u7ea2\u5355"
										}, {
											"id": 2986,
											"odds": "5.06",
											"name": "\u7ea2\u53cc",
										}],
										[{
											"id": 2987,
											"odds": "6.51",
											"name": "\u7ea2\u5927"
										}, {
											"id": 2988,
											"odds": "4.51",
											"name": "\u7ea2\u5c0f",
										}],
										[{
											"id": 2989,
											"odds": "14.60",
											"name": "\u7ea2\u5927\u5355"
										}, {
											"id": 2990,
											"odds": "11.00",
											"name": "\u7ea2\u5927\u53cc",
										}],
										[{
											"id": 2991,
											"odds": "8.80",
											"name": "\u7ea2\u5c0f\u5355"
										}, {
											"id": 2992,
											"odds": "8.80",
											"name": "\u7ea2\u5c0f\u53cc",
										}]
									],
								}, {
									"title": "\u84dd\u7403",
									"data": [
										[{
											"id": 2993,
											"odds": "5.61",
											"name": "\u84dd\u5355"
										}, {
											"id": 2994,
											"odds": "5.61",
											"name": "\u84dd\u53cc",
										}],
										[{
											"id": 2995,
											"odds": "5.06",
											"name": "\u84dd\u5927"
										}, {
											"id": 2996,
											"odds": "6.51",
											"name": "\u84dd\u5c0f",
										}],
										[{
											"id": 2997,
											"odds": "8.80",
											"name": "\u84dd\u5927\u5355"
										}, {
											"id": 2998,
											"odds": "11.00",
											"name": "\u84dd\u5927\u53cc",
										}],
										[{
											"id": 2999,
											"odds": "14.60",
											"name": "\u84dd\u5c0f\u5355"
										}, {
											"id": 3000,
											"odds": "11.00",
											"name": "\u84dd\u5c0f\u53cc",
										}]
									],
								}, {
									"title": "\u7eff\u7403",
									"data": [
										[{
											"id": 3001,
											"odds": "5.61",
											"name": "\u7eff\u5355"
										}, {
											"id": 3002,
											"odds": "6.51",
											"name": "\u7eff\u53cc",
										}],
										[{
											"id": 3003,
											"odds": "5.06",
											"name": "\u7eff\u5927"
										}, {
											"id": 3004,
											"odds": "6.51",
											"name": "\u7eff\u5c0f",
										}],
										[{
											"id": 3005,
											"odds": "11.00",
											"name": "\u7eff\u5927\u5355"
										}, {
											"id": 3006,
											"odds": "11.00",
											"name": "\u7eff\u5927\u53cc",
										}],
										[{
											"id": 3007,
											"odds": "11.00",
											"name": "\u7eff\u5c0f\u5355"
										}, {
											"id": 3008,
											"odds": "14.60",
											"name": "\u7eff\u5c0f\u53cc",
										}]
									],
								}],
							}, {
								"menuid": 394,
								"name": "\u7279\u7801\u5934\u5c3e\u6570",
								"played": [{
									"title": "\u5934\u6570",
									"data": [
										[{
											"id": 3009,
											"odds": "5.00",
											"name": "0\u5934"
										}, {
											"id": 3010,
											"odds": "4.50",
											"name": "1\u5934",
										}],
										[{
											"id": 3011,
											"odds": "4.50",
											"name": "2\u5934"
										}, {
											"id": 3012,
											"odds": "4.50",
											"name": "3\u5934",
										}, {
											"id": 3013,
											"odds": "4.50",
											"name": "4\u5934"
										}]
									],
								}, {
									"title": "\u5c3e\u6570",
									"data": [
										[{
											"id": 3014,
											"odds": "11.50",
											"name": "0\u5c3e"
										}],
										[{
											"id": 3015,
											"odds": "9.20",
											"name": "1\u5c3e",
										}],
										[{
											"id": 3016,
											"odds": "9.20",
											"name": "2\u5c3e"
										}],
										[{
											"id": 3017,
											"odds": "9.20",
											"name": "3\u5c3e",
										}],
										[{
											"id": 3018,
											"odds": "9.20",
											"name": "4\u5c3e"
										}],
										[{
											"id": 3019,
											"odds": "9.20",
											"name": "5\u5c3e",
										}],
										[{
											"id": 3020,
											"odds": "9.20",
											"name": "6\u5c3e"
										}],
										[{
											"id": 3021,
											"odds": "9.20",
											"name": "7\u5c3e",
										}],
										[{
											"id": 3022,
											"odds": "9.20",
											"name": "8\u5c3e"
										}],
										[{
											"id": 3023,
											"odds": "9.20",
											"name": "9\u5c3e"
										}]
									],
								}],
							}, {
								"menuid": 397,
								"name": "\u603b\u8096",
								"played": [{
									"title": "\u603b\u8096",
									"data": [
										[{
											"id": 3024,
											"odds": "15.50",
											"name": "2\u8096"
										}, {
											"id": 3025,
											"odds": "15.50",
											"name": "3\u8096",
										}],
										[{
											"id": 3026,
											"odds": "15.50",
											"name": "4\u8096"
										}, {
											"id": 3027,
											"odds": "3.10",
											"name": "5\u8096",
										}],
										[{
											"id": 3028,
											"odds": "1.99",
											"name": "6\u8096"
										}, {
											"id": 3029,
											"odds": "5.80",
											"name": "7\u8096",
										}],
										[{
											"id": 3030,
											"odds": "1.99",
											"name": "\u603b\u8096\u5355"
										}, {
											"id": 3031,
											"odds": "1.99",
											"name": "\u603b\u8096\u53cc",
										}]
									],
								}],
							}, {
								"menuid": 399,
								"name": "\u4e00\u8096",
								"played": [{
									"title": "\u4e00\u8096",
									"data": [
										[{
											"id": 3032,
											"odds": "2.10",
											"name": "\u9f20"
										}],
										[{
											"id": 3033,
											"odds": "2.10",
											"name": "\u725b",
										}],
										[{
											"id": 3034,
											"odds": "2.10",
											"name": "\u864e"
										}],
										[{
											"id": 3035,
											"odds": "2.10",
											"name": "\u5154",
										}],
										[{
											"id": 3036,
											"odds": "2.10",
											"name": "\u9f99"
										}],
										[{
											"id": 3037,
											"odds": "2.10",
											"name": "\u86c7",
										}],
										[{
											"id": 3038,
											"odds": "2.10",
											"name": "\u9a6c"
										}],
										[{
											"id": 3039,
											"odds": "2.10",
											"name": "\u7f8a",
										}],
										[{
											"id": 3040,
											"odds": "2.10",
											"name": "\u7334"
										}],
										[{
											"id": 3041,
											"odds": "2.10",
											"name": "\u9e21",
										}],
										[{
											"id": 3042,
											"odds": "1.80",
											"name": "\u72d7"
										}],
										[{
											"id": 3043,
											"odds": "2.10",
											"name": "\u732a"
										}]
									],
								}],
							}, {
								"menuid": 401,
								"name": "\u7279\u8096",
								"played": [{
									"title": "\u7279\u8096",
									"data": [
										[{
											"id": 3044,
											"odds": "11.50",
											"name": "\u9f20"
										}],
										[{
											"id": 3045,
											"odds": "11.50",
											"name": "\u725b",
										}],
										[{
											"id": 3046,
											"odds": "11.50",
											"name": "\u864e"
										}],
										[{
											"id": 3047,
											"odds": "11.50",
											"name": "\u5154",
										}],
										[{
											"id": 3048,
											"odds": "11.50",
											"name": "\u9f99"
										}],
										[{
											"id": 3049,
											"odds": "11.50",
											"name": "\u86c7",
										}],
										[{
											"id": 3050,
											"odds": "11.50",
											"name": "\u9a6c"
										}],
										[{
											"id": 3051,
											"odds": "11.50",
											"name": "\u7f8a",
										}],
										[{
											"id": 3052,
											"odds": "11.50",
											"name": "\u7334"
										}],
										[{
											"id": 3053,
											"odds": "11.50",
											"name": "\u9e21",
										}],
										[{
											"id": 3054,
											"odds": "9.70",
											"name": "\u72d7"
										}],
										[{
											"id": 3055,
											"odds": "11.50",
											"name": "\u732a"
										}]
									],
								}],
							}, {
								"menuid": 403,
								"name": "\u6b63\u8096",
								"played": [{
									"title": "\u6b63\u8096",
									"data": [
										[{
											"id": 3056,
											"odds": "1.98",
											"name": "\u9f20"
										}],
										[{
											"id": 3057,
											"odds": "1.98",
											"name": "\u725b",
										}],
										[{
											"id": 3058,
											"odds": "1.98",
											"name": "\u864e"
										}],
										[{
											"id": 3059,
											"odds": "1.98",
											"name": "\u5154",
										}],
										[{
											"id": 3060,
											"odds": "1.98",
											"name": "\u9f99"
										}],
										[{
											"id": 3061,
											"odds": "1.98",
											"name": "\u86c7",
										}],
										[{
											"id": 3062,
											"odds": "1.98",
											"name": "\u9a6c"
										}],
										[{
											"id": 3063,
											"odds": "1.98",
											"name": "\u7f8a",
										}],
										[{
											"id": 3064,
											"odds": "1.98",
											"name": "\u7334"
										}],
										[{
											"id": 3065,
											"odds": "1.98",
											"name": "\u9e21",
										}],
										[{
											"id": 3066,
											"odds": "1.68",
											"name": "\u72d7"
										}],
										[{
											"id": 3067,
											"odds": "1.98",
											"name": "\u732a"
										}]
									],
								}],
							}, {
								"menuid": 405,
								"name": "\u4e94\u884c",
								"played": [{
									"title": "\u4e94\u884c",
									"data": [
										[{
											"id": 3068,
											"odds": "4.10",
											"name": "\u91d1"
										}, {
											"id": 3069,
											"odds": "4.10",
											"name": "\u6728",
										}],
										[{
											"id": 3070,
											"odds": "4.10",
											"name": "\u6c34"
										}, {
											"id": 3071,
											"odds": "4.10",
											"name": "\u706b",
										}],
										[{
											"id": 3072,
											"odds": "4.50",
											"name": "\u571f"
										}]
									],
								}],
							}],
						},
					},
				};
				this._renderdata(_data, 3); //渲染视图数据
			},
			upperCase(val) {
				setTimeout(() => {
					let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0, Math.max(scrollHeight - 1, 0));
				}, 100)
				this.moneys = val.replace(/[^\d]/g, '');
			},
			_checkgameid(_id, _type) { //切换列表玩法
				this.id = _id;
				localStorage.setItem("gameid", _id);
				
				if (_type == 7) {
					if (_id == 4) {
					this.$router.push("/betindex/gd11x5");
					} else if (_id == 9) {
					this.$router.push("/betindex/jx11x5");
					} else if (_id == 11) {
					this.$router.push("/betindex/js11x5");
					} else if (_id == 12) {
					this.$router.push("/betindex/gx11x5");
					}
					return;
				}
				if (this.typeid == _type) { //如果是同一类彩种,重新查询
					this._changetab();
					this._initdata();
					this.live_on = false;
					this.data_live = '';
					return false;
				}
				localStorage.setItem("typeid", _type);
				if (_id == 61) {
					this.$router.push('/betindex/xyncclass'); //返回首页
				} else {
					this.$router.push('/betindex/' + _typeid[_type]); //返回首页
				}
			},
			_initdata() { //查询数据
				$api.$post('Api/Ajax/lottery_bet', {
					type: this.id
				}).then((res) => {
					this._renderdata(res, 1); //渲染视图数据
					if (res.data.data.is_open == 0) { //未开奖
						this._initdatanext(); //计算倒计时
					}
				});
			},
			setDomSelStatus(e, item, parentItem) {//设置元素选中状态
				if (item != undefined && item.title == "选择类型") {
					if (e.currentTarget.className.indexOf("flex-html seltype-head") == -1) {
						$(`.test${parentItem.menuid} .seltype-head`).removeClass('seltype-head')
						$(`.test${parentItem.menuid} .seltype-choose`).removeClass('seltype-choose')
						e.currentTarget.className = "flex-html seltype-head"; //切换按钮样式//写逻辑
					} else {
						e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
					}
				} else if (item != undefined && item.title == "选择号码") {
					if (e.currentTarget.className.indexOf("flex-html seltype-choose") == -1) {
						e.currentTarget.className = "flex-html seltype-choose"; //切换按钮样式//写逻辑
					} else {
						e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
					}
				}
			},
			_checklist(e, item, parentItem) { //选择已选中的玩法
				if(parentItem !== undefined) {
					if(parentItem.menuid === 796) {//自选不中
						this.setDomSelStatus(e, item, parentItem);
						this.zixuanbuzhongSel = document.querySelectorAll(`.test${parentItem.menuid} .seltype-head`);
						this.zixuanbuzhongList = document.querySelectorAll(`.test${parentItem.menuid} .seltype-choose`);
						this.wubuzhongArr = [];
						this.wubuzhongNum = 0;
						if (this.zixuanbuzhongSel.length != 0) { 
							let _title = this.zixuanbuzhongSel[0].getAttribute("data-item").split("|")[1];
							let selfArr = [];
							for (var i = 0; i < this.zixuanbuzhongList.length; i++) {
								selfArr.push(this.zixuanbuzhongList[i].getAttribute("data-item").split("|")[1]);
							}
							if((_title === '五不中' && selfArr.length >= 5) || 
							(_title === '六不中' && selfArr.length >= 6) || 
							(_title === '七不中' && selfArr.length >= 7) || 
							(_title === '八不中' && selfArr.length >= 8) || 
							(_title === '九不中' && selfArr.length >= 9) || 
							(_title === '十不中' && selfArr.length >= 10) || 
							(_title === '十一不中' && selfArr.length >= 11) || 
							(_title === '十二不中' && selfArr.length >= 12) || 
							(_title === '十三不中' && selfArr.length >= 13)) {
								this.wubuzhongArr = selfArr;
								this.wubuzhongNum = 1;
							}
						}
					} else if(parentItem.menuid === 673 || parentItem.menuid === 676) {//连码
						this.setDomSelStatus(e, item, parentItem);
						this.checkallSelfDom = document.querySelectorAll(`.test${parentItem.menuid} .seltype-choose`);
						this.checkallSelfheadDom = document.querySelectorAll(`.test${parentItem.menuid} .seltype-head`);
						this.codeArr = [];
						
						if (this.checkallSelfheadDom.length != 0) {
							let _title = this.checkallSelfheadDom[0].getAttribute("data-item").split("|")[1];
							let selfArr = [];
							for (var i = 0; i < this.checkallSelfDom.length; i++) {
								selfArr.push(this.checkallSelfDom[i].getAttribute("data-item").split("|")[1]);
							}
							if (_title === '四全中' && selfArr.length > 0) {
								this.codeArr = this.group(selfArr, 4);
							} else if ((_title === '三全中' || _title.split('@')[0] === '三中二') && selfArr.length > 0) {
								this.codeArr = this.group(selfArr, 3);
							} else if ((_title === '二全中' || _title.split('@')[0] === '二中特' || _title === '特串') && selfArr.length > 0) {
								this.codeArr = this.group(selfArr, 2);
							}
						}
					} else if(parentItem.menuid === 802){//合肖
						this.setDomSelStatus(e, item, parentItem);
						this.hexiaoSel = document.querySelectorAll(`.test${parentItem.menuid} .seltype-head`);
						this.hexiaoSelList = document.querySelectorAll(`.test${parentItem.menuid} .seltype-choose`);
						this.selhexiaoData = [];
						this.hexiaoConfirmList = [];
						this.hexiaoNum = 0;
						if (this.hexiaoSel.length != 0) { 
							let _title = this.hexiaoSel[0].getAttribute("data-item").split("|")[1];
							let selfArr = [];
							
							for (var i = 0; i < this.hexiaoSelList.length; i++) {
								selfArr.push(this.hexiaoSelList[i].getAttribute("data-item").split("|")[1]);
							}
							if(_title === '合肖中' && 11 >= selfArr.length && selfArr.length >= 2) {
								this.selhexiaoData[0] = {
									odds: item.data[0][selfArr.length - 2].odds,
									id: item.data[0][selfArr.length - 2].id,
									title: _title
								}
								this.hexiaoNum = 1;
								this.hexiaoConfirmList = selfArr;
							}
							if(_title === '合肖不中' && 10 >= selfArr.length && selfArr.length >= 1) {
								this.selhexiaoData[1] = {
									odds: item.data[0][selfArr.length + 9].odds,
									id: item.data[0][selfArr.length + 9].id,
									title: _title
								}
								this.hexiaoNum = 1;
								this.hexiaoConfirmList = selfArr;
							}
						}
					}else if(parentItem.menuid === 808) {//连尾
						this.setDomSelStatus(e, item, parentItem);
						this.lianweiSel = document.querySelectorAll(`.test${parentItem.menuid} .seltype-head`);
						this.lianweiList = document.querySelectorAll(`.test${parentItem.menuid} .seltype-choose`);
						this.lianweiArr = [];
						this.lianweiNum = 0;
						if (this.lianweiSel.length != 0) { 
							let _title = this.lianweiSel[0].getAttribute("data-item").split("|")[1];
							let selfArr = [];
							for (var i = 0; i < this.lianweiList.length; i++) {
								selfArr.push(this.lianweiList[i].getAttribute("data-item").split("|")[1]);
							}
							if((_title === '二尾碰' && selfArr.length >= 2) || 
							(_title === '三尾碰' && selfArr.length >= 3) || 
							(_title === '四尾碰' && selfArr.length >= 4) || 
							(_title === '五尾碰' && selfArr.length >= 5)) {
								this.lianweiArr = selfArr;
								this.lianweiNum = 1;
							}
						}
					}else if(parentItem.menuid === 814) {//连肖
						this.setDomSelStatus(e, item, parentItem);
						this.lianxiaoSel = document.querySelectorAll(`.test${parentItem.menuid} .seltype-head`);
						this.lianxiaoList = document.querySelectorAll(`.test${parentItem.menuid} .seltype-choose`);
						this.lianxiaoArr = [];
						this.lianxiaoNum = 0;
						if (this.lianxiaoSel.length != 0) { 
							let _title = this.lianxiaoSel[0].getAttribute("data-item").split("|")[1].split('@')[0];
							let selfArr = [];
							for (var i = 0; i < this.lianxiaoList.length; i++) {
								selfArr.push(this.lianxiaoList[i].getAttribute("data-item").split("|")[1]);
							}
							if((_title === '二肖连' && selfArr.length >= 2) || 
							(_title === '三肖连' && selfArr.length >= 3) || 
							(_title === '四肖连' && selfArr.length >= 4) || 
							(_title === '五肖连' && selfArr.length >= 5)) {
								this.lianxiaoArr = selfArr;
								this.lianxiaoNum = 1; 
							}
						}
					}
				}else {
					if (e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
						e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
					} else {
						e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
					}
					this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose");
					
				}
				
				
			},
			group(nu, groupl, result) { //数组
				var result = result ? result : [];
				var nul = nu.length;
				var outloopl = nul - groupl;

				var nuc = nu.slice(0);

				var item = nuc.shift();
				item = item.constructor === Array ? item : [item];


				(function func(item, nuc) {
					var itemc;
					var nucc = nuc.slice(0);
					var margin = groupl - item.length


					if (margin == 0) {
						result.push(item);
						return;
					}
					if (margin == 1) {
						for (var j in nuc) {
							itemc = item.slice(0);
							itemc.push(nuc[j]);
							result.push(itemc);
						}
					}
					if (margin > 1) {
						itemc = item.slice(0);
						itemc.push(nucc.shift());
						func(itemc, nucc);

						if (item.length + nucc.length >= groupl) {
							func(item, nucc);
						}

					}

				})(item, nuc);


				if (nuc.length >= groupl) {
					return this.group(nuc, groupl, result);
				} else {
					return result;
				}

			},
			_checkNumber(_sum) {
				var reg = /^[0-9]+.?[0-9]*$/;
				if (reg.test(_sum)) {
					return "_" + _sum;
				}
				return "_textbg";
			},
			_tailnumber(val) {
				var _newarr = [];
				var _allsum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17",
					"18", "19", "20",
					"21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
					"40", "41",
					"42", "43", "44", "45", "46", "47", "48", "49"
				];
				for (var i = 0; i < _allsum.length; i++) {
					if (_allsum[i].split("")[1] == parseInt(val)) {
						_newarr.push(_allsum[i]);
					}
				}
				return _newarr;
			},
			_getNian() {
				var CalendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5,
					0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D,
					0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA,
					0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25,
					0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957,
					0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5,
					0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57,
					0x52B, 0xA93, 0x40E95
				];
				var madd = new Array(12);
				var cYear, cMonth, cDay, TheDate;
				madd[0] = 0;
				madd[1] = 31;
				madd[2] = 59;
				madd[3] = 90;
				madd[4] = 120;
				madd[5] = 151;
				madd[6] = 181;
				madd[7] = 212;
				madd[8] = 243;
				madd[9] = 273;
				madd[10] = 304;
				madd[11] = 334;

				function GetBit(m, n) {
					return (m >> n) & 1;
				}

				function e2c() {
					TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
					var total, m, n, k;
					var isEnd = false;
					var tmp = TheDate.getYear();
					if (tmp < 1900) {
						tmp += 1900;
					}
					total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
					if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
						total++;
					}
					for (m = 0;; m++) {
						k = (CalendarData[m] < 0xfff) ? 11 : 12;
						for (n = k; n >= 0; n--) {
							if (total <= 29 + GetBit(CalendarData[m], n)) {
								isEnd = true;
								break;
							}
							total = total - 29 - GetBit(CalendarData[m], n);
						}
						if (isEnd) break;
					}
					cYear = 1921 + m;
					return cYear;
				}

				function GetLunarDay() {
					var D = new Date();
					var yy = D.getFullYear();
					var mm = D.getMonth() + 1;
					var dd = D.getDate();
					var ww = D.getDay();
					var ss = parseInt(D.getTime() / 1000);
					if (yy < 100) yy = "19" + yy;
					if (yy < 1921 || yy > 3020) {
						return "";
					} else {
						mm = (parseInt(mm) > 0) ? (mm - 1) : 11;
						return e2c(yy, mm, dd);
					}
				}
				return GetLunarDay();
			},
			_allxiao(val) {
				//确定当前生肖
				var ssc = (this.nowNian - 2008) % 12;
				var ssyear = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
				var _index = 0;
				for (var i = 0; i < ssyear.length; i++) {
					if (ssyear[i] == val) {
						_index = ssc - i + 1;
					}
				}
				var _newarr = [];
				var _allsum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17",
					"18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36",
					"37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"
				];
				for (var i = 0; i < _allsum.length; i++) {
					for (var j = 0; j < _allsum.length; j++) {
						if (_allsum[j] == (_index + (i * 12))) {
							_newarr.push(_allsum[j]);
						}
					}
				}
				return _newarr;
			},
			_renderdata(res, _index) { //渲染的数据(定义在main公用方法)
				_commonRenderData(this, res, _index);
			},
			/*-----下面都是公用方法(main里面function)-----*/
			_resize() { //检测屏幕变化,高度变化(定义在main公用方法)
				_commonResize(this);
			},
			_changetab() { //动画切换(定义在main公用方法)
				_commonChangeTab(this);
			},
			_checkmenu(index) { //切换玩法(定义在main公用方法)
				_commonCheckMenu(this, index);
			},
			_getmoneySum() { //查询开奖之后投注金额结算(定义在main公用方法)
				_commonGetMoneySum(this, '/Api/User/updateUser');
			},
			_initdatanext() { //下一期开奖号码获取(定义在main公用方法)
				_commonInitdataNext(this, 'Api/Ajax/lottery_time');
			},
			_timeset() { //定时器(定义在main公用方法)
				this.$nextTick(() => {
					_commonSetTimeLottery(this);
				});
			},
			_setheight() { //(在main公用方法function)
				this.$nextTick(() => {
					_commonSetHeight();
				});
			},
			_show_live() { //开启直播(在main公用方法function)
				_commonShowLive(this);
			},
			_detailed() { //显示清单列表弹框(在main公用方法function)
				//_t.allmoney = 0;
				//_t.betlist = [];
				//_t.bet = [];
				this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose"); //获取所有选中标签
				
				/* 自选不中 */
				this.zixuanbuzhongSel = document.querySelectorAll(".test796 .seltype-head");
				if(this.zixuanbuzhongSel.length > 0) {
					this.zixuanbuzhongList = document.querySelectorAll(".test796 .seltype-choose");
					let strArr = [];
					let _title;
					_title = this.zixuanbuzhongSel[0].getAttribute("data-item").split("|")[1];
					for (var i = 0; i < this.zixuanbuzhongList.length; i++) {
						strArr.push(this.zixuanbuzhongList[i].getAttribute("data-item").split("|")[1]);
					}
					if(_title === '五不中' && strArr.length !== 5) {
						this.plainalert('类型【五不中】只能选择5个号码！');
						return;
					}else if(_title === '六不中' && strArr.length !== 6) {
						this.plainalert('类型【六不中】只能选择6个号码！');
						return;
					}else if(_title === '七不中' && strArr.length !== 7) {
						this.plainalert('类型【七不中】只能选择7个号码！');
						return;
					}else if(_title === '八不中' && strArr.length !== 8) {
						this.plainalert('类型【八不中】只能选择8个号码！');
						return;
					}else if(_title === '九不中' && strArr.length !== 9) {
						this.plainalert('类型【九不中】只能选择9个号码！');
						return;
					}else if(_title === '十不中' && strArr.length !== 10) {
						this.plainalert('类型【十不中】只能选择10个号码！');
						return;
					}else if(_title === '十一不中' && strArr.length !== 11) {
						this.plainalert('类型【十一不中】只能选择11个号码！');
						return;
					}else if(_title === '十二不中' && strArr.length !== 12) {
						this.plainalert('类型【十二不中】只能选择12个号码！');
						return;
					}
				}
				
				/* 连尾 */
				this.lianweiSel = document.querySelectorAll(".test808 .seltype-head");
				if(this.lianweiSel.length > 0) {
					this.lianweiList = document.querySelectorAll(".test808 .seltype-choose");
					let strArr = [];
					let _title;
					_title = this.lianweiSel[0].getAttribute("data-item").split("|")[1];
					for (var i = 0; i < this.lianweiList.length; i++) {
						strArr.push(this.lianweiList[i].getAttribute("data-item").split("|")[1]);
					}
					if(_title === '二尾碰' && strArr.length !== 2) {
						this.plainalert('类型【二尾碰】只能选择2个号码！');
						return;
					} else if(_title === '三尾碰' && strArr.length !== 3) {
						this.plainalert('类型【三尾碰】只能选择3个号码！');
						return;
					} else if(_title === '四尾碰' && strArr.length !== 4) {
						this.plainalert('类型【四尾碰】只能选择4个号码！');
						return;
					} else if(_title === '五尾碰' && strArr.length !== 5) {
						this.plainalert('类型【五尾碰】只能选择5个号码！');
						return;
					}
				}
				
				/* 合肖 */
				this.hexiaoSelList = document.querySelectorAll(".test802 .seltype-head");
				if(this.hexiaoSelList.length > 0) {
					let strArr = this.hexiaoConfirmList;
					let _title = this.hexiaoSelList[0].getAttribute("data-item").split("|")[1];
					if(_title === '合肖中' && (strArr.length < 2 || strArr.length > 11)) {
						this.plainalert('类型【合肖中】只能选择2到11个号码！');
						return;
					} else if(_title === '合肖不中' && (strArr.length < 1 || strArr.length > 10)) {
						this.plainalert('类型【合肖不中】只能选择1到10个号码！');
						return;
					}
				}
				
				/* 连肖 */
				this.lianxiaoSel = document.querySelectorAll(".test814 .seltype-head");
				if(this.lianxiaoSel.length > 0) {
					//this.lianweiList = document.querySelectorAll(".test808 .seltype-choose");;
					let _title = this.lianxiaoSel[0].getAttribute("data-item").split("|")[1].split('@')[0];
					if(_title === '二肖连' && this.lianxiaoArr.length !== 2) {
						this.plainalert('类型【二肖连】只能选择2个生肖！');
						return;
					}else if(_title === '三肖连' && this.lianxiaoArr.length !== 3) {
						this.plainalert('类型【三肖连】只能选择3个生肖！');
						return;
					}else if(_title === '四肖连' && this.lianxiaoArr.length !== 4) {
						this.plainalert('类型【四肖连】只能选择4个生肖！');
						return;
					}else if(_title === '五肖连' && this.lianxiaoArr.length !== 5) {
						this.plainalert('类型【五肖连】只能选择5个生肖！');
						return;
					}
// 					if(_title === '合肖中' && (this.lianweiList.length < 2 || this.lianweiList.length > 11)) {
// 						this.plainalert('类型【合肖中】只能选择2到11个号码！');
// 						return;
// 					} else if(_title === '合肖不中' && (this.lianweiList.length < 1 || this.lianweiList.length > 10)) {
// 						this.plainalert('类型【合肖不中】只能选择1到10个号码！');
// 						return;
// 					}
				}
				console.log(this.menu_list)
				/* 连码 */
				let lianmaStr = this.menu_list.find(n => {
					return n.name === '连码'
				})
				console.log(lianmaStr)
				if(lianmaStr !== undefined) lianmaStr = lianmaStr.menuid;
				this.checkallSelfheadDom = document.querySelectorAll(`.test${lianmaStr} .seltype-head`); //获取所有选中标签
				if (this.checkallSelfheadDom.length > 0) {
					this.checkallSelfDom = document.querySelectorAll(`.test${lianmaStr} .seltype-choose`); //获取所有选中标签
					let strArr = [];
					let _title;
					_title = this.checkallSelfheadDom[0].getAttribute("data-item").split("|")[1];
					for (var i = 0; i < this.checkallSelfDom.length; i++) {
						strArr.push(this.checkallSelfDom[i].getAttribute("data-item").split("|")[1]);
					}

					if (_title === '四全中' && (strArr.length < 4 || strArr.length > 16)) {
						this.plainalert('类型【四全中】限制选择4到16个号码！');
						return;
					} else if ((_title === '三全中' || _title.split('@')[0] === '三中二') && (strArr.length < 3 || strArr.length > 12)) {
						if (_title === '三全中') {
							this.plainalert('类型【三全中】限制选择3到12个号码！');
						}
						if (_title.indexOf('@') != -1) {
							this.plainalert('类型【三中二】限制选择3到12个号码！');
						}
						return;
					} else if ((_title === '二全中' || _title.split('@')[0] === '二中特' || _title === '特串') && (strArr.length < 2 || strArr.length > 8)) {
						if (_title === '二全中') {
							this.plainalert('类型【二全中】限制选择2到8个号码！');
						}
						if (_title.indexOf('@') != -1) {
							this.plainalert('类型【二中特】限制选择2到8个号码！');
						}
						if (_title === '特串') {
							this.plainalert('类型【特串】限制选择2到8个号码！');
						}
						return;
					}
					
// 					
// 					if(_title === '合肖中' && (strArr.length < 2 || strArr.length > 11)) {
// 						this.plainalert('类型【合肖中】只能选择2到11个生肖！');
// 						return;
// 					}
// 					if(_title === '合肖不中' && (strArr.length < 1 || strArr.length > 10)) {
// 						this.plainalert('类型【合肖中】只能选择1到10个生肖！');
// 						return;
// 					}
				}
				_commonDetailed(this);
			},
			_reset() { //重置所有选中(在main公用方法function)
				_commonReset(this);
			},
			_emptyData() { //清空金额和列表(在main公用方法function)
				_commonEmptyData(this);
			},
			_betformdata() { //提交投注(在main公用方法function)
				_commonBetformdata(this, 'Api/Ajax/bet_request');
			},
			_gohome() { //返回上一页(在main公用方法function)
				_commonGoHome();
			},
		}, //方法调用
		beforeDestroy() { //离开路由清除定时器(在main公用方法function)
			_commonClearAllTime(this);
		},
	};
</script>
<style scoped="scoped">
	.seltype-choose {
		background: rgba(205, 0, 5, .4) !important;
		text-shadow: 0 0 0 rgba(255, 255, 255, .23);
		color: #cd0005 !important;
	}

	.seltype-head {
		background: rgba(205, 0, 5, .4) !important;
		text-shadow: 0 0 0 rgba(255, 255, 255, .23);
		color: #cd0005 !important;
	}
	.test814 > div > span > p:first-child span {
		font-weight: 700;
	}
	.test814 > div > span > p:last-child span {
		font-size: 14px;
		color: rgba(0, 0, 0, .5);
		min-width: 30px;
		font-weight: 400;
	}
</style>
