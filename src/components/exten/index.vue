<template> 
    <div class="extenindex">
        <!--正文-->
        <header class="eeheader">
            <div class="eeheader-box">
                <a class="eeheader-left" @click="_backpage">
                    <i class="iconfont icon-fanhui"></i>
                </a>
                <div class="eheader-center">推广中心</div>
            </div>
        </header>
        <!---->
        <div class="eextend-top">
            <div class="eextend-top-img">
                <img :src="user.thumb" alt="">
            </div>
            <strong>{{user.username}}</strong>
            <span class="efr">￥{{user.coin}}
                <a @click="_withdraw">
                    <i class="iconfont icon-tixian"></i>提款
                </a>
            </span>
        </div>
        <!---->
        <div class="VIPList-tab">
            <ul class="eflex-box emnav">
                <li class="eflex">
                    <a>
                        <h2>推荐ID</h2>
                        <p style="color: #ff0000;"><strong>{{user.uid}}</strong></p>
                    </a>
                </li>
                <li class="eflex">
                    <a>
                        <h2>推荐积分</h2>
                        <p style="color: #ff0000;"><strong>{{score}}</strong></p>
                    </a>
                </li>
                <li class="eflex">
                    <a>
                        <h2 :class="{'_levindex': level !=5}">推荐等级</h2>
                        <p style="color: #ff0000;"><strong>vip{{level}}</strong></p>
                        <p v-if="level !=5">距离下级还差<span>{{nextlevel}}</span>分</p>
                    </a>
                </li>
            </ul>
        </div>
        <!---->
        <div class="eextend-nav">
            <h2>我要分享</h2>
            <ul class="eflex-box">
                <li class="eflex ">
                    <a class="copy _copytexts">
                        <input id="_copy" readonly="readonly" :value="shareurl" style="position: absolute;top: -20rem;z-index: -999999;">
                        <div style="background-color: #30d8fd;" @click="_copytexts('_copy')"><i class="iconfont icon-lianjie"></i></div>
                        <p>复制链接</p>
                    </a>
                </li>
                <li class="eflex" @click="_qrcode2()">
                    <a>
                        <div style="background-color: #ffc101;"><i class="iconfont icon-erweima"></i></div>
                        <p>微信推广</p>
                    </a>
                </li>
                <li class="eflex">
                    <a @click="_share_qq(shareurl)">
                        <div style="background-color: #51e19b;"><i class="iconfont icon-fenxiang1"></i></div>
                        <p>微信、QQ分享</p>
                    </a>
                </li>
            </ul>
        </div>
        <!---->
        <div class="eextend-box2">
            <ul class="eflex-box">
                <li class="eflex">
                    <p>一级佣金</p>
                    <strong>{{money1 ? money1 :"0"}}</strong>
                </li>
                <li class="eflex">
                    <p>二级佣金</p>
                    <strong>{{money2 ? money2 :"0"}}</strong>
                </li>
            </ul>
        </div>
        <!---->
        <div class="eextend-box2">
            <h2>本月推荐会员</h2>
            <ul class="eflex-box">
                <li class="eflex">
                    <p>一级会员</p>
                    <strong>{{mothMem1}}</strong>
                </li>
                <li class="eflex">
                    <p>二级会员</p>
                    <strong>{{mothMem2}}</strong>
                </li>
            </ul>
            <div class="eextend-box2-bottom">
                <p>推荐会员总计:</p>
                <span><strong>{{allLevel1}}</strong>人（一级）</span>
                <span><strong>{{allLevel2}}</strong>人（二级）</span>
            </div>
        </div>
        <!---->
        <div class="eextend-ct">
            <p> 
                <i>*</i>您所推荐的会员在下注结算后，佣金会自动按照比例加到您的资金账户上。例如：您所推荐的会员下注
                <span>1000</span>元，您的收益 = <span>1000</span>元 *
                <span>{{dataAll.rate_1}}%</span> = <span>{{(1000*Number(dataAll.rate_1))/100}}</span>元；您的二级会员下注<span>1000</span>元，您的收益 = <span>1000</span>元 *
                <span>{{dataAll.rate_2}}%</span> = <span>{{(1000*Number(dataAll.rate_2))/100}}</span>元。</p>
            <p><i>*</i>如果想赚取推广佣金，请分享给微信、QQ好友，也可以面对面扫二维码注册。</p>
        </div>
        <!---->
        <bottomexten :indexsum="0"></bottomexten>
        <!--<textarea class="textarea" rows="4"></textarea>-->
		<!-- <img :src="imgUrl" alt=""> -->
		<!-- <form :action="imgUrl" method="get">
			<button submit>
				提交
			</button>
		</form> -->
		<div v-show="wxCodeStatus" style="position: fixed;top: 0;left: 0;z-index: 1000;width: 100%;background: #fff;">
			<!-- <form :action="imgUrl" method="get">
				<input type="submit" value="提交">
			</form> -->
			<div style="max-width: 640px;margin: auto;position: relative;">
				<img style="width: 100%;" :src="qrcode" id="avatar"></img>
				<img @click="closeWXCode" style="width: 50px;position: absolute;top: 0;right: 0;" src="../../../static/img/tupian/close.png" alt="">
				<div style="position: absolute;bottom: -4px;right: 0;font-size: 24px;"><a href="javascript:;" @click="downloadImg"><img style="width: 120px;" src="../../../static/img/tupian/save.png" alt=""></a></div>
			</div>
		</div>
		
    </div>
</template>
<script>
    import bottomexten from "../bottmnav/bottomexten";

    export default {
        filters: {},//过滤器
        components: {
            bottomexten
        },//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created () {
        },
        data () {
            return {
                user: {},
                money1: "",
                money2: "",
                mothMem1: "",
                mothMem2: "",
                qrcode: "",
                shareurl: "",
                allLevel1: "",//一级佣金
                allLevel2: "",//二级佣金
                level: "",
                score: "",
                nextlevel: "",
                wen_name: "",
                dataAll: {},
				wxCodeStatus: false,
				imgBase64: '',
				imgUrl: ''
            };//自定义变量
        },
        mounted () {//https://500w598.com/register.php?referrer=33460
            this.web_name = localStorage.getItem("web_name");
            //禁止手机自带弹出键盘
            document.getElementById("_copy").onfocus = (event) => {
                document.activeElement.blur();
            };
            this._indexdata();
        },
        methods: {
			closeWXCode() {
				this.wxCodeStatus = false;
			},
            _qrcode2 () {//" + this.qrcode + "
                //var _htmls = "<img src="+this.qrcode+" alt=''>" +
                   // "<span class='_qrcodeimg'>来" + this.web_name + "，红包等你拿！</span>";
                //this.plainalert(_htmls);
				this.wxCodeStatus = true;
				//https://500w598.com/register.php?referrer=33460
				//this.drawAndShareImage();
				//this.shareurl
				//http://500wapi.kld001.com/Api/Exten/generalizeQrCode?
				 //$api.$post('Api/Exten/index')、、、、
				// shareUrl=https://500w598.com/register.php?referrer=79308
				//this.imgUrl = 'http://500wapi.kld001.com/Api/Exten/generalizeQrCode?shareUrl=' + this.shareurl;
				//console.log(this.imgUrl)
            },
			downloadImg() {
				console.dir($("#avatar"))
			},
            _indexdata () {
                $api.$post('Api/Exten/index').then((res) => {
                    this.dataAll = res.data.data;
                    this.user = res.data.data.user;
                    this.money1 = res.data.data.money1;
                    this.money2 = res.data.data.money2;
                    this.mothMem1 = res.data.data.mothMem1;
                    this.mothMem2 = res.data.data.mothMem2;
                    this.qrcode = res.data.data.qrcode;
                    this.shareurl = res.data.data.shareurl;
                    localStorage.setItem("username", res.data.data.user.username);
                    localStorage.setItem("coin", res.data.data.user.coin);
                    this._getMem();
                });
            },
            _getMem () {
                $api.$post('Api/Exten/getMem').then((res) => {
                    this.allLevel1 = res.data.data.allLevel1;
                    this.allLevel2 = res.data.data.allLevel2;
                    this.level = res.data.data.level;
                    this.score = res.data.data.score;
                    this.nextlevel = res.data.data.nextlevel;
                    localStorage.setItem("allLevel1", res.data.data.allLevel1);
                    localStorage.setItem("allLevel2", res.data.data.allLevel2);
                });
            },
            _backpage () {
                window.history.back(-1);
            },
            _withdraw () {
                this.$router.push('/bank/withdraw');
            },
            _share_qq (url) {
                var ua = navigator.userAgent.toLowerCase();
                if (/iphone|ipad|ipod/.test(ua)) {//针对ios弹出
                    // window.location.href = 'uniwebview://share?shareText=' + url;
                    alert('share:' + url);
                } else if (/android/.test(ua)) {//针对安卓
                    alert('share:' + url);
                }
            },
// 			drawAndShareImage(){
// 				let _this = this;
// 				var canvas = document.createElement("canvas");
// 				let imgWidth = window.innerWidth;
// 				let imgHeight = window.innerHeight-60;
// 				if(imgWidth>640)
// 				{
// 					imgWidth = 640;
// 				}
// 				canvas.width = imgWidth;
// 				canvas.height = imgHeight;
// 				var context = canvas.getContext("2d");//style="width: 750px;height: 1218px;"
// 			
// 				context.rect(0 , 0 , canvas.width , canvas.height);
// 				context.fillStyle = "#fff";
// 				context.fill();
// 			
// 				var myImage = new Image();
// 				myImage.src = "../../../static/img/tupian/extension.jpg";    //背景图片  你自己本地的图片或者在线图片
// 				myImage.crossOrigin = 'Anonymous';
// 			
// 				myImage.onload = function(){
// 					context.drawImage(myImage , 0 , 0 , imgWidth , imgHeight);
// 			
// 					context.font = "60px Courier New";
// 			
// 					var myImage2 = new Image();
// 					myImage2.src = '../../../static/img/tupian/test.png';   //你自己本地的图片或者在线图片
// 					myImage2.crossOrigin = 'Anonymous';
// 					
// 					myImage2.onload = function(){
// 						context.drawImage(myImage2 , (imgWidth-150)/2 , (imgHeight-130)/2, 150 , 150);
// 						var base64 = canvas.toDataURL("image/png");  //"image/png" 这里注意一下
// 						var img = document.getElementById('avatar');
// 			
// 						// document.getElementById('avatar').src = base64;
// 						img.setAttribute('src' , base64);
// 						_this.imgBase64 = base64;
// 						$("#avatar").css({
// 							"width": imgWidth,
// 							"height": imgHeight
// 						})
// 					}
// 				}
// 			}
        },
    };
</script>
