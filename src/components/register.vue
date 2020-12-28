<template>
    <div class="registerpage _allpage">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" @click="_backpage"></span>
                <p class="title" id="title">注册</p>
            </div>
        </header>
        <div style="margin-top: 4.5rem;">
            <div>
                <div class="set-account" style="margin-top:1rem;">
                    <input type="text" name="ajax" hidden="">
                    <p>
                        <label class="bindlabel">账号：</label>
                        <input class="form-control" v-model="username" type="text" placeholder="6-16的字母或数字组成" minlength="2" maxlength="15">
                    </p>
                    <p>
                        <label class="bindlabel">密码：</label>
                        <input class="form-control" v-model="password" type="password" placeholder="6-20个字符组成,区分大小写" minlength="6" maxlength="20">
                    </p>
                    <p>
                        <label class="bindlabel">确认密码：</label>
                        <input class="form-control" v-model="repassword" type="password" placeholder="再次输入密码">
                    </p>
                    <p style="position:relative">
                        <label class="bindlabel">验证码：</label>
                        <!--@focus="_verifying"-->
                        <input class="form-control" type="tel" v-model="code" placeholder="请输入验证码" @keyup.enter="_check_sign" style="width:66%;">
                        <img class="codeimg" :src="verifyimg" @click="_verifying" alt="获取验证码">
                    </p>
                    <p style="margin-left:1rem;margin-top: 1rem;">
                        <input type="checkbox" checked="checked"> 我已年满18周岁，并且同意接受
                        <a @click="_lawmsg" style="color: red;">《法律声明》</a>
                    </p>
                    <div class="btns-flex" @click="_check_sign">
                        <a href="javascript:;" class="btn btn-primary" id="subbtn">创建用户</a>
                    </div>
                    <div class="zform-control" style="margin-top:11px;text-align:center;font-size:1.2rem;">我已经有账号，
                        <a style="color:blue;" @click="_gologin">去登录&gt;&gt;</a>
                    </div>
                    <div class="close-box" v-if="showlow">
                        <span class="iconfont icon-fanhui cw" style="position: absolute;left: 0;top: 0;width: 3.8rem;font-size: 1.4rem;" @click="_closelow"></span>
                    </div>
                </div>
            </div>
        </div>
        <!--法律说明-->
        <div class="_show_shenming" v-if="lawmsg">
            <div class="smh1">
                <span>法律声明</span>
                <p>{{web_name}}开展网上购买彩票业务。本协议为用户在{{web_name}}网站上进行彩票购买的事宜而订立，具体条款如下：</p>
            </div>
            <ul class="sm_ul">
                <li>
                    <span>一、相关定义</span>
                    <p>1、用户:指在{{web_name}}注册登记，并得到{{web_name}}在线认可，有资格享受{{web_name}}服务的注册会员。</p>
                    <p>2、购彩：指注册的用户可在本站购买彩票，并且对所购买的彩票拥有完整的奖金获得权利。</p>
                    <p>3、用户资料：指用户在注册时提供的个人信息，包括：用户名、注册帐户密码、银行卡帐号、用户真实姓名等。</p>
                </li>
                <li>
                    <span>二、本协议服务范围</span>
                    <p>本协议服务范围包括：提供购彩平台；提供彩票相关资讯；提供彩票信息交互平台；提供在线预付支付结算服务。</p>
                    <p>本协议服务范围不包括向注册会员提供电脑终端及其附属设备、网络和通信等资源。</p>
                </li>
                <li>
                    <span>三、用户的权利</span>
                    <p>1、帐户管理权。用户有权随时查询用户资料，并可对用户名、用户真实姓名以外的信息进行修改。</p>
                    <p>2、免费使用权。用户有权免费使用{{web_name}}的彩票投注系统以及免费获得彩票资讯。</p>
                    <p>3、彩票查询权。用户通过{{web_name}}购彩成功后，有权免费在{{web_name}}查询所购买的彩票的状态。</p>
                    <p>4、奖金获得权。用户通过{{web_name}}购彩成功的，若彩票中奖，用户有权获得相应奖金。</p>
                    <p>5、帐户核查权。用户可以随时对帐户进行资金余额核查。</p>
                    <p>6、申请提款权。用户在任何时间都可对自己的余额申请提款，{{web_name}}在核对用户资金来源正常的情况下，
                        在收到提款请求3个工作日内将用户预付款中需提取的款项转帐到用户注册的银行账户上。用户提款转帐所产生的银行费用由用户承担。
                        当用户余额小于转帐所需的银行费用时，请及时联系客服处理。</p>
                </li>
                <li>
                    <span>四、用户的义务</span>
                    <p>1、全面遵守本协议的义务。在注册登记成为{{web_name}}用户之前，须认真阅读、理解本协议各条款，一经注册成功即视为同意本协议全部条款，用户有义务全面遵守本协议。</p>
                    <p>
                        2、如实提供用户资料义务。为保障用户的合法权益，避免在中奖时出现用户注册资料与真实情况不符导致兑奖不能等情况，请用户按照真实、全面、准确的原则提供用户资料。因用户资料不真实、不全面、不准确造成不能兑奖、不能提款等情况，由用户承担全部责任。</p>
                    <p>
                        3、对应注册义务。严禁任何形式的重复注册及多次恶意注册，因此而造成的一切后果，由用户自行承担。同时，为保证用户的安全性，用户应以一个银行卡帐号对应一个用户真实姓名名，因银行卡帐号与用户真实姓名不能一一对应而产生的不利后果，由用户自行承担。</p>
                    <p>4、保持用户名义务。为保护用户帐户的安全性，用户名、用户真实姓名、银行卡号一经注册确认后，不得再行更改。</p>
                    <p>
                        5、保护帐户资料义务。用户帐户资料包括用户密码、个人帐号以及用户帐号操作所需的资料。用户务必对其帐户资料自行保密，以免帐号资料被盗用或篡改。因用户保护不周导致帐户资料被盗用或篡改而给用户造成的任何损失及法律责任由用户自行承担。</p>
                    <p>6、遵守网络安全管理的义务。用户不得利用{{web_name}}制作、复制和传播下列信息：</p>
                    <ul>
                        <li>（1）煽动抗拒、破坏宪法和法律、行政法规实施的；</li>
                        <li>（2）煽动颠覆国家政权，推翻社会主义制度的；</li>
                        <li>（3）煽动分裂国家、破坏国家统一的；</li>
                        <li>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</li>
                        <li>（5）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；</li>
                        <li>（6）宣扬迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；</li>
                        <li>（7）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；</li>
                        <li>（8）损害国家机关信誉的；</li>
                        <li>（9）其他违反宪法、法律、行政法规、行政规章、地方性法规的行为。</li>
                    </ul>
                    <p>7、保护网站安全的义务。禁止以任何方式对{{web_name}}进行各种破坏行为。</p>
                    <p>8、承担银行费用的义务。在申请提款至用户银行卡的银行费用由用户承担。</p>
                </li>
                <li>
                    <span>五、{{web_name}}的权利</span>
                    <p>
                        1、管理用户帐户的权利。如果用户提供的资料包含有第四条第3款多次恶意注册信息或第7款所列信息，{{web_name}}保留冻结其用户账户、注销其用户帐户或者限制其使用全部或部分服务内容的权利。一经发现用户利用{{web_name}}制作、复制和传播的信息明显属于第三条第7款所列信息之一的，{{web_name}}将立即采取屏蔽信息、发出警告、直至关闭用户帐户等措施。</p>
                    <p>
                        2、修改本协议条款的权利。{{web_name}}有权在必要时修改协议条款，协议条款一旦发生变动，将会在{{web_name}}相关页面上提示或公告修改内容。如果不同意所改动的内容，用户可以主动取消获得的服务。如果用户继续享用服务，则视为接受服务条款的变动。{{web_name}}保留随时修改或中断服务而不需知照用户的权利。主要包括以下情况：</p>
                    <ul>
                        <li>（1）增加或减少彩票品种。{{web_name}}的彩票品种以当期可以实现购买的品种为准，长期或临时增加或减少彩票品种均不需事先告知用户。</li>
                        <li>（2）调整彩票销售截止时间的权利。{{web_name}}有权根据彩票种类和当期销售情况调整彩票销售截止时间，而不需事先告知用户。</li>
                    </ul>
                    <p>3、在用户向{{web_name}}提出购彩请求后，{{web_name}}有权从其余额提取请求购彩所需的款项金额。</p>
                    <p>4、兑奖、领取奖金、分配奖金的权利和义务。在彩票中奖情况下，由{{web_name}}根据中奖比例计算出的中奖金额，直接汇入中奖用户。</p>
                    <p>
                        5、制止公款购彩的权利。{{web_name}}有权拒绝非个人资金通过{{web_name}}购买彩票，一旦发现有款项自非个人帐户资金转入用户预付款帐户，{{web_name}}有权采取强行将款项退回原帐户、终止协议等措施。{{web_name}}并将向有关管理机关报告。</p>
                    <p>
                        6、制止未满18周岁的未成年人购买彩票的权利。如未成年人提供虚假用户资料冒充成年人的，其在{{web_name}}进行的一切彩票购买行为将自始无效，由此给{{web_name}}及其本人造成的损失以及不能领奖的后果均由该未成年人及其法定代理人承担。</p>
                </li>
                <li>
                    <span>六、{{web_name}}的义务</span>
                    <p>
                        1、用户帐户资料保护义务。{{web_name}}对用户帐户资料提供最大限度的安全保护。当{{web_name}}用户涉嫌盗用他人第三方支付渠道（如：银联、财付通、支付宝等）帐户资金，或涉嫌其第三方支付渠道帐户被盗用的，应涉嫌被盗用人或第三方支付公司的要求，在其承诺仅将用户资料用于涉嫌盗用事件并予以保密的前提下，{{web_name}}将向请求方提供涉嫌盗用人的用户资料。{{web_name}}用户同意放弃在此情况下向{{web_name}}追究任何责任的权利。</p>
                    <p>2、公布中奖情况的义务。在官方彩票发行和销售机构发布中奖结果后，{{web_name}}以官方彩票发行机构和销售机构公布的中奖情况为准。</p>
                    <p>
                        3、转帐义务。在达到一定投注量情况下，用户在任何时间都可对自己的余额申请提款，{{web_name}}在核对用户资金来源正常的情况下，在收到提款请求3个工作日内将用户需提取的款项转帐到用户注册的银行账户上。</p>
                </li>
                <li>
                    <span>七、协议成立、变更和终止</span>
                    <p>1、因网络故障、超过指定购买时间、金额不足等原因，未能完成购彩的。{{web_name}}将返还用户预付资金。</p>
                    <p>2、{{web_name}}有权对本协议条款进行变更而无需事先通知用户。</p>
                    <p>3、任何一方未能履行本协议规定的任何义务，且在收到另一方发出更正通知15日内未能改正错误的，均被视为自动放弃本协议，协议同时终止。</p>
                    <p>4、一经发现公款购彩嫌疑、未成年人购彩嫌疑等本协议禁止的情况，{{web_name}}有权立即终止协议。</p>
                </li>
                <li>
                    <span>八、免责条款</span>
                    <p>发生下列情况时，{{web_name}}不予承担任何法律责任：</p>
                    <ul>
                        <li>1、用户资料泄露。由于用户将密码告知他人或与他人共享注册帐户，或由于用户的疏忽，由此导致的任何个人资料泄露，以及由此产生的纠纷。
                            无论何种原因导致的用户资料未授权使用、修改，用户密码、个人帐号或注册信息被未授权篡改、盗用而产生的一切后果。
                        </li>
                        <li>
                            2、不可抗力及不可预见的情势发生。不可抗力和不可预见情势包括：自然灾害、政府行为、罢工、战争等；黑客攻击、计算机病毒侵入或发作、政府管制、彩票发行和销售机构的原因、彩票出票机或服务的故障、网络故障、国家政策变化、法律法规之变化等。因不可抗力和不可预见情势造成：暂时性关闭，用户资料或购彩指令泄露、丢失、被盗用、被篡改，购彩失败，{{web_name}}未能收到购彩指令等，以及由此产生的纠纷。
                            因不可抗力和不可预见的情势造成本协议不能履行的。
                        </li>
                        <li>3、用户原因或第三方原因造成损失。由于用户自身原因、或违反法律法规，以及第三方的原因，造成用户无法使用{{web_name}}服务或产生其他损失的。</li>
                        <li>4、用户购彩而产生的损失。用户根据本协议进行购彩而发生的直接、间接、偶然、特殊及继起的损害。</li>
                        <li>
                            5、用户使用链接或下载资料产生的损害。由于使用与{{web_name}}链接的其它网站，或者使用通过{{web_name}}下载或取得的资料，造成用户资料泄露、用户电脑系统损坏等情况及由此而导致的任何争议和后果。
                        </li>
                    </ul>
                </li>
                <li>
                    <span>九、合同组成</span>
                    <p>
                        {{web_name}}主页以及其他页面有关（包括但不限于）会员注册流程、变更流程、购彩流程、会员支付与结算、相关奖励、会员服务等运营内容的细则以及法律声明均为本协议的有效组成部分，是对本协议的解释扩充，与本协议有着相同的法律效力。
                        用户资料隐私保护、网站禁止行为、网站知识产权保护等约定详见《法律声明》。</p>
                </li>
                <li>
                    <span>十、注意事项</span>
                    <p>1、禁止未满18周岁(未成年)者在本站注册。同时，不提倡学生购买彩票，其中也包括在校大学生。</p>
                    <p>2、为确保您的购买申请能及时成功提交，请您务必在当期购买申请前有足够款项在您的账号。</p>
                    <p>3、在使用网络支付平台时请注意：无论使何种网络支付系统时都将收取一定的手续费。</p>
                    <p>4、请确认您的电子邮箱地址为长期使用之有效邮箱。并随时留意查收本站的邮件。</p>
                    <p>5、有任何疑问请及时与我们取得联系。</p>
                </li>
            </ul>
            <div class="sm_over">提醒：购买彩票有风险，在线投注需谨慎</div>
        </div>
    </div>
</template>
<script>
    export default {
        filters: {},//过滤器
        components: {},//组件注册
        computed: {},//计算属性
        props: {},//接受参数
        created () {
        },
        data () {
            return {
                id: "",
                username: "",
                password: "",
                repassword: "",
                verifyimg: "",
                code: "",
                showlow: false,
                web_name: "500w",
                lawmsg: false,
            };//自定义变量
        },
        mounted () {
            this.web_name = localStorage.getItem("web_name");
            this._verifying();
            if (window.location.href.split("?")[1]) {//地址存在的话就保存
                localStorage.setItem("referrer", window.location.href.split("?")[1].split("=")[1]);
            }
        },
        methods: {
            _backpage () {
                window.history.back(-1);
            },
            _lawmsg () {//法律说明
                this.showlow = true;
                this.lawmsg = true;
            },
            _closelow () {
                this.showlow = false;
                this.lawmsg = false;
            },
            _check_sign () {
                var _data = {
                    id: this.id,
                    username: this.username,
                    password: this.password,
                    repassword: this.repassword,
                    code: this.code,
                };
                if (localStorage.getItem("referrer")) {//存在代理的话
                    _data.referrer = localStorage.getItem("referrer");
                }
                $api.$post('Api/Ajax/check_sign', _data).then((res) => {
                    if (res.data.code == 200) {
                        localStorage.setItem("uid", res.data.data.uid);
                        localStorage.setItem("username", res.data.data.username);
                        localStorage.setItem("sessionkey", res.data.data.session_key);
                        localStorage.setItem("isCoinPassword", res.data.data.isCoinPassword);
                        localStorage.setItem("thumb", res.data.data.thumb);
                        localStorage.setItem("coin", res.data.data.coin);
                    } else {
                        this._verifying();
                        this.plainalert(res.data.msg);//错误弹框
                    }
                });
            },
            _verifying () {//获取验证码
                $api.$post("Api/Ajax/get_code").then((res) => {
                    this.verifyimg = res.data.data.url;
                    this.id = res.data.data.id;
                });
            },
            _gologin () {//退出登录
                this.$router.push('/login');//返回登录
            },
        },
    };
</script>
