<template>
  <div class="deposit">
    <!--正文-->
    <header class="header">
      <div class="header-box">
        <a onclick="history.back();" class="header-left">
          <i class="iconfont icon-fanhui cw"></i>
        </a>
        <div class="header-center">账户充值</div>
      </div>
    </header>
    <!---->
    <div class="topUp-balance">
      <div class="topUp-balance-div">客户编号：{{uid}}</div>
      <div class="topUp-balance-div fr">
        余额：
        <strong>{{coin}}</strong>元
        <i @click="_remoney" class="iconfont icon-shuaxin"></i>
      </div>
      <div class="topUp-balance-div">
        充值等级：VIP{{lev.userLev}}
        <br />
        距下一级{{lev.next}}
      </div>
    </div>
    <!---->
    <div class="topUp-ipt flex-box">
      <div>
        请输入充值金额：
        <input
          class="_moninput"
          type="number"
          v-model="paymoney"
          @keyup="_showMoney($event)"
          maxlength="7"
        />
      </div>
    </div>
    <!--付款方式-->
    <ul class="topUp-btn clearfix">
      <li v-for="(item,index) in fixedmoney" :class="{'act': index == moneyindex}">
        <a @click.stop="_selectedamount(item,index)">
          {{item}}元
          <i class="iconfont icon-dagou1"></i>
        </a>
      </li>
    </ul>
    <!---->
    <div class="topUp-pay">
      <div class="topUp-pay-tt">请选择支付方式</div>
      <ul class="topUp-pay-tab clearfix">
        <li :class="{'act': 0 == checkindex}" @click.stop="_checkpay(0)">
          <img src="../../../static/img/topUp2.png" alt />
          <p>支付宝</p>
        </li>
        <li :class="{'act': 1 == checkindex}" @click.stop="_checkpay(1)">
          <img src="../../../static/img/topUp1.png" alt />
          <p>微信</p>
        </li>
        <li :class="{'act': 2 == checkindex}" @click.stop="_checkpay(2)">
          <img src="../../../static/img/topUp3.png" alt />
          <p>云闪付</p>
        </li>
        <li :class="{'act': 3 == checkindex}" @click.stop="_checkpay(3)">
          <img src="../../../static/img/topUp4.png" alt />
          <p>银行转账</p>
        </li>
        <li :class="{'act': 4 == checkindex}" @click.stop="_checkpay(4)">
          <img src="../../../static/img/topUp5.png" alt />
          <p>在线网银</p>
        </li>
      </ul>
      <div class="topUp-pay-box">
        <!--支付宝-->
        <ul class="topUp-pay-list" v-if="0 == checkindex">
          <li v-for="(item,index) in alipay_h5" @click.stop="_selectalipay(index,item)">
            <label class="flex-box">
              <div class="flex">
                <h3>{{item.title}} {{item.pay_limit}}</h3>
                <p v-if="!item.rechType">{{item.pay_remark}}</p>
              </div>
              <div class="topUp-pay-list-radio">
                <input type="radio" v-model="item.id" :value="item.id" />
                <span :class="{'active': index == alipayindex}">
                  <i class="iconfont icon-dagou1"></i>
                </span>
              </div>
            </label>
          </li>
        </ul>
        <!--微信-->
        <ul class="topUp-pay-list" v-if="1 == checkindex">
          <li v-for="(item,index) in weixin_h5" @click.stop="_selectweixin(index,item)">
            <label class="flex-box">
              <div class="flex">
                <h3>{{item.title}} {{item.pay_limit}}</h3>
                <p v-if="!item.rechType">{{item.pay_remark}}</p>
              </div>
              <div class="topUp-pay-list-radio">
                <input type="radio" v-model="item.id" :value="item.id" />
                <span :class="{'active': index == weixinindex}">
                  <i class="iconfont icon-dagou1"></i>
                </span>
              </div>
            </label>
          </li>
        </ul>
        <!--qq-->
        <ul class="topUp-pay-list" v-if="2 == checkindex">
          <li v-for="(item,index) in qq_h5" @click.stop="_selectqq(index,item)">
            <label class="flex-box">
              <div class="flex">
                <h3>{{item.title}} {{item.pay_limit}}</h3>
                <p v-if="!item.rechType">{{item.pay_remark}}</p>
              </div>
              <div class="topUp-pay-list-radio">
                <input type="radio" v-model="item.id" :value="item.id" />
                <span :class="{'active': index == qqindex}">
                  <i class="iconfont icon-dagou1"></i>
                </span>
              </div>
            </label>
          </li>
        </ul>
        <!--银行卡-->
        <ul class="topUp-pay-list" v-if="3 == checkindex">
          <li v-for="(item,index) in yinhang" @click.stop="_selectyinhang(index,item)">
            <label class="flex-box">
              <div class="flex">
                <h3>{{item.title}} {{item.pay_limit}}</h3>
                <p v-if="!item.rechType">{{item.pay_remark}}</p>
              </div>
              <div class="topUp-pay-list-radio">
                <input type="radio" v-model="item.id" :value="item.id" />
                <span :class="{'active': index == yinhangindex}">
                  <i class="iconfont icon-dagou1"></i>
                </span>
              </div>
            </label>
          </li>
        </ul>
        <!--银联-->
        <ul class="topUp-pay-list" v-if="4 == checkindex">
          <li v-for="(item,index) in union_h5" @click.stop="_selectunion(index,item)">
            <label class="flex-box">
              <div class="flex">
                <h3>{{item.title}} {{item.pay_limit}}</h3>
                <p v-if="!item.rechType">{{item.pay_remark}}</p>
              </div>
              <div class="topUp-pay-list-radio">
                <input type="radio" v-model="item.id" :value="item.id" />
                <span :class="{'active': index == unionindex}">
                  <i class="iconfont icon-dagou1"></i>
                </span>
              </div>
            </label>
          </li>
        </ul>
      </div>
      <button type="button" class="btn" @click.stop="_nextstep">下一步</button>
    </div>
    <bottomnav :indexsum="3"></bottomnav>
  </div>
</template>
<script type="text/ecmascript-6">
import bottomnav from "../../components/bottmnav/bottomnav";

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
      id: "", //银行卡id
      uid: "",
      coin: "",
      payurl: "", //跳转到第三方地址
      mch_id: "", //判断是否是人工充值
      fixedmoney: [10, 100, 500, 1000, 3000, 5000, 10000, 20000], //可选择金额区间
      alipay_h5: [], //支付宝接口
      qq_h5: [], //qq支付
      yinhang: [], //其他支付
      union_h5: [], //银联支付
      weixin_h5: [],
      checkindex: 0, //选择充值方式下标
      paymoney: 100, //绑定金额
      moneyindex: 1, //选择金额下标
      alipayindex: -1, //
      weixinindex: -1,
      qqindex: -1,
      yinhangindex: -1,
      unionindex: -1,
      data_all: {}, //参数
      rechType: "", //人工充值类型
      rechName: "", //人工充值名字
      inputName: "", //人工充值通道名称
      inputTime: "", //人工充值时间
      appsecret: "", //银行卡名字
      pay_limit: [], //金额区间(超过或者小于金额)
      lev: {}
    }; //自定义变量
  },
  mounted() {
    this._indexdata();
    this.uid = localStorage.getItem("uid");
    this.coin = localStorage.getItem("coin");
    window.showdisabled = false; //初始化是默认允许点击下一步
  },
  methods: {
    _showMoney(obj) {
      //只能显示一个小数点且只能输入数字
      obj.target.value = obj.target.value.replace(/[^\d.]/g, ""); //先把非数字的都替换掉，除了数字和.
      obj.target.value = obj.target.value.replace(/^\./g, ""); //必须保证第一个为数字而不是.
      obj.target.value = obj.target.value.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
      obj.target.value = obj.target.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", "."); //保证.只出现一次，而不能出现两次以上
    },
    _indexdata() {
      $api.$post("Api/bank/deposit").then(res => {
        this.alipay_h5 = res.data.data.alipay_h5;
        this.qq_h5 = res.data.data.qq_h5;
        this.union_h5 = res.data.data.union_h5;
        this.weixin_h5 = res.data.data.weixin_h5;
        this.yinhang = res.data.data.yinhang;
        this.lev = res.data.data.lev;
      });
    },
    _remoney() {
      //刷新金额
      $api.$post("Api/User/ucenter").then(res => {
        this.coin = res.data.data.coin;
      });
    },
    _selectedamount(val, index) {
      //选择金额
      this.paymoney = val;
      this.moneyindex = index;
    },
    _checkpay(val) {
      //选择支付方式
      this._clearindex();
      this.checkindex = val;
    },
    _selectalipay(val, item) {
      //支付宝
      this._clearindex();
      this.alipayindex = val;
      this.pay_limit = item.pay_limit.split("-");
      this._setpram(item);
    },
    _selectweixin(val, item) {
      //微信
      this._clearindex();
      this.weixinindex = val;
      this.pay_limit = item.pay_limit.split("-");
      this._setpram(item);
    },
    _selectqq(val, item) {
      //qq
      this._clearindex();
      this.qqindex = val;
      this.pay_limit = item.pay_limit.split("-");
      this._setpram(item);
    },
    _selectyinhang(val, item) {
      //银行卡
      this._clearindex();
      this.yinhangindex = val;
      this.pay_limit = [0, 999999999];
      this._setpram(item);
    },
    _selectunion(val, item) {
      //银联
      this._clearindex();
      this.unionindex = val;
      this.pay_limit = item.pay_limit.split("-");
      this._setpram(item);
    },
    _setpram(item) {
      function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return (
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate +
          " " +
          (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
          seperator2 +
          (date.getMinutes() > 9
            ? date.getMinutes()
            : "0" + date.getMinutes()) +
          seperator2 +
          (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds())
        );
      }
      this.id = item.id;
      this.payurl = item.payurl;
      this.mch_id = !item.mch_id ? "" : item.mch_id;
      if (item.mch_id) {
        this.data_all = item;
        this.data_all.inputTime = getNowFormatDate().slice(0, -3);
      }
    },
    _clearindex() {
      //清空重置
      this.alipayindex = -1;
      this.weixinindex = -1;
      this.qqindex = -1;
      this.yinhangindex = -1;
      this.unionindex = -1;
      this.id = "";
      this.payurl = "";
      this.mch_id = "";
      this.data_all = {};
      this.pay_limit = [];
    },
    _nextstep() {
      //下一步,跳转到第三方支付
      if (this.paymoney <= 0 || this.paymoney == "") {
        this.plainalert("金额不能小于0!");
        return;
      }
      if (!this.id) {
        this.plainalert("请选择支付方式!");
        return;
      }
      if (parseInt(this.paymoney) < parseInt(this.pay_limit[0])) {
        //不能小于最小金额
        this.plainalert("金额不能小于" + this.pay_limit[0] + "!");
        return;
      }
      if (parseInt(this.paymoney) > parseInt(this.pay_limit[1])) {
        //不能小于最小金额
        this.plainalert("金额不能超过" + this.pay_limit[1] + "!");
        return;
      }
      if (window.showdisabled == true) {
        //防止重复提交
        return false;
      }
      window.showdisabled = true;
      if (this.mch_id != "") {
        //银行卡支付
        this.data_all.id = this.id;
        this.data_all.money = this.paymoney;
        this.$router.push({
          name: "rengong",
          params: {
            data: this.data_all
          }
        });
      } else {
        //其他支付方式
        var _data = {
          id: this.id,
          amount: this.paymoney
        };
        $api.$rengong(this.payurl, _data).then(res => {
          var _res = res.data.data;
          function runCode(html) {
            var newwin = window.open("", "_self", "");
            newwin.opener = null;
            newwin.document.write(html);
            newwin.document.close();
          }
          if (_res.url == "") {
            //konglianjie
            runCode(_res.string);
            return;
          }
          if (_res.url.indexOf("</html>") > -1) {
            //不存在这个标签就是url地址
            runCode(_res.url);
          } else {
            window.location.href = _res.url;
          }
        });
      }
    }
  } //方法调用
};
</script>