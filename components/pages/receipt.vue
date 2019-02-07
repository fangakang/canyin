<template>
    <div class="receiptPage">
        <div class="personMsg clearfix" v-if="appmember">
            <div class="fl headImg">
                <img :src="appmember.head_img" alt="">
            </div>
            <div class="nameNum fl">
                <p class="memberName">{{appmember.nickname}}</p>
                <p class="memberNum">{{appmember.card_no}}</p>
            </div>
        </div>
        <div class="receiptHead section">
            <p class="sectionTitle">还需收款（元）</p>
            <div class="payPrice clearfix">
                <span class="fl money">￥{{pprice}}</span>
                <span class="fr changeMoney" @click="changeMoney">改价</span>
            </div>
            <div class="moneyType">
                <div class="moneyLine clearfix">
                    <span class="fl shouldPay">应收</span>
                    <span class="fr shouldPayMoney" v-if="hadPay==0">￥{{shouldPay}}</span>
                    <span class="fr shouldPayMoney" v-if="hadPay>0">￥{{remainToPay}}</span>
                </div>
                <div class="moneyLine clearfix">
                    <span class="fl">消费金额</span>
                    <span class="fr costMoney">￥{{pprice}}</span>
                </div>
                <div class="moneyLine clearfix">
                    <span class="fl">优惠金额</span>
                    <span class="fr" v-if="hadPay==0">-￥{{yhPrice}}</span>
                    <span class="fr" v-if="hadPay>0">-￥{{addYh}}</span>
                </div>
                <div class="moneyLine clearfix">
                    <span class="fl">不参与优惠金额</span>
                    <span class="fr">￥{{noreduceMoneynotpay}}</span>
                </div>
            </div>
        </div>
        <div class="reduceDetail section">
            <p class="sectionTitle">优惠明细</p>
            <ul class="reduceList clearfix">
                <li class="fl clearfix" >
                    <img class="fl disLogo" src="@/assets/vip.png" alt="">
                    <div class="reduceType fl">
                        <p class="reduceName">菜品优惠</p>
                        <p class="reduceMoney">￥{{minusListnopay.caiYHprice}}</p>
                    </div>
                    <div class="reduceSelect selected"></div>
                </li>
                <li class="fl clearfix" v-if="minusListnopay.freePrice">
                    <img class="fl disLogo" src="@/assets/vip.png" alt="">
                    <div class="reduceType fl">
                        <p class="reduceName">赠菜优惠</p>
                        <p class="reduceMoney">￥{{minusListnopay.freePrice}}</p>
                    </div>
                    <div class="reduceSelect selected"></div>
                </li>
                <li class="fl clearfix" @click="memberDiscount" :class="noReduce||!discountData.discountMon?'canNot':''">
                    <img class="fl disLogo" src="@/assets/vip.png" alt="">
                    <div class="reduceType fl">
                        <p class="reduceName">会员折扣</p>
                        <p class="reduceMoney" v-if="!noReduce&&discountData.discountMon">￥{{discountData.discountMon}}</p>
                    </div>
                    <div class="reduceSelect" :class="!noReduce&&discountData.discountMon?'selected':''"></div>
                    <div class="discountMask" v-if="noReduce||!discountData.discountMon">
                        <img src="../../assets/canNot.png" alt="">
                    </div>
                </li>
                <li class="fl clearfix" @click="saveDiscount"   :class="noReduce||!discountData.drawcount?'canNot':''">
                    <img class="fl disLogo" src="@/assets/vip.png" alt="">
                    <div class="reduceType fl">
                        <p class="reduceName">储值折扣</p>
                        <p class="reduceMoney" v-if="!noReduce&&discountData.drawcount">￥{{discountData.drawcountMoney}}</p>
                    </div>
                    <div class="reduceSelect" :class="!noReduce&&discountData.drawcount?'selected':''"></div>
                    <div class="discountMask" v-if="noReduce||!discountData.drawcount">
                        <img src="../../assets/canNot.png" alt="">
                    </div>
                </li>
                <li class="fl clearfix" @click="randomReduce" :class="noReduce||!discountData.isPayReduce?'canNot':''">
                    <img class="fl disLogo" src="@/assets/reduce.png" alt="">
                    <div class="reduceType fl">
                        <p class="reduceName">随机立减</p>
                        <p class="reduceMoney" v-if="!noReduce&&discountData.isPayReduce">-￥{{discountData.payReduceMoney}}元</p>
                    </div>
                    <div class="reduceSelect" :class="!noReduce&&discountData.isPayReduce?'selected':''"></div>
                    <div class="discountMask" v-if="noReduce||!discountData.isPayReduce">
                        <img src="../../assets/canNot.png" alt="">
                    </div>
                </li>
                <li class="fl clearfix" @click="pointDiscount" :class="noReduce||!discountData.is_can_bonus?'canNot':''">
                    <img class="fl disLogo" src="@/assets/point.png" alt="">
                    <div class="reduceType fl">
                        <p class="reduceName" :class="!vipPoint?'mt':''">积分抵扣</p>
                        <p class="reduceMoney" v-if="vipPoint">{{discountData.pointNum}}积分减{{discountData.pointMoney}}元</p>
                    </div>
                    <div class="reduceSelect" :class="vipPoint?'selected':''"></div>
                    <div class="discountMask" v-if="noReduce||!discountData.is_can_bonus">
                        <img src="../../assets/canNot.png" alt="">
                    </div>
                </li>
                <li class="fl clearfix" @click="selectCoupon" :class="noReduce||discountData.can_use_coupon==0?'canNot':''">
                    <img class="fl disLogo" src="@/assets/voucher.png" alt="">
                    <div class="reduceType fl">
                        <p class="reduceName" :class="!couponFlag?'mt':''">优惠券</p>
                        <p class="reduceName" v-if="couponFlag">优惠{{discountData.reduce_cost}}元</p>
                    </div>
                    <div class="reduceSelect" :class="couponFlag?'selected':''">

                    </div>
                    <div class="discountMask" v-if="noReduce||discountData.can_use_coupon==0">
                        <img src="../../assets/canNot.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
        <div class="payWay section">
            <p class="sectionTitle">收款方式</p>
            <ul class="payList">
                <li class="clearfix" v-for="(item,index) in payTypeData" @click="selectPayWay(index)">
                    <img class="fl" v-if="item.type=='sweepCodeToPay'" src="@/assets/alipay.png" alt="">
                    <img class="fl" v-if="item.type=='cashToPay'" src="@/assets/cash.png" alt="">
                    <img class="fl" v-if="item.type=='balanceToPay'" src="@/assets/balance.png" alt="">
                    <img class="fl" v-if="item.type=='presentToPay'" src="@/assets/giftCard.png" alt="">
                    <img class="fl" v-if="item.type=='UnionToPay'" src="@/assets/pos.png" alt="">
                    <span class="fl">{{item.payName}}</span>
                    <div class="selectPay  fr" :class="index==payIndex?'selected':''"></div>
                </li>
            </ul>
        </div>
        <div class="foot" @click="receipt(paytype)">结&nbsp;账</div>
        <div class="mask" v-if="memberMask">
            <div class="maskContent">
                <div class="maskTitle">
                    查找会员
                    <p class="subTitle">请输入手机号、会员卡号或是扫码录入会员</p>
                    <span class="close" @click="maskHide">×</span>
                </div>
                <div class="maskMain">
                    <input type="text" placeholder="请输入会员号或手机号" class="maskInput" v-model="memberNumber">
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="vipMemberLogin">确定</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="changeMask">
            <div class="maskContent">
                <div class="maskTitle">
                    改价
                    <span class="close" @click="maskHide">×</span>
                </div>
                <div class="maskMain">
                    <input type="text" placeholder="请输入改价金额" v-on:input="changePrice" v-model="preduce" class="maskInput">
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="mlPreduce">确定</div>
                </div>
            </div>
        </div>
        <div v-if="couponMask" class="mask couponMask">
            <div class="maskContent">
                <div class="maskTitle">优惠券</div>
                <div class="maskMain roomMain">
                    <div class="couponLine clearfix" v-for="(item,index) in couponList" @click="coupon(index)">
                        <div class="couponName fl">{{item.title}}</div>
                        <div  class="selectCircle fr" :class="couponIndex==index?'selected':''">

                        </div>
                    </div>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="couponSure">确定</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="presentMask">
            <div class="maskContent">
                <div class="maskTitle">
                    礼品卡支付
                    <span class="close" @click="maskHide">×</span>
                </div>
                <div class="maskMain">
                    <p class="maskNotice">需支付<span v-if="hadPay==0">￥{{shouldPay}}</span><span v-if="hadPay>0">￥{{remainToPay}}</span></p>
                    <input type="text" placeholder="请输入礼品卡卡号" v-model="presentno" class="maskInput">
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="payOrder">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import publicFun from '@/js/public.js'
    export default {
        data(){
            return{
                couponMask:false,
                memberMask:false,
                changeMask:false,
                presentMask:false,
                cid: 106,
                tid: 286,
                oid: 3954,
                idtoken:'',
                token: 'enspyv1506341661',
                couponId:'',
                orderdata:{},
                pprice:'',
                isPoint:1,
                paytype:'cashToPay',
                payName:'现金支付',
                payTypeData:[],
                payIndex:0,
                discountData:{},
                couponList:[],
                minusList:{},
                minusListnopay:{},
                memberNumber:'',
                appmember:false,
                preduce:'',
                vipPoint:false,
                couponFlag:false,
                couponIndex:'a',
                noreduceMoney:0,
                yhPrice:0,
                noreduceMoneynotpay:0,
                noReduce:false,
                shouldPay:0,//未支付
                remainToPay:0,//已支付加菜
                hadPay:0,// 0：已支付过无加菜   大于0：支付过后加菜
                addYh:0,//支付后加菜优惠
                authcode:'',
                presentno:''
            }
        },
        mounted(){
            publicFun.titleChange({
                title:'收款'
            });
            var that=this;
            that.cid=publicFun.fetch('cid');
            that.tid=publicFun.fetch('tid');
            that.idtoken=publicFun.fetch('idtoken');
            that.oid=that.$route.params.oid;
            that.getTableDetail();
            document.querySelector('body').setAttribute('style', 'background-color:#ececec');
        },
        methods:{
            randomReduce:function () {
                var that=this;
                if(that.noReduce||!that.discountData.isPayReduce){
                    publicFun.showToast({
                        show:true,
                        msg:that.payName+'方式下，随机立减暂不可用'
                    });
                    return;
                }
            },
            saveDiscount:function () {
                var that=this;
                if(that.noReduce||!that.discountData.drawcount){
                    publicFun.showToast({
                        show:true,
                        msg:that.payName+'方式下，储值折扣暂不可用'
                    });
                    return;
                }
            },
            memberDiscount:function () {
                var that=this;
                if(that.noReduce||!that.discountData.discountMon){
                    publicFun.showToast({
                        show:true,
                        msg:that.payName+'方式下，会员折扣暂不可用'
                    });
                    return;
                }
            },
            maskHide:function(){
                var that=this;
                that.memberMask=false;
                that.changeMask=false;
                that.couponMask=false;
                that.presentMask=false;
                that.presentno='';
            },
            changeMoney:function () {
                var that=this;
                that.changeMask=true;
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
                        that.formerData=res.data.datas;
                        that.noreduceMoney=res.data.datas.noreduceMoney;
                        that.noreduceMoneynotpay=res.data.datas.noreduceMoneynotpay;
                        that.minusList=res.data.datas.orderdata.minusList;
                        that.minusListnopay=res.data.datas.orderdata.minusListnopay;
                        that.orderdata=res.data.datas.orderdata;
                        if(res.data.datas.orderdata.appmember!=null){
                            that.appmember=res.data.datas.orderdata.appmember;
                            if(that.appmember.points==''||that.appmember.points==0){
                                that.isPoint=0;
                            }
                        }
                        var pprice=0;
                        for(var i=0;i<res.data.datas.orderdata.dishLish.length;i++){
                            if(res.data.datas.orderdata.dishLish[i].paid!=1){
                                pprice+=parseFloat(res.data.datas.orderdata.dishLish[i].price)*(res.data.datas.orderdata.dishLish[i].num-res.data.datas.orderdata.dishLish[i].offnum)
                            }else{
                                that.hadPay++
                            }
                        }

                        var yhPrice=0,
                            addYh=0;
                        for(var key in that.orderdata.minusListnopay){
                            yhPrice+=parseFloat(that.orderdata.minusListnopay[key]);
                            addYh+=parseFloat(that.orderdata.minusListnopay[key]);
                        }
                        that.yhPrice=yhPrice.toFixed(2);
                        that.addYh=yhPrice.toFixed(2);
                        that.pprice=pprice.toFixed(2);
                        that.shouldPay=(that.pprice-that.yhPrice).toFixed(2);
                        that.remainToPay=(that.pprice-that.addYh).toFixed(2)>0?(that.pprice-that.addYh).toFixed(2):0;
                        that.getPayType();
                        that.marketingDiscount();
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            getPayType:function(){
                var that=this;
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                }

                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=getPayType',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        that.payTypeData=res.data.datas
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            marketingDiscount:function(){
                var that=this;
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.orderdata.id,
                    couponId:that.couponId,
                    pprice:that.shouldPay,
                    isPoint:that.isPoint,
                    paytype:that.paytype
                }
                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=marketingDiscount',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        that.discountData=res.data.datas;
                        that.couponList=res.data.couponList;
                        if(res.data.msg=='没有优惠'){
                            that.noReduce=true;
                        }else{
                            that.noReduce=false;
                        }
                        if(res.data.datas.pay_money){
                            that.shouldPay=parseFloat(res.data.datas.pay_money).toFixed(2);
                            var remainToPay=parseFloat(res.data.datas.pay_money).toFixed(2);
                            that.$forceUpdate();
                            that.$set(that,'remainToPay',remainToPay)
                            that.$set(that,'addYh',(parseFloat(that.pprice)-parseFloat(res.data.datas.pay_money)).toFixed(2));
                        }else{
                            that.shouldPay=parseFloat(res.data.noreduceMoney).toFixed(2)
                        }
                        that.yhPrice=(that.pprice-that.shouldPay).toFixed(2);
                        if(res.data.datas.couponId){
                            that.couponFlag=true;
                            that.couponMask=false;
                        };
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            vipMemberLogin:function(){
                var that=this;
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid:that.orderdata.id,
                    memberNumber:that.memberNumber,
                }
                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=vipMemberLogin',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                       that.memberMask=false;
                       that.member=true;
                       that.getTableDetail();
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            selectPayWay:function (index) {
                var that=this;
                if(that.hadPay>0&&that.remainToPay==0&&that.payTypeData[index].type!='cashToPay'){
                    publicFun.showToast({
                        show:true,
                        msg:'支付金额为0时，只能选择现金支付',
                    });
                    return;
                };
                if(that.hadPay==0&&this.shouldPay==0&&that.payTypeData[index].type!='cashToPay'){
                    publicFun.showToast({
                        show:true,
                        msg:'支付金额为0时，只能选择现金支付',
                    });
                    return;
                }
                that.payIndex=index;
                that.paytype=that.payTypeData[index].type;
                that.payName=that.payTypeData[index].payName;
                that.isPoint=0;
                that.authcode='';
                that.presentno='';
                if(that.payTypeData[index].type=="balanceToPay"&&!that.appmember){
                    that.memberMask=true;
                }
            },
            changePrice:function (e) {
                var that=this;
                console.log(e);
                if(parseFloat(that.preduce)>parseFloat(that.discountData.pay_money)){
                    publicFun.showToast({
                        show:true,
                        msg:'改价金额不能大于应付金额',
                    });
                    var str=that.preduce.toString();
                    that.preduce=str.substr(0,str.length-1)
                    return;
                }else if(parseFloat(that.preduce)>parseFloat(that.pprice)){
                    publicFun.showToast({
                        show:true,
                        msg:'改价金额不能大于消费金额',

                    });
                    var str=that.preduce.toString();
                    that.preduce=str.substr(0,str.length-1)
                    return;
                }
            },
            mlPreduce:function () {
                var that=this;
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid:that.orderdata.id,
                    preduce:that.preduce
                };
                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=mLpreduce',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        that.getTableDetail();
                        that.changeMask=false;
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            pointDiscount:function(){
                var that=this;
                if(that.noReduce||!that.discountData.is_can_bonus){
                    publicFun.showToast({
                        show:true,
                        msg:that.payName+'方式下，积分抵扣暂不可用',
                    });
                    return;
                }
                if(that.vipPoint==false){
                    if(parseFloat(that.appmember.points)<parseFloat(that.discountData.pointNum)){
                        publicFun.showToast({
                            show:true,
                            msg:'积分不足',
                        });
                    }else{
                        that.vipPoint=true;
                        that.isPoint=1;
                        that.marketingDiscount();
                    }
                }else {
                    that.vipPoint=false;
                    that.isPoint=0;
                    that.marketingDiscount();
                }
            },
            selectCoupon:function(){
                var that=this;
                if(that.noReduce||that.discountData.can_use_coupon==0){
                    publicFun.showToast({
                        show:true,
                        msg:that.payName+'方式下，优惠券暂不可用'
                    });
                    return;
                }
                that.couponMask=true
            },
            coupon:function(index){
                var that=this;
                that.couponIndex=index;
                that.couponId=that.couponList[index].couponId;
            },
            couponSure:function () {
                var that=this;
                if(that.couponId==''){
                    publicFun.showToast({
                        show:true,
                        msg:'请先选择优惠券'
                    })
                }else{
                    that.getTableDetail();
                }
            },
            receipt:function(type){
                console.log(type)
                var that=this;
                if(type==''){
                    publicFun.showToast({
                        show:true,
                        msg:'请选择支付方式'
                    })
                }else if(type=='cashToPay'){//现金支付
                    var money=0;
                    if(that.hadPay>0){
                        money=that.remainToPay
                    }else{
                        money=that.shouldPay
                    }
                    that.$router.push({
                        name:'cash',
                        params:{
                            pay_money:money,
                            isPoint:that.isPoint
                        }
                    })
                }else if(type=="UnionToPay"){//POS机支付
                        that.payOrder()
                }else if(type=='presentToPay'){//礼品卡支付
                    that.presentMask=true;
                }
            },
            payOrder:function(){
                var that=this;
                if(that.presentno==''&&that.paytype=='presentToPay'){
                    publicFun.showToast({
                        show:true,
                        msg:'请输入礼品卡卡号'
                    });
                    return;
                }
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.orderdata.id,
                    paytype:that.paytype,
                    authcode:that.authcode,
                    presentno:that.presentno,
                    isPoint:that.isPoint,
                };
                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=payOrder',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        publicFun.showToast({
                            show:true,
                            msg:'支付成功'
                        });
                        that.presentMask=false;
                        that.$router.replace('/main')
                    }
                }).catch(function(err){
                    console.log(err);
                });
            },
        }
    }
</script>
<style scoped>
    .canNot .reduceName{
        margin-top: 0.4rem;
    }
    .maskNotice{
        text-align: left;
        margin-bottom: 5px;
    }
    .maskNotice span{
        color: #f00;
        font-size: 0.75rem;
    }
    .reduceType .mt{
        margin-top: 0.3rem;
    }
    .personMsg{
        background: #fff;
        padding: 0.625rem;
        margin-bottom: 0.5rem;
    }
    .headImg,.headImg img{
        width: 2.5rem;
        height:2.5rem;
        border-radius: 50%;
        border:1px solid #ddd;
    }
    .nameNum{
        font-size: 0.7rem;
        text-align: left;
        margin-top: 0.25rem;
        margin-left: 0.5rem;
        line-height: 1rem;
    }
    .receiptPage{
        background: #efefef;
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
        border-radius: 5px;
        display: inline-block;
        margin: 0 auto;
        margin-top: 5rem;

    }
    .couponMask .maskMain{
        height: 10.75rem;
        overflow-y: scroll;
        padding:0 0.75rem;
        position: relative;
        width: 11.5rem;
        margin: 0;
    }
    .couponMask .maskTitle{
        font-size: 0.8rem;
        color: #1393f2;
        line-height: 2.45rem;
        border-bottom: 1px solid #1393f2;
        padding-top: 0;
    }
    .couponLine{
        width: 11.5rem;
        line-height: 2rem;
    }
    .couponName{
        font-size: 0.7rem;
        color:#333;
    }
    .selectCircle{
        width: 1rem;
        height:1rem;
        border-radius: 50%;
        border:1px solid #ddd ;
        margin-top: 0.5rem;
    }
    .selectCircle.selected{
        background-image: url('../../assets/selected.png');
        background-size: cover;
        border-color:#1393f2;
    }
    .maskMain{
        margin: 1rem 0;
        padding: 0 0.75rem;
    }
    .maskTitle{
        font-size: 0.8rem;
        color: #333;
        position: relative;
        padding-top: 1rem;
    }
    .close{
        font-size: 1.2rem;
        position: absolute;
        top:0;
        right:0.1rem;
        width: 1rem;
        height:1rem;
        color: #bbb;
    }
    .maskTitle .subTitle{
        font-size: 0.55rem;
        color: #333;
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
        width: 12rem;
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
    .receiptPage{
        padding-bottom: 2.25rem;
    }
    .section{
        padding:0 0.625rem;
        background: #fff;
        margin-bottom: 0.5rem;
        padding-bottom: 1rem;
    }
    .sectionTitle{
        color: #999;
        font-size: 0.65rem;
        line-height: 2.25rem;
    }
    .money{
        font-size: 1.5rem;
        color: #ff5339;
    }
    .changeMoney{
        font-size: 0.6rem;
        background: #1393f2;
        color: #fff;
        line-height: 1.25rem;
        width: 3.5rem;
        text-align: center;
        border-radius: 5px;
        margin-top: 0.4rem;
    }
    .moneyType{
        background: #f2f7f8;
        font-size: 0.6rem;
        color: #666;
        padding:0.25rem 0.5rem;
        line-height: 1.25rem;
        margin-top: 0.75rem;
    }
    .moneyType .shouldPay{
        font-size: 0.7rem;
        color: #333;
    }
    .moneyType .shouldPayMoney{
        font-size: 0.7rem;
        color: #ff5339;
    }
    .moneyType .costMoney{
        color: #999;
    }
    .receiptPage .reduceDetail{
        padding-bottom: 0.5rem;
    }
    .reduceList li{
        width: 41%;
        border: 1px solid #efefef;
        padding: 0.5rem;
        position: relative;
        margin-bottom: 0.5rem;
        height:1.7rem;
    }
    .discountMask{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        background: rgba(0,0,0,.5);
    }
    .reduceList .discountMask img{
        width:2rem;
        height:2rem;
        margin-top: 0.3rem;
    }
    .reduceList li:nth-child(2n+1){
        margin-right: 0.45rem;
    }
    .reduceList li .disLogo{
        width: 0.8rem;
        height:0.8rem;
        margin-top: 0.4rem;
        margin-right: 0.3rem;
    }
    .reduceList .reduceName{
        font-size: 0.6rem;
        color: #333;
        text-align: left;
    }
    .reduceList .reduceMoney{
        font-size: 0.5rem;
        color: #ff5339;
        text-align: left;
    }
    .reduceSelect{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        border: 1px solid #ddd;
        margin-top: 0.4rem;
        position:absolute;
        right:0.2rem;
    }
    .reduceSelect.selected{
        border-color: #1393f2;
        background: url('../../assets/selected.png');
        background-size: 0.7rem 0.7rem;
    }
    .receiptPage .payWay{
        padding-right:0;
        padding-bottom: 0;
    }
    .selectPay{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 1px solid #ddd;
        margin-right: 0.625rem;
    }
    .selectPay.selected{
        border-color: #1393f2;
        background: url('../../assets/selected.png');
        background-size: 1rem 1rem;
    }
    .payList{
        font-size: 0.75rem;
        color: #333;
    }
    .payList li{
        width: 100%;
        border-top:1px solid #efefef;
        padding: 0.5rem 0 0.4rem 0;
    }
    .payList img{
        width: 0.85rem;
        height:0.85rem;
        margin-right: 0.75rem;
        margin-top: 0.1rem;
    }
    .foot{
        position: fixed;
        bottom:0;
        left:0;
        right:0;
        background: #1393f2;
        color: #fff;
        font-size: 0.8rem;
        line-height: 2.25rem;
        text-align: center;
    }
</style>