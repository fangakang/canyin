<template>
  <div id="app">
    <router-view></router-view>
    <toast v-if="toast.show" :toast-data="toast"></toast>
    <loading v-if="loadShow"></loading>
  </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    import fullBg from '@/components/public/fullBg.vue'
    import toast from '@/components/public/toast.vue'
    import loading from '@/components/public/loading.vue'
    import publicFun from '@/js/public.js'
    export default {
        name: 'app',
        data () {
            return {
                msg: ''
            }
        },
        components:{
            fullBg,
            toast,
            loading
        },
        computed:mapGetters({
            test:'testMsg',
            toast:'toast',
            loadShow:'loadShow'
        })
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h1, h2 {
    font-weight: normal;
  }


</style>
