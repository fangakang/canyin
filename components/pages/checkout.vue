<template>
    <div class="checkOut">
        <div class="nav">
            <div class="tableMsg clearfix">
                <div class="fl tableNum">
                    {{pageData.classify+'-'+pageData.t_name}}
                </div>
                <div class="fr peopleNum">
                    {{pageData.pnum}}人
                    <span class="fr edit" @click="editPeople"><img src="@/assets/edit.png" alt=""></span>
                </div>
            </div>
            <div class="orderMsg">
                <p>下单员：{{pageData.staffname}}</p>
                <p>订单号：{{orderdata.orderid}}</p>
            </div>
        </div>
        <div class="orderDetail">
            <div class="orderTime clearfix">
                <div class="fl">
                    <span class="fl clock"><img src="@/assets/clock.png" alt=""></span>
                    开台时间：{{opentime}}
                </div>
                <div class="timeLong fr" v-if="parseInt(minutes)>0">已开台{{minutes}}分钟</div>
            </div>
            <div class="dishTable">
                <div class="dishTable">
                    <ul class="dishList">
                        <li class="dishHead clearfix">
                            <div class="dishName fl">菜品名称</div>
                            <div class="fl w20">数量</div>
                            <div class="fl w20">原价</div>
                        </li>
                        <li class="listBody" v-for="(item,index) in dishLish" v-if="item.num-item.offnum-item.freenum>0">
                            <div class="dishDetail clearfix" @click="normalDish(index)">
                                <div class="dishName fl">
                                    <p class="nameP">
                                        {{item.name}}
                                        <span class="addLogo" v-if="item.j_c==1&&item.paid!=1">加</span>
                                        <span class="retire" v-if="item.paid==1">结</span>
                                    </p>
                                    <p class="standard">{{item.dmark}}</p>
                                </div>
                                <div class="fl w20">×{{item.num-item.offnum-item.freenum}}</div>
                                <div class="fl w20">{{item.price}}</div>
                            </div>
                            <div class="operateDish clearfix" v-if="item.buttonShow&&item.paid!=1">
                                <span class="retireBtn" @click="retireDish(index)">退&nbsp;&nbsp;菜</span>
                                <span class="sendBtn" @click="sendDish(index)">赠&nbsp;&nbsp;菜</span>
                            </div>
                        </li>
                        <li class="listBody clearfix" v-for="(item,index) in dishLish" v-if="item.offnum>0">
                            <div class="dishDetail clearfix" @click="hadRetire(index)">
                                <div class="dishName fl">
                                    <p class="nameP">
                                        {{item.name}}
                                        <!--<span class="addLogo">加</span>-->
                                        <span class="retire">退</span>
                                        <span class="retire" v-if="item.paid==1">结</span>
                                        <!--<span class="send">赠</span>-->
                                    </p>
                                    <p class="standard">{{item.dmark}}</p>
                                </div>
                                <div class="fl w20">×{{item.offnum}}</div>
                                <div class="fl w20">{{item.price}}</div>
                            </div>
                            <div class="operateDish clearfix" v-if="item.buttonShow&&item.paid!=1">
                                <span class="retireBtn" style="margin-right: 0" @click="cancelRetireModalShow(index)">取消退菜</span>
                            </div>
                        </li>
                        <li class="listBody clearfix" v-for="(item,index) in dishLish" v-if="item.freenum>0">
                            <div class="dishDetail clearfix" @click="hadSend(index)">
                                <div class="dishName fl">
                                    <p class="nameP">
                                        {{item.name}}
                                        <span class="send">赠</span>
                                        <span class="retire" v-if="item.paid==1">结</span>
                                    </p>
                                    <p class="standard">{{item.dmark}}</p>
                                </div>
                                <div class="fl w20">×{{item.freenum}}</div>
                                <div class="fl w20">{{item.price}}</div>
                            </div>
                            <div class="operateDish clearfix" v-if="item.buttonShow&&item.paid!=1">
                                <span class="retireBtn" @click="cancelSend(index)" style="margin-right: 0">取消赠菜</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="tableFoot clearfix">
                    <div class="fl">
                        订单备注
                    </div>
                    <div class="fr">
                        <span v-if="allmarknopay">{{allmarknopay}}</span>
                        <span v-if="!allmarknopay">无</span>

                    </div>
                </div>
            </div>
        </div>
        <!--<div class="couponList">-->
            <!--<ul class="clearfix">-->
                <!--<li class="fl">-->
                    <!--<div class="reduceType">菜品原价</div>-->
                    <!--<div class="reduceMoney">￥{{originalMoney}}</div>-->
                <!--</li>-->
                <!--<li class="fl" v-if="minusList.caiYHprice">-->
                    <!--<div class="reduceType">菜品优惠</div>-->
                    <!--<div class="reduceMoney">￥{{minusList.caiYHprice}}</div>-->
                <!--</li>-->
                <!--<li class="fl" v-if="minusList.freePrice">-->
                    <!--<div class="reduceType">赠菜优惠</div>-->
                    <!--<div class="reduceMoney">￥{{minusList.freePrice}}</div>-->
                <!--</li>-->
                <!--<li class="fl" v-if="minusList.pReduce">-->
                    <!--<div class="reduceType">随机立减</div>-->
                    <!--<div class="reduceMoney">￥{{minusList.pReduce}}</div>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <div class="footer">
            <div class="footContent clearfix">
                <div class="payMoney fl">
                    金额：<span>￥{{originalMoney}}</span>
                </div>
                <div class="fr">
                    <div class="operate btn" @click="operateChoose">操作</div>
                    <div class="pay btn" @click="goToPay">去结账</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="operateModal">
            <div class="operateDetail">
                <div class="maskLine" @click="selectOperate(item)" v-for="item in operateList">{{item}}</div>
                <div class="maskLine cancelLine" @click="maskHide">取消</div>
            </div>
        </div>
        <div class="mask" v-if="retireSendModal">
            <div class="maskContent">
                <div class="dishOperate">
                    <div class="dishTop">
                        <p class="targetDish">{{dishLish[dishIndex].name}}</p>
                        <span class="_close" @click="maskHide">×</span>
                    </div>
                    <div class="monNum clearfix">
                        <span class="fl">￥{{dishLish[dishIndex].price}}</span>
                        <span class="fr">×{{dishLish[dishIndex].num-dishLish[dishIndex].offnum-dishLish[dishIndex].freenum}}</span>
                    </div>
                    <div class="dishPart clearfix">
                        <span class="fl" v-if="type==1">退菜数量</span>
                        <span class="fl" v-if="type==2">赠菜数量</span>
                        <div class="fr clearfix numPart">
                            <span class="less fl" @click="addLess(1)"></span>
                            <span class="dishNum fl">{{dishNum}}</span>
                            <span class="add fl" @click="addLess(2)"></span>
                        </div>
                    </div>
                    <div class="reasonPart">
                        <p class="reasonTitle"  v-if="type==1">退菜理由</p>
                        <p class="reasonTitle"  v-if="type==2">赠菜理由</p>
                        <div class="reasonList clearfix hide">
                            <span>不想吃了</span>
                            <span>上错菜品</span>
                            <span>不想吃了</span>
                        </div>
                    </div>
                    <div class="reasonInput">
                        <textarea name="" placeholder="自定义理由"  rows="3" v-model="rmarke"></textarea>
                    </div>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="retireSure">确定</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="cancelRetireModal">
            <div class="maskContent">
                <div class="dishOperate">
                    <div class="dishTop">
                        <p class="targetDish">{{dishLish[retireIndex].name}}</p>
                        <span class="_close" @click="maskHide">×</span>
                    </div>
                    <div class="monNum clearfix">
                        <span class="fl">￥{{dishLish[retireIndex].price}}</span>
                        <span class="fr" v-if="cancelType==1">×{{dishLish[retireIndex].offnum}}</span>
                        <span class="fr" v-if="cancelType==2">×{{dishLish[retireIndex].freenum}}</span>
                    </div>
                    <div class="dishPart clearfix">
                        <span class="fl" v-if="cancelType==1">取消退菜数量</span>
                        <span class="fl" v-if="cancelType==2">取消赠菜数量</span>
                        <div class="fr clearfix numPart">
                            <span class="less fl" @click="cancelAddLess(1)"></span>
                            <span class="dishNum fl">{{retireNum}}</span>
                            <span class="add fl" @click="cancelAddLess(2)"></span>
                        </div>
                    </div>
                    <div class="reasonPart">
                        <p class="reasonTitle" v-if="cancelType==1">取消退菜理由</p>
                        <p class="reasonTitle" v-if="cancelType==2">取消赠菜理由</p>
                    </div>
                    <div class="reasonInput">
                        <textarea name="" placeholder="自定义理由"  rows="3" v-model="rmarke"></textarea>
                    </div>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="cancelRetireSure">确定</div>
                </div>
            </div>
        </div>
        <div class="mask retireAllModal" v-if="retireAllModal">
            <div class="maskContent">
                <div class="dishOperate">
                    <div class="dishTop">
                        <p class="targetDish">全单退菜</p>
                        <span class="_close" @click="maskHide">×</span>
                    </div>
                    <div class="modalNotice">是否要全单退菜？</div>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="retireAllDish">确定</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="addModal">
            <div class="maskContent">
                <div class="dishOperate">
                    <div class="dishTop">
                        <p class="targetDish">玫瑰花莲粥</p>
                        <span class="_close" @click="maskHide">×</span>
                    </div>
                    <div class="monNum clearfix">
                        <span class="fl">￥38.00</span>
                        <span class="fr">×1</span>
                    </div>
                    <div class="dishPart clearfix">
                        <span class="fl">赠菜数量</span>
                        <div class="fr clearfix numPart">
                            <span class="less fl"></span>
                            <span class="dishNum fl">1</span>
                            <span class="add fl"></span>
                        </div>
                    </div>
                    <div class="reasonPart">
                        <p class="reasonTitle">赠菜理由</p>
                        <div class="reasonList clearfix">
                            <span>VIP客户</span>
                            <span>服务补偿</span>
                            <span>门店活动</span>
                        </div>
                    </div>
                    <div class="reasonInput">
                        <textarea name="" placeholder="自定义理由" id="" rows="3"></textarea>
                    </div>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure">确定</div>
                </div>
            </div>
        </div>
        <div class="mask changeHead" v-if="changeHead">
            <div class="maskContent">
                <div class="dishOperate">
                    <div class="dishTop">
                        <p class="maskTitle">改抬头</p>
                        <span class="_close" @click="maskHide">×</span>
                    </div>
                    <p class="operateTarget">操作台号：{{pageData.classify+'-'+pageData.t_name}}</p>
                    <div class="peopleAdd">
                        <div class="clearfix">
                            <span class="less fl" @click="people(0)"></span>
                            <input class="fl maskInput" v-on:input="changePop" type="tel" maxlength="2" v-model="peopleNum" onkeyup="value=value.replace(/[^\d]/g,'') ">
                            <span class="add fl" @click="people(1)"></span>
                        </div>
                    </div>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="mdfyOrder">确定</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="dishDetailMask">
            <div class="dishDetailMask">
                <div class="detailLine lineName">{{dishLish[dishIndex].name}}</div>
                <div class="detailLine" v-if="canRetire">
                    <a href="javascript:;" @click="retireDish">退&nbsp;菜</a>
                </div>
                <div class="detailLine" v-if="canSend" @click="sendDish">
                    <a href="javascript:;">赠&nbsp;菜</a>
                </div>
                <div class="detailLine" v-if="cancelRetireOnly" @click="cancelRetireModalShow">
                    <a href="javascript:;">取消退菜</a>
                </div>
                <div class="detailLine" v-if="cancelSendOnly">
                    <a href="javascript:;" @click="cancelSend">取消赠菜</a>
                </div>
                <div class="detailLine">
                    <a href="javascript:;" @click="maskHide">取&nbsp;消</a>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import publicFun from '@/js/public.js'
    import store from '@/store/index.js'
    export default {
        data(){
            return{
                canRetire:true,
                canSend:true,
                cancelSendOnly:true,
                cancelRetireOnly:true,
                dishDetailMask:false,
                changeHead:false,
                operateModal:false,
                retireSendModal:false,
                addModal:false,
                cancelRetireModal:false,
                retireAllModal:false,
                peopleNum:0,
                minutes:'',
                cid: 106,
                tid: 286,
                oid: 3954,
                idtoken:'',
                token: 'enspyv1506341661',
                orderdata:[],
                classify:'',
                t_name:'',
                pnum:'',
                pageData:{},
                dishLish:[],
                minusList:{},
                opentime:'',
                allmark:'',
                allmarknopay:'',
                originalMoney:'',
                retireIndex:0,
                retireNum:1,
                dishIndex:0,
                dishNum:1,
                rmarke:'',
                operateType:'操作',
                operateList:['全单退菜','加菜','换台'],
                type:1,//1.退菜  2.赠菜
                cancelType:1,//1.取消退菜  2.取消赠菜
                noreduceMoney:0,
                haveSend:false,
            }
        },
        mounted:function () {
            var that=this;
            that.cid=publicFun.fetch('cid');
            that.tid=publicFun.fetch('tid');
            that.idtoken=publicFun.fetch('idtoken');
            that.token=publicFun.fetch('token');
            that.oid=that.$route.query.oid;
            that.getTableDetail();
            publicFun.titleChange({
                title:'订单详情'
            });
            document.querySelector('body').setAttribute('style', 'background-color:#ececec');
        },
        methods:{
            editPeople:function () {
                this.changeHead=true;
                this.peopleNum=this.pageData.pnum
            },
            mdfyOrder:function () {
              var that=this;
              var data={
                  idtoken: that.idtoken,
                  token: that.token,
                  cid: that.cid,
                  tid: that.tid,
                  oid: that.orderdata.id,
                  nums:that.peopleNum
              }
                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=mdfyOrder',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        that.pageData.pnum=that.peopleNum;
                        that.changeHead=false;
                    }else{
                        publicFun.showToast({
                            show:true,
                            msg:res.data.msg
                        });
                        that.changeHead=false;
                    }
                })
            },
            changePop:function () {
              if(this.peopleNum<1){
                  this.peopleNum=1
              }
            },
            people:function (type) {
              var that=this;
              if(type==0){//减少就餐人数
                  that.peopleNum--;
                  if(that.peopleNum<1){
                      that.peopleNum=1;
                  }
              }else if(type==1){//增加就餐人数
                  that.peopleNum++;
                  if(that.peopleNum>=100){
                      that.peopleNum=99;
                  }
              }
            },
            maskHide:function () {
                var that=this;
                that.retireSendModal=false;
                that.addModal=false;
                that.cancelRetireModal=false;
                that.operateModal=false;
                that.retireAllModal=false;
                that.changeHead=false;
                that.dishDetailMask=false;
            },
            getTableDetail:function(){
                var that=this;
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.oid,
                }

                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=getTableDetail',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        that.noreduceMoney=res.data.datas.noreduceMoney
                        that.orderdata=res.data.datas.orderdata;
                        that.pageData=res.data.datas;
                        that.opentime=that.timestampToTime(parseInt(res.data.datas.orderdata.time));
                        res.data.datas.orderdata.dishLish = res.data.datas.orderdata.dishLish.map(v => {
                            return {...v, buttonShow: false, childrenList: false}
                        });
                        var jList=[],//加菜列表
                            otherList=[];//其他列表
                        for(let i=0;i<that.orderdata.dishLish.length;i++){
                            if(that.orderdata.dishLish[i].j_c&&that.orderdata.dishLish[i].paid!=1){
                                jList.push(that.orderdata.dishLish[i]);
                            }else{
                                otherList.push(that.orderdata.dishLish[i]);
                            }
                        }

                        var totalList=[...jList,...otherList];
                        that.dishLish=totalList;
                        that.minusList=res.data.datas.orderdata.minusList;
                        if(res.data.datas.orderdata.allmark){
                            that.allmark=res.data.datas.orderdata.allmark.join(',');
                        }
                        if(res.data.datas.orderdata.allmarknopay){
                            that.allmarknopay=res.data.datas.orderdata.allmarknopay.join(',');
                        }
                        var originalMoney=0;
                        for(var i=0;i<res.data.datas.orderdata.dishLish.length;i++){
                            if(res.data.datas.orderdata.dishLish[i].paid!=1){
                                originalMoney+=parseFloat(res.data.datas.orderdata.dishLish[i].price)*(res.data.datas.orderdata.dishLish[i].num-res.data.datas.orderdata.dishLish[i].offnum-res.data.datas.orderdata.dishLish[i].freenum)
                            }
                        }
                        that.originalMoney=originalMoney.toFixed(2);
                        that.countTime(parseInt(res.data.datas.orderdata.time))
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            countTime(orderTime){
                var that=this;
                var date=new Date().getTime(),
                    orderTime=orderTime,
                    time=orderTime*1000;
                that.minutes=parseInt(Math.abs(date-time)/1000/60);
                setTimeout(function () {
                    that.countTime(orderTime)
                },1000)

            },
            timestampToTime:function (timestamp) {
                var date = new Date(timestamp * 1000),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                Y = date.getFullYear() + '-',
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                D = date.getDate()<10?'0'+date.getDate():date.getDate() + ' ',
                h = date.getHours()<10?'0'+date.getHours()+ ':':date.getHours() + ':',
                m = date.getMinutes()<10?'0'+date.getMinutes()+ ':':date.getMinutes()+ ':',
                s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
                return Y+M+D+' '+h+m+s;
            },
            normalDish:function (index){//未赠未退的菜
              var that=this;
              that.dishIndex=index;
              that.canRetire=true;
              that.canSend=true;
              that.cancelRetireOnly=false;
              that.cancelSendOnly=false;
              that.dishDetailMask=true;
            },
            hadRetire:function(index){//已退的菜
                var that=this;
                that.retireIndex=index;
                that.canRetire=false;
                that.canSend=false;
                that.cancelRetireOnly=true;
                that.cancelSendOnly=false;
                that.dishDetailMask=true;
            },
            hadSend:function (index){//已赠的菜
                var that=this;
                that.retireIndex=index;
                that.canRetire=false;
                that.canSend=false;
                that.cancelRetireOnly=false;
                that.cancelSendOnly=true;
                that.dishDetailMask=true;
            },
            retireDish:function () {
                var that=this;
                that.retireSendModal=true;
                that.dishDetailMask=false;
                that.dishNum=1;
                that.type=1;
                that.rmarke='';
            },
            sendDish:function () {
                var that=this;
                that.retireSendModal=true;
                that.dishDetailMask=false;
                that.dishNum=1;
                that.type=2;
                that.rmarke='';
            },
            cancelRetireModalShow:function(){
                var that=this;
                that.cancelRetireModal=true;
                that.dishDetailMask=false;
                that.retireNum=1;
                that.cancelType=1;
                that.rmarke='';
            },
            cancelSend:function(){
                var that=this;
                that.dishDetailMask=false;
                that.cancelRetireModal=true;
                that.retireNum=1;
                that.cancelType=2;
                that.rmarke='';
            },
            addLess:function(e){
                var that=this;
              if(e==1){
                  if(that.dishNum==1){
                      return;
                  }else{
                      that.dishNum--;
                  }
              }else{
                  that.dishNum++
                  if(that.dishNum>that.dishLish[that.dishIndex].num-that.dishLish[that.dishIndex].offnum-that.dishLish[that.dishIndex].freenum){
                      that.dishNum--;
                      if(that.type==1){
                          publicFun.showToast({
                              show:true,
                              msg:'退菜数量不能大于点菜数量'
                          })
                      }else if(that.type==2){
                          publicFun.showToast({
                              show:true,
                              msg:'赠菜数量不能大于点菜数量'
                          })
                      }

                  }
              }
            },
            cancelAddLess:function(type){
                var that=this;
                if(type==1){
                    if(that.retireNum==1){
                        return;
                    }else{
                        that.retireNum--;
                    }
                }else{
                    that.retireNum++
                    if(that.cancelType==1){
                        if(that.retireNum>that.dishLish[that.retireIndex].offnum){
                            that.retireNum--;
                            publicFun.showToast({
                                show:true,
                                msg:'取消退菜数量不能大于已退数量'
                            })
                        }
                    }else if(that.cancelType==2){
                        if(that.retireNum>that.dishLish[that.retireIndex].freenum){
                            that.retireNum--;
                            publicFun.showToast({
                                show:true,
                                msg:'取消赠菜数量不能大于已赠数量'
                            })
                        }
                    }

                }
            },
            retireSure:function () {
                var that=this;
                if(that.rmarke==''){
                    publicFun.showToast({
                        show:true,
                        msg:'请输入理由'
                    });
                    return;
                };
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.orderdata.id,
                    nums:that.dishNum,
                    did:that.dishLish[that.dishIndex].did,
                    spec:that.dishLish[that.dishIndex].spec,
                    attr:that.dishLish[that.dishIndex].attr,
                    didkey:that.dishLish[that.dishIndex].didkey,
                    rmarke:that.rmarke
                }
                var url='';
                var noDish=false;
                if(that.type==1){//退菜接口
                    url='https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=retireAdish';
                    let num=0,
                        offnum=0;
                    for(let i=0;i<that.dishLish.length;i++){
                        if(that.dishLish[i].paid!=1){
                            num+=parseFloat(that.dishLish[i].num);
                            offnum+=parseFloat(that.dishLish[i].offnum);
                        }
                    }
                    num=num.toFixed(2);
                    offnum=offnum.toFixed(2);
                    if(num-offnum==that.dishNum){//最后一单退菜，且没有赠菜
                        noDish=true;
                    }
                }else if(that.type==2){//赠菜接口
                    url='https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=freeAdish';
                }
                that.$http.get(url,{params:data}).then(function(res){
                    if(res.data.error==0){
                        that.retireSendModal=false;
                        if(that.type==1&&noDish){
                            that.clearTable();
                            return;
                        }
                        that.getTableDetail();


                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            clearTable:function(){
                var that=this;
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.orderdata.id,
                };
                var url='https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=clearTable'
                that.$http.get(url,{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        publicFun.showToast({
                           show:true,
                           msg:res.data.msg
                        });
                        that.$router.go(-1);
                    }
                })
            },
            cancelRetireSure:function(){
                var that=this;
                if(that.rmarke==''){
                    publicFun.showToast({
                        show:true,
                        msg:'请输入理由'
                    });
                    return;
                };
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.orderdata.id,
                    nums:that.retireNum,
                    did:that.dishLish[that.retireIndex].did,
                    spec:that.dishLish[that.retireIndex].spec,
                    attr:that.dishLish[that.retireIndex].attr,
                    didkey:that.dishLish[that.retireIndex].didkey,
                    rmarke:that.rmarke
                }
                var url='';
                if(that.cancelType==1){
                    url='https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=unRetireAdish';
                }else if(that.cancelType==2){
                    url='https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=unFreeAdish';
                }
                that.$http.get(url,{params:data}).then(function(res){
                    if(res.data.error==0){
                        that.cancelRetireModal=false;
                        that.getTableDetail();
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            operateChoose:function(){
                var that=this;
                that.operateModal=true;
            },
            selectOperate:function(type){
                var that=this;
                that.operateType=type;
                that.operateModal=false;
                if(type=='全单退菜'){
                    that.retireAllModal=true;
                }else if(type=='换台'){
                    that.$router.push({
                        name:'changetable',
                        params:{

                        }
                    })
                }else if(type=='加菜'){
                    console.log(that.tid)

//                    that.$router.replace(`/order?oid=${that.oid}&tid=${that.tid}&from=add`);
                    that.$router.replace({
                        name:'order',
                        params:{
                            oid:that.oid,
                            tid:'"'+that.tid+'"',
                            from:'add'
                        }
                    })
                }
            },
            retireAllDish:function(){
                var that=this;
                var num=0;
                var freenum=0;
                for (var i=0;i<that.dishLish.length;i++){
                    if(that.dishLish[i].paid!=1){
                        num+=that.dishLish[i].num;
                        freenum+=that.dishLish[i].freenum;
                    };
                    if(that.dishLish[i].paid!=1&&that.dishLish[i].freenum>0){
                        that.haveSend=true;
                    }
                }
                if(num==freenum){
                    publicFun.showToast({
                        show:true,
                        msg:'当前已点菜品均为赠菜，无法退菜',
                    });
                    that.retireAllModal=false;
                    return;
                }
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.orderdata.id,
                };
                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=retireAllDish',{params:data}).then(function(res){
                    if(res.data.error==0){
                        that.retireAllModal=false;
                        console.log(that.haveSend)
                        if(that.haveSend){
                            that.getTableDetail();
                        }else{
                            that.$router.go(-1)
                        }

                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
            goToPay:function () {
                var that=this;
                that.$router.push({
                    name:'receipt',
                    params:{
                        pprice:that.originalMoney,
                        oid:that.oid
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped type="text/css">
    h1, h2, h3, h4, h5, p, ul, li, div,a {
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        background: #ececec;
        width:100%;
    }
    .dishDetailMask{
        position: fixed;
        background: #fff;
        opacity: .8;
        border-radius: 5px;
        width:12rem;
        left:2rem;
        top:8rem;
    }
    .detailLine.lineName{
        border-top: none;
    }
    .detailLine{
        color: #333;
        font-size: 0.65rem;
        line-height: 1.75rem;
        border-top: 1px solid #efefef;
    }
    .detailLine a{
        display: inline-block;
        width: 100%;
    }
    .peopleAdd .clearfix{
        margin-left: 1rem;
        margin-top: 0.75rem;
    }
    .peopleAdd .less,.peopleAdd .add{
        margin-top: 0.5rem;
    }
    .maskInput{
        outline: none;
        line-height: 2rem;
        font-size: 0.8rem;
        color: #333;
        text-align: center;
        border-radius: 5px;
        border:1px solid #ddd;
        width: 6rem;
        margin:0 0.5rem
    }
    .operateTarget{
        text-align: left;
        border-bottom: 1px solid #ddd;
        padding: 0.5rem 0;
    }
    .retireAllModal .maskContent{
        margin-top: 8rem;
    }
    .modalNotice{
        margin-top: 0.5rem;
        font-size: 0.75rem;
    }
    .hide{
        display: none;
    }
    .checkOut{
        padding-bottom: 3rem;
    }
    .mask{
        position: fixed;
        top:0;
        right:0;
        bottom: 0;
        left:0;
        background: rgba(0,0,0,.5);
        text-align: center;
    }
    .maskContent{
        background: #fff;
        display: inline-block;
        border-radius: 5px;
        margin-top: 5rem;
    }
    .operateDetail{
        position: fixed;
        right:0;
        left:0;
        bottom:0
    }
    .operateDetail>div{
        background: #fff;
        color: #333;
        font-size: 0.85rem;
        text-align: center;
        line-height: 2.75rem;
        border-bottom: 1px solid #efefef;
    }
    .cancelLine{
        margin-top: 0.25rem;
    }
    .dishTop{
        position: relative;
    }
    ._close{
        position: absolute;
        font-size: 1rem;
        color: #bbb;
        line-height: 1rem;
        width: 1rem;
        top:-0.7rem;
        right:-0.7rem
    }
    .dishOperate{
        padding: 0.75rem;
        width:13rem;
    }
    .targetDish,.maskTitle{
        color: #333;
        font-size: 0.9rem;
        text-align: center;
    }
    .monNum{
        padding: 0.65rem 0;
        border-bottom: 1px solid #efefef;
        margin-bottom: 0.7rem;
    }
    .monNum .fl{
        font-size: 0.9rem;
        color: #ff5339;
    }
    .monNum .fr{
        font-size: 0.65rem;
        color: #acacac;
        margin-top: 0.3rem;
    }
    .numPart span{
        display: inline-block;
        width:1.25rem;
        line-height: 1.25rem;
        font-size: 0.7rem;
        color: #333;
    }
    .reasonPart{
        margin:0.5rem 0;
    }
    .dishPart>span{
        font-size: 0.65rem;
        color: #666;
        margin-top: 0.2rem;
    }
    .less{
        height:1.25rem;
        width: 1.25rem;
        background: url('../../assets/less.png');
        background-size: 1.25rem 1.25rem;
    }
    .add{
        height:1.25rem;
        width: 1.25rem;
        background: url('../../assets/add01.png');
        background-size: 1.25rem 1.25rem;
    }
    .reasonTitle{
        font-size: 0.65rem;
        color: #666;
        text-align: left;
        margin-bottom: 0.5rem;
    }
    .reasonList span{
        display: inline-block;
        font-size: 0.65rem;
        color: #333;
        background: #f5f5f5;
        border-radius: 5px;
        padding: 0.25rem 0.5rem;
        float: left;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .reasonInput textarea{
        width:90%;
        background: #ecf7fe;
        resize: none;
        border:none;
        outline: none;
        font-size:0.65rem;
        color: #333;
        padding:0.5rem
    }
    .maskFoot{
        font-size: 0.8rem;
        display: flex;
        border-top:1px solid #efefef;
        line-height: 2.5rem;
    }
    .maskFoot div{
        flex: 1;
    }
    .cancel{
        color: #999;
        border-right: 1px solid #ddd;
    }
    .maskSure{
        color: #1393f2;
    }
    .nav{
        padding-left:0.5rem;
        background: #fff;
        margin-bottom: 0.5rem;
    }
    .tableMsg{
        font-size: 0.7rem;
        color:#333;
        padding:0.5rem 0.5rem 0.35rem 0;
        border-bottom: 1px solid #efefef;
    }
    .edit img{
        height:0.8rem;
        width: auto;
        margin-left: 10px;
        margin-top: 0.1rem;
    }
    .orderMsg{
        text-align: left;
        font-size: 0.6rem;
        color: #999;
        line-height: 1rem;
        padding: 0.3rem 0;
    }
    .orderDetail{
        padding-left:0.5rem;
        background: #fff;
        margin-bottom: 0.5rem;
    }
    .orderTime{
        font-size: 0.6rem;
        color:#333;
        padding:0.5rem 0.5rem 0.35rem 0;
        border-bottom: 1px solid #efefef;
    }
    .orderTime .timeLong{
        color:#ffa133
    }
    .clock img{
        height:0.8rem;
        width: auto;
        margin-right: 5px;
    }
    .dishTable{
        padding-right: 0.5rem;
        margin-top: 0.2rem;
    }
    .dishList .w20{
        width:20%;
        text-align: center;
    }
    .dishList li{
        padding: 0.25rem 0;
    }
    .dishList{
        color:#999;
        font-size: 0.6rem;
        width: 100%;
        text-align: center;
        padding-bottom: 0.5rem;
        border-bottom: 1px dotted #efefef;
    }
    .dishList .dishHead{
        color: #333;
        font-weight:bold;
    }
    .dishName{
        width: 60%;
        text-align: left;
        color: #333;
    }

    .standard{
        color: #999;
        font-size: 0.5rem;
    }
    .tableFoot{
        color: #333;
        font-size: 0.6rem;
        padding: 0.5rem 0;
    }
    .dishName .addLogo{
        font-size: 0.4rem;
        color: #fff;
        display: inline-block;
        padding: 1px 5px;
        background: #1393f2;
        border-radius: 2px;
        margin-left: 5px;
    }
    .dishName .send,.dishName .retire{
        font-size: 0.4rem;
        color: #fff;
        display: inline-block;
        padding: 1px 5px;
        background: #f46176;
        border-radius: 2px;
        margin-left: 5px;
    }
    .couponList{
        background: #fff;
        padding: 0.5rem 0;
    }
    .couponList li{
        width: 25%;
        text-align: center;
        color: #333;
        margin: 0;
    }
    .couponList li .reduceType{
        font-size: 0.65rem;
    }
    .couponList li .reduceMoney{
        font-size: 0.75rem;
    }
    .footer{
        position: fixed;
        left:0;
        bottom: 0;
        right:0;
        border-top:1px solid #efefef;
        padding:0.5rem 0.75rem;
        background: #fff;
    }
    .btn{
        display: inline-block;
        border:1px solid #ddd;
        padding:0.25rem 0rem;
        width: 4rem;
        border-radius: 5px;
        font-size: 0.65rem;
    }
    .footContent{
        font-size: 0.7rem;
    }
    .footContent .payMoney{
        color:#666;
        margin-top: 0.2rem;
    }
    .footContent .payMoney span{
        color: #ff5339;
    }
    .operate{
        border: 1px solid #1393f2;
        color: #1393f2;
    }
    .pay{
        border: 1px solid #1393f2;
        background: #1393f2;
        color: #fff;
    }
    .operateDish{
        width: 100%;
        padding: 0.5rem 0;
        background: #efefef;
        margin-top: 5px;
    }
    .operateDish span{
        display: inline-block;
        border: 1px solid #1393f2;
        background: #1393f2;
        color: #fff;
        border-radius: 5px;
        font-size: 0.65rem;
        padding:0.2rem 0rem;
        width:3.25rem;

    }
    .operateDish .retireBtn{
        margin-right: 1rem;
    }
</style>