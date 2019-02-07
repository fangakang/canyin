<template>
    <div class="Home">
        <div class="header">
            <img class="" src="@/assets/backIndex.png" alt="" v-if="backTop" @click="goPrev">
            <span>{{title}}</span>
        </div>
        <div id="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import store from '@/store/index.js'
    export  default ({
        data(){
            return {
                backTop:true,//返回按钮的显示隐藏
                title:'餐台'
            }
        },
        components:{

        },
        mounted(){
            var that=this;
            that.title=store.state.title;
        },
        updated(){
            var that=this;
            var path=this.$route.path;
            if(path=='/main'){
                this.backTop=false;
            }else{
                this.backTop=true;
            };
            that.title=store.state.title;
        },
        methods:{
            goPrev:function () {
                var that=this;
//                console.log(this.$router)
                this.$router.back();
                that.title=store.state.title;
            },
        },
    })
</script>
<style scoped>
    .header{
        background: #1393f2;
        position: fixed;
        color:#fff;
        font-size: 0.85rem;
        left:0;
        top:0;
        right:0;
        text-align: center;
        line-height: 2rem;
        z-index: 10;
    }
    .header img{
        width: 1rem;
        position: absolute;
        left:0.75rem;
        top:0.5rem
    }
    #main{
        padding-top: 2rem;
    }
</style>