<template>
    <div class="discountDetails">
        <header class="top">
            <div class="inner">
                <span class="iconfont icon-fanhui cw" onclick="history.back();"></span>
                <p id="title" class="title">详情</p>
            </div>
        </header>
        <div class="xiangqing" id="_summasthead">
            <div v-html="htmls" class="_htmltext" style="margin-bottom: 5.5rem;"></div>
        </div>
        <!---->
        <bottomnav :indexsum="-1"></bottomnav>
    </div>
</template>
<script type="text/ecmascript-6">
    import bottomnav from "../components/bottmnav/bottomnav";

    export default {
        filters: {},
        components: {
            bottomnav
        },
        computed: {},
        props: {},
        created () {
        },
        data () {
            return {
                htmls: "",
            };
        },
        mounted () {
            this.htmls = this.$route.params.data;
        },
        methods: {}
    };
</script>
