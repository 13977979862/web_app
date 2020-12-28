<template>
  <div class="homeall _allpage">
    <!--正文-->
    <header class="top">
      <div class="inner">
        <div class="logo">{{Nmsg.web_name}}</div>
        <!--未登录-->
        <div class="denglubtn cw" v-if="!signin">
          <b @click="_gologin">登录</b>/
          <b @click="_register">注册</b>
        </div>
        <!--登录后-->
        <div class="denglubtn" v-if="signin">
          <a class="cw">
            <div class="flussertx" @click="_changavatar">
              <img :src="thumb" alt />
            </div>
            <span class="fl denghoujinkou">
              <b>{{username}}</b>
              <span class="denghoujinkounei">
                <em class="iconfont icon-balance jindou"></em>
                <span id="meminfoMoney">{{coin}}</span>
                <em class="iconfont icon-jiahao"></em>
              </span>
            </span>
          </a>
          <a id="logoutBtn" class="fr cw" @click="_logout">退出</a>
        </div>
      </div>
    </header>
    <!--轮播-->
    <section class="slideBox">
      <div class="bd">
        <div class="tempWrap swiper-container">
          <ul id="headerImageContent" class="swiper-wrapper">
            <li class="swiper-slide" v-for="(item,index) in slide">
              <a class="pic">
                <img
                  :src="item.thumb"
                  @click="_showdetails(item.content)"
                  class="swiper-lazy"
                  onerror="javascript:this.src='../../static/img/s1.jpg'"
                />
                <div class="swiper-lazy-preloader"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="hd swiper-pagination"></div>
    </section>
    <!--跑马灯-->
    <section class="notice">
      <span class="icon imgiconlaba" :style="'background-image:url('+ allpic +')'"></span>
      <div class="notice-text" @click="_showmsg(notice)">
        <p>
          {{Nmsg.title}}：&nbsp;&nbsp;
          <span style="color: red;">{{Nmsg.content}}</span>
        </p>
        <p>
          <marquee scrollamount="3" id="noticeContent">{{notice}}</marquee>
        </p>
      </div>
    </section>
    <!--充值导航-->
    <menu v-if="sign_enable == 1" class="quickMenu">
      <a class="qMenuItem qMenuItemSign color_huang text-overflow" @click="_deposit">
        <i class="iconfont icon-chongzhi1"></i>充值
      </a>
      <a class="qMenuItem qMenuItemSign color_lan text-overflow" @click="_withdraw">
        <i class="iconfont icon-tixian3"></i>提款
      </a>
      <a class="qMenuItem qMenuItemSign color_hong text-overflow" @click="_peferential">
        <i class="iconfont icon-plus-activity"></i>优惠
      </a>
      <a
        class="qMenuItem qMenuItemSign text-overflow"
        @click="signFunc"
        style="color: #0000FF;width: 17.2%;"
      >
        <i class="iconfont icon-ziyuan"></i>签到
      </a>
      <a
        v-if="isShowLongDragon"
        class="qMenuItem qMenuItemSign text-overflow"
        style="color: #8341ce;"
        @click="_enterLongDragonAssistant"
      >
        <i class="iconfont longDragonFonts icon-longDragon"></i>长龙
      </a>

      <a
        v-else
        class="qMenuItem qMenuItemSign text-overflow"
        style="color: #8341ce;"
        @click="_extenindex"
      >
        <i class="iconfont icon-web__fenxiang"></i>推广
      </a>
      <a class="qMenuItem qMenuItemSign color_lv text-overflow" @click="_downlink">
        <i class="iconfont icon-xiazaidownload140"></i>APP
      </a>
    </menu>
    <menu v-else class="quickMenu">
      <a class="qMenuItem color_huang text-overflow" @click="_deposit">
        <i class="iconfont icon-chongzhi1"></i>充值
      </a>
      <a class="qMenuItem color_lan text-overflow" @click="_withdraw">
        <i class="iconfont icon-tixian3"></i>提款
      </a>
      <a class="qMenuItem color_hong text-overflow" @click="_peferential">
        <i class="iconfont icon-plus-activity"></i>优惠
      </a>
      <a
        v-if="isShowLongDragon"
        class="qMenuItem qMenuItemSign text-overflow"
        style="color: #8341ce;"
        @click="_enterLongDragonAssistant"
      >
        <i class="iconfont longDragonFonts icon-longDragon"></i>长龙
      </a>
      <a v-else class="qMenuItem text-overflow" style="color: #8341ce;" @click="_extenindex">
        <i class="iconfont icon-web__fenxiang"></i>推广
      </a>
      <a class="qMenuItem color_lv text-overflow" @click="_downlink">
        <i class="iconfont icon-xiazaidownload140"></i>APP
      </a>
    </menu>
    <!--彩种列表-->
    <div id="innerbox">
      <!---->
      <div class="dexcontin" style="padding-left: 0px; padding-right: 0px;">
        <div
          style="display: flex;justify-content: center;text-align: center;background: #fff;border-bottom: 1px solid #ddd;height: 4.67rem;line-height: 4.67rem;font-size: 1.5rem;"
        >
          <div
            :class="{'active': active}"
            @click="active = true"
            style="flex-grow: 1;cursor: pointer;"
          >
            <img
              v-show="!active"
              style="width: 2.083rem; position: relative;top: 6px;left: -1.416rem;"
              src="../../static/img/home/icon_tab_lottery_n.png"
              alt
            />
            <img
              v-show="active"
              style="width: 2.083rem; position: relative;top: 6px;left: -1.416rem;"
              src="../../static/img/home/icon_tab_lottery_p.png"
              alt
            />
            <span style="position: relative;top: 1px;">彩</span>票游戏
          </div>
          <div
            :class="{'active1': !active}"
            @click="active = false"
            style="flex-grow: 1;cursor: pointer;"
          >
            <img
              v-show="active"
              style="width: 2.083rem; position: relative;top: 7px;left: -1.416rem;"
              src="../../static/img/home/icon_tab_chess_n.png"
              alt
            />
            <img
              v-show="!active"
              style="width: 2.083rem; position: relative;top: 7px;left: -1.416rem;"
              src="../../static/img/home/icon_tab_chess_p.png"
              alt
            />棋牌游戏
          </div>
        </div>
        <div v-show="active">
          <a @click="_extenindex" style="padding: 0.583rem 0 0.583rem 1.416rem;">
            <span
              class="cptu imgicontui"
              :style="'background-image:url('+ allpic +');background-position:'+ tuig.x*5 +'rem '+ tuig.y*5 +'rem;'"
            ></span>
            <span class="cpnr">{{publicity.title}}</span>
            <span class="cppt">{{publicity.info}}</span>
          </a>
        </div>
        <div v-show="active">
          <a
            v-for="(item,index) in lottery"
            style="padding: 0.583rem 0 0.583rem 1.416rem;"
            :data-id="item.id"
            :data-type="item.type"
            v-if="item.type != 4 && item.type != 7"
            @click="_Details(item.type,item.id)"
          >
            <span
              v-if="item.id == 2 || item.id == 3 || item.id == 5 || item.id == 6"
              class="cptu"
              :class="'imgicon'+item.id"
              style="margin-right: 1rem;"
            >
              <img :src="item.thumb" alt />
            </span>
            <span
              v-else
              class="cptu"
              :style="'background-image:url('+ allpic +');background-position:'+ item.position.x*5 +'rem '+ item.position.y*5+'rem;margin-right: 1rem;'"
              :class="'imgicon'+item.id"
            ></span>
            <span class="cpnr">{{item.title}}</span>
            <span
              class="cppt"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{item.info}}</span>
          </a>
        </div>
      </div>
      <div v-show="active" class="dexcontin _kuai3" style="padding-left: 0px; padding-right: 0px;">
        <div class="home-lottery-tt">
          <i class="iconfont icon-aixinjuanzeng"></i>快3系列
        </div>
        <div>
          <a
            v-for="(item,index) in lottery"
            style="padding: 0.583rem 0 0.583rem 1.416rem;"
            :data-id="item.id"
            :data-type="item.type"
            v-if="item.type == 4"
            @click="_Details(item.type,item.id)"
          >
            <span
              class="cptu"
              :style="'background-image:url('+ allpic +');background-position:'+ item.position.x*5 +'rem '+ item.position.y*5+'rem;margin-right: 1rem;'"
              :class="'imgicon'+item.id"
            ></span>
            <span class="cpnr">{{item.title}}</span>
            <span
              class="cppt"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
            >{{item.info}}</span>
          </a>
        </div>
      </div>

      <div class="dexcontin _kuai3" v-show="active" style="padding-left: 0px; padding-right: 0px;">
        <div class="home-lottery-tt" style="margin-bottom: 0;border-bottom: 0;">
          <i class="iconfont icon-aixinjuanzeng"></i>11选5系列
        </div>
        <div>
          <a
            v-for="(item,index) in lottery"
            :key="index"
            style="padding: 0.583rem 0 0.583rem 1.416rem;"
            :data-id="item.id"
            :data-type="item.type"
            v-if="item.type == 7"
            @click="_Details(item.type,item.id)"
          >
            <span class="cptu" :class="'imgicon'+item.id">
              <img :src="item.thumb" alt />
            </span>
            <span class="cpnr">{{item.title}}</span>
            <span class="cppt">{{item.info}}</span>
          </a>
        </div>
      </div>

      <!--游戏棋牌-->
      <div
        v-show="!active"
        class="dexcontin"
        style="padding-bottom: 0.5rem;padding-left: 0px; padding-right: 0px;padding-top: 0;"
      >
        <div>
          <a
            v-for="(item,index) in playGameList"
            style="padding: 0.583rem 0 0.583rem 1.416rem;"
            @click="_GameDetails(item,1)"
          >
            <span style="width: 5rem;height: 5rem;float: left;margin-right: 1rem;">
              <img style="width: 100%;" :src="item.titlepic" alt />
            </span>
            <span class="cpnr">{{item.title}}</span>
            <span class="cppt">{{item.desc}}</span>
          </a>
        </div>
        <!--棋牌充值-->
        <div>
          <a @click="_GameRecharge" style="padding: 0.583rem 0 0.583rem 1.416rem;">
            <span style="width: 5rem;height: 5rem;float: left;margin-right: 1rem;">
              <img style="width: 100%;" src="../../static/img/edzh2.png" alt />
            </span>
            <span class="cpnr">额度转换</span>
            <span class="cppt">棋牌上分/退分</span>
          </a>
        </div>
      </div>
    </div>
    <!---->
    <bottomnav :indexsum="0"></bottomnav>

    <div style="position: fixed;bottom: 0;width: 100%;height: 5rem;max-width: 640px;">
      <!-- 红包 -->
      <div v-if="redEnvelopesStatus == 1" class="red_envelopes">
        <img @click="goRedEnvelopes" src="../../static/img/home/qhbtubao_01.png" alt />
        <span
          @click="goRedEnvelopes"
          class="wtf"
          style="position: absolute;top: 24%;right: 20px;color: #fff;"
        >00:00</span>
      </div>
      <bottomnav :indexsum="0">qwe</bottomnav>
    </div>

    <!--加载中-->
    <div class="_vatarselect" v-show="showavct">
      <div class="_avimgcount">
        <ul>
          <li v-for="(item,index) in avatar" @click="_chooseavatar(item,index)">
            <img :src="item" :class="{'_ck': avatarindex == index}" :alt="item" />
          </li>
        </ul>
      </div>
      <div class="_avatarflex">
        <div class="_avcheck _avatarc" @click="_closeavatar(0)">取消</div>
        <div class="_avcheck _avataro" @click="_closeavatar(1)">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import bottomnav from "./bottmnav/bottomnav";
export default {
  filters: {}, //过滤器
  components: {
    bottomnav
  }, //组件注册
  computed: {}, //计算属性
  props: {}, //接受参数
  data() {
    return {
      username: "", //用户信息
      coin: "", //用户金额
      signin: false, //是否显示登录
      showavct: false, //切换头像
      avatarindex: -1,
      avatarthumb: "",
      slide: [], //轮播图
      lunbolist: [],
      lottery: [], //所有彩种列表
      playGameList: [], //游戏列表
      notice: "", //跑马灯
      mySper: null, //轮播
      thumb: "", //头像
      allpic: "", //
      avatar: [], //所有头像
      Nmsg: {}, //信息
      tuig: {},
      publicity: {}, //推广
      downlink: "", //下载链接
      sign_enable: 0,
      redEnvelopesStatus: 0,
      timeInter: null,
      active: true,
      isShowLongDragon: false //是否显示长龙
    }; //自定义变量
  },
  activated() {
    //针对首页keep-live
    this._checklogin(); //监测是否登录
    this._prompt();
  },
  watch: {
    $route(to, from) {
      if (to.path === "/home" && this.redEnvelopesStatus == 1) {
        this.redEnvelopesTime();
        this.getIsShowLongGragon();
      }
    }
  },
  mounted() {
    this._firstrender();
    this._checklogin(); //监测是否登录
    this._getlist();
    this.redEnvelopesTime();
    this.getSignStatus();
    this.getIsShowLongGragon();
  },
  methods: {
    goRedEnvelopes() {
      //抢红包
      this.signin != true
        ? this.$router.push("/login")
        : this.$router.push("/redEnvelopes/index");
    },
    getSignStatus() {
      $api.$post("Api/Sign/isSign").then(res => {
        this.sign_enable = res.data.data.sign_enable;
      });
    },
    //是否显示长龙和今日盈亏
    getIsShowLongGragon() {
      $api.$post("/api/personal/enable").then(res => {
        this.isShowLongDragon = res.data.data == 1;
        sessionStorage.setItem("isShowProfit", res.data.data);
      });
    },
    async setTimeRedEnvelopesTime() {
      if (this.redEnvelopesStatus != 1) {
        return;
      }
      let dateNum = await $api.$post("api/ajax/getTime").then(res => {
        return res.data.data.time3;
      });
      let dateTimeArr = dateNum
        .split(" ")[1]
        .split(":")
        .map(n => {
          return Number(n);
        });
      if (dateTimeArr[1] > 4) {
        let minute, second;
        dateTimeArr[2] == 0
          ? (minute = 60 - dateTimeArr[1] + "")
          : (minute = 60 - dateTimeArr[1] - 1 + "");
        second = 60 - dateTimeArr[2] + "";
        minute < 10 ? (minute = 0 + minute) : "";
        second < 10 ? (second = 0 + second) : "";
        let dateTime = minute + ":" + second;
        $(".wtf").html(this.dateTime);
        clearInterval(this.timeInter);
        this.timeInter = setInterval(() => {
          let dateTimeArr = dateTime.split(":").map(n => {
            return Number(n);
          });
          if (dateTimeArr[1] == 0) {
            if (dateTimeArr[0] != 0) {
              dateTimeArr[0] = dateTimeArr[0] - 1;
              dateTimeArr[1] = 59;
            } else {
              if (this.clearNum > 300) {
                clearInterval(this.timeInter);
                this.clearNum = 0;
                this.redEnvelopesTime();
              } else {
                this.clearNum++;
              }
            }
          } else {
            dateTimeArr[1]--;
          }
          dateTimeArr[0] < 10 ? (dateTimeArr[0] = "0" + dateTimeArr[0]) : "";
          dateTimeArr[1] < 10 ? (dateTimeArr[1] = "0" + dateTimeArr[1]) : "";
          dateTime = dateTimeArr[0] + ":" + dateTimeArr[1];
          this.dateTime = dateTime;
          $(".wtf").html(this.dateTime);
        }, 1000);
      }
    },
    async redEnvelopesTime() {
      await $api.$post("Api/Gift/gift_enable").then(res => {
        this.redEnvelopesStatus = res.data.msg;
      });
      await this.setTimeRedEnvelopesTime();
    },
    signFunc() {
      this.signin != true
        ? this.$router.push("/login")
        : this.$router.push("/signIn/index");
    },
    _firstrender() {
      //防止首页进来是空白页面,至少展示
      var _data = {
        data: {
          content: {
            id: 12,
            c_time: 1537815570,
            title: "\u260538356.com\u2605",
            content:
              "\u5929\u5929\u4e2d\u260538356.com\u2605\u5168\u7f51\u6700\u706b\u70ed\u7684\u638c\u4e0a\u5f69\u7968APP\uff1a\u73a9\u6cd5\u591a\u3001\u8d54\u7387\u9ad8\u3001\u4fe1\u8a89\u597d\u3001\u56de\u62a5\u5feb\uff0c\u5929\u5929\u4e2d\u6709\u4f60\u66f4\u7cbe\u5f69\uff01",
            type: 1,
            status: 1
          },
          slide: [
            {
              title: "\u795e\u79d8\u5f69\u91d1\u5929\u5929\u9001",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/slide/1.jpg",
              content:
                '<h3 style="text-align: center;"><span style="font-size: 18px;"><strong>\u795e\u79d8\u5f69\u91d1 &nbsp;\u5929\u5929\u9001</strong></span></h3><p style="text-align: center;"><span style="font-size: 16px;"><strong>2018-01-05</strong></span></p><p><img style="width:96%;height:auto;"src="https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/slide/1.jpg"/></p><p>\u6d3b\u52a8\u5bf9\u8c61\uff1a\u5929\u5929\u4e2d\u5f69\u7968\u5168\u4f53\u65b0\u8001\u4f1a\u5458</p><p>\u5173\u6ce8\u4e2a\u4eba\u6d88\u606f\uff0c\u9886\u53d6\u795e\u79d8\u5f69\u91d1\uff0c1-288888\u5143\u968f\u673a\u6d3e\u9001</p><p><br/></p><p><span style="color:#E53333;font-size:14px;"><strong>\u6d3b\u52a8\u5185\u5bb9:</strong></span><br/><span style="font-size:14px;"><span style="color:#000000;">\u2605\u795e\u79d8\u5f69\u91d1\u65e0\u9700\u53d1\u9001\u7533\u8bf7\uff0c\u53ea\u9700\u5173\u6ce8---\u4e2a\u4eba\u6d88\u606f--\u5c31\u6709\u53ef\u80fd\u9886\u53d6</span><span style="color:#4C33E5;"><strong>1-288888\u5143\uff08\u968f\u673a\u91d1\u989d\uff09</strong></span><span style="color:#000000;">\u795e\u79d8\u5f69\u91d1\uff01\u76f4\u63a5\u5212\u5165\u4f1a\u5458\u8d26\u53f7\u6216\u7ed1\u5b9a\u4e4b\u94f6\u884c\u8d26\u53f7\uff01</span></span><br/><span style="font-size:14px;color:#000000;">\u2605\u51e1\u662f\u83b7\u5f97\u795e\u79d8\u5956\u91d1\u7684\u4f1a\u5458\uff0c\u6211\u4eec\u5c06\u4ee5\u5f69\u91d1\u7684\u65b9\u5f0f\u76f4\u63a5\u5b58\u5165\u4f1a\u5458\u8d26\u53f7\u6216\u7ed1\u5b9a\u7684\u94f6\u884c\u8d26\u53f7\uff0c\u901a\u8fc7\u7528\u6237\u4e2d\u5fc3\u7684\u201c\u4e2a\u4eba\u4fe1\u606f\u201d\u901a\u77e5\uff0c\u8fd8\u671b\u4f1a\u5458\u80fd\u591a\u591a\u5173\u6ce8\u652f\u6301\u5929\u5929\u4e2d\u5f69\u7968\u5662\uff0c\u795d\u60a8\u6210\u4e3a\u4e0b\u4e00\u4e2a\u5e78\u8fd0\u513f\uff01</span><br/><br/><span style="color:#E53333;font-size:14px;"><strong>\u6d3b\u52a8\u8be6\u60c5:</strong></span><br/><span style="font-size:14px;"><span style="color:#000000;">\u3010\u5929\u5929\u4e2d\u5f69\u7968\u3011\u6bcf\u5468\u4e0d\u5b9a\u671f\u6d3e\u9001</span><span style="color:#4C33E5;"><strong>1-288888\u5143\uff08\u968f\u673a\u91d1\u989d\uff09</strong></span><span style="color:#000000;">\u795e\u79d8\u5f69\u91d1\u7ed9\u4e88\u5728\u5929\u5929\u4e2d\u5f69\u7968\u7684\u4f1a\u5458\u4eec\uff0c\u53ea\u8981\u60a8\u5728\u5929\u5929\u4e2d\u5f69\u7968\u6709\u6ce8\u518c\u8fc7\u8d26\u53f7\u5e76\u4e14\u7ed1\u5b9a\u94f6\u884c\u5361\u53f7\uff0c\u53ea\u8981\u60a8\u66fe\u7ecf\u767b\u5f55\u8fc7\u5929\u5929\u4e2d\u5f69\u7968\uff0c\u5c31\u7b97\u60a8\u4e0d\u66fe\u5728\u6211\u516c\u53f8\u5b58\u6b3e\u6e38\u620f\u8fc7\uff0c\u90fd\u6709\u53ef\u80fd\u6536\u5230\u6211\u4eec\u4e3a\u60a8\u968f\u673a\u6d3e\u53d1\u7684\u60ca\u559c\u5f69\u91d1\uff0c\u5c1a\u672a\u6ce8\u518c\u7684\u4eb2\u4eec\u5f3a\u70c8\u5efa\u8bae\u60a8\u6ce8\u518c\uff01</span><br/></span><span style="font-size:13.3333px;"></span><br/><br/><span style="color:#E53333;font-size:14px;"><strong>\u6d3b\u52a8\u7ec6\u5219:</strong></span><br/></p><p style="font-size:13.3333px;"><span style="font-size:14px;color:#000000;">\u5b58\u5165\u4f1a\u5458\u8d26\u53f7\u5185\u7684\u795e\u79d8\u5f69\u91d1\u9700\u4e00\u500d\u6d41\u6c34\u5373\u53ef\u63d0\u6b3e\uff1b</span></p><p><span style="font-size:14px;color:#000000;">\u53c2\u4e0e\u8be5\u4f18\u60e0\uff0c\u5373\u8868\u793a\u60a8\u540c\u610f\u300a\u4f18\u60e0\u89c4\u5219\u4e0e\u6761\u6b3e\u300b\u3002</span><br/><br/><br/><span style="color:#E53333;font-size:14px;"><strong>\u4f18\u60e0\u89c4\u5219\u4e0e\u6761\u6b3e:</strong></span><br/><span style="font-size:14px;color:#000000;">1.\u6bcf\u4f4d\u73a9\u5bb6\ufe51\u6bcf\u6237\ufe51\u6bcf\u4e00\u4f4f\u5740 \u3001\u6bcf\u4e00\u7535\u5b50\u90ae\u7bb1\u5730\u5740\ufe51\u6bcf\u4e00\u7535\u8bdd\u53f7\u7801\ufe51\u76f8\u540c\u652f\u4ed8\u65b9\u5f0f(\u76f8\u540c\u501f\u8bb0\u5361/\u4fe1\u7528\u5361/\u94f6\u884c\u8d26\u6237) \u53caIP\u5730\u5740\u53ea\u80fd\u4eab\u6709\u4e00\u6b21\u4f18\u60e0\uff1b\u82e5\u4f1a\u5458\u6709\u91cd\u590d\u7533\u8bf7\u8d26\u53f7\u884c\u4e3a\uff0c\u516c\u53f8\u4fdd\u7559\u53d6\u6d88\u6216\u6536\u56de\u4f1a\u5458\u4f18\u60e0\u5f69\u91d1\u7684\u6743\u5229\uff1b</span><br/><span style="font-size:14px;color:#000000;">2.\u5929\u5929\u4e2d\u5f69\u7968\u6240\u6709\u4f18\u60e0\u7279\u4e3a\u73a9\u5bb6\u800c\u8bbe\uff0c\u5982\u53d1\u73b0\u4efb\u4f55\u56e2\u4f53\u6216\u4e2a\u4eba\uff0c\u4ee5\u4e0d\u8bda\u5b9e\u65b9\u5f0f\u5957\u53d6\u7ea2\u5229\u6216\u4efb\u4f55\u5a01\u80c1\u3001\u6ee5\u7528\u516c\u53f8\u4f18\u60e0\u7b49\u884c\u4e3a\uff0c\u516c\u53f8\u4fdd\u7559\u51bb\u7ed3\u3001\u53d6\u6d88\u8be5\u56e2\u4f53\u6216\u4e2a\u4eba\u8d26\u6237\u53ca\u8d26\u6237\u7ed3\u4f59\u7684\u6743\u5229\uff1b</span><br/></p><p style="font-size:13.3333px;"><span style="font-size:14px;color:#000000;">3.\u82e5\u4f1a\u5458\u5bf9\u6d3b\u52a8\u6709\u4e89\u8bae\u65f6\uff0c\u4e3a\u786e\u4fdd\u53cc\u65b9\u5229\u76ca\uff0c\u675c\u7edd\u8eab\u4efd\u76d7\u7528\u884c\u4e3a\uff0c\u5929\u5929\u4e2d\u5f69\u7968\u6709\u6743\u8981\u6c42\u4f1a\u5458\u5411\u6211\u4eec\u63d0\u4f9b\u5145\u8db3\u6709\u6548\u7684\u6587\u4ef6\uff0c\u7528\u4ee5\u786e\u8ba4\u662f\u5426\u4eab\u6709\u8be5\u4f18\u60e0\u7684\u8d44\u8d28\uff1b</span></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<br/></p><p><span style="font-size:14px;color:#000000;">\u5929\u5929\u4e2d\u5f69\u7968\u4fdd\u7559\u5bf9\u6d3b\u52a8\u7684\u6700\u7ec8\u89e3\u91ca\u6743\uff0c\u4ee5\u53ca\u5728\u65e0\u901a\u77e5\u7684\u60c5\u51b5\u4e0b\u4fee\u6539\u3001\u7ec8\u6b62\u6d3b\u52a8\u7684\u6743\u5229\uff0c\u9002\u7528\u4e8e\u6240\u6709\u4f18\u60e0\u3002</span><br/></p><p>&nbsp; &nbsp;<br/></p><p>&nbsp; &nbsp;<br/></p>',
              time: "\u957f\u671f"
            },
            {
              title:
                "\u5929\u5929\u4e2d\u5f69\u7968  \u5929\u5929\u9886\u8fd4\u6c34",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/slide/4.jpg",
              content:
                '<p><img style="width:96%;height:auto;"src="https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/slide/4.jpg"/></p><h3 style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none; color: rgb(229, 51, 51);">\u6d3b\u52a8\u5bf9\u8c61\uff1a</h3><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px 0px 0px 20px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none;">\u2605 \u5929\u5929\u4e2d\u5f69\u7968\u5168\u4f53\u4f1a\u5458</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px 0px 0px 20px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none;"><br/></p><h3 style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none; color: rgb(229, 51, 51);">\u6d3b\u52a8\u5185\u5bb9\uff1a</h3><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px 0px 0px 20px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none;">\u2605 \u51e1\u662f\u5728\u5929\u5929\u4e2d\u8fdb\u884c\u4efb\u4f55\u4e00\u9879\u5f69\u7968\u6e38\u620f\u6295\u6ce8\u7684\uff08\u9664\u516d\u5408\u5f69\u5916\uff09\uff0c\u6b21\u65e5\u5373\u53ef\u83b7\u5f97\u6d17\u7801\u91d1\uff08\u5f53\u65e5\u603b\u6295\u6ce8\u989d*\u8fd4\u6c34\u6bd4\u4f8b\uff09\uff0c\u65e0\u9700\u7533\u8bf7\uff0c\u4e8e\u6bcf\u65e5<a style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; color: rgb(229, 51, 51);">18:00</a><span class="Apple-converted-space">&nbsp;</span>\u70b9\u524d\u81ea\u52a8\u8d60\u9001\u5230\u4f1a\u5458\u8d26\u6237\u4e0a\uff01</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px 0px 0px 20px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none;"><br/></p><h3 style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none; color: rgb(229, 51, 51);">\u6d3b\u52a8\u8be6\u60c5\uff1a</h3><p><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">&nbsp; &nbsp; \u6bcf\u65e5\u7d2f\u8ba1\u6295\u6ce8\u989d</span><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">&nbsp; \u8fd4\u6c34\u6bd4\u4f8b</span></p><p><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">&nbsp; &nbsp; 10\u4e07\u4ee5\u4e0b&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">0.2%&nbsp; &nbsp; &nbsp;&nbsp;</span></p><p><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">&nbsp; &nbsp; 10\u4e07-100\u4e07&nbsp; &nbsp; &nbsp;&nbsp;</span><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">0.3%&nbsp; &nbsp; &nbsp;&nbsp;</span></p><p><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">&nbsp; &nbsp; 100\u4e07\u4ee5\u4e0a&nbsp; &nbsp; &nbsp; &nbsp;</span><span class="flexh3_flex" style="margin: 0px; padding: 0px; border-top: none; border-right: 1px solid rgb(212, 212, 212); border-bottom: 1px solid rgb(212, 212, 212); border-left: none; border-image: initial; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; flex: 1 1 0%; text-align: center;">0.4%&nbsp; &nbsp; &nbsp;&nbsp;</span></p><h3 style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none; color: rgb(229, 51, 51);">\u6ce8\u610f\u4e8b\u9879\uff1a</h3><p>&nbsp; &nbsp;&nbsp;<span style="font-size: 14px;">\u2605\u5f53\u65e5\u603b\u6295\u6ce8\u9700\u8fbe\u52305\u5143\u4ee5\u4e0a\uff0c\u624d\u80fd\u6ee1\u8db3\u8fd4\u6c34\u6761\u4ef6\uff01</span></p><p><span style="font-size: 14px;">&nbsp; &nbsp; &nbsp;<span style="font-size: 14px;">\u2605\u516d\u5408\u5f69\u4e0d\u8ba1\u5165\u8fd4\u6c34</span></span></p><h3 style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none; color: rgb(229, 51, 51);">\u6d3b\u52a8\u65f6\u95f4\uff1a</h3><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px 0px 0px 20px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none;">\u2605<span class="Apple-converted-space">&nbsp;</span><a style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; color: rgb(229, 51, 51);">2018</a>\u5e74<a style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; color: rgb(229, 51, 51);">6</a>\u6708<a style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; color: rgb(229, 51, 51);">5</a>\u65e5 \u8d77 \uff08\u5929\u5929\u4e2d\u4fdd\u7559\u5bf9\u6d3b\u52a8\u7684\u6700\u7ec8\u89e3\u91ca\u6743\uff0c\u7ec8\u6b62\u6d3b\u52a8\u4f1a\u63d0\u524d\u544a\u77e5\uff09</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px 0px 0px 20px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none;"><br/></p><h3 style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none; color: rgb(229, 51, 51);">\u6d3b\u52a8\u901a\u77e5\u63a8\u9001\uff1a</h3><p style="margin-top: 0px; margin-bottom: 0px; padding: 0px 0px 0px 20px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: inherit; vertical-align: baseline; text-size-adjust: none;">\u2605 \u6bcf\u65e5\u8fd4\u6c34\u91d1\u989d\u8fd4\u56de\u5230\u4f1a\u5458\u8d26\u6237\u4e0a\u540e\uff0c\u4f1a\u901a\u8fc7APP\u63a8\u9001\u901a\u77e5\u81f3\u5404\u73a9\u5bb6\u624b\u673a\u4e0a\uff0c\u8bf7\u6240\u6709\u4f1a\u5458\u901a\u8fc7<span class="Apple-converted-space">&nbsp;</span><a href="http://m.tiantianzhong8.com/index.php?s=/home/promotion/bank2.html" style="margin: 0px; padding: 0px; border: none; outline: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline; color: rgb(229, 51, 51);">38356.com</a><span class="Apple-converted-space">&nbsp;</span>\u4e0b\u8f7d\u5168\u65b0\u7248\u672cAPP\uff0c\u4ee5\u4fbf\u6bcf\u65e5\u80fd\u591f\u53ca\u65f6\u6536\u5230\u5929\u5929\u4e2d\u4e00\u624b\u63a8\u9001\u4fe1\u606f\uff01</p><p><br/></p>',
              time: "\u957f\u671f"
            },
            {
              title:
                "\u63a8\u5e7f\u6536\u6c38\u4e45\u4f1a\u5458\u5f97\u4e24\u7ea7\u4e30\u539a\u4f63\u91d1",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/slide/2.jpg",
              content:
                '<h3 style="text-align: center;">\u63a8\u5e7f\u6536\u6c38\u4e45\u4f1a\u5458\u5f97\u4e24\u7ea7\u4e30\u539a\u4f63\u91d1</h3><p style="text-align: center;">2018-01-07</p><p><img style="width:96%;height:auto;"src="https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/slide/2.jpg"/></p><p>\u6d3b\u52a8\u5bf9\u8c61\uff1a\u5929\u5929\u4e2d\u5f69\u7968\u5168\u4f53\u65b0\u8001\u4f1a\u5458</p><p>\u63a8\u5e7f\u6536\u6c38\u4e45\u4f1a\u5458\u53ef\u5f97\u4e30\u539a\u4f63\u91d1</p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;color:#000000;">\u4e00\u7ea7\u4f1a\u5458</span><strong><span style="font-size:14px;color:#CC33E5;">0.2%</span></strong><span style="font-size:14px;color:#000000;">\u4f63\u91d1</span></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;color:#000000;">\u4e8c\u7ea7\u4f1a\u5458</span><span style="font-size:14px;color:#9933E5;"><strong>0.1%</strong></span><span style="font-size:14px;color:#000000;">\u4f63\u91d1</span></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;"><br/></span></p><p><span style="color:#E53333;font-size:14px;"><strong>\u64cd\u4f5c\u6b65\u9aa4\uff1a</strong></span><br/></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;"><span style="color:#000000;">\u8fdb\u5165\u672c\u7ad9\u7684\u63a8\u5e7f\u4e2d\u5fc3\uff0c\u5206\u4eab\u94fe\u63a5\u7ed9\u597d\u53cb\u3002</span></span></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;color:#000000;">\u2605 \u5206\u4eab\u65b9\u5f0f\u6709\u4e09\u79cd\u6e20\u9053\uff1a<br/>1\u3001\u9762\u5bf9\u9762\u626b\u4e8c\u7ef4\u7801\uff1b<br/>2\u3001\u901a\u8fc7\u5fae\u4fe1\u3001QQ\u5206\u4eab\uff1b<br/>3\u3001\u590d\u5236\u94fe\u63a5\u901a\u8fc7\u77ed\u4fe1\u53d1\u9001\u3002</span></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;color:#000000;">\u2605 \u4e8c\u7ef4\u7801\u548c\u94fe\u63a5\u90fd\u662f\u60a8\u72ec\u6709\u7684\uff0c\u4efb\u4f55\u4eba\u901a\u8fc7\u626b\u60a8\u7684\u4e8c\u7ef4\u7801\u6216\u70b9\u60a8\u63a8\u8350\u7684\u94fe\u63a5\u8fdb\u6765\uff0c\u90fd\u4f1a\u6210\u4e3a\u60a8\u7684\u6c38\u4e45\u4f1a\u5458\uff01</span><span style="font-size:14px;color:#000000;"></span></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<br/><span style="font-family:Arial, \u5b8b\u4f53;background-color:#F7F7F7;"></span></p><p><span style="color:#E53333;font-size:14px;"><strong>\u4f63\u91d1\u6536\u5165\uff1a</strong></span><br/></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;color:#000000;">\u60a8\u6240\u63a8\u8350\u7684\u4f1a\u5458\u5728\u4e0b\u6ce8\u7ed3\u7b97\u540e\uff0c\u4f63\u91d1\u4f1a\u81ea\u52a8\u6309\u7167\u6bd4\u4f8b\u52a0\u5230\u60a8\u7684\u8d44\u91d1\u8d26\u6237\u4e0a\u3002<br/>\u2605 \u4f8b\u5982\uff1a\u60a8\u6240\u63a8\u8350\u7684\u4f1a\u5458\u4e0b\u6ce81000\u5143\uff0c\u60a8\u7684\u6536\u76ca = 1000\u5143 * 0.20% = 2\u5143\uff1b\u60a8\u7684\u4e8c\u7ea7\u4f1a\u5458\u4e0b\u6ce81000\u5143\uff0c\u60a8\u7684\u6536\u76ca = 1000\u5143 * 0.10% = 1\u5143\u3002</span><span style="font-size:14px;color:#000000;"></span></p><p style="font-size:13.3333px;"><br/><strong><span style="font-size:14px;color:#E53333;">\u6ce8\u610f\u4e8b\u9879\uff1a</span></strong></p><p style="font-size:13.3333px;">&nbsp; &nbsp;<span style="font-size:14px;color:#000000;">\u4e0b\u7ea7\u4f1a\u5458\u5355\u7b14\u4e0b\u6ce85\u5143\u4ee5\u4e0a\u624d\u6709\u8fd4\u4f63\u54e6\uff01</span></p><p>&nbsp; &nbsp;<br/></p><p>&nbsp; &nbsp;<br/></p>',
              time: "\u957f\u671f"
            }
          ],
          menu: [
            { title: "\u5145\u503c", orderby: 1 },
            { title: "\u63d0\u6b3e", orderby: 2 },
            {
              title: "\u4f18\u60e0",
              orderby: 3
            },
            { title: "\u63a8\u5e7f", orderby: 4 }
          ],
          kf:
            "https://chat.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=961174&configID=60567&jid=1309647827&s=1",
          appstore:
            "https://itunes.apple.com/us/app/id1357594785?l=zh&ls=1&mt=8",
          android: "http://tiantianzhongappxiazai.com/ttzcpys.apk",
          wechar_code:
            "http://www.tiantianzhong33333.com/index.php?s=/Home/Index/app.html",
          lottery: [
            {
              id: 81,
              name: "cjpk10",
              title: "\u8d85\u7ea7\u8d5b\u8f66",
              data_ftime: 12,
              video:
                "https://zhibo.tiantianzhong888.com/animate/threeLevelPage/lotteryQuote.html?lotType=81",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/81.png?x-oss-process=style/100w",
              position: { x: -1, y: 0 },
              info: "24\u5c0f\u65f63\u5206\u949f\u4e00\u671f",
              type: 1
            },
            {
              id: 50,
              name: "bjpks",
              title: "\u5317\u4eac\u8d5b\u8f66",
              data_ftime: 70,
              video:
                "https://zhibo.tiantianzhong888.com/animate/threeLevelPage/lotteryQuote.html?lotType=9",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/50.png?x-oss-process=style/100w",
              position: { x: -2, y: -1 },
              info: "\u6bcf\u592909:02-23:57",
              type: 1
            },
            {
              id: 72,
              name: "jspk10",
              title: "\u6781\u901fPK\u62fe",
              data_ftime: 12,
              video:
                "https://zhibo.tiantianzhong888.com/animate/threeLevelPage/lotteryQuote.html?lotType=37",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/72.png?x-oss-process=style/100w",
              position: { x: -1, y: -2 },
              info: "24\u5c0f\u65f690\u79d2\u4e00\u671f",
              type: 1
            },
            {
              id: 1,
              name: "cqssc",
              title: "\u91cd\u5e86\u65f6\u65f6\u5f69",
              data_ftime: 75,
              video:
                "https://zhibo.tiantianzhong888.com/animate/threeLevelPage/lotteryQuote.html?lotType=5",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/1.png?x-oss-process=style/100w",
              position: { x: -3, y: 0 },
              info: "\u6bcf\u592909:50-01:55",
              type: 3
            },
            {
              id: 73,
              name: "jsssc",
              title: "\u798f\u5229\u65f6\u65f6\u5f69",
              data_ftime: 12,
              video:
                "https://zhibo.tiantianzhong888.com/animate/flssc/index.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/73.png?x-oss-process=style/100w",
              position: { x: 0, y: 0 },
              info: "24\u5c0f\u65f690\u79d2\u4e00\u671f",
              type: 3
            },
            {
              id: 80,
              name: "xjssc",
              title: "\u65b0\u7586\u65f6\u65f6\u5f69",
              data_ftime: 120,
              video:
                "https://zhibo.tiantianzhong888.com/animate/threeLevelPage/lotteryQuote.html?lotType=7",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/80.png?x-oss-process=style/100w",
              position: { x: 0, y: -1 },
              info: "\u6bcf\u592909:50-02:00",
              type: 3
            },
            {
              id: 70,
              name: "xglhc",
              title: "\u9999\u6e2f\u516d\u5408\u5f69",
              data_ftime: 300,
              video:
                "https://zhibo.tiantianzhong888.com/animate/lhc/assets/dist/vendor/live/index.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/70.png?x-oss-process=style/100w",
              position: { x: -2, y: -2 },
              info: "\u6bcf\u5468\u4e8c\u3001\u56db\u3001\u516d",
              type: 6
            },
            {
              id: 66,
              name: "pcegg",
              title: "PC\u86cb\u86cb",
              data_ftime: 50,
              video:
                "https://zhibo.tiantianzhong888.com/animate/pcdd/shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/66.png?x-oss-process=style/100w",
              position: { x: -3, y: -2 },
              info: "\u6bcf\u592909:00-23:55",
              type: 2
            },
            {
              id: 88,
              name: "jslhc",
              title: "\u6781\u901f\u516d\u5408\u5f69",
              data_ftime: 12,
              video:
                "https://zhibo.tiantianzhong888.com/animate/5flhc/assets/dist/vendor/live/index.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/88.png?x-oss-process=style/100w",
              position: { x: 0, y: -2 },
              info: "24\u5c0f\u65f65\u5206\u949f\u4e00\u671f",
              type: 6
            },
            {
              id: 71,
              name: "jnd28",
              title: "\u52a0\u62ff\u592728",
              data_ftime: 40,
              video:
                "https://zhibo.tiantianzhong888.com/animate/jnd28/shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/71.png?x-oss-process=style/100w",
              position: { x: 0, y: -3 },
              info: "19\u70b9\u505c1-2\u5c0f\u65f6",
              type: 2
            },
            {
              id: 90,
              name: "xy28",
              title: "\u8d85\u7ea728",
              data_ftime: 12,
              video:
                "https://zhibo.tiantianzhong888.com/animate/chaoji28/shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/90.png?x-oss-process=style/100w",
              position: { x: 0, y: -4 },
              info: "24\u5c0f\u65f62\u5206\u949f\u4e00\u671f",
              type: 2
            },
            {
              id: 96,
              name: "cjk3",
              title: "\u8d85\u7ea7\u5feb3",
              data_ftime: 12,
              video:
                "https://zhibo.tiantianzhong888.com/animate/cjk3/h5shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/96.png?x-oss-process=style/100w",
              position: { x: -1, y: -4 },
              info: "24\u5c0f\u65f62\u5206\u949f\u4e00\u671f",
              type: 4
            },
            {
              id: 10,
              name: "jsks",
              title: "\u6c5f\u82cf\u5feb3",
              data_ftime: 153,
              video:
                "https://zhibo.tiantianzhong888.com/animate/jsk3/h5shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/10.png?x-oss-process=style/100w",
              position: { x: -3, y: -3 },
              info: "\u6bcf\u592908:30-22:10",
              type: 4
            },
            {
              id: 75,
              name: "bjk3",
              title: "\u5317\u4eac\u5feb3",
              data_ftime: 120,
              video:
                "https://zhibo.tiantianzhong888.com/animate/bjk3/h5shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/75.png?x-oss-process=style/100w",
              position: { x: -4, y: 0 },
              info: "\u6bcf\u592909:00-23:50",
              type: 4
            },
            {
              id: 76,
              name: "gxk3",
              title: "\u5e7f\u897f\u5feb3",
              data_ftime: 120,
              video:
                "https://zhibo.tiantianzhong888.com/animate/gxk3/h5shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/76.png?x-oss-process=style/100w",
              position: { x: -4, y: -3 },
              info: "\u6bcf\u592909:27-22:27",
              type: 4
            },
            {
              id: 77,
              name: "ahk3",
              title: "\u5b89\u5fbd\u5feb3",
              data_ftime: 120,
              video:
                "https://zhibo.tiantianzhong888.com/animate/ahk3/h5shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/77.png?x-oss-process=style/100w",
              position: { x: -2, y: 0 },
              info: "\u6bcf\u592908:40-22:00",
              type: 4
            },
            {
              id: 78,
              name: "hebk3",
              title: "\u6cb3\u5317\u5feb3",
              data_ftime: 120,
              video:
                "https://zhibo.tiantianzhong888.com/animate/hebk3/h5shipin.html",
              thumb:
                "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/78.png?x-oss-process=style/100w",
              position: { x: -2, y: -3 },
              info: "\u6bcf\u592908:29-21:59",
              type: 4
            }
          ],
          publicity: {
            thumb:
              "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/tgzq.png?x-oss-process=style/100w",
            info: "\u5206\u4eab\u53ef\u6536\u4f1a\u5458",
            title: "\u63a8\u5e7f\u8d5a\u94b1"
          },
          allpic:
            "https://tiantianzhong.oss-cn-hongkong.aliyuncs.com/style/t2018.png",
          msg: {
            title: "\u6613\u8bb0\u57df\u540d",
            content: "38356.com",
            web_name: "\u5929\u5929\u4e2d\u5f69\u7968"
          },
          tuiguang: { x: -4, y: -1 },
          laba: { x: -4, y: -2 },
          game: [],
          coin: null,
          grade: null
        }
      };
      this._renderdata(_data.data, 3);
    },
    _checklogin() {
      //检测是否登录
      if (!localStorage.getItem("sessionkey")) {
        this.signin = false;
      } else {
        this.signin = true;
        this.username = localStorage.getItem("username");
        this.coin = localStorage.getItem("coin");
        this.thumb = localStorage.getItem("thumb");
      }
    },
    _changavatar() {
      //请求头像
      if (!localStorage.getItem("sessionkey")) {
        this.infotips("未登录!"); //信息提示弹框
        return;
      }
      if (!localStorage.getItem("avatar")) {
        //不存在头像
        $api.$post("Api/Ajax/avatar").then(res => {
          localStorage.setItem("avatar", JSON.stringify(res.data.data)); //缓存头像
          this._setAvatar(res.data.data);
        });
      } else {
        //存在头像,直接拿取缓存
        var _av = JSON.parse(localStorage.getItem("avatar"));
        this._setAvatar(_av);
      }
    },
    _setAvatar(item) {
      //展开头像列表,设置默认头像
      this.avatar = item;
      this.showavct = true;
      document.getElementsByTagName("body")[0].style.position = "fixed";
      document.getElementsByTagName("body")[0].style.width = "100%";
      for (var i = 0; i < item.length; i++) {
        if (item[i] == this.thumb) {
          this.avatarindex = i;
        }
      }
    },
    _chooseavatar(item, index) {
      //选择头像
      this.avatarthumb = item;
      this.avatarindex = index;
    },
    _closeavatar(val) {
      //替换头像
      var _this = this;
      var _data = {
        thumb: this.avatarthumb
      };
      if (val == 1) {
        if (this.avatarthumb != this.thumb && this.avatarthumb != "") {
          //如果相同就不变
          $api.$post("Api/user/upthumb", _data).then(res => {
            _this.thumb = _this.avatarthumb;
            localStorage.setItem("thumb", _this.avatarthumb);
            _this.infotips("修改成功!"); //信息提示弹框
          });
        }
      }
      document.getElementsByTagName("body")[0].style.position = "";
      this.showavct = false;
    },
    _logout() {
      //退出
      var _this = this;
      $api.$post("Api/Base/outlogin").then(res => {
        _this.signin = false;
        _this.checkOut(res.data.msg);
      });
    },
    _getlist() {
      //获取首页所有信息参数(包括轮播图和所有彩种列表)
      if (window.location.href.split("?")[1]) {
        //地址存在的话就保存
        localStorage.setItem(
          "referrer",
          window.location.href.split("?")[1].split("=")[1]
        );
      }
      document.getElementsByTagName("body")[0].style.position = "";
      if (!localStorage.getItem("sessionkey")) {
        //非登录就不显示
        $api.$other("Api/Ajax/index").then(res => {
          this._renderdata(res.data.data, 1);
        });
      } else {
        //登录之后
        $api.$post("Api/Ajax/index").then(res => {
          this._renderdata(res.data.data, 2);
        });
      }
    },
    _renderdata(item, _index) {
      //渲染界面和缓存数据
      if (_index == 2) {
        //登录之后才有金额显示
        this.coin = item.coin;
      }
      document.querySelector("title").innerText = item.msg.web_name;
      localStorage.setItem("kf", item.kf);
      localStorage.setItem("web_name", item.msg.web_name);
      localStorage.setItem("lotterylist", JSON.stringify(item.lottery));
      localStorage.setItem("slidelist", JSON.stringify(item.slide));
      localStorage.setItem("Esports", JSON.stringify(item.my_game));
      this.downlink = item.wechar_code;
      this.Nmsg = item.msg;
      this.allpic = item.allpic;
      this.publicity = item.publicity;
      this.slide = item.slide;
      this.lottery = item.lottery;
      this.playGameList = item.my_game;
      this.tuig = item.tuiguang;
      if (!item.content) {
        console.log("没有跑马灯");
      } else {
        this.notice = item.content.content;
      }
      this.$nextTick(() => {
        if (_index != 3) {
          this._swiper(); //轮播插件导入
        }
      });
    },
    _prompt() {
      //弹出提示信息
      if (!localStorage.getItem("sessionkey")) {
        //非登录就不显示
        return;
      }
      $api.$post("api/user/message").then(res => {
        var _t = res.data.data;
        if (_t.length <= 0) {
          //不存在数组
          return false;
        }
        function _alert(i) {
          if (i >= _t.length) {
            //超出数组长度
            return;
          }
          if (!_t[i].content) {
            //不存在的话就继续进funtion
            _alert(i + 1);
            return;
          }
          layer.open({
            content: _t[i].content,
            btn: "确定",
            skin: "demo-class",
            shadeClose: false,
            yes: function(index) {
              _alert(i + 1);
              layer.close(index);
            }
          });
        }
        _alert(0);
      });
    },
    _swiper() {
      //轮播
      this.mySper = new Swiper(".tempWrap.swiper-container", {
        loop: true, //循环首尾
        autoplay: 2000, //2秒轮播一次
        speed: 400, //轮播的速度
        lazyLoading: true,
        pagination: ".hd.swiper-pagination", //启用小球
        autoplayDisableOnInteraction: false, //用户触摸屏幕之后会默认停止轮播,所以这里false才行
        paginationClickable: false, //点击小球切换,在手机端就false,因为根本不可能点到这个小球
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    },
    _gologin() {
      //去登录
      this.$router.push("/login"); //返回首页
    },
    _register() {
      //去注册
      this.$router.push("/register"); //返回首页
    },
    _Details(type, id) {
      //投注大厅
      localStorage.setItem("gameid", id);
      localStorage.setItem("typeid", type);
      if (type != 7) {
        this.$router.push("/betindex/" + _typeid[type]);
      } else {
        if (id == 4) {
          this.$router.push("/betindex/gd11x5");
        } else if (id == 9) {
          this.$router.push("/betindex/jx11x5");
        } else if (id == 11) {
          this.$router.push("/betindex/js11x5");
        } else if (id == 12) {
          this.$router.push("/betindex/gx11x5");
        }
      }
    },
    _showmsg(_content) {
      //弹出信息公告
      layer.open({
        title: [
          "公告",
          "background-color:#f5f0f0; color:#080808;border-bottom: 1px solid #D0D0D0;height: 50px;line-height: 50px;"
        ],
        content: "<div class='_titlenoice'>" + _content + "</div>",
        btn: "确定",
        shadeClose: false
      });
    },
    _showdetails(item) {
      //点击图片查看详情
      this.$router.push({
        name: "discountDetails",
        params: {
          data: item
        }
      });
    },
    _GameRecharge() {
      //在外部上分下分
      this.$router.push("/gameRecharge");
    },
    _GameDetails(item, _index) {
      //电子竞技游戏界面
      localStorage.setItem("funkData", JSON.stringify(item));
      this.$router.push(
        "/computerGame?gameid=" + item.game_id + "&ok" + _index
      );
    },
    _deposit() {
      this.$router.push("/bank/deposit");
    },
    _withdraw() {
      this.$router.push("/bank/withdraw");
    },
    _peferential() {
      //优惠活动
      this.$router.push("/peferential");
    },
    _extenindex() {
      this.$router.push("/exten/index"); //推广中心
    },
    //长龙助手
    _enterLongDragonAssistant() {
      this.$router.push("/longDragonAssistant");
    },
    _downlink() {
      //下载链接
      window.location.href = this.downlink;
    }
  }
};
</script>
<style scoped="scoped">
@font-face {
  font-family: "longDragonFonts";
  src: url("../../static/longDragonFonts/iconfont.eot"); /* IE9*/
  src: url("../../static/longDragonFonts/iconfont.eot#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../static/longDragonFonts/iconfont.woff")
      format("woff"),
    /* chrome, firefox */ url("../../static/longDragonFonts/iconfont.ttf")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("../../static/longDragonFonts/iconfont.svg#iconfont") format("svg"); /* iOS 4.1- */
}

.longDragonFonts {
  font-family: "longDragonFonts" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.icon-longDragon:before {
  content: "\e63e";
}

.red_envelopes {
  position: absolute;
  right: -6px;
  bottom: 5.6rem;
}
.red_envelopes img {
  width: 74px;
  float: right;
}
.active {
  border-bottom: 2px solid #d92e2e;
  color: #d92e2e;
}
.active1 {
  border-bottom: 2px solid #d92e2e;
  color: #d92e2e;
}
</style>