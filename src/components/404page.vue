<template>
    <div class="pages404">
        <div class="not-found">
            <div class="notfound-top">
                <h1>网站升级，系统临时维护<br>敬请期待！</h1>
            </div>
            <div class="content">
                <img src="../../static/img/weihubg.png" alt="" title="">
            </div>
        </div>
        <div class="copyright">
            <p>© 2010-2018 Creative 404. All rights reserved</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        filters: {},
        components: {},
        computed: {},
        props: {},
        created() {
            this.$nextTick(() => {
            });
        },
        data() {
            return {};
        },
        mounted() {
        },
        methods: {},
    };
</script>
<style>
    .pages404 {
        background-image: url("../../static/img/404bgm.png");
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
    .not-found {
        border-radius: 5px;
        width: 90%;
        height: 26rem;
        overflow: hidden;
        color: #e50b0b;
        position: absolute;
        background: #ffffff;
        top: 50%;
        margin-top: -13rem;
        left: 50%;
        margin-left: -45%;
    }
    .notfound-top {
        margin: 0 auto;
        width: 100%;
    }
    .notfound-top h1 {
        color: #e50b0b;
        text-align: center;
        padding-top: 0;
        font-size: 1.8rem;
    }
    .content {
        width: 100%;
        padding-left: 0;
        text-align: center;
    }
    img {
        max-width: 100%;
        width: 80%;
    }
    .content h3 {
        font-weight: 500;
        line-height: 1.9rem;
        padding: 5%;
        font-size: 1.9rem;
    }
    .copyright {
        position: absolute;
        bottom: 7%;
        font-size: 1.35rem;
        color: #ffffff;
        left: 0;
        width: 100%;
        text-align: center;
    }
</style>
