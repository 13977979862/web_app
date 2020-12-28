<template>
	<div>
		<iframe id="iframes" name="iframes" style="height: 100vh;width: 100%;padding-bottom: 5rem;" :src="analysisURL" frameborder="0"></iframe>
		<bottomnav :indexsum="4"></bottomnav>
	</div>
</template>

<script>
	import bottomnav from "../../components/bottmnav/bottomnav";
	
	export default {
	    filters: {},//过滤器
	    components: {
	        bottomnav
	    },//组件注册
	    computed: {},//计算属性
	    props: {},//接受参数
	    created () {
	    },
	    data () {
	        return {
				analysisURL: 'http://helper1.kld001.com'
	        };
	    },
	    mounted () {
			this.getAnalysisURL();
	    },
	    methods: {
			getAnalysisURL() {//获取咨询站url
				$api.$post('Api/Zixun/get').then((res) => {
					this.analysisURL = res.data.data.url;
				});
			}
	    },
	};
	
</script>

<style>
</style>
