<template>
	<div id="order">
		<div class="topWrap">
			<div class="searchContainer flex_box flex_middle">
				<div class="searchWrap flex_box flex_middle">
                    <span class="search_tip">
                        <img src="@/assets/search_tip01.png" alt="">
                    </span>
					<input type="text" class="search_input" placeholder="请输入菜品编号或名称" v-model="search">
					<a class="search_close" href="javascript:;" @click="searchClear">
                        <img src="@/assets/search_tip02.png" alt="">
                    </a>
				</div>
				<button class="searchBtn" @click="searchMenu">搜索</button>
			</div>
		</div>
		<div class="menu_container flex_box">
			<div class="menu_left" v-if="dlist">
					<ul class="typeList">
						<li v-for="(item,index) in dlist">
							<a href="javascript:;" class="flex_box flex_middle" :class="typeIndex==index?'active':''" @click="menuType(item,index)">
							<span class="type_tip">
								<img src="@/assets/type_tip01.png" alt="">
							</span>
								<span class="type_text">{{item.group_name}}</span>
							</a>
						</li>
						<!--<li>-->
						<!--<a href="javascript:;" class="flex_box flex_middle">-->
						<!--<span class="type_text">干锅</span>-->
						<!--</a>-->
						<!--</li>-->
						<!--<li>-->
						<!--<a href="javascript:;" class="flex_box flex_middle">-->
						<!--<span class="type_text">凉菜</span>-->
						<!--</a>-->
						<!--</li>-->
						<!--<li>-->
						<!--<a href="javascript:;" class="flex_box flex_middle">-->
						<!--<span class="type_text">双人套餐</span>-->
						<!--</a>-->
						<!--</li>-->
					</ul>
			</div>
			<div class="menu_right" v-if="list!=''">
				<div class="head_top">热销</div>
				<ul class="menuList">
					<li class="flex_box flex_space" v-for="item in list">
						<div class="list_left">
							<h2 class="menu_title">{{item.name}}</h2>
							<template v-if="item.opts">
								<div class="limit">
									限购{{item.plimit}}份
								</div>
								<p class="flex_box flex_middle menu_money">
									<span class="menu_qian">￥</span>
									<span class="menu_num">{{item.opts.price}}</span>
									<span class="menu_type">/{{item.unit}}</span>
								</p>
							</template>
							<template v-else>
								<div class="limit">
									限购{{item.plimit}}份
								</div>
								<p class="flex_box flex_middle menu_money">
									<span class="menu_qian">￥</span>
									<span class="menu_num">{{item.price}}</span>
									<span class="menu_type">/{{item.unit}}</span>
								</p>
							</template>
						</div>

						<template v-if="item.opts">
							<div class="list_right flex_box flex_middle" v-if="item.opts&&item.opts.isstockopen!=0&&item.opts.inventory<1">
								<div class="empty">
									已售罄
								</div>
							</div>
							<div class="list_right flex_box flex_middle" v-else>
								<a class="spec_wrap" href="javascript:;" @click="optChosen(item)">
									<span class="spec">选规格</span>
									<span class="spec_num" v-if="item.pro_num>0">{{item.pro_num}}</span>
								</a>
							</div>
						</template>
						<template v-else>
							<div class="list_right flex_box flex_middle" v-if="item.isstockopen!=0&&item.instock<1">
								<div class="empty">
									已售罄
								</div>
							</div>
							<div class="list_right flex_box flex_middle" v-else>
								<template v-if="item.pro_num>0">
									<a class="plus" href="javascript:;" @click="plus(item)">
										<img src="@/assets/plus.png" alt="">
									</a>
									<span class="num">
										{{item.pro_num}}
									</span>
								</template>
								<a class="plus" href="javascript:;" @click="add(item)">
									<img src="@/assets/add01.png" alt="">
								</a>
							</div>
						</template>

					</li>
					<!--<li class="flex_box flex_space">-->
						<!--<div class="list_left">-->
							<!--<h2 class="menu_title">柠檬烤鸡腿</h2>-->
							<!--<div class="limit">-->
								<!--限购5份-->
							<!--</div>-->
							<!--<p class="flex_box flex_middle menu_money">-->
								<!--<span class="menu_qian">￥</span>-->
								<!--<span class="menu_num">45</span>-->
								<!--<span class="menu_type">/份</span>-->
							<!--</p>-->
						<!--</div>-->
						<!--<div class="list_right flex_box flex_middle">-->
							<!--<div class="spec_wrap">-->
								<!--<span class="spec">选规格</span>-->
								<!--<span class="spec_num">1</span>-->
							<!--</div>-->

						<!--</div>-->


					<!--</li>-->
					<!--<li class="flex_box flex_space">-->
						<!--<div class="list_left">-->
							<!--<h2 class="menu_title">柠檬烤鸡腿</h2>-->
							<!--<div class="limit">-->
								<!--限购5份-->
							<!--</div>-->
							<!--<p class="flex_box flex_middle menu_money">-->
								<!--<span class="menu_qian">￥</span>-->
								<!--<span class="menu_num">45</span>-->
								<!--<span class="menu_type">/份</span>-->
							<!--</p>-->
						<!--</div>-->
						<!--<div class="list_right flex_box flex_middle">-->
							<!--<div class="empty">-->
								<!--已售罄-->
							<!--</div>-->
						<!--</div>-->
					<!--</li>-->
				</ul>
				<div class="side_down flex_box flex_middle flex_center">
					<span class="side_line"></span>
					<span class="side_text">已经到底啦</span>
					<span class="side_line"></span>
				</div>
			</div>
			
		</div>
		<div class="footer">
			<div class="order_container modal" v-if="menuShow">
				<div class="order_wrap">
					<div class="order_title flex_box flex_middle flex_space">
						<span class="">已选商品</span>
						<a href="javascript:;" class="flex_box flex_middle" @click="clearList">
							<img src="@/assets/clear.png" alt="">
							<span class="order_empty">清空</span>
						</a>
					</div>
					<ul class="order_ul">
						<li class="flex_box flex_middle flex_space" v-for="item in cateList">
							<div>
								<span class="order_text">{{item.name}}</span>
								<span class="teast" v-if="item.opts">{{item.opts.name}}<template v-if="item.attrarray!=''">/{{item.pro_chose}}</template></span>
							</div>

							<div class="flex_box flex_middle">
								<div class="order_money flex_box flex_middle" v-if="item.opts"><span class="order_qian">￥</span><span>{{item.opts.price}}</span></div>
								<div class="order_money flex_box flex_middle" v-else><span class="order_qian">￥</span><span>{{item.price}}</span></div>
								<div class="flex_box flex_middle order_count">
									<a href="javascript:;" class="plus" @click="plus(item)">
										<img src="@/assets/plus.png" alt="">
									</a>
									<span class="num" v-if="item.pro_choseNum">{{item.pro_choseNum}}</span>
									<span class="num" v-else>{{item.pro_num}}</span>
									<a href="javascript:;" class="add" @click="add(item)">
										<img src="@/assets/add01.png" alt="">
									</a>
								</div>
							</div>
						</li>
						<!--<li class="flex_box flex_middle flex_space">-->
							<!--<span class="order_text">鸡汤娃娃菜</span>-->
							<!--<div class="flex_box flex_middle">-->
								<!--<div class="order_money flex_box flex_middle"><span class="order_qian">￥</span><span>26</span></div>-->
								<!--<div class="flex_box flex_middle order_count">-->
									<!--<span class="plus">-->
										<!--<img src="@/assets/plus.png" alt="">-->
									<!--</span>-->
									<!--<span class="num">2</span>-->
									<!--<span class="add">-->
										<!--<img src="@/assets/add01.png" alt="">-->
									<!--</span>-->
								<!--</div>-->
							<!--</div>-->
						<!--</li>-->
					</ul>
					<textarea class="remark" maxlength="55" placeholder="整单备注" v-model="remark"></textarea>
				</div>
			</div>
			<div class=" flex_box flex_middle">
				<div class="foot_money flex_box flex_middle">
					<div class="cate" v-if="totalnums>0" @click="seeMenu">
						<img src="@/assets/cate.png" alt="">
						<span class="cate_num">
							{{totalnums}}
						</span>
					</div>
					<div class="cate" v-else>
						<img src="@/assets/cate01.png" alt="">
					</div>
					<div class="cate_money">
						<span class="cate_text">金额:</span>
						<span class="cate_count">￥{{totalMoney}}</span>
					</div>
				</div>
				<div class="register">
					<a href="javascript:;">
						挂单
					</a>
				</div>
				<div class="once">
					<a href="javascript:;" @click="submitDishMakeSure">
						立即下单
					</a>
				</div>
			</div>
		</div>
		<a href="javascript:;" class="nav_left" @click="clearTable">
			<img src="@/assets/empty_icon01.png" alt="">
			<span class="left_text">撤台</span>
		</a>
		<!--选规格-->
		<div v-if="norms" class="modal normsWrap">
			<div class="norms">
				<a class="close" href="javascript:;" @click="normsClose">
                    <img src="@/assets/close.png" alt="">
				</a>
				<div class="normsBox">
					<div class="flex_box flex_middle foodDetail">
                        <img  alt="" :src="normList.image" v-if="normList.image!=''">
                        <img  alt="" :src="normList.image_1" v-else>
						<div class="detail">
							<h2 class="goods_h2">{{normList.name}}</h2>
							<p class="goods_type">已选：{{normChosen}}</p>
							<span class="goods_money">￥{{normList.opts.price}}</span>
						</div>
					</div>

					<div class="normsDetail">
						<h2 class="norms_h2">规格</h2>
						<ul class="norms_list flex_box flex_middle">
							<li>
								<a href="javascript:;" class="active">
								    {{normList.opts.name}}
								</a>
							</li>
						</ul>
					</div>
					<div class="normsDetail" v-if="normList.attrarray">
						<h2 class="norms_h2">属性</h2>
						<ul class="norms_list flex_box flex_middle">
							<li v-for="(item,index) in normList.attrarray">
								<a href="javascript:;" class="" :class="{active:normsIndex==index}" @click="clicksx(item,index)">
									{{item}}
								</a>
							</li>
						</ul>
					</div>
					<div class="addCateWrap">
						<button class="btn addCate" @click="addCate()">加入购物车</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import store from '@/store/index'
	import publicFun from '@/js/public.js'
    import axios from 'axios'
    import qs from 'qs'
	export  default ({
		data(){
			return {
				menuShow:false,//查看菜单弹窗
				norms:false,//选择规格
                remark:'',
                https:store.state.https,//头部的域名
                search:'',//搜索
                dlist:[],//菜单的数据
                typeIndex:0,//菜品分类
				list:[],//菜品详情数组
                blue:1,
				red:1,
                normList:{},//规格的信息
                normsIndex:0,//规格选中的下标
                normChosen:'',//已选中的规格
                totalnums:0,//点的数量
				cateList:[],//已经加入购物车的菜单
                totalMoney:0,//总额
                careList:[],//存放点过菜的数组
//                tid:store.state.tid,//通过vuex获取餐桌id
				tid:'',
                pnum:'',//点餐人数
				oid:0,
				cid:0,
				token:'',
				idtoken:''
			}
		},
		components:{

		},
		created(){
			var that=this;
            store.commit("updateTableid",{tid:localStorage.getItem("tid")})
            publicFun.titleChange({
                title:'下单'
            });
            that.cid=store.state.cid;
            that.tid=this.$route.params.tid;
            that.oid=this.$route.params.oid;
            console.log(that.tid)
            that.tid=(that.tid).replace(/^\"|\"$/g,'');//去除str 前后的双引号
            that.idtoken=publicFun.fetch('idtoken');
            that.idtoken=(that.idtoken).replace(/^\"|\"$/g,'');//去除str 前后的双引号
            that.token=publicFun.fetch('token');
            localStorage.getItem("tid");
            document.querySelector('body').setAttribute('style', 'background-color:#fff');
            setTimeout(function () {
                that.getTableInfo();
                that.apiDishMenu();
            },10)
		},
		methods:{
            submitDishMakeSure:function () {//点击立即下单
					var that=this;
                let orderDish=[];
                for(let i=0;i<that.cateList.length;i++){
                    let dish={}
                    if(that.cateList[i].attr==""&&!that.cateList[i].opts){//根据接口需要整理点菜数据
                        dish.pro_ids=that.cateList[i].id;
                        dish.pro_num=that.cateList[i].pro_num;
                        dish.pro_name=that.cateList[i].name;
                        dish.pro_price=that.cateList[i].price;
                        dish.pro_inventory=that.cateList[i].instock;
                        dish.pro_isstockopen=that.cateList[i].isstockopen;
                        dish.pro_isopen=that.cateList[i].isopen;
                        if(that.cateList[i].plimit>0){
                            dish.pro_plimit=that.cateList[i].plimit;
                        }
                        if(that.cateList[i].dpackage){
                            dish.pro_dpackage=that.cateList[i].dpackage;
                        }
                    }else if(that.cateList[i].attr==""&&that.cateList[i].opts){
                        dish.pro_ids=that.cateList[i].id;
                        dish.pro_num=that.cateList[i].pro_num;
                        dish.pro_name=that.cateList[i].name;
                        dish.pro_price=that.cateList[i].opts.price;
                        dish.pro_spec=that.cateList[i].opts.name;
                        dish.pro_inventory=that.cateList[i].opts.inventory;
                        dish.pro_isstockopen=that.cateList[i].opts.isstockopen;
                        dish.pro_isopen=that.cateList[i].opts.isopen;
                        if(that.cateList[i].plimit>0){
                            dish.pro_plimit=that.cateList[i].plimit;
                        }
                        if(that.cateList[i].dpackage){
                            dish.pro_dpackage=that.cateList[i].dpackage;
                        }
                    }else if(that.cateList[i].attr!=""&&that.cateList[i].opts){
                        dish.pro_attr=that.cateList[i].attrarray[0];
                        dish.pro_ids=that.cateList[i].id;
                        dish.pro_inventory=that.cateList[i].opts.inventory;
                        dish.pro_isopen=that.cateList[i].opts.isopen;
                        dish.pro_isstockopen=that.cateList[i].opts.isstockopen;
                        dish.pro_name=that.cateList[i].name;
                        dish.pro_num=that.cateList[i].pro_num;
                        dish.pro_price=that.cateList[i].opts.price;
                        dish.pro_spec=that.cateList[i].opts.name;
                        if(that.cateList[i].plimit>0){
                            dish.pro_plimit=that.cateList[i].plimit;
                        }
                        if(that.cateList[i].dpackage){
                            dish.pro_dpackage=that.cateList[i].dpackage;
                        }

                    }else{
                        dish.pro_ids=that.cateList[i].id;
                        dish.pro_num=that.cateList[i].pro_num;
                        dish.pro_name=that.cateList[i].name;
                        dish.pro_price=that.cateList[i].opts.price;
                        dish.pro_spec=that.cateList[i].opts.name;
                        dish.pro_attr=that.cateList[i].attrarray[0];
                        dish.pro_inventory=that.cateList[i].opts.inventory;
                        dish.pro_isstockopen=that.cateList[i].opts.isstockopen;
                        dish.pro_isopen=that.cateList[i].opts.isopen;
                        if(that.cateList[i].plimit>0){
                            dish.pro_plimit=that.cateList[i].plimit;
                        }
                        if(that.cateList[i].dpackage){
                            dish.pro_dpackage=that.cateList[i].dpackage;
                        }
                    }
                    orderDish.push(dish);
                }
                const https=that.https+'?g=Home&m=repastPcApi&a=apiSaveOrder';
                const data={
                    idtoken :that.idtoken ,
                    token:that.token,
                    cid:that.cid,
                    tid:that.tid,//餐桌id
                    oid:that.oid,//有订单时  订单表id 没有传0值
                    nums:that.pnum,
                    allmark:that.remark,
                    ytel:'',
                    youname:'',
                    totalnum:that.totalnums,
                    totalmoney:that.totalMoney,
                    dlist:JSON.stringify(orderDish)
                }
                that.$http.post(https,qs.stringify(data)).then(function (res) {
                    console.log(res)
					that.$router.replace({
						name:'checkout',
						params:{
						    oid:res.data.datas.oid,
							tid:res.data.datas.tid
						}
					});
                    publicFun.save('tid',res.data.datas.tid);

                })
            },
            clearTable(){//撤台
                var that=this;
                const https=that.https+'?g=Home&m=repastPcApi&a=clearTable';
                that.$http.get(https,{params:{
                    idtoken :that.idtoken,
                    token:store.state.token,
                    cid:store.state.cid,
                    tid:that.tid,//餐桌id
                    oid:that.oid,//有订单时  订单表id 没有传0值
                }}).then(function (response) {
                    console.log(response);
                    that.$router.replace(`/main`);
                })

            },
            searchMenu:function () {//点击搜索
                var that=this;
                that.apiDishMenu();
            },
            searchClear:function () {//清除搜索
                this.search='';
            },
            menuType:function (item,index) {//菜品分类切换
				var that=this;
				that.list=that.dlist[index].list;
                that.typeIndex=index;
//                for (var i=0;i<that.list.length;i++){
//                    that.$set(that.list[i],'pro_num',0);
//
//                }
            },
            clearList:function () {
				var that=this;
				that.cateList=[];
				that.menuShow=false;
				that.totalnums=0;
				that.totalMoney=0;
				for(var i=0;i<that.list.length;i++){
                    that.list[i].pro_num=0;
				}
            },
            seeMenu:function () {//查看菜单
				var that=this;
				that.menuShow=!that.menuShow;
            },
            addCate:function () {//点击加入购物车
              	var that=this;
				var pro_num=that.normList.pro_num++;
				that.totalnums=++that.totalnums;//购物车总数
				that.$set(that.normList, pro_num,pro_num);//给规格的数量加1
                that.normList.pro_chose=that.normList.attrarray[that.normsIndex];
				that.norms=false;//关闭规格弹窗
				var attr=JSON.stringify(that.normList);//对象复制是地址的重新指向，所以要先转化为字符串
                attr=JSON.parse(attr);//将字符串转化为对象
//                attr=that.normList;

				attr.pro_chose=that.normList.attrarray[that.normsIndex];//规格中当前选择的是什么规格
                attr.pro_choseNum=1;//将新菜单数量为1
                var cateList=that.cateList;

                that.totalMoney=Number(that.totalMoney)+Number(1*attr.opts.price)
                that.totalMoney= (that.totalMoney).toFixed(2);
				for(var i=0;i<cateList.length;i++){//判断是否存在当前的菜单，有接直接数量加1
					if(cateList[i].id==attr.id && cateList[i].pro_chose && cateList[i].pro_chose==attr.pro_chose && cateList[i].opts.name==attr.opts.name){
                        that.cateList[i].pro_choseNum++;
                        console.log(cateList[i].pro_chose);
                        return false;
					}else if(attr.attr=='' && cateList[i].id==attr.id  && cateList[i].opts.name==attr.opts.name){
                        that.cateList[i].pro_choseNum++;
                        return false;
                    }
				}
                that.cateList.push(attr);//在当前菜单中没有这道菜，那么就在数组中新加一条
				that.careList.push(that.normList);//存放点菜的数组，以便计算点的每道菜的总数

            },
            plus:function (item) {
                var that=this;
                console.log(item);
                if(that.cateList.length==0){
                    that.menuShow=false;
                }
				if(item.opts){
                    if(item.pro_choseNum>0){
                        var pro_choseNum=item.pro_choseNum--;
                        this.$set(item, pro_choseNum,pro_choseNum);
                        var pro_num=item.pro_num--;
                        this.$set(item, pro_num,pro_num);
                        that.totalMoney= Number(that.totalMoney)-Number(1*item.opts.price);
                        that.totalMoney= (that.totalMoney).toFixed(2);
                        that.totalnums=--that.totalnums;
                    }
                    var canFind=true;
                    for (var i=0;i<that.careList.length;i++){
                        if(item.id == that.careList[i].id && canFind && item.opts.name==that.careList[i].opts.name ){
                            canFind=false;
                            --that.careList[i].pro_num;
//                            that.$set(that.careList[i],pro_num,++that.careList[i].pro_num);
                            console.log(that.careList[i]);

                        }
                    }
                    if(item.pro_choseNum==0){//当购物车为0的时候，去掉下单的菜
                        for(var i=0;i<that.cateList.length;i++){
                            if(that.cateList[i].id==item.id && item.opts.name==that.cateList[i].opts.name && item.pro_chose && item.pro_chose==that.cateList[i].pro_chose){
                                that.cateList.splice(i,1);
                            }else if(item.attr=='' && cateList[i].id==item.id  && cateList[i].opts.name==item.opts.name){
                                that.cateList.splice(i,1);

							}
                        }
                    }


				}else{
                    if(item.pro_num>0){
                        var pro_num=item.pro_num--;
                        this.$set(item, pro_num,pro_num);
                        that.totalMoney= that.totalMoney-Number(1*item.price);
                        that.totalMoney= (that.totalMoney).toFixed(2);
                        that.totalnums=--that.totalnums;
                    }
                    if(item.pro_num==0){//当购物车为0的时候，去掉下单的菜
                        for(var i=0;i<that.cateList.length;i++){
                            if(that.cateList[i].id==item.id){
                                that.cateList.splice(i,1);
                            }
                        }
                    }

				}


            },
			add:function (item) {
                var that=this;

                if(item.opts){
                    var pro_choseNum=item.pro_choseNum++;
                    this.$set(item, pro_choseNum,pro_choseNum);
                    var pro_num=item.pro_num++;
                    this.$set(item, pro_num,pro_num);
                    that.totalnums=++that.totalnums;
                    that.totalMoney= Number(that.totalMoney)+Number(1*item.opts.price);
                    that.totalMoney= (that.totalMoney).toFixed(2);
                    console.log();
                    for (var i=0;i<that.careList.length;i++){
                        if(item.id == that.careList[i].id && item.opts.name==that.careList[i].opts.name){
                            ++that.careList[i].pro_num;
                            return;
//                            that.$set(that.careList[i],pro_num,++that.careList[i].pro_num);
//                            console.log(that.cateList[i].opts.name,that.careList[i].opts.name);
                        }
                    }
				}else{
                    var pro_num=item.pro_num++;
                    this.$set(item, pro_num,pro_num);
                    that.totalnums=++that.totalnums;
                    that.totalMoney= Number(that.totalMoney)+Number(1*item.price);
                    that.totalMoney= (that.totalMoney).toFixed(2);
                    for(var i=0;i<that.cateList.length;i++){
                        if(that.cateList[i].id==item.id){
                            return false;
                        }
                    }
                    that.cateList.push(item);
				}

            },
            clicksx:function (item,index) {//点击规格
				var that=this;
				that.normsIndex=index;
                that.normChosen=item;
            },
            normsClose:function () {//规格弹窗关闭
				var that=this;
				that.norms=false;
            },
            optChosen:function (item) {
				var that=this;
				that.norms=true;//选择规格,弹出框
                var dish={};
                console.log(item,item.attr);
                item.attrarray=item.attr;
                that.normList=item;
                that.normsIndex=0;
                if(item.attr!='' && item.opts){
					item.attrarray=item.attr.split(",");//字符串成数组
					that.normChosen=item.attrarray[0];
                    that.normList=item;
				}
                console.log(that.normList);

            },
            getTableInfo:function () {//获取餐台详情接口
				var that=this;
				console.log(that.tid);
                const https=that.https+'?g=Home&m=repastPcApi&a=getTableDetail';
                that.$http.get(https,{params:{
                    idtoken :that.idtoken ,
					token:store.state.token,
					cid:store.state.cid,
                    tid:that.tid,//餐桌id
                    oid:that.oid,//有订单时  订单表id 没有传0值
				}}).then(function (response) {
					console.log(response);
					that.pnum=response.data.datas.pnum;
                })
            },
            apiDishMenu:function () {//获取菜品接口
                var that=this;
                console.log(that.tid);
                const https=that.https+'?g=Home&m=repastPcApi&a=apiDishMenu';
                that.list=[];
                var idtoken=(that.idtoken).replace(/^\"|\"$/g,'');//去除str 前后的双引号
                that.$http.get(https,{params:{
                    idtoken :idtoken ,
//                    idtoken :store.state.idtoken ,
                    token:store.state.token,
                    cid:store.state.cid,
                    search:that.search,
				}}).then(function (response) {
					console.log(response.data.datas.dlist);
					that.dlist=response.data.datas.dlist;
                    that.list=response.data.datas.dlist[0].list;
                    for (var j=0;j<that.dlist.length;j++){
                        for (var i=0;i<that.dlist[j].list.length;i++){
                            that.$set(that.dlist[j].list[i],'pro_num',0);
                        }
					}

                })
            }
		}
	})
</script>
<style scoped="" lang="scss" type="text/css">
	$fontSize:(375/320)*20;
	h1, h2, h3, h4, h5, p, ul, li, div,a {
		list-style: none;
		padding: 0;
		margin: 0;
		box-sizing: border-box; }
	.leftScroll{
		top:56/$fontSize*1rem;
		width:160/2/$fontSize*1rem;
	}
	.normsDetail{
		padding-top:22/$fontSize*1rem;
	}
	.norms{

	}
	.remark{
		resize: none;
		width: 80%;
		font-size:13/$fontSize*1rem;
		padding: 10px;
		color:#333;
		border: 1px solid #ddd;
		height:2rem;
	}
	.addCateWrap{
		padding:20/$fontSize*1rem 15/$fontSize*1rem 0;
		width:100%;
	}
	.addCate{
		font-size: 15/$fontSize*1rem;
		color: #fff;
		text-align: center;
		background: rgb(19,147,242);
		border-radius:5/$fontSize*1rem;
		line-height: 40/$fontSize*1rem;
		width:100%;
		display: block;
		border:none;
	}
	.norms_list{
		/*padding:15/$fontSize*1rem 15/2/$fontSize*1rem 0;*/
		padding:0/$fontSize*1rem 15/2/$fontSize*1rem 0;
		flex-wrap: wrap;
	}
	.norms_list li{
		width:33.33333333%;
		line-height:35/$fontSize*1rem;
		padding: 15/$fontSize*1rem 15/2/$fontSize*1rem 0;
	}
	.norms_list li a{
		display: block;
		background: rgb(245,245,245);
		font-size:14/$fontSize*1rem;
		text-align: center;
		border-radius:3/$fontSize*1rem;
		color: #333;
	}
	.norms_list li a.active{
		background: rgba(19,147,242,0.2);
		color: rgb(19,147,242);
	}
	.norms_h2{
		font-size:14/$fontSize*1rem;
		color: rgb(102,102,102);
		text-align: left;
		padding: 0 16/$fontSize*1rem;
	}
	.goods_h2{
		font-size:18/$fontSize*1rem;
	}
	.goods_type{
		font-size:12/$fontSize*1rem;
		padding:10/$fontSize*1rem 0 24/$fontSize*1rem;
	}
	.goods_money{
		font-size:23/$fontSize*1rem;
		color: rgb(255,83,57);
	}
	.goods_type{
		font-size:12/$fontSize*1rem;
	}
	.order_count img{
		width:20/$fontSize*1rem;
		height:20/$fontSize*1rem;
	}
	.foodDetail{
		text-align: left;
		padding:16/$fontSize*1rem 16/$fontSize*1rem 0;
	}
	.foodDetail img{
		width:95/$fontSize*1rem;
		height:95/$fontSize*1rem;
		margin-right:11/$fontSize*1rem;
	}
	.normsBox{
		padding-bottom:20/$fontSize*1rem;
	}
	.close{
		position: absolute;
		top:15/$fontSize*1rem;
		right:15/$fontSize*1rem;
		width:10/$fontSize*1rem;
		height:10/$fontSize*1rem;
	}
	.norms{
		background: #fff;
		width:100%;
		position: absolute;
		bottom:0;
		left:0;
	}
	.normsWrap{
		z-index: 999;
		bottom: 0;
	}
	.teast{
		font-size:10/$fontSize*1rem;
		padding-top:6/$fontSize*1rem;
		color: rgb(153,153,153);
		display: block;
		text-align: left;
	}
	.order_ul{
		padding: 0 17/$fontSize*1rem;
		padding-bottom:24/$fontSize*1rem;
		height:230/$fontSize*1rem;
		overflow-y: scroll;
	}
	.order_ul li{
		padding-top:24/$fontSize*1rem;
		line-height: normal;
	}
	.order_qian{
		font-size:10/$fontSize*1rem;
	}
	.order_title img{
		width:12/$fontSize*1rem;
		height:12/$fontSize*1rem;
	}
	.order_money{
		font-size:14/$fontSize*1rem;
		padding-right: 40/$fontSize*1rem;
		display: block;
		color: rgb(255,83,57);
	}
	.order_wrap{
		background: #fff;
		position: absolute;
		width:100%;
		bottom:0/$fontSize*1rem;
		left:0;

	}
	.order_text{
		font-size:13/$fontSize*1rem;
	}
.order_title{
	line-height:40/$fontSize*1rem;
	background: rgb(248,248,248);
	padding: 0 17/$fontSize*1rem;
	font-size:14/$fontSize*1rem;
}
.order_empty{
	font-size:12/$fontSize*1rem;
	padding-left:4/$fontSize*1rem;
	color: #333;
}
.register{
	width:80/$fontSize*1rem;
}
.nav_left img{
	width:15/$fontSize*1rem;
	height:15/$fontSize*1rem;
}
.nav_left{
	position: fixed;
	right:15/$fontSize*1rem;
	bottom:124/2/$fontSize*1rem;
	height:96/2/$fontSize*1rem;
	width:96/2/$fontSize*1rem;
	border-radius: 50%;
	background: rgb(233,58,77);
	box-shadow: 0 0 7/$fontSize*1rem 2px rgba(233,58,77,0.5);
	color: #fff;
	padding-top:6/$fontSize*1rem;
}
.left_text{
	font-size:9/$fontSize*1rem;
	display: block;
}
.register a,.once a{
	position: relative;
	/*top:-1px;*/
	height:52/$fontSize*1rem;
	line-height:52/$fontSize*1rem;
	display: block;
	background: rgb(255,161,51);
	font-size: 16/$fontSize*1rem;
	color: #fff;
}
.once{
	width:203/2/$fontSize*1rem;
}
.once a{

	background: rgb(19,147,242);
}
.cate_money{
	padding-left: 134/2/$fontSize*1rem;
}
.foot_money{
	width:387/2/$fontSize*1rem;
}
.cate_count{
	color: rgb(255,83,57);
	font-size: 15/$fontSize*1rem;
	font-weight: bold;
}
.cate_text{
	font-size: 13/$fontSize*1rem;
}
.foot_money{
	position: relative;

}
.cate{
	position: absolute;
	left:10/$fontSize*1rem;
	top:-10/$fontSize*1rem;
}
.cate img{
	width:50/$fontSize*1rem;
	height:50/$fontSize*1rem;
}
.cate_num{
	position: absolute;
	right:0;
	top:-4/$fontSize*1rem;
	width:18/$fontSize*1rem;
	height:18/$fontSize*1rem;
	border-radius: 50%;
	text-align: center;
	line-height: 18/$fontSize*1rem;
	color: #fff;
	background: rgb(255,102,51);
}
.order_container{
	bottom:50/$fontSize*1rem;
}
.footer{
	position: fixed;
	bottom:0;
	left:0;
	width:100%;
	z-index: 99;
	line-height: 50/$fontSize*1rem;
	background: #fff;
	box-shadow: 0 -4/2/$fontSize*1rem 11/2/$fontSize*1rem 1px rgba(187,187,187,0.51);
}
.side_down span{
	display: block;
}
.side_down{
	margin-left: -22/4/$fontSize*1rem;
	margin-top:22/2/$fontSize*1rem;
}
.side_line{
	width:150/2/$fontSize*1rem;
	height:1px;
	background: rgb(222,222,222);
}
.side_text{
	color:rgb(188,188,188);
	font-size: 12/$fontSize*1rem;
	padding: 0 10/$fontSize*1rem;
}
.list_right img{
	width:45/2/$fontSize*1rem;
	height:45/2/$fontSize*1rem;
}.menuList{
	text-align: left;
 }
 .empty{
	 font-size:24/2/$fontSize*1rem;
	 color: rgb(153,153,153);
 }
 .spec_num{
	 position: absolute;
	 width:36/2/$fontSize*1rem;
	 height:36/2/$fontSize*1rem;
	 line-height:36/2/$fontSize*1rem;
	 text-align: center;
	 background: rgb(255,102,51);
	 font-size:24/2/$fontSize*1rem;
	 position: absolute;
	 top:-24/2/$fontSize*1rem;
	 right:0;
	 color: #fff;
	 -webkit-border-radius: 50%;
	 -moz-border-radius: 50%;
	 border-radius: 50%;
 }
 .spec_wrap{
	 position: relative;
 }
 .spec{
	 line-height: 45/2/$fontSize*1rem;
	 font-size:24/2/$fontSize*1rem;
	 background: rgb(19,147,242);
	 color: #fff;
	 text-align: center;
	 border-radius:22/2/$fontSize*1rem;
	 width:112/2/$fontSize*1rem;
	 display: block;
 }
.limit{
	padding: 0 4/$fontSize*1rem 0;
	margin-top: 6/$fontSize*1rem;
	font-size:20/2/$fontSize*1rem;
	line-height: 17/$fontSize*1rem;
	height: 17/$fontSize*1rem;
	color: #fff;
	text-align: center;
	background: rgb(19,147,242);
	width:auto;
	display: inline-block;
}
.num{
	padding: 0 9/$fontSize*1rem;
	font-size:28/2/$fontSize*1rem;
	display: block;
}
.menu_left{
	width:180/2/$fontSize*1rem;
	height:510/$fontSize*1rem;
	overflow-y: scroll;
	flex-shrink: 0;
}
.menu_container{
	width:100%;
	overflow: hidden;
}
.menuList{
	height:460/$fontSize*1rem;
	overflow-y: scroll;
}
.head_top{
	font-size:13/$fontSize*1rem;
	color: rgb(102,102,102);
	font-weight: bold;
	padding: 18/$fontSize*1rem 0;
	text-align: left;
}
.menu_right{
	padding-left: 12/$fontSize*1rem;
	background: #fff;
	width:100%;
}
.menuList li{
	align-items: flex-end;
	padding:4/$fontSize*1rem 14/$fontSize*1rem 12/$fontSize*1rem 0;
	border-bottom: 1px solid rgb(236,236,236);
}
.menuList li:last-child{
	border:none;
}
.menu_type{
	font-size:12/$fontSize*1rem;
}
.menu_num{
	font-size:16/$fontSize*1rem;
}
.menu_qian{
	font-size:13/$fontSize*1rem;
}
.menu_title{
	font-size:15/$fontSize*1rem;
	width:150/$fontSize*1rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.menu_money{
	color:rgb(255,83,57);
	padding-top:12/$fontSize*1rem;
}

.typeList a{
	padding: 18/$fontSize*1rem 2/$fontSize*1rem 18/$fontSize*1rem 12/$fontSize*1rem;
	color: #333;
	font-size:13/$fontSize*1rem;
	background: rgb(248,248,248);
	text-overflow: ellipsis;
	overflow: hidden;
	white-space:nowrap;
}
	.typeList a .type_text{
	display: block;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space:nowrap;
}
	.typeList a.active{
		font-weight: bold;
		background: #fff;
	}
.type_tip img{
	width:14/$fontSize*1rem;
	height:14/$fontSize*1rem;
	margin-right:4/$fontSize*1rem;
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
		/*height:150/$fontSize*1rem;*/
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
	#order{
		background: #f4f4f4;
	}
	.topWrap{
		background: #fff;
	}
</style>