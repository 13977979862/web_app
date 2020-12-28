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
        <div class="header-center">
          {{info.title}}&nbsp;
          <p v-if="iscoin" style="display: inline-block;">({{iscoin}}元)</p>
        </div>
        <div class="header-right" @click="shownavtab = !shownavtab">
          <i class="iconfont icon-weibiaoti15"></i>
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
            <span
              class="timeclassball"
              :class="'time'+item"
              v-for="(item,index) in last_lottery.content"
            >{{item}}</span>
          </h3>
          <h4>
            <span v-for="(item,index) in last_lottery.content2">{{item}}</span>
          </h4>
          <div class="live" @click="_show_live">
            <i class="iconfont icon-02"></i>
            <p>开奖直播</p>
          </div>
        </div>
        <div class="bet-time">
          <div>
            <div style="color: red;margin-right:0;">{{next_lottery.number}}</div>期
          </div>
          <div>
            封盘：
            <span>{{timefeng | sec_time}}</span>
          </div>
          <div>
            开奖：
            <span>{{timeopen | sec_time2}}</span>
          </div>
          <span id="iframe-close" v-show="live_on">关闭</span>
        </div>
      </div>
    </div>
    <!---->
    <div class="bet-box">
      <div class="bet-box-fl wrapper">
        <ul class="content">
          <li
            :class="{'fl-act': menuindex == index}"
            v-for="(item,index) in menu_list"
            @click="_checkmenu(index)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="bet-box-fr wrapper">
        <div class="content">
          <div v-for="(item,index) in menu_list" v-show="menuindex == index">
            <div class="flex-box-sc" v-for="(item2,index2) in item.played">
              <div class="flex-title">{{item2.title}}</div>
              <div class="flex-bodys" v-for="(item3,index3) in item2.data">
                <div
                  class="flex-html"
                  v-for="(item4,index4) in item3"
                  :data-value="item4.id"
                  :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
                  @click="_checklist($event)"
                >
                  <span class="_it1" :class="_checkNumber(item4.name)">
                    <p>{{item4.name}}</p>
                  </span>
                  <span class="_it2">{{item4.odds}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div class="bet-bottom bet_pt" v-if="timefeng>0">
      <div class="flex-box">
        <div class="flex">
          <p>
            已选中
            <strong>{{ checkallDom.length==0 ? "0": checkallDom.length}}</strong>注
          </p>
          <input
            type="tel"
            v-model="moneys"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            maxlength="7"
            :onblur="upperCase(moneys)"
            placeholder="输入金额"
          />
        </div>
        <button @click="_detailed">下注</button>
        <button class="blue" @click="_reset">重置</button>
      </div>
    </div>
    <div class="_fengpan bet_pt" v-if="timefeng<=0">已封盘</div>
    <!---->
  </div>
</template>
<script type="text/ecmascript-6">
import headernav from "../common/headernav";

export default {
  filters: {
    sec_time(val) {
      return opendowntime(val);
    },
    sec_time2(val2) {
      return clockdowntime(val2);
    }
  }, //过滤器
  components: {
    headernav
  }, //组件注册
  computed: {}, //计算属性
  props: {}, //接受参数
  created() {},
  data() {
    return {
      iscoin: "", //金额
      ctab: false,
      typeid: "", //彩种类型
      live_on: false, //是否显示直播
      data_live: "", //直播渲染iframe标签
      id: "", //彩种id
      menu_list: [], //所有玩法彩种和列表
      bet: [], //提交json格式列表清单
      betlist: [], //列表清单
      game: [], //彩种列表
      menuindex: 0, //当前彩种玩法下标
      last_lottery: {}, //本期开奖
      next_lottery: {}, //下一期开奖时间和期数
      info: {}, //彩种信息
      timeopen: 0,
      timefeng: 0,
      moneys: "",
      checkallDom: [],
      allmoney: 0,
      shownavtab: false,
      times1: null, //开奖定时器
      times2: null, //封盘定时器
      getopensum: null, //查询开奖倒计时
      getmoneySum: null, //查询余额倒计时
      overtop7: [], //同号码不能超过7个
      arr_one: [], //判断是否在7个内,同行内
      index7_1: [], //计数器
      arr_one_7: [] //存放每个数组相加的结果
    }; //自定义变量
  },
  mounted() {
    this._firstrender(); //初始化页面渲染
    this.id = localStorage.getItem("gameid"); //初始化获取id
    this.typeid = localStorage.getItem("typeid"); //初始化获取类型
    /*-----------------------防止客户自己随意切换-----------------------*/
    if (this.typeid != 5 || window._typeArr[5].indexOf(Number(this.id)) < 0) {
      //既不属于该类型也不是该类型的id
      this.id = 61; //默认值
      this.typeid = 5; //默认值
    }
    this._initdata(); //防止本页刷新数据没有请求
    this._reset(); //重置界面
  },
  methods: {
    _firstrender() {
      var _data = {
        data: {
          data: {
            coin: 0,
            game: [
              {
                title: "PK\u7c7b",
                data: [
                  { title: "\u8d85\u7ea7\u8d5b\u8f66", id: 81, type: 1 },
                  {
                    title: "\u5317\u4eac\u8d5b\u8f66",
                    id: 50,
                    type: 1
                  },
                  { title: "\u6781\u901fPK\u62fe", id: 72, type: 1 },
                  {
                    title: "\u5e78\u8fd0\u98de\u8247",
                    id: 55,
                    type: 1
                  }
                ]
              },
              {
                title: "\u65f6\u65f6\u5f69",
                data: [
                  { title: "\u91cd\u5e86\u65f6\u65f6\u5f69", id: 1, type: 3 },
                  {
                    title: "\u798f\u5229\u65f6\u65f6\u5f69",
                    id: 73,
                    type: 3
                  },
                  { title: "\u65b0\u7586\u65f6\u65f6\u5f69", id: 80, type: 3 },
                  {
                    title: "\u91cd\u5e86\u5e78\u8fd0\u519c\u573a",
                    id: 61,
                    type: 3
                  }
                ]
              },
              {
                title: "28\u7c7b",
                data: [
                  { title: "PC\u86cb\u86cb", id: 66, type: 2 },
                  { title: "\u52a0\u62ff\u592728", id: 71, type: 2 }
                ]
              },
              {
                title: "\u516d\u5408\u5f69",
                data: [
                  { title: "\u9999\u6e2f\u516d\u5408\u5f69", id: 70, type: 6 }
                ]
              },
              {
                title: "\u5feb\u4e09",
                data: [
                  { title: "\u6c5f\u82cf\u5feb3", id: 10, type: 4 },
                  {
                    title: "\u5317\u4eac\u5feb3",
                    id: 75,
                    type: 4
                  },
                  { title: "\u5e7f\u897f\u5feb3", id: 76, type: 4 },
                  {
                    title: "\u5b89\u5fbd\u5feb3",
                    id: 77,
                    type: 4
                  },
                  { title: "\u6cb3\u5317\u5feb3", id: 78, type: 4 },
                  { title: "\u6e56\u5317\u5feb3", id: 79, type: 4 }
                ]
              }
            ],
            next_lottery: { number: "12345678", time: 0, aciton: 0 },
            last_lottery: {
              time: 0,
              number: 12345678,
              action: 0,
              content: ["01", "02", "03", "04", "05", "06", "07", "08"],
              content2: ["获", "取", "数", "据,", "请", "稍", "等!"]
            },
            is_open: 1,
            info: {
              title: "幸运农场",
              close_time: 0,
              description: "\u6bcf\u592909:52-02:02",
              type: 5,
              video: ""
            },
            menu: [
              {
                menuid: 555,
                name: "\u4e24\u9762",
                played: [
                  {
                    title: "\u603b\u548c",
                    data: [
                      [
                        { id: 2389, odds: "1.95", name: "\u603b\u548c\u5927" },
                        {
                          id: 2391,
                          odds: "1.95",
                          name: "\u603b\u548c\u5355"
                        },
                        { id: 2392, odds: "1.95", name: "\u603b\u548c\u53cc" }
                      ],
                      [
                        {
                          id: 2390,
                          odds: "1.95",
                          name: "\u603b\u548c\u5c0f"
                        },
                        { id: 2393, odds: "1.95", name: "\u603b\u5c3e\u5927" },
                        {
                          id: 2394,
                          odds: "1.95",
                          name: "\u603b\u5c3e\u5c0f"
                        }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u4e00\u7403",
                    data: [
                      [
                        { id: 2395, odds: "1.95", name: "\u5927" },
                        {
                          id: 2396,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2397, odds: "1.95", name: "\u5355" },
                        {
                          id: 2398,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2399, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2400,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2401, odds: "1.95", name: "\u9f99" },
                        { id: 2402, odds: "1.95", name: "\u864e" }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u4e8c\u7403",
                    data: [
                      [
                        { id: 2403, odds: "1.95", name: "\u5927" },
                        {
                          id: 2404,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2405, odds: "1.95", name: "\u5355" },
                        {
                          id: 2406,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2407, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2408,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2409, odds: "1.95", name: "\u9f99" },
                        { id: 2410, odds: "1.95", name: "\u864e" }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u4e09\u7403",
                    data: [
                      [
                        { id: 2411, odds: "1.95", name: "\u5927" },
                        {
                          id: 2412,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2413, odds: "1.95", name: "\u5355" },
                        {
                          id: 2414,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2415, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2416,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2417, odds: "1.95", name: "\u9f99" },
                        { id: 2418, odds: "1.95", name: "\u864e" }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u56db\u7403",
                    data: [
                      [
                        { id: 2419, odds: "1.95", name: "\u5927" },
                        {
                          id: 2420,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2421, odds: "1.95", name: "\u5355" },
                        {
                          id: 2422,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2423, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2424,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2425, odds: "1.95", name: "\u9f99" },
                        { id: 2426, odds: "1.95", name: "\u864e" }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u4e94\u7403",
                    data: [
                      [
                        { id: 2427, odds: "1.95", name: "\u5927" },
                        {
                          id: 2428,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2429, odds: "1.95", name: "\u5355" },
                        {
                          id: 2430,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2431, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2432,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u516d\u7403",
                    data: [
                      [
                        { id: 2435, odds: "1.95", name: "\u5927" },
                        {
                          id: 2436,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2437, odds: "1.95", name: "\u5355" },
                        {
                          id: 2438,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2439, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2440,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u4e03\u7403",
                    data: [
                      [
                        { id: 2443, odds: "1.95", name: "\u5927" },
                        {
                          id: 2444,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2445, odds: "1.95", name: "\u5355" },
                        {
                          id: 2446,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2447, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2448,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ]
                    ]
                  },
                  {
                    title: "\u7b2c\u516b\u7403",
                    data: [
                      [
                        { id: 2451, odds: "1.95", name: "\u5927" },
                        {
                          id: 2452,
                          odds: "1.95",
                          name: "\u5c0f"
                        }
                      ],
                      [
                        { id: 2453, odds: "1.95", name: "\u5355" },
                        {
                          id: 2454,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2455, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2456,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 565,
                name: "\u7b2c\u4e00\u7403",
                played: [
                  {
                    title: "\u7b2c\u4e00\u7403",
                    data: [
                      [
                        { id: 2459, odds: "19.50", name: "1" },
                        { id: 2460, odds: "19.50", name: "2" },
                        {
                          id: 2461,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 2462, odds: "19.50", name: "4" },
                        { id: 2463, odds: "19.50", name: "5" },
                        {
                          id: 2464,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 2465, odds: "19.50", name: "7" },
                        { id: 2466, odds: "19.50", name: "8" },
                        {
                          id: 2467,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 2468, odds: "19.50", name: "10" },
                        { id: 2469, odds: "19.50", name: "11" },
                        {
                          id: 2470,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 2471, odds: "19.50", name: "13" },
                        { id: 2472, odds: "19.50", name: "14" },
                        {
                          id: 2473,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 2474, odds: "19.50", name: "16" },
                        { id: 2475, odds: "19.50", name: "17" },
                        {
                          id: 2476,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 2477, odds: "19.50", name: "19" },
                        { id: 2478, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 2479,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 2480, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 2481, odds: "1.95", name: "\u5355" },
                        {
                          id: 2482,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2483, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2484,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2485, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 2486,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 2487, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 2488,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 2489, odds: "3.65", name: "\u897f" },
                        {
                          id: 2490,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 2491, odds: "2.65", name: "\u4e2d" },
                        { id: 2492, odds: "2.65", name: "\u53d1" },
                        {
                          id: 2493,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 567,
                name: "\u7b2c\u4e8c\u7403",
                played: [
                  {
                    title: "\u7b2c\u4e8c\u7403",
                    data: [
                      [
                        { id: 2494, odds: "19.50", name: "1" },
                        { id: 2495, odds: "19.50", name: "2" },
                        {
                          id: 2496,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 2497, odds: "19.50", name: "4" },
                        { id: 2498, odds: "19.50", name: "5" },
                        {
                          id: 2499,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 2500, odds: "19.50", name: "7" },
                        { id: 2501, odds: "19.50", name: "8" },
                        {
                          id: 2502,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 2503, odds: "19.50", name: "10" },
                        { id: 2504, odds: "19.50", name: "11" },
                        {
                          id: 2505,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 2506, odds: "19.50", name: "13" },
                        { id: 2507, odds: "19.50", name: "14" },
                        {
                          id: 2508,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 2509, odds: "19.50", name: "16" },
                        { id: 2510, odds: "19.50", name: "17" },
                        {
                          id: 2511,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 2512, odds: "19.50", name: "19" },
                        { id: 2513, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 2514,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 2515, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 2516, odds: "1.95", name: "\u5355" },
                        {
                          id: 2517,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2518, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2519,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2520, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 2521,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 2522, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 2523,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 2524, odds: "3.65", name: "\u897f" },
                        {
                          id: 2525,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 2526, odds: "2.65", name: "\u4e2d" },
                        { id: 2527, odds: "2.65", name: "\u53d1" },
                        {
                          id: 2528,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 569,
                name: "\u7b2c\u4e09\u7403",
                played: [
                  {
                    title: "\u7b2c\u4e09\u7403",
                    data: [
                      [
                        { id: 2564, odds: "19.50", name: "1" },
                        { id: 2565, odds: "19.50", name: "2" },
                        {
                          id: 2566,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 2567, odds: "19.50", name: "4" },
                        { id: 2568, odds: "19.50", name: "5" },
                        {
                          id: 2569,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 2570, odds: "19.50", name: "7" },
                        { id: 2571, odds: "19.50", name: "8" },
                        {
                          id: 2572,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 2573, odds: "19.50", name: "10" },
                        { id: 2574, odds: "19.50", name: "11" },
                        {
                          id: 2575,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 2576, odds: "19.50", name: "13" },
                        { id: 2577, odds: "19.50", name: "14" },
                        {
                          id: 2578,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 2579, odds: "19.50", name: "16" },
                        { id: 2580, odds: "19.50", name: "17" },
                        {
                          id: 2581,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 2582, odds: "19.50", name: "19" },
                        { id: 2583, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 2584,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 2585, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 2586, odds: "1.95", name: "\u5355" },
                        {
                          id: 2587,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2588, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2589,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2590, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 2591,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 2592, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 2593,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 2594, odds: "3.65", name: "\u897f" },
                        {
                          id: 2595,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 2596, odds: "2.65", name: "\u4e2d" },
                        { id: 2597, odds: "2.65", name: "\u53d1" },
                        {
                          id: 2598,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 571,
                name: "\u7b2c\u56db\u7403",
                played: [
                  {
                    title: "\u7b2c\u56db\u7403",
                    data: [
                      [
                        { id: 2599, odds: "19.50", name: "1" },
                        { id: 2600, odds: "19.50", name: "2" },
                        {
                          id: 2601,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 2602, odds: "19.50", name: "4" },
                        { id: 2603, odds: "19.50", name: "5" },
                        {
                          id: 2604,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 2605, odds: "19.50", name: "7" },
                        { id: 2606, odds: "19.50", name: "8" },
                        {
                          id: 2607,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 2608, odds: "19.50", name: "10" },
                        { id: 2609, odds: "19.50", name: "11" },
                        {
                          id: 2610,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 2611, odds: "19.50", name: "13" },
                        { id: 2612, odds: "19.50", name: "14" },
                        {
                          id: 2613,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 2614, odds: "19.50", name: "16" },
                        { id: 2615, odds: "19.50", name: "17" },
                        {
                          id: 2616,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 2617, odds: "19.50", name: "19" },
                        { id: 2618, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 2619,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 2620, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 2621, odds: "1.95", name: "\u5355" },
                        {
                          id: 2622,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2623, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2624,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2625, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 2626,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 2627, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 2628,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 2629, odds: "3.65", name: "\u897f" },
                        {
                          id: 2630,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 2631, odds: "2.65", name: "\u4e2d" },
                        { id: 2632, odds: "2.65", name: "\u53d1" },
                        {
                          id: 2633,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 573,
                name: "\u7b2c\u4e94\u7403",
                played: [
                  {
                    title: "\u7b2c\u4e94\u7403",
                    data: [
                      [
                        { id: 2634, odds: "19.50", name: "1" },
                        { id: 2635, odds: "19.50", name: "2" },
                        {
                          id: 2636,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 2637, odds: "19.50", name: "4" },
                        { id: 2638, odds: "19.50", name: "5" },
                        {
                          id: 2639,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 2640, odds: "19.50", name: "7" },
                        { id: 2641, odds: "19.50", name: "8" },
                        {
                          id: 2642,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 2643, odds: "19.50", name: "10" },
                        { id: 2644, odds: "19.50", name: "11" },
                        {
                          id: 2645,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 2646, odds: "19.50", name: "13" },
                        { id: 2647, odds: "19.50", name: "14" },
                        {
                          id: 2648,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 2649, odds: "19.50", name: "16" },
                        { id: 2650, odds: "19.50", name: "17" },
                        {
                          id: 2651,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 2652, odds: "19.50", name: "19" },
                        { id: 2653, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 2654,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 2655, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 2656, odds: "1.95", name: "\u5355" },
                        {
                          id: 2657,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2658, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2659,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2660, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 2661,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 2662, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 2663,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 2664, odds: "3.65", name: "\u897f" },
                        {
                          id: 2665,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 2666, odds: "2.65", name: "\u4e2d" },
                        { id: 2667, odds: "2.65", name: "\u53d1" },
                        {
                          id: 2668,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 575,
                name: "\u7b2c\u516d\u7403",
                played: [
                  {
                    title: "\u7b2c\u516d\u7403",
                    data: [
                      [
                        { id: 2669, odds: "19.50", name: "1" },
                        { id: 2670, odds: "19.50", name: "2" },
                        {
                          id: 2671,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 2672, odds: "19.50", name: "4" },
                        { id: 2673, odds: "19.50", name: "5" },
                        {
                          id: 2674,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 2675, odds: "19.50", name: "7" },
                        { id: 2676, odds: "19.50", name: "8" },
                        {
                          id: 2677,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 2678, odds: "19.50", name: "10" },
                        { id: 2679, odds: "19.50", name: "11" },
                        {
                          id: 2680,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 2681, odds: "19.50", name: "13" },
                        { id: 2682, odds: "19.50", name: "14" },
                        {
                          id: 2683,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 2684, odds: "19.50", name: "16" },
                        { id: 2685, odds: "19.50", name: "17" },
                        {
                          id: 2686,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 2687, odds: "19.50", name: "19" },
                        { id: 2688, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 2689,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 2690, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 2691, odds: "1.95", name: "\u5355" },
                        {
                          id: 2692,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2693, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2694,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2695, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 2696,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 2697, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 2698,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 2699, odds: "3.65", name: "\u897f" },
                        {
                          id: 2700,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 2701, odds: "2.65", name: "\u4e2d" },
                        { id: 2702, odds: "2.65", name: "\u53d1" },
                        {
                          id: 2703,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 577,
                name: "\u7b2c\u4e03\u7403",
                played: [
                  {
                    title: "\u7b2c\u4e03\u7403",
                    data: [
                      [
                        { id: 2704, odds: "19.50", name: "1" },
                        { id: 2705, odds: "19.50", name: "2" },
                        {
                          id: 2706,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 2707, odds: "19.50", name: "4" },
                        { id: 2708, odds: "19.50", name: "5" },
                        {
                          id: 2709,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 2710, odds: "19.50", name: "7" },
                        { id: 2711, odds: "19.50", name: "8" },
                        {
                          id: 2712,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 2713, odds: "19.50", name: "10" },
                        { id: 2714, odds: "19.50", name: "11" },
                        {
                          id: 2715,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 2716, odds: "19.50", name: "13" },
                        { id: 2717, odds: "19.50", name: "14" },
                        {
                          id: 2718,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 2719, odds: "19.50", name: "16" },
                        { id: 2720, odds: "19.50", name: "17" },
                        {
                          id: 2721,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 2722, odds: "19.50", name: "19" },
                        { id: 2723, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 2724,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 2725, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 2726, odds: "1.95", name: "\u5355" },
                        {
                          id: 2727,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 2728, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 2729,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 2730, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 2731,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 2732, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 2733,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 2734, odds: "3.65", name: "\u897f" },
                        {
                          id: 2735,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 2736, odds: "2.65", name: "\u4e2d" },
                        { id: 2737, odds: "2.65", name: "\u53d1" },
                        {
                          id: 2738,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              },
              {
                menuid: 579,
                name: "\u7b2c\u516b\u7403",
                played: [
                  {
                    title: "\u7b2c\u516b\u7403",
                    data: [
                      [
                        { id: 4004, odds: "19.50", name: "1" },
                        { id: 4005, odds: "19.50", name: "2" },
                        {
                          id: 4006,
                          odds: "19.50",
                          name: "3"
                        }
                      ],
                      [
                        { id: 4007, odds: "19.50", name: "4" },
                        { id: 4008, odds: "19.50", name: "5" },
                        {
                          id: 4009,
                          odds: "19.50",
                          name: "6"
                        }
                      ],
                      [
                        { id: 4010, odds: "19.50", name: "7" },
                        { id: 4011, odds: "19.50", name: "8" },
                        {
                          id: 4012,
                          odds: "19.50",
                          name: "9"
                        }
                      ],
                      [
                        { id: 4013, odds: "19.50", name: "10" },
                        { id: 4014, odds: "19.50", name: "11" },
                        {
                          id: 4015,
                          odds: "19.50",
                          name: "12"
                        }
                      ],
                      [
                        { id: 4016, odds: "19.50", name: "13" },
                        { id: 4017, odds: "19.50", name: "14" },
                        {
                          id: 4018,
                          odds: "19.50",
                          name: "15"
                        }
                      ],
                      [
                        { id: 4019, odds: "19.50", name: "16" },
                        { id: 4020, odds: "19.50", name: "17" },
                        {
                          id: 4021,
                          odds: "19.50",
                          name: "18"
                        }
                      ],
                      [
                        { id: 4022, odds: "19.50", name: "19" },
                        { id: 4023, odds: "19.50", name: "20" }
                      ],
                      [
                        {
                          id: 4024,
                          odds: "1.95",
                          name: "\u5927"
                        },
                        { id: 4025, odds: "1.95", name: "\u5c0f" }
                      ],
                      [
                        { id: 4026, odds: "1.95", name: "\u5355" },
                        {
                          id: 4027,
                          odds: "1.95",
                          name: "\u53cc"
                        }
                      ],
                      [
                        { id: 4028, odds: "1.95", name: "\u5408\u6570\u5355" },
                        {
                          id: 4029,
                          odds: "1.95",
                          name: "\u5408\u6570\u53cc"
                        }
                      ],
                      [
                        { id: 4030, odds: "1.95", name: "\u5c3e\u5927" },
                        {
                          id: 4031,
                          odds: "1.95",
                          name: "\u5c3e\u5c0f"
                        }
                      ],
                      [
                        { id: 4032, odds: "3.65", name: "\u4e1c" },
                        {
                          id: 4033,
                          odds: "3.65",
                          name: "\u5357"
                        }
                      ],
                      [
                        { id: 4034, odds: "3.65", name: "\u897f" },
                        {
                          id: 4035,
                          odds: "3.65",
                          name: "\u5317"
                        }
                      ],
                      [
                        { id: 4036, odds: "2.65", name: "\u4e2d" },
                        { id: 4037, odds: "2.65", name: "\u53d1" },
                        {
                          id: 4038,
                          odds: "2.65",
                          name: "\u767d"
                        }
                      ]
                    ]
                  }
                ]
              }
            ]
          }
        }
      };
      this._renderdata(_data, 3); //渲染视图数据
    },
    upperCase(val) {
      setTimeout(() => {
        let scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
      this.moneys = val.replace(/[^\d]/g, "");
    },
    _checkgameid(_id, _type) {
      //切换列表玩法
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
      if (_id == 61) {
        this.$router.push("/betindex/xyncclass"); //返回首页
      } else {
        if (this.id == 61) {
          //如果是同一类彩种,重新查询
          this._changetab();
          this._initdata();
          this.live_on = false;
          this.data_live = "";
          return false;
        }
        localStorage.setItem("typeid", _type);
        this.$router.push("/betindex/" + _typeid[_type]); //返回首页
      }
    },
    _initdata() {
      //查询数据
      $api.$post("Api/Ajax/lottery_bet", { type: this.id }).then(res => {
        this._renderdata(res, 1); //渲染视图数据
        this.arr_one = [];
        var _other2 = [
          this.menu_list[1],
          this.menu_list[2],
          this.menu_list[3],
          this.menu_list[4],
          this.menu_list[5],
          this.menu_list[6],
          this.menu_list[7],
          this.menu_list[8]
        ];
        for (var i = 0; i < _other2.length; i++) {
          //重新处理数据
          for (var j = 0; j < _other2[i].played.length; j++) {
            var _jall = _other2[i].played[j].data;
            _other2[i].played[j].child = [];
            for (var m = 0; m < _jall.length; m++) {
              for (var k = 0; k < _jall[m].length; k++) {
                _other2[i].played[j].child.push(_jall[m][k].id);
              }
            }
          }
        }
        for (var i = 0; i < _other2.length; i++) {
          for (var j = 0; j < _other2[i].played.length; j++) {
            this.arr_one[i] = _other2[i].played[j].child.slice(0, 20);
          }
        }
        if (res.data.data.is_open == 0) {
          //未开奖
          this._initdatanext(); //计算倒计时
        }
      });
    },
    _checklist(e) {
      //选择已选中的玩法
      if (e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
        e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
      } else {
        e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
      }
      this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose"); //获取所有选中标签
      this.overtop7 = [];
      for (var i = 0; i < this.checkallDom.length; i++) {
        this.overtop7.push(this.checkallDom[i].getAttribute("data-value"));
      }
      //每个排名最多投7个号码
      this.index7_1 = 0; //重置
      var _index_1 = 0;
      for (var i = 0; i < this.overtop7.length; i++) {
        for (var j = 0; j < this.arr_one.length; j++) {
          for (var m = 0; m < this.arr_one[j].length; m++) {
            if (this.arr_one[j][m] == this.overtop7[i]) {
              if (_index_1 != j) {
                _index_1 = j;
                this.index7_1 = 0;
              }
              this.index7_1++;
              this.arr_one_7[j] = this.index7_1;
              if (this.arr_one_7[j] > 14) {
                //选择的号码超过7个就不能继续
                this.infotips("每个排名最多投14个号码!"); //信息提示弹框
                this.arr_one_7[j] = 0;
                if (
                  e.currentTarget.className.indexOf("flex-html bet-choose") ==
                  -1
                ) {
                  e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
                } else {
                  e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
                }
              }
            }
          }
        }
      }
      //结算完之后再次计算选中的号码
      this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose"); //获取所有选中标签
    },
    _checkNumber(_sum) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(_sum)) {
        return "_sumbg" + _sum;
      }
      return "_textbg";
    },
    _renderdata(res, _index) {
      //渲染的数据(定义在main公用方法)
      _commonRenderData(this, res, _index);
    },
    /*-----下面都是公用方法(main里面function)-----*/
    _resize() {
      //检测屏幕变化,高度变化(定义在main公用方法)
      _commonResize(this);
    },
    _changetab() {
      //动画切换(定义在main公用方法)
      _commonChangeTab(this);
    },
    _checkmenu(index) {
      //切换玩法(定义在main公用方法)
      _commonCheckMenu(this, index);
    },
    _getmoneySum() {
      //查询开奖之后投注金额结算(定义在main公用方法)
      _commonGetMoneySum(this, "/Api/User/updateUser");
    },
    _initdatanext() {
      //下一期开奖号码获取(定义在main公用方法)
      _commonInitdataNext(this, "Api/Ajax/lottery_time");
    },
    _timeset() {
      //定时器(定义在main公用方法)
      this.$nextTick(() => {
        _commonSetTimeLottery(this);
      });
    },
    _setheight() {
      //(在main公用方法function)
      this.$nextTick(() => {
        _commonSetHeight();
      });
    },
    _show_live() {
      //开启直播(在main公用方法function)
      _commonShowLive(this);
    },
    _detailed() {
      //显示清单列表弹框(在main公用方法function)
      _commonDetailed(this);
    },
    _reset() {
      //重置所有选中(在main公用方法function)
      _commonReset(this);
    },
    _emptyData() {
      //清空金额和列表(在main公用方法function)
      _commonEmptyData(this);
    },
    _betformdata() {
      //提交投注(在main公用方法function)
      _commonBetformdata(this, "Api/Ajax/bet_request");
    },
    _gohome() {
      //返回上一页(在main公用方法function)
      _commonGoHome();
    }
  }, //方法调用
  beforeDestroy() {
    //离开路由清除定时器(在main公用方法function)
    _commonClearAllTime(this);
  }
};
</script>
