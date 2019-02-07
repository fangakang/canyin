<template>
    <div id="" class="main">
        <div class="topWrap" id="topWrap">
            <div class="searchContainer flex_box flex_middle">
                <div class="searchWrap flex_box flex_middle">
                    <span class="search_tip">
                        <img src="@/assets/search_tip01.png" alt="">
                    </span>
                        <input type="text" class="search_input" placeholder="请输入桌位号或桌位名称" v-model="searchInput">
                        <a class="search_close" href="javascript:;" @click="searchClose">
                        <img src="@/assets/search_tip02.png" alt="">
                    </a>
                </div>
                <button class="searchBtn" @click="search">搜索</button>
            </div>
            <div class="nav_wrap">
                <ul class="nav_list flex_box flex_middle">
                    <template v-if="navList.length>4">
                        <li v-for="(item,index) in navList" v-if="index<3">
                            <a href="javascript:;" :class="navIndex == index?'active':''" @click="tableType(index)">
                                {{item}}
                            </a>
                        </li>
                    </template>
                    <template v-if="navList.length<=4">
                        <li v-for="(item,index) in navList">
                            <a href="javascript:;" :class="navIndex == index?'active':''" @click="tableType(index)">
                                {{item}}
                            </a>
                        </li>
                    </template>
                    <li v-if="navList.length>4">
                        <a href="javascript:;" @click="choseList" class="flex_box flex_middle listLg" :class="navIndex == 3?'active':''">
                            <span class="nav_listext">{{otherTable}}</span>
                            <span class="nav_tip">
                            <img src="@/assets/down.png" alt="" v-if="!downList">
                            <img src="@/assets/up.png" alt="" v-if="downList">
                        </span>
                        </a>
                    </li>
                </ul>
                <div class="modal_loge" v-if="downList">
                    <ul class="loge_list">
                        <li v-for="(item,index) in navList" v-if="index>2">
                            <a href="javascript:;" class="flex_box flex_middle flex_space" :class=" typeIndex==index?'active':''" @click="choseText(index,item)">
                                <span class="logo_text">{{item}}</span>
                                <span class="logo_tip">
                                    <img src="@/assets/right.png" alt="">
                                 </span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
        <!--<scroller :on-infinite="loadMore" ref="myscroller" class="myscroller">-->
        <ul id="mainBody" class="list" :class="{'listScroll':tableList.length>8,'lower':pageCount.pcount>1}">
            <li  v-for="(item,index) in tableList">
                <a href="javascript:;" class="green_bg" v-if="item.usestatus==4&&item.notpayprice==0" @click="havePaid(item,index)">
                    <div class="list_top">
                        <h2 class="title">{{item.name}}</h2>
                        <div class="flex_box  flex_middle catering_num">
                            <span>{{item.pnum}}</span>/ <span>{{item.num}}</span>
                        </div>
                    </div>
                    <div class="list_down">
                        <div class="money">￥{{item.totalprice}}</div>
                    </div>
                </a>
                <a href="javascript:;" class="gray_bg" v-if="item.usestatus==0" @click="beginTable(item)">
                    <div class="list_top">
                        <h2 class="title">{{item.name}}</h2>
                        <div class="flex_box  flex_middle catering_num">
                            <span>{{item.pnum}}</span>/ <span>{{item.num}}</span>
                        </div>
                    </div>
                    <div class="list_down">
                        <div class="empty">
                            <img src="@/assets/empty_icon.png" alt="">
                        </div>
                    </div>
                </a>
                <a href="javascript:;" class="pink_bg" v-if="item.usestatus==1" @click="beginTable2(item)">
                    <div class="list_top">
                        <h2 class="title">{{item.name}}</h2>
                        <div class="flex_box  flex_middle catering_num">
                            <span>{{item.pnum}}</span>/ <span>{{item.num}}</span>
                        </div>
                    </div>
                    <div class="list_down">
                        <div class="money">￥{{item.notpayprice}}</div>
                        <!--<p class="flex_box  flex_middle time flex_center">-->
                            <!--<img src="@/assets/search_time.png" alt="">-->
                            <!--<span> {{txtTime(item.ordertime)}}</span>-->
                        <!--</p>-->
                    </div>
                </a>
                <a href="javascript:;" class="pink_bg" v-if="item.usestatus==3||item.usestatus==4&&item.notpayprice!=0" @click="checkOut(item)">
                    <div class="list_top">
                        <h2 class="title">{{item.name}}</h2>
                        <div class="flex_box  flex_middle catering_num">
                            <span>{{item.pnum}}</span>/ <span>{{item.num}}</span>
                        </div>
                    </div>
                    <div class="list_down">
                        <div class="money"><span v-if="item.usestatus==4&&item.notpayprice!=0">再付</span>￥{{item.notpayprice}}</div>
                        <p class="flex_box  flex_middle time flex_center">
                            <img src="@/assets/search_time.png" alt="">
                            <span> {{txtTime(item.ordertime)}}</span>
                        </p>
                    </div>
                </a>
            </li>
        </ul>
        <!--</scroller>-->
        <div class="pageSelect" v-if="pageCount.pcount>1">
            <a href="javascript:;" class="prevPage" @click="prevPage">上一页</a>
            <span>{{page}}/{{pageCount.pcount}}</span>
            <a href="javascript:;" class="nextPage" @click="nextPage">下一页</a>
        </div>

      <ul id="footer" class="footer flex_box flex_middle">
          <li>
              <a href="javascript:;" class="" @click="classifyType(0)"  :class="classifyIndex==0?'active':''">
                  <span class="foot_text">空台</span>
                  <span class="foot_num">（{{tjdatas.emptytotal}}）</span>
              </a>
          </li>
          <li>
              <a href="javascript:;" class="" @click="classifyType(1)"  :class="classifyIndex==1?'active':''">
                  <span class="foot_text">已开台</span>
                  <span class="foot_num">（{{tjdatas.kttotal}}）</span>
              </a>
          </li>
          <li>
              <a href="javascript:;" class="" @click="classifyType(2)"  :class="classifyIndex==2?'active':''">
                  <span class="foot_text">待结账</span>
                  <span class="foot_num">（{{tjdatas.nopaytotal}}）</span>
              </a>
          </li>
          <li>
              <a href="javascript:;" class="" @click="classifyType(3)"  :class="classifyIndex==3?'active':''">
                  <span class="foot_text">待清台</span>
                  <span class="foot_num">（{{tjdatas.cleartotal}}）</span>
              </a>
          </li>
      </ul>
        <a class="left_nav" href="javascript:;" @click="refresh">
            <img src="@/assets/update.png" alt="">
            <span>刷新</span>
        </a>
        <div v-if="modalShow" class="modal">
            <div class="modal_content">
                <a class="close" href="javascript:;" @click="tableClose">
                   <img src="@/assets/close.png" alt="">
                </a>
                <h2 class="modal_title">开台</h2>
                <p class="modal_text">{{openTableInfo.isbox}}-{{openTableInfo.name}}</p>
                <div class="modal_count flex_middle flex_box flex_center">
                    <a class="plus" href="javascript:;" @click="plus">
                        <img src="@/assets/plus.png" alt="">    
                    </a>
                    <div class="num">
                        <input type="number" v-model="tableNum">
                    </div>
                    <a class="add" href="javascript:;" @click="add">
                        <img src="@/assets/add.png" alt="">
                    </a>
                </div>
                <div class="modal_foot flex_middle flex_box">
                    <div class="modal_close">
                        <a href="javascript:;" @click="tableClose">取消</a>
                    </div>
                    <div class="modal_sure">
                        <a href="javascript:;" @click="tableSure">确定</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal dishModal" v-if="dishModalShow">
            <div class="modal_content">
                <a class="close" href="javascript:;" @click="closeDishModal">
                    <img src="@/assets/close.png" alt="">
                </a>
                <h2 class="modal_title">操作</h2>
                <div class="modal_foot flex_middle flex_box">
                    <div class="modal_close">
                        <a href="javascript:;" @click="clearTable">清台</a>
                    </div>
                    <div class="modal_sure">
                        <a href="javascript:;" @click="dishAdd">加菜</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="emptyTable" class="emptyTable">
            <img src="@/assets/noTable.png" alt="">
           <p>没有餐台数据</p>
        </div>
    </div>

</template>
<script>
    import publicFun from '@/js/public.js'
    import fullBg from'@/components/public/fullBg.vue'
    import store from '@/store/index.js'
    import axios from 'axios'
    import qs from 'qs'
    export default ({
        data(){
            return{
                dishModalShow:false,//加菜或清台
	            modalShow:false,//开台
                downList:false,//豪华包下拉选择
	            otherTable:'更多',//豪华包选择
                https:store.state.https,//头部的域名
                cid:store.state.cid,//门店id
	            navList:['22','222','333','33','3333','44','55'],//餐台分类
	            navIndex:0,//选中的下表
                navTable:'',//餐台分类
	            typeIndex:'',//餐台下拉分类列表选中
                tableIndex:'a',
                tableList:[],//列表数据
	            page:1,//页数
	            tstatus:1,//桌的分类，1 => '空台', 2 => '已预约', 3 => '找单结账', 4 => '已开台', 5 => '待清台'，6=》'已开台待结账'
	            emptyTable:false,//餐台列表没有餐台数据
	            searchInput:'',//搜索框内容
	            classify:[
                    {name:'空台',num:'12'},
		            {name:'已开台',num:'26'},
		            {name:'待结账',num:'08'},
		            {name:'待清台',num:'10'},
                ],
	            classifyIndex:0,//桌类型的下表，已加active样式
	            tableNum:1,//开台的数量
                tid:'',//餐台id
                oid:'',
                openTableInfo:{},
                currentTid:0,
                tjdatas:{},
                tableInfo:[],
                pageCount:{}
            }
        },
        components:{
	        fullBg
        },
        mounted(){
            store.state.title='首页';
            document.querySelector('body').setAttribute('style', 'background-color:#fff');
            var that=this;
            const https=that.https+'?g=Home&m=repastPcApi&a=login';
	        that.$http.get(https, {params:{
		        usename:"test101@test0925",
		        pwd:"123456"
	        }}).then(function (response) {
                console.log(response.data);
                if(response.data.error){
//	                 publicFun.showToast({show:true,msg:'222'});
                }else{
	                store.state.idtoken=response.data.idtoken;
                    publicFun.save('idtoken',response.data.idtoken);
                    publicFun.save('token',response.data.datas.token);
	                that.init();
                }
		     })
        },
        methods:{
            prevPage:function(){
                var that=this;
                if(that.page==1){
                    publicFun.showToast({
                        show:true,
                        msg:'已经是第一页'
                    });
                    return;
                };
                that.page--;
                that.getTableList();
            },
            nextPage:function () {
                var that=this;
                if(that.page==that.pageCount.pcount){
                    publicFun.showToast({
                        show:true,
                        msg:'已经是最后一页'
                    });
                    return;
                };
                that.page++;
                that.getTableList();
            },
            dishAdd:function(){
                var that=this;
                publicFun.save('tid',that.tableInfo[0].tid);
                that.$router.push({
                    name:'order',
                    params:{
                        oid:that.tableInfo[0].oid,
                        tid:that.tableInfo[0].tid,
                        from:'add'
                    }
                })
            },
            havePaid:function (item,index) {
                var that=this;
                that.tableIndex=index;
                that.dishModalShow=true;
                console.log(item)
                var obj={
                    tid:item.id,
                    oid:item.oid
                }
                that.tableInfo.push(obj);
            },
            clearTable:function () {
                var that=this;
                const https=that.https+'?g=Home&m=repastPcApi&a=clearTableToEmpty'
                var data={
                    idtoken:store.state.idtoken,
                    token:store.state.token,
                    cid:store.state.cid,
                    tableInfo:JSON.stringify(that.tableInfo)
                }
                that.$http.post(https,qs.stringify(data)).then(function (res) {
                    console.log(res)
                    if(res.data.error==0){
                        that.getTableList();
                        that.dishModalShow=false;
                        that.tableList.splice(that.tableIndex,1);
                        that.tableInfo=[];
                    }
                })

            },
            closeDishModal:function () {
                var that=this;
                that.dishModalShow=false;
                that.tableInfo=[];
            },
            addDish:function () {

            },
            txtTime(date){
                return publicFun.txtTime(date);
            },
            checkOut:function(item){
                var that=this;
                that.currentTid=item.id;
                publicFun.save('tid',that.currentTid);
                that.$router.push(`/checkout?tid=${that.currentTid}&oid=${item.oid}`);
            },
	        plus:function () {//点击减号
                var that=this;
                if(that.tableNum>0){
	                that.tableNum--;
                }

	        },
	        add:function () {//点击加号
		        var that=this;
			        that.tableNum++;

	        },
	        tableSure:function () {//点击开台的确定按钮
		        var  that=this;
		        that.modalShow=false;//关闭开台弹窗
                that.useTableStart();
	        },
            useTableStart:function () {//开台接口
                var that=this;
                const https=that.https+'?g=Home&m=repastPcApi&a=useTableStart'
                that.$http.get(https,{params:{
                    idtoken:store.state.idtoken,
                    token:store.state.token,
                    cid:store.state.cid,
                    tid:that.tid,
                    nums:that.tableNum,
                }}).then(function (response) {
                    that.$router.push({
                        name:'order',
                        params:{
                            tableNum:that.tableNum,
                            tid:that.tid,
                            oid:that.oid,
                        }
                    })
                    store.commit('updateTableid',{tid:that.tid});
                    window.localStorage.setItem("tid",JSON.stringify(store.state.tid));
                    window.localStorage.setItem("idtoken",JSON.stringify(store.state.idtoken));
                    store.commit("updateTableid",{tid:localStorage.getItem("tid")})
                    console.log(that.tid,localStorage.getItem("idtoken"));
                })
            },
	        tableClose:function () {//点击开台的取消按钮
		        var  that=this;
		        that.modalShow=false;//关闭开台弹窗
	        },
            beginTable2:function (item) {
                console.log(item)
                var that=this;
                that.tid=item.id;
                that.oid=item.oid;
                that.tableNum=item.pnum;
                that.useTableStart()
            },
	        beginTable:function (item) {//空台点击开台
                var  that=this;
                console.log(item)
                that.modalShow=true;//开台弹窗
                that.tid=item.id;
                that.oid=item.oid;
                that.openTableInfo=item;
                that.tableNum=1;
	        },
	        refresh:function () {//点击刷新
		        var that=this;
		        that.classifyIndex=0;
		        that.searchInput='';
		        that.tstatus=1;
		        that.page=1;
		        that.tableList=[];
		        that.navIndex=0;
		        that.navTable=that.navList[0];
		        this.getTableList();
	        },
	        classifyType:function (index) {//换台的类型
                var that=this;
                this.classifyIndex=index;
                if(index==0){
                	this.tstatus=1;
                }
		        if(index==1){
			        this.tstatus=4;
		        }
		        if(index==2){
			        this.tstatus=3;
		        }
		        if(index==3){
			        this.tstatus=5;
		        }
		        that.page=1;
		        that.tableList=[];
		        this.getTableList();
	        },
	        loadMore:function () {//上拉加载
                console.log(222)
                this.getTableList();
	        },
	        searchClose:function () {//搜索框清空
		        this.searchInput='';
	        },
	        search:function () {//搜索
                var that=this;
		        that.page=1;
		        that.tableList=[];
                this.getTableList();
	        },
	        tableType:function (index) {//桌切换
                var that=this;
                that.navIndex=index;
		        that.navTable=that.navList[index];
		        that.page=1;
		        that.tableList=[];
		        that.getTableList();
	        },
	        choseList :function () {
		        this.downList=!this.downList;
	        },
	        choseText:function (index,item) {
	        	var that=this;
	        	that.typeIndex=index;
		        that.otherTable=item;
		        this.downList=!this.downList;
		        that.navIndex=3;
		        that.navTable=item;
		        that.getTableList();
	        },
            init:function () {
	            var that=this;
	            that.getTableClassify();
//	            that.getTableList();
            },
	        getTableClassify:function () {
		        var that=this;
		        const https=store.state.https+'?g=Home&m=repastPcApi&a=getTableClassify'
		        that.$http.get(https,{params:{//餐台分类接口
			        idtoken:store.state.idtoken,
			        token:store.state.token,
			        cid:that.cid
		        }}).then(function (response) {
			        var data= response.data;
			        if(data.error){
				        publicFun.showToast({show:true,msg:data.msg});
			        }else{
				        var navList=data.datas;
                        that.navList=data.datas;
                        that.navTable=that.navList[0];
				        console.log(that.navList,navList);
				        that.getTableList();
			        }
		        })
	        },
	        getTableList:function () {
	        	var that=this;
		        const http=store.state.https+'?g=Home&m=repastPcApi&a=tableList';
		        that.$http.get(http,{params:{//餐台列表接口
			        idtoken:store.state.idtoken,
			        token:store.state.token,
			        cid:that.cid,
			        tstatus:that.tstatus,
			        classify:that.navTable,
//			        classify:'',
			        search:that.searchInput,
			        pg:that.page,
		        }}).then(function (response) {
			        var data= response.data;
			        console.log(data);
			        if(data.error){
				        publicFun.showToast({show:true,msg:data.msg});
                    }else{
                        var mainBody=document.getElementById('mainBody');
                        mainBody.scrollTop = 0;
			            that.tjdatas=data.tjdatas;
			            that.pageCount=data.datas;
			        	if(that.page!=1){
//					        that.tableList=(that.tableList).concat(data.datas.tlist);
					        that.tableList=data.datas.tlist;
                        }else{
					        that.tableList=data.datas.tlist;
                        }

			        	if(data.datas.tlist==''&& that.page==1){

					        that.emptyTable=true;
                        }else{
					        that.emptyTable=false;
//					        that.page=++that.page;
                        }
//				        setTimeout(()=>{
//			        		console.log(that.$refs);
//					        that.$refs.myscroller.finishInfinite(2);
//				        })
//				        setTimeout(() => {
//					        that.$refs.myscroller.resize();
//				        }, 1500)
                    }
		        })
	        }
        }
    })
</script>
<style lang="scss" scoped type="text/css" >
    $fontSize:(375*20)/320;
    body{
        background: #fff;
        width:100%;
        overflow: hidden;
    }
    h1, h2, h3, h4, h5, p, ul, li, div,a {
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .pageSelect{
        position: fixed;
        bottom:3.7rem;
        left:0;
        right:0;
        text-align: center;
    }
    .pageSelect a{
        display: inline-block;

        color: #1393f2;
        padding:5px 8px;
        border-radius: 5px;
    }
    .pageSelect span{
        display: inline-block;
        margin:0 10px;
    }
    .emptyTable img{
        width: 5rem;
        margin-top: 5rem;
    }
    .dishModal .modal_title{
        padding: 0.8rem 0;

    }
    .myscroller{
        top:160/$fontSize*1rem;
    }
    .main{
        padding-bottom:80/$fontSize*1rem;
    }
    .emptyTable{
        text-align: center;
        line-height: 2rem;
    }
    .nav_list li a.listLg{
        display: flex;
        display: -webkit-flex;
    }
    .nav_listext{

        display: block;
        max-width: 50/$fontSize*1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .nav_tip{
        flex-shrink: 0;
    }
    .modal_loge{
        position: fixed;
        left:0;
        /*top:112/$fontSize*1rem;*/
        top:6.77867rem;;
        width:100%;
        bottom:0;
        right:0;
        background:rgba(0,0,0,0.6);
        z-index: 99;
    }
    .loge_list{
        background: #fff;

        padding-bottom: 14/$fontSize*1rem;
    }
    .logo_tip img{
        width: 12/$fontSize*1rem;
        height:8/$fontSize*1rem;
    }
    .loge_list a{
        font-size: 14/$fontSize*1rem;
        padding: 14/$fontSize*1rem 28/$fontSize*1rem;
        color: rgb(102,102,102);
    }
    .loge_list a.active{
        color: rgb(19,147,242);
    }
    .logo_tip{
        display: none;
    }
    .loge_list a.active .logo_tip{
        display: block;
    }
    .nav_wrap{
        position: relative;
    }
    .modal_foot a{
        display: block;
        font-size:16/$fontSize*1rem;
        color: rgb(153,153,153);
    }
    .modal_sure a{
        color:rgb(19,147,242);
    }
    .modal_close{
        border-right:1px solid #d3d3d3;
    }
    .modal_foot{
        border-top: 1px solid #d3d3d3;
        line-height:50/$fontSize*1rem;
        width:100%;
    }
    .modal_close,.modal_sure{
        width:50%
    }
    input{
        outline: none;
    }
    .modal_content{
        background: #fff;
        border-radius: 6/$fontSize*1rem;
        text-align: center;
        width:580/2/$fontSize*1rem;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
    }
    .modal_count{
        padding: 14/$fontSize*1rem;
    }
    .num input{
        border: 1px solid rgb(211,211,211);
        border-radius: 5/$fontSize*1rem;
        padding:10/$fontSize*1rem;
        line-height:20/$fontSize*1rem;
        font-size:18/$fontSize*1rem;
        width:135/$fontSize*1rem;
        margin: 0 12/$fontSize*1rem;
        text-align: center;
        /*outline:1px solid rgb(211,211,211);*/
    }
    .num input:focus{
        border: 1px solid rgb(211,211,211);
    }
    .modal_count img{
        width:30/$fontSize*1rem;
        height:30/$fontSize*1rem;
    }
    .modal_title{
        font-size: 18/$fontSize*1rem;
        padding: 20/$fontSize*1rem 0 8/$fontSize*1rem;
    }
    .modal_text{
        font-size: 15/$fontSize*1rem;

    }
    .close{
        position: absolute;
        top:13/$fontSize*1rem;
        right:10/$fontSize*1rem;
    }
    .close img{
        width:10/$fontSize*1rem;
        height:10/$fontSize*1rem;

    }
    .left_nav{
        position: fixed;
        right:18/2/$fontSize*1rem;
        bottom:180/2/$fontSize*1rem;
        width:96/2/$fontSize*1rem;
        height:96/2/$fontSize*1rem;
        border-radius: 50%;
        background: rgb(19,147,242);
        box-shadow: 0 0 7/$fontSize*1rem 2px rgba(117,117,117,0.5);
        font-size: 18/2/$fontSize*1rem;
        color: #fff;

    }
    .left_nav img{
        width:36/2/$fontSize*1rem;
        height:30/2/$fontSize*1rem;
        margin-top:12/2/$fontSize*1rem;
    }
    .left_nav span{
        display: block;
        padding-top:2/$fontSize*1rem;
    }
    .footer{
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        right:0;
        box-shadow: 0 -2px 6px rgba(0,0,0,0.16);
    }
    .footer li{
       flex-grow: 1;
        width:25%;
    }
    .footer li a{
       display: block;
        padding: 44/2/$fontSize*1rem 10/2/$fontSize*1rem;
        color: #333;
        background: rgb(246,246,246);
    }
    .foot_text{
        font-size:28/2/$fontSize*1rem;
        display: block;
    }
    .footer li a.active{
        color:rgb(19,147,242);
        background: #fff;
    }
    .foot_num{
        font-size:22/2/$fontSize*1rem;
        display: block;
    }
    #main{
        font-size: 16/$fontSize*1rem;
    }
    .searchContainer{
        padding: 25/2/$fontSize*1rem 30/2/$fontSize*1rem;
        /*width:624/$fontSize*1rem;*/
    }
    .searchWrap{
        background: rgb(231,231,231);
        font-size:26/2/$fontSize*1rem;
        border-radius: 2px;
        padding: 0 18/2/$fontSize*1rem;
    }
    .searchWrap input{
        border:none;
        background: transparent;
        padding: 8/$fontSize*1rem 8/$fontSize*1rem 8/$fontSize*1rem 0;
        line-height:26/2/$fontSize*1rem;
        width:476/2/$fontSize*1rem;
        outline:none;
    }
    input:focus{border:none;}
    .search_tip{
        margin-right:18/2/$fontSize*1rem;
    }
    .search_tip img{
        width:26/2/$fontSize*1rem;
        height:26/2/$fontSize*1rem;
    }
    .search_close img{
        width:28/2/$fontSize*1rem;
        height:28/2/$fontSize*1rem;
    }
    .searchBtn{
        background: transparent;
        border: none;
        color: rgb(19,147,242);
        margin-left: 18/2/$fontSize*1rem;
        font-size: 28/2/$fontSize*1rem;
    }
    .nav_list{
        font-size:28/2/$fontSize*1rem;
        padding-top: 35/2/$fontSize*1rem;
        line-height:80/2/$fontSize*1rem;
        border-bottom: 1px solid rgba(0,0,0,0.06);
    }
    .nav_list li{
        flex-grow: 1;
        width:25%;
    }
    .nav_list li a{
        color: #333;
        display: block;
    }
    .nav_list li a.active{
        color: rgb(19,147,242);
    }
    .nav_tip img{
        width:18/$fontSize*1rem;
        height:12/$fontSize*1rem;
        margin-left: 0.4rem;
    }
    .list{
        padding:0 12/2/$fontSize*1rem;
        flex-wrap: wrap;
    }

    .listScroll{
        padding:0 12/2/$fontSize*1rem;
        height:18rem;
        overflow-y: auto;
    }
    #mainBody{
        height:18rem;
        overflow-y: auto;
    }
    #mainBody.lower{
        height:16.5rem;
        overflow-y: auto;
    }
    .list li{
        float: left;
        padding:26/2/$fontSize*1rem 8/$fontSize*1rem 0;
        width:33.3333333333333333%;
    }
    .list li a{
        display: block;
    }
    .list li a .list_top{
        padding:16/2/$fontSize*1rem;
    }
   .list_top{
        border-radius: 2px 2px 0 0;
    }
    .green_bg .list_top{
        background: rgb(206,255,227);
    }
    .title{
        font-size:13/$fontSize*1rem;
        color: rgb(51,51,51);
        line-height: 13/$fontSize*1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: left;
    }
    .catering_num{
        font-size:12/$fontSize*1rem;
        padding-top: 8/$fontSize*1rem;
        color: #333;
    }
    .green_bg .list_down{
        background: rgb(235,255,244);
    }
    .money{
        font-size:19/$fontSize*1rem;
        line-height:22/$fontSize*1rem;
        color: rgb(255,114,52);
        padding: 38/2/$fontSize*1rem 10/$fontSize*1rem 16/2/$fontSize*1rem;
    }
    .time img{
        width:11/$fontSize*1rem;
        height:11/$fontSize*1rem;
        margin-right:4/$fontSize*1rem;
    }
    .time{
        font-size:12/$fontSize*1rem;
        padding-bottom:30/2/$fontSize*1rem;
        color: #333;
    }
    .list_down{
        height:80/$fontSize*1rem;
        border-radius: 0 0 2px 2px;
    }
    .gray_bg .list_down{
        background: rgb(248,248,248);
    }
    .gray_bg .list_top{
        background: rgb(239,239,239);
    }
    .pink_bg .list_top{
        background: rgb(255,234,234);
    }
    .pink_bg .list_down{
        background: rgba(255,234,234,0.5);
    }
    .empty{
        text-align: center;
    }
    .empty img{
        width:76/2/$fontSize*1rem;
        height:76/2/$fontSize*1rem;
        margin: 46/2/$fontSize*1rem 0;
    }

</style>