<template>
    <div class="cashToPay">
        <div class="pageMain">
            <div class="line clearfix">
                <span class="lineName fl">应收金额</span>
                <span class="money fr">￥{{payMoney}}</span>
            </div>
            <div class="line clearfix">
                <span class="lineName fl mt">收款金额</span>
                <input type="text" v-model="money" class="fr moneyInput" readonly placeholder="请输入收款金额">
            </div>
            <div class="line clearfix">
                <span class="lineName fl">找零</span>
                <span class="money fr">￥{{charge}}</span>
            </div>
        </div>
        <div class="keyBord clearfix">
            <div class="fl clearfix numBord">
                <div class="bord fl" v-for="item in keyBord" @click="bordClick(item)">{{item}}</div>
            </div>
            <div class="fr sideBord">
                <div class="delete" @click="deleteNum">
                    <img src="@/assets/delete.png" alt="">
                </div>
                <div class="receipt" @click="payOrder">收款</div>
            </div>
        </div>
    </div>
</template>
<script>
    import publicFun from '@/js/public.js'
    export default {
        data(){
            return{
                money:'',
                keyBord:['1','2','3','4','5','6','7','8','9','.','0','C'],
                payMoney:0,
                charge:0,
                idtoken: '',
                token: '',
                cid: '',
                tid: '',
                oid:'',
                orderdata:[],
                isPoint:1,
            }
        },
        mounted() {
            var that=this;
            publicFun.titleChange({
                title:'现金支付'
            });
            that.payMoney=that.$route.params.pay_money;
            that.isPoint=that.$route.params.isPoint;
            that.cid=publicFun.fetch('cid');
            that.tid=publicFun.fetch('tid');
            that.idtoken=publicFun.fetch('idtoken');
            that.token=publicFun.fetch('token');
            that.oid=that.$route.params.oid;
            that.getTableDetail();
            document.querySelector('body').setAttribute('style', 'background-color:#ececec');
        },
        methods:{
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
                        that.orderdata=res.data.datas.orderdata;
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            bordClick:function (e) {
                var that=this;
                if(e!='C'){
                    var reg=/^\d+(\.\d{0,2})?$|^\.\d{1,2}$/;
                    var num=that.money+e;
                    if(reg.test(num)){
                        that.money+=e;
                    };
                    if(parseFloat(that.money)>parseFloat(that.payMoney)){
                        that.charge=(parseFloat(that.money)-parseFloat(that.payMoney)).toFixed(2)
                    }
                }else{
                    that.money='';
                    that.charge=0;
                }
            },
            deleteNum:function () {
                var that=this;
                that.money=that.money.substr(0,that.money.length-1);
                if(parseFloat(that.money)>parseFloat(that.payMoney)){
                    that.charge=(parseFloat(that.money)-parseFloat(that.payMoney)).toFixed(2)
                }else{
                    that.charge=0;
                }
            },
            payOrder:function(){
                var that=this;
                if(that.money==''){
                    publicFun.showToast({
                        show:true,
                        msg:'请输入收款金额'
                    });
                    return;
                }else if(parseFloat(that.money)<parseFloat(that.payMoney)){
                    publicFun.showToast({
                        show:true,
                        msg:'收款金额不能小于应收金额'
                    });
                    return;
                }
                console.log(that.orderdata.id)
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.orderdata.id,
                    paytype:'cashToPay',
                    authcode:'',
                    presentno:'',
                    isPoint:that.isPoint,
                };
                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=payOrder',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        publicFun.showToast({
                            show:true,
                            msg:'支付成功'
                        })
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
    .cashToPay{
        padding:0.6rem;
    }
    .pageMain{
        background: #fff;
        border-radius: 5px;
    }
    .lineName{
        color: #333;
        font-size: 0.75rem;
    }
    .money{
        color: #ff5339;
        font-size: 0.75rem;
    }
    .line{
        padding: 1rem 0.6rem;
        border-bottom: 1px solid #efefef;
    }
    .moneyInput{
        width: 9rem;
        font-size: 0.75rem;
        background: #ebebeb;
        line-height: 1.7rem;
        border: none;
        text-align: right;
        padding-right: 10px;
        color: #333;
    }
    .mt{
        margin-top: 0.2rem;
    }
    .keyBord{
        background: #fff;
        position: fixed;
        bottom:0;
        left:0;
        right:0;
        border-top:1px solid #efefef;
    }
    .numBord{
        width: 75%;
    }
    .bord{
        background: #fff;
        font-size: 1.15rem;
        line-height: 2.5rem;
        width: 32.9%;
        text-align: center;
        border-bottom: 1px solid #efefef;
        border-right:1px solid #efefef ;
    }
    .sideBord{
        width: 25%;
    }
    .sideBord div{
        line-height: 5.05rem;
        text-align: center;
    }
    .delete img{
        width:1.25rem;
        height: auto;
    }
    .receipt{
        font-size: 0.95rem;
        color: #fff;
        background: #1393f2;
    }
</style>