<template>
  <div class="personal">
    <!---->
    <header>
      <div class="user-info">
        <div class="user-info-in">
          <a class="cw">
            <div class="flussertx">
              <img :src="thumb" alt />
            </div>
            <span class="fl">编号 {{uid}}</span>
          </a>
          <a @click="_logout" class="fr cw">
            <i class="iconfont icon-tuichu"></i>退出
          </a>
        </div>
        <div class="user-info-money">
          <em class="iconfont icon-huiyuan"></em>
          <span>
            <strong>{{username}}</strong>
          </span>
          <em class="iconfont icon-jinbi jindouicon"></em>
          余额:
          <span id="meminfoMoney">
            <strong>{{Number(coin).toFixed(2)}}</strong>
          </span>元
        </div>
      </div>
      <div class="btn-pay">
        <a @click="_deposit">
          <em class="iconfont icon-cunkuanlicairenminbi1"></em>充值
        </a>
        <a @click="_withdraw">
          <em class="iconfont icon-qukuanji"></em>提款
        </a>
      </div>
    </header>
    <!---->
    <ul class="user-menu _userone">
      <li>
        <a @click="_mymessage">
          <img src="../../static/img/tupian/msg.png" class="ui-li-icon" />
          我的消息
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li>
        <a @click="_betrecord">
          <img src="../../static/img/tupian/tzjv.png" class="ui-li-icon" />
          投注记录
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li>
        <a @click="_recharge">
          <img src="../../static/img/chargeIcon.png" class="ui-li-icon" />
          充值记录
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li>
        <a @click="_cash">
          <img src="../../static/img/tupian/tixian.png" class="ui-li-icon" />
          提款记录
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li>
        <a @click="_gameorder">
          <img src="../../static/img/tupian/lishi.png" class="ui-li-icon" />
          棋牌游戏
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <!-- <li>
        <a @click="goTodayProfit()">
          <img src="../../static/img/tupian/bank.png" class="ui-li-icon" />
          今日盈亏
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>-->
    </ul>
    <!---->
    <ul class="user-menu">
      <li>
        <a @click="_rule">
          <img src="../../static/img/tupian/rule.png" class="ui-li-icon" />
          游戏规则
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li>
        <a @click="_extenindex">
          <img src="../../static/img/tupian/share.png" class="ui-li-icon" />
          我要推广
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li v-if="payingStatus === 1">
        <a @click="goPaying">
          <img src="../../static/img/uc_item_my_balance_n.png" class="ui-li-icon" />
          余额宝
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li v-if="sign_enable == 1">
        <a @click="signIn">
          <img src="../../static/img/redEnvelopes/qiandao_01.png" class="ui-li-icon" />
          签到活动
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li v-if="redEnvelopesStatus == 1">
        <a @click="signInRed">
          <img src="../../static/img/redEnvelopes/qhongb_01.png" class="ui-li-icon" />
          抢红包
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li v-if="isEnableReward == 1">
        <a @click="levelReward">
          <img src="../../static/img/tupian/VIP.png" class="ui-li-icon" />
          等级奖励
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
    </ul>
    <!---->
    <ul class="user-menu">
      <li>
        <a @click="_myfpwd">
          <img src="../../static/img/tupian/password.png" class="ui-li-icon" />
          登录密码修改
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
      <li>
        <a @click="_fundpwd">
          <img src="../../static/img/tupian/password2.png" class="ui-li-icon" />
          设置提款密码
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
    </ul>
    <!---->
    <ul class="user-menu">
      <li>
        <a @click="_checkLine">
          <img src="../../static/img/tupian/xinhao.png" class="ui-li-icon" />
          检测线路
          <em class="iconfont icon-xiangzuo-copy iconjtlb"></em>
        </a>
      </li>
    </ul>
    <!---->
    <bottomnav :indexsum="3"></bottomnav>
  </div>
</template>
<script>
import bottomnav from "../components/bottmnav/bottomnav";

export default {
  filters: {}, //过滤器
  components: {
    bottomnav
  }, //组件注册
  computed: {}, //计算属性
  props: {}, //接受参数
  created() {},
  data() {
    return {
      username: "",
      coin: "",
      uid: "",
      thumb: "",
      sign_enable: "0",
      redEnvelopesStatus: 0,
      isEnableReward: 0,
      payingStatus: false
    };
  },
  mounted() {
    this._ucenter();
  },
  methods: {
    goPaying() {
      //余额宝
      this.$router.push("/paying/index");
    },
    levelReward() {
      //等级奖励
      this.$router.push("/levelReward/index");
    },
    _checkLine() {
      //手动选择线路
      var _this = this;
      if (this.fade == true) {
        this.infotips("需要几秒检测网络情况<br>不要重复检查!");
        return;
      }
      checkLine();
      this.fade = true;
      setTimeout(() => {
        _this.fade = false;
      }, 4000);
    },
    _ucenter() {
      $api.$post("Api/Gift/gift_enable").then(res => {
        this.redEnvelopesStatus = res.data.msg;
      });
      $api.$post("Api/jinji/enableReward").then(res => {
        this.isEnableReward = res.data.data;
      });
      $api.$post("api/yuebao/enable").then(res => {
        this.payingStatus = parseInt(res.data.msg);
      });
      $api.$post("Api/User/ucenter").then(res => {
        this.username = res.data.data.username;
        this.uid = res.data.data.uid;
        this.thumb = res.data.data.thumb;
        this.coin = res.data.data.coin;
        this.sign_enable = res.data.data.sign_enable;
        localStorage.setItem("coin", res.data.data.coin);
        localStorage.setItem("thumb", res.data.data.thumb);
        localStorage.setItem("isCoinPassword", res.data.data.isCoinPassword);
      });
    },
    _logout() {
      //退出
      $api.$post("Api/Base/outlogin").then(res => {
        this.checkOut(res.data.msg);
      });
    },
    _deposit() {
      this.$router.push("/bank/deposit");
    },
    _withdraw() {
      this.$router.push("/bank/withdraw");
    },
    _gameorder() {
      this.$router.push("/gameorder"); //棋牌游戏
    },
    _mymessage() {
      this.$router.push("/mymessage"); //我的消息
    },
    _betrecord() {
      this.$router.push("/betrecord"); //投注记录
    },
    _recharge() {
      this.$router.push("/recharge"); //充值记录
    },
    _cash() {
      this.$router.push("/cash"); //提款记录
    },
    _myfpwd() {
      //修改登录密码
      this.$router.push("/myfpwd"); //修改密码
    },
    _fundpwd() {
      this.$router.push("/fundpwd"); //修改密码
    },
    _rule() {
      this.$router.push("/rule"); //玩法说明
    },
    _extenindex() {
      this.$router.push("/exten/index"); //推广中心
    },
    signIn() {
      //签到活动
      this.$router.push("/signIn/index");
    },
    signInRed() {
      //抢红包
      this.$router.push("/redEnvelopes/index");
    },
    goTodayProfit() {
      this.$router.push({ path: "/todayProfit", query: { uid: this.uid } });
    }
  }
};
</script>
