<template>
  <div class="todayProfit h100">
    <!--正文-->
    <header class="top">
      <div class="inner">
        <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
        <p class="title" id="title">长龙助手</p>
      </div>
    </header>

    <div class="list-box">
      <div class="media-object media-object-long" v-for="(item,index) in list" :key="index">
        <div class="media-object-section no-padding">
          <div class="van-icon-box">
            <img :src="item.thumb" />
          </div>
        </div>
        <div class="media-object-section content shrink">
          <div>{{item.title}}</div>
          <div>
            {{item.number | qishu}}期
            <span class="color-danger">
              <van-count-down :time="item.time * 1000" @finish="finished" />
            </span>
          </div>
          <div class="tags">
            <span class="van-hairline--surround van-tag">{{item.wanfa1}}</span>
            <span class="van-hairline--surround van-tag bg-violet">{{item.wanfa}}</span>
            <span class="van-hairline--surround bg-primary van-tag">{{item.qishu}}</span>
          </div>
        </div>
        <div class="selected-btn flex">
          <div
            v-for="(element,i) in item.play"
            @click="selectLottery(item,element)"
            :key="i"
            class="btn-item"
            :class="{'btn-item-selected': selected.playId == element.id && selected.lotteryId == item.type}"
          >
            <div class="w100">{{element.title}}</div>
            <div class="w100">赔{{element.odds}}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="isShowSetMoney" class="bet-top w100">
      <div>每注金额</div>
      <div class="input-box">
        <input type="tel" v-model="bet_money" maxlength="7" />
      </div>
      <div>
        元
        <span v-show="bet_money!=0||bet_money!=''" style="font-size:1.3rem">
          最高可中
          <em class="bet-bons">{{winMax| MathFloor}}</em>元
        </span>
        <span style="font-size:1.3rem" v-show="bet_money == 0 || bet_money == ''">请输入要投注的金额</span>
      </div>
    </div>

    <div class="bet-footer">
      <div class="bet-bottom">
        <div class="bet-b-left">
          <span class="clear" @click="clear_bet()">清空</span>
          <span>共{{count}}注,{{bet_money==""?0:bet_money}}元</span>
        </div>
        <div class="bet-leng">
          <button
            @click="confirmSubmitDialog()"
            class="van-button van-button--primary van-button--small"
          >
            <span class="van-button__text">马上投注</span>
          </button>
        </div>
      </div>
    </div>
    <!-- 确认投注dialog -->
    <van-dialog v-model="isShowDialog" title="确认投注" show-cancel-button @confirm="submit">
      <div class="dialog-content">
        <div>{{bet.title}}：{{bet.number}}期</div>
        <div>
          投注金额：
          <span style="color:#ff2323">{{bet_money}}元</span>
        </div>
        <div>投注内容：[ {{bet.wanfa1}} ] &nbsp;{{bet.playTitle}}</div>
      </div>
    </van-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from "vue";
import { Dialog } from "vant";
Vue.use(Dialog);
import { CountDown } from "vant";
Vue.use(CountDown);
export default {
  components: {}, //组件注册
  created() {
    this.getLongDragonList();
  },
  computed: {
    //是否显示投注金额输入框
    isShowSetMoney() {
      return !this._isObjectEmpty(this.bet);
    },
    //总共投注
    count() {
      if (this._isObjectEmpty(this.bet)) {
        return 0;
      }
      return 1;
    },
    //最高可中
    winMax() {
      if (!this._isObjectEmpty(this.bet)) {
        return this.bet_money * this.bet.playOdds;
      }
      return 0;
    }
  },
  data() {
    return {
      isShowDialog: false, //弹窗组建
      bet_money: "", //投注金额
      bet: {}, //投注信息
      selected: {
        //选中的投注
        lotteryId: "",
        playId: ""
      },
      list: []
    };
  },
  filters: {
    qishu(value) {
      return String(value).substring(4);
    },
    //只保留小数点后两位
    MathFloor(value) {
      return Math.floor(value * 100) / 100;
    }
  },
  mounted() {},
  methods: {
    //判断对象是否为空
    _isObjectEmpty(o) {
      return JSON.stringify(o) == "{}";
    },
    //清空
    clear_bet() {
      this.bet = {};
      this.bet_money = "";
      this.selected.lotteryId = "";
      this.selected.playId = "";
    },
    //选择投注的彩票
    selectLottery(item, play) {
      this.selected.lotteryId = item.type;
      this.selected.playId = play.id;
      let obj = {
        title: item.title,
        id: item.type,
        number: item.number,
        money: this.bet_money,
        wanfa1: item.wanfa1,
        nextNumber: item.nextNumber,
        playId: play.id,
        playTitle: play.title,
        playOdds: play.odds
      };
      this.bet = obj;
    },
    //获取长龙投注列表
    getLongDragonList() {
      $api.$post("/api/Personal/clzs").then(res => {
        this.list = res.data.data;
        console.log(res.data.data);
      });
    },
    validate() {
      //判断存储投注对象数据是否为空
      if (this._isObjectEmpty(this.bet)) {
        Dialog({ title: "提示", message: "请选择一注号码投注" });
        return true;
      }

      if (this.bet_money == "" || this.bet_money == 0) {
        Dialog({ title: "提示", message: "请填写投注金额" });
        return true;
      }

      if (!localStorage.getItem("sessionkey")) {
        Dialog.confirm({
          title: "必须登录才能下单!",
          message: "前去登录"
        })
          .then(() => {
            //跳转到充值页面
            this.$router.push("login");
          })
          .catch(() => {
            // on cancel
          });
        return true;
      }

      if (Number(localStorage.coin) < Number(this.bet_money)) {
        Dialog.confirm({
          title: "您的金额不足,请充值!",
          message: "前去充值"
        })
          .then(() => {
            //跳转到充值页面
            this.$router.push("/bank/deposit");
          })
          .catch(() => {
            // on cancel
          });
        return true;
      }

      return false;
    },
    //马上投注
    confirmSubmitDialog() {
      if (this.validate()) {
        return;
      }
      //打开确认投注弹出框
      this.isShowDialog = true;
    },
    submit() {
      let params = {
        id: this.bet.id,
        number: this.bet.nextNumber,
        bet: JSON.stringify([{ name: this.bet.playId, value: this.bet_money }])
      };

      $api.$post("/Api/Ajax/bet_request", params).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.clear_bet(); //清空页面投注信息
          this.infotips("投注成功!"); //信息提示弹框
          localStorage.setItem("coin", res.data.data.coin);
        }
      });
    },
    finished() {
      //每个倒计时结束时刷新列表
      this.getLongDragonList();
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
}
.list-box {
  height: 100%;
  padding: 1.2rem;
  padding-top: 5.5rem;
  padding-bottom: 8rem;
}
.list-box .media-object-long {
  padding: 0.65rem 0.5rem;
  background: #fff;
  border-radius: 0.3rem;
  margin-bottom: 0.8rem;
  box-shadow: 0 0.04651rem 0.04651rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: nowrap;
}
.media-object-section {
  -webkit-box-flex: 0;
  flex: 0 1 auto;
}
.van-icon-box {
  position: relative;
  width: 6.5em;
  height: 4.6em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-icon-box img {
  width: 65%;
}
/* .van-icon-box i {
  position: relative;
  width: 2.16em;
  height: 2.16em;
} */
.van-icon {
  font: normal normal normal 0.65116rem/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
}

.content {
  width: calc(100% - 17rem);
  text-align: left;
}

.content > div:first-child {
  font-size: 1.5rem;
}
.content > div:nth-child(2) {
  font-size: 1.2rem;
}
.color-danger {
  color: #ff2323 !important;
}
.content > div:nth-child(3) {
  font-size: 0.5515rem;
  margin-top: 0.2rem;
}
.content > div:nth-child(3) span {
  margin-right: 0.27907rem;
  padding: 0 0.23256rem;
  border-radius: 2px;
}
.van-tag {
  display: inline-block;
  line-height: normal;
  font-size: 0.46512rem;
  background: #c9c9c9;
  color: #fff;
}
.content > div:nth-child(3) span {
  margin-right: 0.27907rem;
  padding: 0 0.23256rem;
  border-radius: 2px;
}
.bg-violet {
  color: #fff;
  background-color: #6b73f5 !important;
}
.bg-primary,
.van-tabs__line {
  background-color: #dc3b40 !important;
  color: #fff;
}
.selected-btn {
  width: 12rem;
}
.selected-btn > .btn-item {
  width: 44%;
  margin-left: 6%;
  border: 0.1rem solid #ccc;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btn-item-selected {
  background: #dc3b40;
  border-color: #dc3b40 !important;
}
.btn-item-selected > div:nth-child(1),
.btn-item-selected > div:nth-child(2) {
  color: white !important;
}
.selected-btn > .btn-item > div:nth-child(1) {
  font-size: 1.4em;
  color: #dc3b40;
  text-align: center;
}
.selected-btn > .btn-item > div:nth-child(2) {
  font-size: 0.9em;
  color: #989898;
  text-align: center;
}

.bet-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 4.5rem;
}

.bet-bottom {
  display: flex;
  justify-items: center;
  justify-content: space-between;
  padding: 0 0 0 0.8rem;
  background: #333;
  height: 4.5rem;
}

.bet-bottom > div:first-child {
  display: flex;
  align-items: center;
}

.bet-bottom .bet-b-left + div {
  display: flex;
  align-items: center;
}

.bet-bottom .bet-b-left span.clear {
  border: 0;
  font-size: 1.7em;
  color: #ffaf36;
  padding: 0 0.2em;
}

.bet-bottom .bet-b-left span:last-child {
  color: #fff;
  margin-left: 0.5rem;
}

.bet-bottom .bet-b-left span {
  font-size: 1.4rem;
}

.bet-bottom .bet-b-left + div {
  display: flex;
  align-items: center;
}

.bet-bottom .bet-b-left + div button {
  height: 100%;
  border-radius: 0;
  font-size: 1.5rem;
  padding: 0.7rem;
  margin: 0;
}

.van-button--primary {
  background-color: #dc3b40;
  border: 0.1rem solid #dc3b40;
  color: white;
}

.bet-top {
  display: flex;
  padding: 0.4rem 0.8rem;
  background: #f9f7e9;
  display: flex;
  align-items: center;
  border-top: 0.04651rem solid #dfdfdf;
  position: fixed;
  bottom: 4.5rem;
  left: 0;
}

.bet-top > div {
  font-size: 1.5rem;
  color: #666;
  margin-right: 0.5rem;
}

.bet-top input {
  color: #333;
  height: 2rem;
  font-weight: 500;
  width: 7rem;
  line-height: 2rem;
  border: 0.04651rem solid #dfdfdf;
  border-radius: 0.4rem;
  margin: 0.4rem 0;
  padding: 0.2rem;
}

.dialog-content {
  padding: 2rem;
}
.dialog-content > div {
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1.4rem;
}
.van-count-down {
  font-size: 1.2rem;
  display: inline;
}
</style>
