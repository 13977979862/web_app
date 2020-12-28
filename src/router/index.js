// import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [{
            path: '/',
            redirect: '/home',
        },
        {
            path: '/404page',
            name: "404page",
            component: resolve => require(['@/components/404page'], resolve), //404bucunzai
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: true
            },
        },
        {
            path: '/computerGame',
            name: "computerGame",
            component: resolve => require(['@/components/computerGame'], resolve), //404bucunzai
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/gameRecharge',
            name: "gameRecharge",
            component: resolve => require(['@/components/gameRecharge'], resolve), //404bucunzai
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: true
            },
        },
        {
            path: '/home',
            name: "home",
            component: resolve => require(['@/components/home'], resolve), //首页
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: true
            },
        },
        {
            path: '/sumresults',
            name: "sumresults",
            component: resolve => require(['@/components/sumresults'], resolve), //开奖结果
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/personalcenter',
            name: "personalcenter",
            component: resolve => require(['@/components/personalcenter'], resolve), //个人中心
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/login',
            name: "login",
            component: resolve => require(['@/components/login'], resolve), //登录
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/register',
            name: "register",
            component: resolve => require(['@/components/register'], resolve), //注册
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/peferential',
            name: "peferential",
            component: resolve => require(['@/components/peferential'], resolve), //优惠活动
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/discountDetails',
            name: "discountDetails",
            component: resolve => require(['@/components/discountDetails'], resolve), //优惠活动详情
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/bank/deposit',
            name: "deposit",
            component: resolve => require(['@/components/bank/deposit'], resolve), //充值
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/bank/withdraw',
            name: "withdraw",
            component: resolve => require(['@/components/bank/withdraw'], resolve), //提款
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/bank/rengong',
            name: "rengong",
            component: resolve => require(['@/components/bank/rengong'], resolve), //人工充值
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/pkclass',
            name: "pkclass",
            component: resolve => require(['@/components/bettingshop/pkclass'], resolve), //PK类彩种
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/pcddclass',
            name: "pcddclass",
            component: resolve => require(['@/components/bettingshop/pcddclass'], resolve), //pcdd类彩种
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/sixlottery',
            name: "sixlottery",
            component: resolve => require(['@/components/bettingshop/sixlottery'], resolve), //6喝彩
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/timeclass',
            name: "timeclass",
            component: resolve => require(['@/components/bettingshop/timeclass'], resolve), //时时彩类彩种
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/kuai3class',
            name: "kuai3class",
            component: resolve => require(['@/components/bettingshop/kuai3class'], resolve), //快三彩种
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/xyncclass',
            name: "xyncclass",
            component: resolve => require(['@/components/bettingshop/xyncclass'], resolve), //幸运农场彩种
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/gd11x5',
            name: "gd11x5",
            component: resolve => require(['@/components/bettingshop/gd11x5'], resolve), //广东11x5
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/gx11x5',
            name: "gx11x5",
            component: resolve => require(['@/components/bettingshop/gx11x5'], resolve), //广西11x5
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/jx11x5',
            name: "jx11x5",
            component: resolve => require(['@/components/bettingshop/jx11x5'], resolve), //江西11x5
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betindex/js11x5',
            name: "js11x5",
            component: resolve => require(['@/components/bettingshop/js11x5'], resolve), //极速11x5
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/mymessage',
            name: "mymessage",
            component: resolve => require(['@/components/personal/mymessage'], resolve), //消息
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/todayProfit', //今日盈亏
            name: "todayProfit",
            component: resolve => require(['@/components/personal/todayProfit'], resolve), //消息
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/longDragonAssistant', //长龙助手
            name: "longDragonAssistant",
            component: resolve => require(['@/components/personal/longDragonAssistant'], resolve), //消息
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/betrecord',
            name: "betrecord",
            component: resolve => require(['@/components/personal/betrecord'], resolve), //投注记录
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/gameorder',
            name: "gameorder",
            component: resolve => require(['@/components/personal/gameorder'], resolve), //投注记录
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/recharge',
            name: "recharge",
            component: resolve => require(['@/components/personal/recharge'], resolve), //充值记录
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/cash',
            name: "cash",
            component: resolve => require(['@/components/personal/cash'], resolve), //提现记录
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/myfpwd',
            name: "myfpwd",
            component: resolve => require(['@/components/personal/myfpwd'], resolve), //修改登录密码
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/fundpwd',
            name: "fundpwd",
            component: resolve => require(['@/components/personal/fundpwd'], resolve), //修改提款密码
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/rule',
            name: "rule",
            component: resolve => require(['@/components/personal/rule'], resolve), //玩法规则
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/exten/index',
            name: "index",
            component: resolve => require(['@/components/exten/index'], resolve), //推广中心
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/exten/memberlist',
            name: "memberlist",
            component: resolve => require(['@/components/exten/memberlist'], resolve), //会员列表
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/exten/spdresultall',
            name: "spdresultall",
            component: resolve => require(['@/components/exten/spdresultall'], resolve), //会员投注
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/exten/spdpaybacklist',
            name: "spdpaybacklist",
            component: resolve => require(['@/components/exten/spdpaybacklist'], resolve), //佣金记录
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/signIn/index',
            name: "signIn",
            component: resolve => require(['@/components/signIn/index'], resolve), //签到活动
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/redEnvelopes/index',
            name: "redEnvelopes",
            component: resolve => require(['@/components/redEnvelopes/index'], resolve), //抢红包
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/levelReward/index',
            name: "levelReward",
            component: resolve => require(['@/components/levelReward/index'], resolve), //等级奖励
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        },
        {
            path: '/consultation/index',
            name: "consultation",
            component: resolve => require(['@/components/consultation/index'], resolve), //等级奖励
            meta: {
                islogin: false, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        }, {
            path: '/paying/index',
            name: "paying",
            component: resolve => require(['@/components/paying/index'], resolve), //余额宝 
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        }, {
            path: '/paying/capitalDetail',
            name: "capitalDetail",
            component: resolve => require(['@/components/paying/capitalDetail'], resolve), //余额宝
            meta: {
                islogin: true, // 配置此条，进入页面前判断是否需要登陆
                keepAlive: false
            },
        }
    ]
});
/*--------------------*/
// import Vue from 'vue';
// import Router from 'vue-router';
// import home from '@/components/home';
// import login from '@/components/login';
// import register from '@/components/register';
// import sumresults from '@/components/sumresults';
// import personalcenter from '@/components/personalcenter';
// //投注大厅
// import pkclass from '@/components/bettingshop/pkclass';
// import pcddclass from '@/components/bettingshop/pcddclass';
// import sixlottery from '@/components/bettingshop/sixlottery';
// import timeclass from '@/components/bettingshop/timeclass';
// import kuai3class from '@/components/bettingshop/kuai3class';
// import xyncclass from '@/components/bettingshop/xyncclass';
// //个人中心路由
// import mymessage from '@/components/personal/mymessage';//我的消息
// import betrecord from '@/components/personal/betrecord';//投注记录
// import recharge from '@/components/personal/recharge';//充值记录
// import cash from '@/components/personal/cash';//提款记录
// import rule from '@/components/personal/rule';//玩法说明
// import myfpwd from '@/components/personal/myfpwd';//修改登录密码
// import fundpwd from '@/components/personal/fundpwd';//修改提款密码
// //推广中心
// import index from '@/components/exten/index';//推广中心首页
// import memberlist from '@/components/exten/memberlist';//会员列表
// import spdresultall from '@/components/exten/spdresultall';//会员投注
// import spdpaybacklist from '@/components/exten/spdpaybacklist';//佣金记录
// //充值,提款
// import deposit from '@/components/bank/deposit';//充值
// import withdraw from '@/components/bank/withdraw';//提款
// import rengong from '@/components/bank/rengong';//转账
// //优惠活动
// import peferential from '@/components/peferential';//优惠活动
// import discountDetails from '@/components/discountDetails';//优惠详情
// Vue.use(Router);
// export default new Router({
//     routes: [
//         {
//             path: '/',
//             name: "home",
//             component: home,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: true
//             },
//         },
//         {
//             path: '/sumresults',
//             name: "sumresults",
//             component: sumresults,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/personalcenter',
//             name: "personalcenter",
//             component: personalcenter,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/login',
//             name: "login",
//             component: login,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/register',
//             name: "register",
//             component: register,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/peferential',
//             name: "peferential",
//             component: peferential,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/discountDetails',
//             name: "discountDetails",
//             component: discountDetails,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/bank/deposit',
//             name: "deposit",
//             component: deposit,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/bank/withdraw',
//             name: "withdraw",
//             component: withdraw,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/bank/rengong',
//             name: "rengong",
//             component: rengong,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/betindex/pkclass',
//             name: "pkclass",
//             component: pkclass,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/betindex/pcddclass',
//             name: "pcddclass",
//             component: pcddclass,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/betindex/sixlottery',
//             name: "sixlottery",
//             component: sixlottery,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/betindex/timeclass',
//             name: "timeclass",
//             component: timeclass,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/betindex/kuai3class',
//             name: "kuai3class",
//             component: kuai3class,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/betindex/xyncclass',
//             name: "xyncclass",
//             component: xyncclass,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/mymessage',
//             name: "mymessage",
//             component: mymessage,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/betrecord',
//             name: "betrecord",
//             component: betrecord,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/recharge',
//             name: "recharge",
//             component: recharge,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/cash',
//             name: "cash",
//             component: cash,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/myfpwd',
//             name: "myfpwd",
//             component: myfpwd,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/fundpwd',
//             name: "fundpwd",
//             component: fundpwd,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/rule',
//             name: "rule",
//             component: rule,
//             meta: {
//                 islogin: false,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/exten/index',
//             name: "index",
//             component: index,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/exten/memberlist',
//             name: "memberlist",
//             component: memberlist,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/exten/spdresultall',
//             name: "spdresultall",
//             component: spdresultall,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         },
//         {
//             path: '/exten/spdpaybacklist',
//             name: "spdpaybacklist",
//             component: spdpaybacklist,
//             meta: {
//                 islogin: true,// 配置此条，进入页面前判断是否需要登陆
//                 keepAlive: false
//             },
//         }
//     ]
// });