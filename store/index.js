import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        test:'testMsg',
        toast:{
            show:false,
            msg:'测试数据'
        },
        loadShow:false,
        title:'',//顶部标题
        https:'https://np.pigcms.com/wx/index.php',//请求的头部域名
        idtoken:'',
        token:'enspyv1506341661',
        cid:'106',//选择门店的id
        tid:'',//餐台id
    },
    getters:{
        testMsg:state=>state.test,
        toast:state=>state.toast,
        loadShow:state=>state.loadShow,
        title:state=>state.title,
},
mutations:{
    updateTableid(state,data){
        state.tid=data.tid;
    },
    toastUpData(state,data){
        let toast={};
        toast.show=data.show;
        toast.msg=data.msg;
        state.toast=toast;
    },
    loadUpData(state,data){
        let load={};
        state.loadShow=data.loadShow;
    },
    titleUpData(state,data){
        state.title=data.title;
    }
},
actions:{

}

})
export default store