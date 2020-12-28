<template>
  <div class="betallclass _allpage">
    <div class="cebianlist">
      <div class="gamemenu">
        <a @click="_changetab" class="cebian_bar"></a>
        <div class="gamemenu2">
          <div
            class="game_module"
            v-for="(item,index) in game"
            :key="index"
            :class="{'_greybg':index%2==1}"
          >
            <h5>{{item.title}}</h5>
            <ul>
              <li
                v-for="(item2,index2) in item.data"
                :key="index2"
                @click="_checkgameid(item2.id,item2.type)"
              >
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
              :key="index"
            >{{item}}</span>
          </h3>
          <h4>
            <span v-for="(item,index) in last_lottery.content2" :key="index">{{item}}</span>
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
            :key="index"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="bet-box-fr wrapper">
        <div class="content">
          <div
            v-for="(item,index) in menu_list"
            :class="selectClassName2(item.menuid)"
            :key="index"
            v-show="menuindex == index"
          >
            <div
              v-show="!(item.menuid == 739 && item2.title == '第三球' &&  zhi_xuan_id != 5559)"
              :class="selectClassName(item.menuid)"
              v-for="(item2,index2) in item.played"
              :key="index2"
            >
              <div class="flex-title">{{item2.title}}</div>
              <div class="flex-bodys" v-for="(item3,index3) in item2.data" :key="index3">
                <div
                  class="flex-html"
                  v-for="(item4,index4) in item3"
                  :key="index4"
                  :data-value="item4.id"
                  :data-item="item2.title+'|'+item4.name+'|'+item4.odds"
                  @click="_checklist($event,item,item4.id,item2,item4)"
                >
                  <span class="_it1" :class="_checkNumber(item4.name)">
                    <p>{{item4.name}}</p>
                  </span>
                  <span
                    class="_it2"
                    v-show="(item.menuid != 736 &&  item.menuid != 739) || item2.title == '选择类型'"
                  >{{item4.odds}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div class="bet-bottom bet_pt" v-if="timefeng>0">
      <div class="flex-box" style="height:90%">
        <div class="flex" style="flex-direction: column;">
          <p>
            已选中
            <strong>{{ checkallDom.length + lianmaSum + zhixuanSum==0 ? "0": checkallDom.length + lianmaSum + zhixuanSum}}</strong>注
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
<script>
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
      info: {},
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
      arr_one_7: [], //存放每个数组相加的结果
      lian_ma_id: [], //存放选中的连码id
      lastCurrentTarget: {}, //存放连码上一次选中的dom元素
      lastCurrentTarget2: {}, //存放直选上一次选中的dom元素
      lian_ma_number: [], //存放连码 选择的号码
      lianMaSelectNumberList: [], //记录选择号码的数组
      zhi_xuan_id: [], //存放选中的直选id
      zhi_xuan_number: [], //存放直选 选择的号码.
      zhiXuanSelectNumberList: [], //记录直选选择号码的数组
      firstBallArr: [], //直选第一个球
      secondBallArr: [], //直选第二个球
      thirdBallArr: [], //直选第三个球
      zhiXuanNumberList: [], //直选的所有选中数字
      htmlList: [],
      lianmaSum: 0, //连码一共多少注
      zhixuanSum: [], //直选一共有多少注
      firstBallList: [], //第一球
      secondBallList: [], //第二球
      thirdBallList: [], //第三球
      fourthBallList: [], //第四球
      fifthBallList: [] //第五球
    }; //自定义变量
  },
  mounted() {
    this._firstrender(); //初始化页面渲染
    this.id = localStorage.getItem("gameid"); //初始化获取id
    this.typeid = localStorage.getItem("typeid"); //初始化获取类型
    /*-----------------------防止客户自己随意切换-----------------------*/
    //             if((this.typeid != 3) || (window._typeArr[3].indexOf(Number(this.id)) < 0)) {//既不属于该类型也不是该类型的id
    //                 this.id = 1;//默认值
    //                 this.typeid = 3;//默认值
    //             }
    this._initdata(); //防止本页刷新数据没有请求
    this._reset(); //重置界面
  },
  methods: {
    selectClassName(menuid) {
      if (menuid == 736) {
        return "flex-box-lm";
      } else if (menuid == 739) {
        return "flex-box-zx";
      } else {
        return "flex-box-sc";
      }
    },
    selectClassName2(menuid) {
      return "testAAA" + menuid;
    },
    _firstrender() {
      var _data = {
        data: {
          data: {
            coin: null,
            grade: null,
            game: [
              {
                title: "PK类",
                data: [
                  { title: "极速PK拾", id: 72, type: 1 },
                  { title: "北京赛车", id: 50, type: 1 },
                  { title: "赛马", id: 97, type: 1 },
                  { title: "超级赛车", id: 81, type: 1 },
                  { title: "老北京赛车", id: 2, type: 1 },
                  { title: "威尼斯飞艇", id: 5, type: 1 },
                  { title: "激流飞艇", id: 6, type: 1 },
                  { title: "幸运飞艇", id: 55, type: 1 }
                ]
              },
              {
                title: "时时彩",
                data: [
                  { title: "重庆时时彩", id: 1, type: 3 },
                  { title: "老重庆时时彩", id: 3, type: 3 },
                  { title: "新疆时时彩", id: 80, type: 3 },
                  { title: "福利时时彩", id: 73, type: 3 },
                  { title: "腾讯时时彩", id: 98, type: 3 }
                ]
              },
              {
                title: "28类",
                data: [
                  { title: "加拿大28", id: 71, type: 2 },
                  { title: "超级28", id: 90, type: 2 },
                  { title: "PC蛋蛋", id: 66, type: 2 }
                ]
              },
              {
                title: "六合彩",
                data: [
                  { title: "五分六合彩", id: 88, type: 6 },
                  { title: "香港六合彩", id: 70, type: 6 }
                ]
              },
              {
                title: "快三",
                data: [
                  { title: "超级快3", id: 96, type: 4 },
                  { title: "江苏快3", id: 10, type: 4 },
                  { title: "北京快3", id: 75, type: 4 },
                  { title: "广西快3", id: 76, type: 4 },
                  { title: "安徽快3", id: 77, type: 4 },
                  { title: "河北快3", id: 78, type: 4 }
                ]
              }
            ],
            next_lottery: { number: "20190715034", time: 652, aciton: 34 },
            last_lottery: {
              time: 1563175790,
              number: 2019071519,
              action: 0,
              content: ["3", "11", "18", "16", "20", "7", "4", "6"],
              content2: ["85", "大", "单", "尾大"]
            },
            is_open: 0,
            info: {
              title: "广东快乐十分",
              close_time: 72,
              description: "每天9:20-凌晨23:00",
              type: 7,
              video:
                "https://zhibo.8xuancai.com/html/zhiboshipin/threeLevelPage/lotteryQuote.html?lotType=5"
            },
            menu: [
              { menuid: 820, name: "两面", played: [] },
              { menuid: 821, name: "第一球", played: [] },
              { menuid: 822, name: "第二球", played: [] },
              { menuid: 832, name: "第三球", played: [] },
              { menuid: 833, name: "第四球", played: [] },
              { menuid: 834, name: "第五球", played: [] },
              { menuid: 835, name: "第六球", played: [] },
              { menuid: 836, name: "第七球", played: [] },
              { menuid: 837, name: "第八球", played: [] }
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
        if (this.typeid == _type) {
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
        var _other2 = [res.data.data.menu[1]];
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
            this.arr_one[j + 5 * i] = _other2[i].played[j].child;
          }
        }
        if (res.data.data.is_open == 0) {
          //未开奖
          this._initdatanext(); //计算倒计时
        }
      });
    },
    //吧所有连码中的选择类型ID放到一个数组中。
    getSelectTypeArray(array) {
      let idList = [];
      array.forEach(element => {
        element.forEach(item => {
          idList.push(item.id);
        });
      });
      return idList;
    },

    // 从数组中删除一个元素
    arrayRemove(array, element) {
      let index = array.indexOf(element);
      if (index > -1) {
        array.splice(index, 1);
      }
    },

    //数组去重
    uniqueArray(array) {
      let list = [];
      array.forEach(item => {
        if (list.indexOf(item) == -1) {
          list.push(item);
        }
      });
      return list;
    },

    /**
     * e
     * currentTarget 当前最顶级数组（menu_list的item）
     * currentId 当前选中的id
     */
    _checklist(e, menuListItem, currentId, numberArrayList, targetItem) {
      // if(menuListItem.menuid == 877 || menuListItem.menuid == 878 || menuListItem.menuid == 879 || menuListItem.menuid == 880 || menuListItem.menuid == 729) {
      //  // this.checkallDom = document.querySelectorAll(".bet-choose");
      //   if(e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
      //     let selAllll = document.getElementsByClassName("testAAA" + menuListItem.menuid)
      //     this.checkallDom = $(selAllll).eq(0).find(".bet-choose");
      //     if(this.checkallDom.length >= 7) {
      //       this.infotips("每个排名最多投7个号码!"); //信息提示弹框
      //       return;
      //     }
      //   }
      // }

      //选择已选中的玩法
      if (menuListItem.menuid != 736 && menuListItem.menuid != 739) {
        if (e.currentTarget.className.indexOf("flex-html bet-choose") == -1) {
          e.currentTarget.className = "flex-html bet-choose"; //切换按钮样式//写逻辑
        } else {
          e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
        }
      }

      this.checkallDom = document.querySelectorAll(".bet-choose"); //获取所有选中标签
      this.overtop7 = [];
      for (var i = 0; i < this.checkallDom.length; i++) {
        this.overtop7.push(this.checkallDom[i].getAttribute("data-value"));
      }

      if (
        targetItem.name != "大" &&
        targetItem.name != "小" &&
        targetItem.name != "单" &&
        targetItem.name != "双"
      ) {
        if (menuListItem.name == "第一球") {
          // 第一球只能选择七个号码
          this.addOrRemoveNumber(this.firstBallList, currentId);
          if (this.firstBallList.length > 7) {
            this.infotips("每个排名最多投7个号码!"); //信息提示弹框
            e.currentTarget.className = "flex-html";
            this.removeNumber(this.firstBallList, currentId);
          }
        }

        // 第二球只能选择七个号码
        if (menuListItem.name == "第二球") {
          this.addOrRemoveNumber(this.secondBallList, currentId);
          if (this.secondBallList.length > 7) {
            this.infotips("每个排名最多投7个号码!"); //信息提示弹框
            e.currentTarget.className = "flex-html";
            this.removeNumber(this.secondBallList, currentId);
          }
        }

        // 第三球只能选择七个号码
        if (menuListItem.name == "第三球") {
          this.addOrRemoveNumber(this.thirdBallList, currentId);
          if (this.thirdBallList.length > 7) {
            this.infotips("每个排名最多投7个号码!"); //信息提示弹框
            e.currentTarget.className = "flex-html";
            this.removeNumber(this.thirdBallList, currentId);
          }
        }

        // 第四球只能选择七个号码
        if (menuListItem.name == "第四球") {
          this.addOrRemoveNumber(this.fourthBallList, currentId);
          if (this.fourthBallList.length > 7) {
            this.infotips("每个排名最多投7个号码!"); //信息提示弹框
            e.currentTarget.className = "flex-html";
            this.removeNumber(this.fourthBallList, currentId);
          }
        }

        // 第五球只能选择七个号码
        if (menuListItem.name == "第五球") {
          this.addOrRemoveNumber(this.fifthBallList, currentId);
          if (this.fifthBallList.length > 7) {
            this.infotips("每个排名最多投7个号码!"); //信息提示弹框
            e.currentTarget.className = "flex-html";
            this.removeNumber(this.fifthBallList, currentId);
          }
        }
      }

      /**
       * start
       * 设置连码中的类型只能选择一个。
       */
      //let idList = [];
      let lian_ma_id = null;
      if (menuListItem.menuid == 736) {
        if (e.currentTarget.className.indexOf("flex-html bet-choose2") == -1) {
          e.currentTarget.className = "flex-html bet-choose2"; //切换按钮样式//写逻辑
        } else {
          //document.querySelectorAll(".bet-choose2")
          e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
        }
        //吧所有连码中的选择类型ID放到一个数组中。连码的id是736，id如果更改，需要更新代码
        let idList = this.getSelectTypeArray(menuListItem.played[0].data);
        //吧所有选择的号码全部取出，放在一起。
        let numberList = [];
        if (numberArrayList.title == "选择类型") {
          numberList =
            menuListItem.menuid == 736
              ? this.getSelectTypeArray(this.lianMaSelectNumberList)
              : [];
        }

        if (numberArrayList.title == "选择号码") {
          this.lianMaSelectNumberList = numberArrayList.data;
        }

        lian_ma_id = idList.find(item => item == currentId);
        //切换选择类型时候，清空所有数字选项
        if (lian_ma_id != null) {
          let allDom = document.querySelectorAll(".bet-choose2"); //获取所有选中标签
          allDom.forEach(element => {
            let index = numberList.findIndex(
              item => item == Number(element.getAttribute("data-value"))
            );
            if (index >= 0) {
              this.lian_ma_number = [];
              element.setAttribute("class", "flex-html");
            }
          });
        }

        //一次只能选中一个类型
        if (lian_ma_id != null && this.lian_ma_id.length == 0) {
          this.lian_ma_id.push(lian_ma_id);
        } else if (lian_ma_id == this.lian_ma_id[0]) {
          this.lian_ma_id = [];
        } else if (
          lian_ma_id != null &&
          this.lian_ma_id.length > 0 &&
          this.lastCurrentTarget != null
        ) {
          this.lastCurrentTarget.className = "flex-html"; //连码中的类型只能选择一个。
          this.lian_ma_id = [];
          this.lian_ma_id.push(lian_ma_id);
        }
        //return;
        /**
         * end
         * 设置连码中的类型只能选择一个。
         */

        /**
         * start
         * 设置连码中的类型对应的号码选择数量
         */

        if (numberArrayList.title == "选择号码") {
          //存储当前选中的id
          this.lian_ma_number.find(item => item == currentId)
            ? this.arrayRemove(this.lian_ma_number, currentId)
            : this.lian_ma_number.push(currentId);

          if (this.lian_ma_id.length == 0) {
            e.currentTarget.className = "flex-html";
            this.infotips("请选择类型!"); //信息提示弹框
            this.lian_ma_number = [];
          } else if (
            this.lian_ma_id[0] == 5538 &&
            this.lian_ma_number.length > 2
          ) {
            //任选2中2，只能选择两个号码
            this.arrayRemove(this.lian_ma_number, currentId);
            e.currentTarget.className = "flex-html";
            this.infotips("不能超过2个号码!"); //信息提示弹框
          } else if (
            this.lian_ma_id[0] == 5539 &&
            this.lian_ma_number.length > 3
          ) {
            //任选3中3，只能选择三个号码
            this.arrayRemove(this.lian_ma_number, currentId);
            e.currentTarget.className = "flex-html";
            this.infotips("不能超过3个号码!"); //信息提示弹框
          } else if (
            this.lian_ma_id[0] == 5540 &&
            this.lian_ma_number.length > 4
          ) {
            //任选4中4，只能选择4个号码
            this.arrayRemove(this.lian_ma_number, currentId);
            e.currentTarget.className = "flex-html";
            this.infotips("不能超过4个号码!"); //信息提示弹框
          } else if (
            (this.lian_ma_id[0] == 5541 ||
              this.lian_ma_id[0] == 5545 ||
              this.lian_ma_id[0] == 5546) &&
            this.lian_ma_number.length > 5
          ) {
            //任选5中5、前两组选，前三组选只能选择5个号码
            this.arrayRemove(this.lian_ma_number, currentId);
            e.currentTarget.className = "flex-html";
            this.infotips("不能超过5个号码!"); //信息提示弹框
          } else if (
            //任选6中5
            this.lian_ma_id[0] == 5542 &&
            this.lian_ma_number.length > 6
          ) {
            //任选4中4，只能选择4个号码
            this.arrayRemove(this.lian_ma_number, currentId);
            e.currentTarget.className = "flex-html";
            this.infotips("不能超过6个号码!"); //信息提示弹框
          } else if (
            //任选7中5
            this.lian_ma_id[0] == 5543 &&
            this.lian_ma_number.length > 7
          ) {
            this.arrayRemove(this.lian_ma_number, currentId);
            e.currentTarget.className = "flex-html";
            this.infotips("不能超过7个号码!"); //信息提示弹框
          } else if (
            //任选8中5
            this.lian_ma_id[0] == 5544 &&
            this.lian_ma_number.length > 8
          ) {
            this.arrayRemove(this.lian_ma_number, currentId);
            e.currentTarget.className = "flex-html";
            this.infotips("不能超过8个号码!"); //信息提示弹框
          }
        }
        //计算连码一共多少注
        if (this.lian_ma_id[0] == 5545) {
          if (this.lian_ma_number.length == 2) {
            this.lianmaSum = 1;
          } else if (this.lian_ma_number.length == 3) {
            this.lianmaSum = 3;
          } else if (this.lian_ma_number.length == 4) {
            this.lianmaSum = 6;
          } else if (this.lian_ma_number.length == 5) {
            this.lianmaSum = 10;
          } else {
            this.lianmaSum = 0;
          }
        } else if (this.lian_ma_id[0] == 5546) {
          if (this.lian_ma_number.length == 3) {
            this.lianmaSum = 1;
          } else if (this.lian_ma_number.length == 4) {
            this.lianmaSum = 4;
          } else if (this.lian_ma_number.length == 5) {
            this.lianmaSum = 10;
          } else {
            this.lianmaSum = 0;
          }
        } else {
          if (
            (this.lian_ma_id[0] == 5538 && this.lian_ma_number.length < 2) ||
            (this.lian_ma_id[0] == 5539 && this.lian_ma_number.length < 3) ||
            (this.lian_ma_id[0] == 5540 && this.lian_ma_number.length < 4) ||
            ((this.lian_ma_id[0] == 5541 ||
              this.lian_ma_id[0] == 5545 ||
              this.lian_ma_id[0] == 5546) &&
              this.lian_ma_number.length < 5) ||
            (this.lian_ma_id[0] == 5542 && this.lian_ma_number.length < 6) ||
            (this.lian_ma_id[0] == 5543 && this.lian_ma_number.length < 7) ||
            (this.lian_ma_id[0] == 5544 && this.lian_ma_number.length < 8)
          ) {
            this.lianmaSum = 0;
          } else {
            this.lianmaSum = 1;
            if (this.lian_ma_number.length == 0) {
              this.lianmaSum = 0;
            }
          }
        }
      }

      /**
       * end
       * 设置连码中的类型对应的号码选择数量
       */

      /**
       * start
       * 设置直选的选项卡切换
       */
      let zhi_xuan_id = null;
      console.log(currentId);
      if (menuListItem.menuid == 739) {
        if (e.currentTarget.className.indexOf("flex-html bet-choose3") == -1) {
          e.currentTarget.className = "flex-html bet-choose3"; //切换按钮样式//写逻辑
        } else {
          e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
        }

        //吧所有直选中的选择类型ID放到一个数组中。连码的id是739，id如果更改，需要更新代码
        let list = this.getSelectTypeArray(menuListItem.played[0].data);
        zhi_xuan_id = list.find(item => item == currentId);
        //一次只能选中一个类型
        if (zhi_xuan_id != null && this.zhi_xuan_id.length == 0) {
          this.zhi_xuan_id.push(zhi_xuan_id);
          //切换选项卡初始化保存的数字
          this.firstBallArr = []; //直选第一个球
          this.secondBallArr = []; //直选第二个球
          this.thirdBallArr = []; //直选第三个球
        } else if (zhi_xuan_id == this.zhi_xuan_id[0]) {
          this.zhi_xuan_id = [];
        } else if (
          zhi_xuan_id != null &&
          this.zhi_xuan_id.length > 0 &&
          this.lastCurrentTarget2 != null
        ) {
          this.lastCurrentTarget2.className = "flex-html"; //类型只能选择一个。
          this.zhi_xuan_id = [];
          this.zhi_xuan_id.push(zhi_xuan_id);
          //切换选项卡初始化保存的数字
          this.firstBallArr = []; //直选第一个球
          this.secondBallArr = []; //直选第二个球
          this.thirdBallArr = []; //直选第三个球
        }

        if (
          this.zhi_xuan_id.length == 0 &&
          currentId != 5558 &&
          currentId != 5559
        ) {
          e.currentTarget.className = "flex-html";
          this.infotips("请选择类型!"); //信息提示弹框
        }

        let numberList = [];
        if (
          numberArrayList.title == "第一球" ||
          numberArrayList.title == "第二球" ||
          numberArrayList.title == "第三球"
        ) {
          numberList = this.getSelectTypeArray(numberArrayList.data);
          //吧所有选择的号码全部取出，放在一起。
          if (this.zhiXuanSelectNumberList.length == 0) {
            this.zhiXuanSelectNumberList = numberList;
          } else {
            let arr = Object.values(this.zhiXuanSelectNumberList);
            arr = arr.concat(numberList);
            arr = this.uniqueArray(arr);
            this.zhiXuanSelectNumberList = arr;
          }
        }

        //切换选择类型时候，清空所有数字选项
        if (zhi_xuan_id != null) {
          this.zhi_xuan_number = [];
          this.zhiXuanNumberList = [];
          let allDom = document.querySelectorAll(".bet-choose3"); //获取所有选中标签
          allDom.forEach(element => {
            let index = this.zhiXuanSelectNumberList.findIndex(
              item => item == Number(element.getAttribute("data-value"))
            );
            if (index >= 0) {
              element.setAttribute("class", "flex-html");
            }
          });
        }

        let firstBall = [];
        let secondBall = [];
        let thirdBall = [];
        if (numberArrayList.title == "第一球") {
          firstBall = this.getSelectTypeArray(numberArrayList.data);
          this.firstBallArr.find(item => item == currentId)
            ? this.arrayRemove(this.firstBallArr, currentId)
            : this.firstBallArr.push(currentId);
        } else if (numberArrayList.title == "第二球") {
          secondBall = this.getSelectTypeArray(numberArrayList.data);
          this.secondBallArr.find(item => item == currentId)
            ? this.arrayRemove(this.secondBallArr, currentId)
            : this.secondBallArr.push(currentId);
        } else if (numberArrayList.title == "第三球") {
          thirdBall = this.getSelectTypeArray(numberArrayList.data);
          this.thirdBallArr.find(item => item == currentId)
            ? this.arrayRemove(this.thirdBallArr, currentId)
            : this.thirdBallArr.push(currentId);
        }

        //设置前二直选只能选择7个数字，前三直选只能选择8个数字
        var zhixuanTypeDom = document.getElementsByClassName("bet-choose3");
        let zhixuanType = "";
        if (zhixuanTypeDom.length > 0) {
          zhixuanType = zhixuanTypeDom[0]
            .getAttribute("data-item")
            .split("|")[1];
        }

        let num =
          this.firstBallArr.length +
          this.secondBallArr.length +
          this.thirdBallArr.length;
        if (zhixuanType == "前二直选") {
          if (num > 7) {
            e.currentTarget.className = "flex-html";
            if (this.firstBallArr.find(item => item == currentId)) {
              this.arrayRemove(this.firstBallArr, currentId);
            }

            if (this.secondBallArr.find(item => item == currentId)) {
              this.arrayRemove(this.secondBallArr, currentId);
            }

            if (this.thirdBallArr.find(item => item == currentId)) {
              this.arrayRemove(this.thirdBallArr, currentId);
            }
            this.infotips("只能选择7个数字!"); //信息提示弹框
          }
        }

        if (zhixuanType == "前三直选") {
          if (num > 8) {
            e.currentTarget.className = "flex-html";
            if (this.firstBallArr.find(item => item == currentId)) {
              this.arrayRemove(this.firstBallArr, currentId);
            }

            if (this.secondBallArr.find(item => item == currentId)) {
              this.arrayRemove(this.secondBallArr, currentId);
            }

            if (this.thirdBallArr.find(item => item == currentId)) {
              this.arrayRemove(this.thirdBallArr, currentId);
            }
            this.infotips("只能选择8个数字!"); //信息提示弹框
          }
        }
        console.log(this.secondBallArr);

        //设置不能重复选择同一个数字
        if (
          numberArrayList.title == "第一球" ||
          numberArrayList.title == "第二球" ||
          numberArrayList.title == "第三球"
        ) {
          let result = this.zhiXuanNumberList.find(
            item => item.name == targetItem.name
          );
          if (!result) {
            if (
              (zhixuanType == "前二直选" && num <= 7) ||
              (zhixuanType == "前三直选" && num <= 8)
            ) {
              this.zhiXuanNumberList.push(targetItem);
            }
          } else if (result && result.id == targetItem.id) {
            e.currentTarget.className = "flex-html";
            this.arrayRemove(this.firstBallArr, currentId);
            this.arrayRemove(this.secondBallArr, currentId);
            this.arrayRemove(this.thirdBallArr, currentId);
            this.arrayRemove(this.zhiXuanNumberList, targetItem);
          } else {
            e.currentTarget.className = "flex-html";
            this.arrayRemove(this.firstBallArr, currentId);
            this.arrayRemove(this.secondBallArr, currentId);
            this.arrayRemove(this.thirdBallArr, currentId);
          }
        }

        let zhixuanDom = document.querySelectorAll(".flex-box-zx .bet-choose3");
        let firstBallNumberArr = [];
        let secondBallNumberArr = [];
        let thirdBallNumberArr = [];
        zhixuanDom.forEach((item, index, array) => {
          let dataItemValues = item.getAttribute("data-item").split("|");
          if (dataItemValues[0] == "第一球") {
            firstBallNumberArr.push(dataItemValues[1]);
          } else if (dataItemValues[0] == "第二球") {
            secondBallNumberArr.push(dataItemValues[1]);
          } else if (dataItemValues[0] == "第三球") {
            thirdBallNumberArr.push(dataItemValues[1]);
          }
        });
        this.zhixuanSum = this.matchingNumber(
          firstBallNumberArr,
          secondBallNumberArr,
          thirdBallNumberArr
        );
      }

      /**
       * end
       * 设置直选的选项卡切换
       */

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
              // if (this.arr_one_7[j] > 7) {
              //   //选择的号码超过7个就不能继续
              //   e.currentTarget.className = "flex-html";
              //   this.checkallDom = document.querySelectorAll(".bet-choose"); //获取所有选中标签
              //   this.infotips("每个排名最多投7个号码!"); //信息提示弹框
              //   this.arr_one_7[j] = 0;
              //   let delNum = Number(e.currentTarget.getAttribute("data-value"));
              //   for(let i in this.overtop7) {
              //     if(this.overtop7[i] == delNum) {
              //       this.overtop7.splice(i, 1);
              //       break;
              //     }
              //   }
              //   return;
              //   if (
              //     e.currentTarget.className.indexOf("flex-html bet-choose2") ==
              //     -1
              //   ) {
              //     e.currentTarget.className = "flex-html bet-choose2"; //切换按钮样式//写逻辑
              //   } else {
              //     e.currentTarget.className = "flex-html"; //切换按钮样式 //写逻辑
              //   }
              // }
            }
          }
        }
      }

      //吧当前目标dom存储下来，下次使用
      if (lian_ma_id != null) {
        this.lastCurrentTarget = e.currentTarget;
        //避免连码的选择类型被重复选中
        lian_ma_id = null;
        zhi_xuan_id = null;
      }

      if (zhi_xuan_id != null) {
        this.lastCurrentTarget2 = e.currentTarget;
        lian_ma_id = null;
        zhi_xuan_id = null;
      }

      //结算完之后再次计算选中的号码
      this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose"); //获取所有选中标签
    },

    //如果数组中已经有了，就删除，如果没有 就增加
    addOrRemoveNumber(list, number) {
      let index = list.indexOf(number);
      if (index == -1) {
        list.push(number);
      } else {
        list.splice(index, 1);
      }
    },

    removeNumber(list, number) {
      let index = list.indexOf(number);
      list.splice(index, 1);
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
      //结算完之后再次计算选中的号码
      this.checkallDom = document.querySelectorAll(".flex-box-sc .bet-choose"); //获取所有选中标签
      let lianmaDom = document.querySelectorAll(".flex-box-lm .bet-choose2");
      let zhixuanDom = document.querySelectorAll(".flex-box-zx .bet-choose3");
      //连码数据验证
      if (
        this._validateLianMa(lianmaDom) ||
        this._validateZhiXuan(zhixuanDom)
      ) {
        return;
      }
      this.htmlList = "";
      if (lianmaDom.length > 0) {
        this.htmlList = `<div class='_diodds'>`;
        lianmaDom.forEach((item, index, array) => {
          if (index == 0) {
            this.htmlList += `连码：${
              item.getAttribute("data-item").split("|")[1]
            }`;
          } else if (index == 1) {
            this.htmlList += "【";
            this.htmlList += `${item.getAttribute("data-item").split("|")[1]},`;
          } else if (index == array.length - 1) {
            this.htmlList += `${item.getAttribute("data-item").split("|")[1]}`;
            this.htmlList += "】";
          } else {
            this.htmlList += `${item.getAttribute("data-item").split("|")[1]},`;
          }
        });
        this.htmlList += `</div>`;
      }
      if (zhixuanDom.length > 0) {
        let firstBallNumberArr = [];
        let secondBallNumberArr = [];
        let thirdBallNumberArr = [];
        zhixuanDom.forEach((item, index, array) => {
          let dataItemValues = item.getAttribute("data-item").split("|");
          if (dataItemValues[0] == "第一球") {
            firstBallNumberArr.push(dataItemValues[1]);
          } else if (dataItemValues[0] == "第二球") {
            secondBallNumberArr.push(dataItemValues[1]);
          } else if (dataItemValues[0] == "第三球") {
            thirdBallNumberArr.push(dataItemValues[1]);
          }
        });
        this.htmlList += `<div class='_diodds'>直选：【${
          zhixuanDom[0].getAttribute("data-item").split("|")[1]
        }】`;
        if (firstBallNumberArr.length > 0) {
          this.htmlList += `<br/>@ 第一球：${firstBallNumberArr.join(",")}`;
        }
        if (secondBallNumberArr.length > 0) {
          this.htmlList += `<br/>@ 第二球：${secondBallNumberArr.join(",")}`;
        }
        if (thirdBallNumberArr.length > 0) {
          this.htmlList += `<br/>@ 第三球：${thirdBallNumberArr.join(",")}`;
        }

        this.htmlList += `<br/>@ ${
          zhixuanDom[0].getAttribute("data-item").split("|")[2]
        } x ${this.moneys}</div>`;
      }
      //显示清单列表弹框(在main公用方法function)
      _commonDetailed(this);
    },
    //匹配直选的号码，看看能匹配出多少种
    matchingNumber(firstNumber, secondNumber, thirdNumber) {
      let arr = [];
      if (this.zhi_xuan_id[0] === 5558) {
        firstNumber.forEach(item => {
          secondNumber.forEach(item2 => {
            let num = item + item2;
            if (arr.indexOf(num) == -1) {
              arr.push(num);
            }
          });
        });
      } else if (this.zhi_xuan_id[0] === 5559) {
        if (
          thirdNumber.length > 0 &&
          secondNumber.length > 0 &&
          firstNumber.length > 0
        ) {
          firstNumber.forEach(item => {
            secondNumber.forEach(item2 => {
              thirdNumber.forEach(item3 => {
                let num = item + item2 + item3;
                if (arr.indexOf(num) == -1) {
                  arr.push(num);
                }
              });
            });
          });
        }
      }

      return arr.length;
    },
    //验证
    _validateLianMa(lianmaDom) {
      if (lianmaDom.length == 0) {
        return false;
      }

      let typeId = lianmaDom[0].getAttribute("data-value");
      if (typeId == "5538" && lianmaDom.length < 3) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }
      if (typeId == "5539" && lianmaDom.length < 4) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }
      if (typeId == "5540" && lianmaDom.length < 5) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }
      if (typeId == "5541" && lianmaDom.length < 6) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }
      if (typeId == "5545" && lianmaDom.length < 3) {
        this.infotips("至少选择两个号码!"); //信息提示弹框
        return true;
      }
      if (typeId == "5546" && lianmaDom.length < 4) {
        this.infotips("至少选择三个号码!"); //信息提示弹框
        return true;
      }
      if (typeId == "5542" && lianmaDom.length < 7) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }
      if (typeId == "5543" && lianmaDom.length < 8) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }

      if (typeId == "5544" && lianmaDom.length < 9) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }

      return false;
    },
    _validateZhiXuan(zhixuanDom) {
      if (zhixuanDom.length == 0) {
        return false;
      }

      if (
        this.zhi_xuan_id[0] == 5558 &&
        (this.firstBallArr.length == 0 || this.secondBallArr.length == 0)
      ) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }

      if (
        this.zhi_xuan_id[0] == 5559 &&
        (this.firstBallArr.length == 0 ||
          this.secondBallArr.length == 0 ||
          this.thirdBallArr.length == 0)
      ) {
        this.infotips("请正确选择玩法!"); //信息提示弹框
        return true;
      }
      return false;
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
      let lianmaDom = document.querySelectorAll(".flex-box-lm .bet-choose2");

      let num = [];
      lianmaDom.forEach((item, index) => {
        if (index != 0) {
          num.push(item.getAttribute("data-item").split("|")[1]);
        }
      });

      if (lianmaDom.length > 0) {
        this.bet.push({
          name: lianmaDom[0].getAttribute("data-value"),
          value: this.moneys,
          content: num.join(",")
        });
      }

      let number1 = [];
      let number2 = [];
      let number3 = [];
      let zhixuanDom = document.querySelectorAll(".flex-box-zx .bet-choose3");
      zhixuanDom.forEach((item, index) => {
        let dataItemValues = item.getAttribute("data-item").split("|");
        if (dataItemValues[0] == "第一球") {
          number1.push(dataItemValues[1]);
        } else if (dataItemValues[0] == "第二球") {
          number2.push(dataItemValues[1]);
        } else if (dataItemValues[0] == "第三球") {
          number3.push(dataItemValues[1]);
        }
      });
      let content = "";
      if (number1.length > 0) {
        content += `1:${number1.join(",")}`;
      }
      if (number2.length > 0) {
        content += `@2:${number2.join(",")}`;
      }

      if (number3.length > 0) {
        content += `@3:${number3.join(",")}`;
      }

      if (zhixuanDom.length > 0) {
        this.bet.push({
          name: zhixuanDom[0].getAttribute("data-value"),
          value: this.moneys,
          content: content
        });
      }

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
