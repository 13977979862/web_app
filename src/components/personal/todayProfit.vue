<template>
  <div class="todayProfit">
    <!--正文-->
    <header class="top">
      <div class="inner">
        <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
        <p class="title" id="title">今日盈亏</p>
      </div>
    </header>
    <div class="profit_money">
      <div class="money-box">
        <div class="label flex-center">{{profit.key}}</div>
        <div class="money flex-center">{{profit.value}}</div>
      </div>
      <div class="equation w100">{{equation.key}} {{equation.value}}</div>
    </div>

    <div
      class="list-item"
      :class="{'list-item-border':index+1 % 3 != 0}"
      v-for="(item,index) in list"
      :key="index"
    >
      <header class="flex-center">{{item.value}}</header>
      <main class="flex-center">{{item.key}}</main>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {}, //组件注册
  created() {
    this.getData();
  },
  data() {
    return {
      //盈利金额
      profit: {
        key: "",
        value: ""
      },
      //盈亏计算方式
      equation: {
        key: "",
        value: ""
      },
      //数据列表
      list: []
    };
  },
  mounted() {},
  methods: {
    getData() {
      $api
        .$post("api/personal/jryk", { uid: this.$route.query.uid })
        .then(res => {
          this.profit = res.data.data.profit;
          this.equation = res.data.data.equation;
          this.list = res.data.data.list;
        });
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
}
.profit_money {
  width: 100%;
  height: 15rem;
  margin-top: 4.5rem;
  padding-top: 3rem;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#6a202d),
    to(#3b052c)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
}
.money-box {
  width: 12rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  color: #fced08;
}
.money-box > .label,
.money-box > .money {
  width: 100%;
  height: 50%;
}
.money-box > .money {
  font-size: 3rem;
}
.equation {
  display: flex;
  align-items: center;
  color: white;
  padding: 1rem 1.5rem;
  margin-top: 2rem;
}
.list-item {
  width: 33.333333%;
  height: 10rem;
  border-bottom: 1px solid #cccccc;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
}
.list-item-border {
  border-right: 1px solid #cccccc;
}
.list-item > header,
.list-item > main {
  height: 2rem;
}
.list-item > header {
  color: #ff6818;
  font-size: 1.8rem;
}
.list-item > main {
  font-size: 1.3rem;
}
</style>
