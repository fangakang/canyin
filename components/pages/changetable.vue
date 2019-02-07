<template>
    <div class="changeTable">
        <div class="currentTable">
            <div class="label clearfix">
                <span class="labelName fl">房间</span>
                <span class="labelRight fr">{{formerData.classify}}</span>
            </div>
            <div class="label clearfix">
                <span class="labelName fl">桌位</span>
                <span class="labelRight fr">{{formerData.t_name}}</span>
            </div>
            <div class="label clearfix">
                <span class="labelName fl">客人数</span>
                <span class="labelRight fr">{{formerData.pnum}}</span>
            </div>
        </div>
        <div class="changeTo">
            <div class="title">更换至</div>
            <div class="targetTable">
                <div class="targetLine clearfix">
                    <div class="fl lineName">房间</div>
                    <div class="fl lineRight" @click="roomMaskShow">
                        <span class="notice" v-if="!targetRoom">请选择房间</span>
                        <span v-if="targetRoom">{{targetRoom}}</span>
                        <img class="fr" src="@/assets/down.png" alt="">
                    </div>
                </div>
                <div class="targetLine clearfix">
                    <div class="fl lineName">桌位</div>
                    <div class="fl lineRight" @click="getTableList">
                        <span class="notice" v-if="!targetTable">请选择桌位</span>
                        <span v-if="targetTable">{{targetTable}}</span>
                        <img class="fr" src="@/assets/down.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="sure" @click="change1Table">确定</div>
        <div v-if="roomMask" class="mask">
            <div class="maskContent">
                <div class="maskTitle">房间</div>
                <div class="maskMain roomMain">
                    <div class="roomLine clearfix" v-for="(item,index) in roomList">
                        <div class="roomName fl">{{item}}</div>
                        <div @click="selectRoom(index)" class="selectCircle fr" :class="index===roomIndex?'selected':''">

                        </div>
                    </div>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="roomSure">确定</div>
                </div>
            </div>
        </div>
        <div v-show="tableMask" class="mask">
            <div class="maskContent">
                <div class="maskTitle">桌位</div>
                <div class="maskMain" id="tableMain">
                    <scroller :on-infinite="infinite" ref="myscroller">
                        <div class="roomLine clearfix" v-for="(item,index) in tableList">
                            <div class="roomName fl">{{item.name}}</div>
                            <div @click="selectTable(index)" class="selectCircle fr" :class="index===tableIndex?'selected':''">

                            </div>
                        </div>
                    </scroller>
                </div>
                <div class="maskFoot">
                    <div class="cancel" @click="maskHide">取消</div>
                    <div class="maskSure" @click="tableSure">确定</div>
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
                roomMask:false,
                tableMask:false,
                cid: 106,
                tid: 281,
                oid: 3787,
                idtoken:'',
                token: 'enspyv1506341661',
                formerData:{},
                roomList:[],
                targetRoom:'',
                roomIndex:'a',
                tableList:[],
                scrollOutHeight:0,
                scrollHeight:0,
                scrollTop:0,
                pg:1,
                targetTable:'',
                tableIndex:'a',
                totid:0,

            }
        },
        mounted:function(){
            publicFun.titleChange({
                title:'换台'
            });
            var that=this;
            that.cid=publicFun.fetch('cid');
            that.tid=publicFun.fetch('tid');
            that.idtoken=publicFun.fetch('idtoken');
            that.token=publicFun.fetch('token');
            that.oid=that.$route.query.oid;
            that.getTableDetail()
        },
        methods:{
            roomMaskShow:function () {
                var that=this;
                that.roomMask=!that.roomMask;
                that.getTableClassify();
            },
            tableMaskShow:function(){
                var that=this;
                that.tableMask=!that.tableMask
            },
            maskHide:function () {
                var that=this;
                that.roomMask=false;
                that.tableMask=false;
//                that.roomIndex='a';
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
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            getTableClassify:function(){
                var that=this;
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.oid,
                }

                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=getTableClassify',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        that.roomList=res.data.datas;
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            selectRoom:function (index) {
                this.roomIndex=index;
            },
            roomSure:function(){
                var that=this;
                that.targetRoom=that.roomIndex!='a'?that.roomList[that.roomIndex]:'';
                that.roomMask=false;
                that.targetTable='';
                that.tableIndex='a';
                that.tableList=[];
            },
            getTableList:function(){
                var that=this;
                that.tableList=[];
                that.pg=1;
                if(!that.targetRoom){
                    publicFun.showToast({
                        show:true,
                        msg:'请先选择房间'
                    })
                    return;
                }
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
                    oid: that.oid,
                    tstatus:1,
                    classify:that.targetRoom,
                    search:'',
                    pg:that.pg
                }

                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=tableList',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        that.tableList=that.tableList.concat(res.data.datas.tlist);
                        that.tableMask=true;
                    }

                }).catch(function(err){
                    console.log(err);
                });
            },
            infinite:function () {
                var that=this;
                that.pg+=1;
                that.getTableList()
            },
            selectTable:function(index){
                this.tableIndex=index;
            },
            tableSure:function () {
                var that=this;
                that.targetTable=that.tableIndex!='a'?that.tableList[that.tableIndex].name:'';
                that.totid=that.tableList[that.tableIndex].id
                that.tableMask=false;
            },
            change1Table:function(){
                var that=this;
                if(!that.targetRoom||!that.targetTable){
                    publicFun.showToast({
                        show:true,
                        msg:'请先选择房间和桌位'
                    });
                    return;
                }
                var data={
                    idtoken: that.idtoken,
                    token: that.token,
                    cid: that.cid,
                    tid: that.tid,
//                    oid: that.tableList[that.tableIndex].oid,
                    oid: that.formerData.mainoid,
                    totid:that.tableList[that.tableIndex].id
                }

                that.$http.get('https://np.pigcms.com/wx/index.php?g=Home&m=repastPcApi&a=change1Table',{params:data}).then(function(res){
                    console.log(res)
                    if(res.data.error==0){
                        publicFun.save('tid',that.tableList[that.tableIndex].id);
                        that.tid=res.newtid;
                        that.$router.go(-1);
                    }else{
                        publicFun.showToast({
                            show:true,
                            msg:res.data.msg
                        })
                    }

                }).catch(function(err){
                    console.log(err);
                });
            }

        }
    }
</script>
<style scoped>
    .lineRight .notice{
        color: #999;
    }
    .changeTable{
        padding: 0.5rem;
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
    .currentTable{
        background: #fff;
        border-radius: 5px;
        font-size: 0.75rem;
        padding: 0 0.6rem;
        line-height: 2.5rem;
    }
    .currentTable .label{
        border-bottom: 1px solid #efefef;
    }
    .currentTable .label:last-child{
        border: none;
    }
    .currentTable .labelName{
        color: #333;
    }
    .currentTable .labelRight{
        color: #1393f2;
    }
    .title{
        font-size: 0.65rem;
        color: #999;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
    }
    .targetTable{
        background: #fff;
        border-radius: 5px;
        font-size: 0.75rem;
        padding: 0 0.6rem;
        line-height: 2.5rem;
    }
    .targetTable .targetLine:first-child{
        border-bottom: 1px solid #efefef;
    }
    .targetTable .lineName{
        color: #999;
        width: 20%;
    }
    .targetTable .lineRight{
        width: 80%;
        color: #333;
    }
    .lineRight img{
        margin-top: 1rem;
        width: 0.6rem;
    }
    .sure{
        width: 100%;
        background: #1393f2;
        color: #fff;
        border-radius: 5px;
        text-align: center;
        font-size: 0.75rem;
        line-height: 2.25rem;
        margin-top: 2.5rem;
    }
    .maskContent{
        background: #fff;
        border-radius: 5px;
        display: inline-block;
        margin: 0 auto;
        margin-top: 6rem;
    }
    .maskTitle{
        font-size: 0.8rem;
        color: #1393f2;
        line-height: 2.45rem;
        border-bottom: 1px solid #1393f2;
    }
    .maskMain{
        height: 10.75rem;
        overflow-y: scroll;
        padding:0 0.75rem;
        position: relative;
        width: 11.5rem;
    }
    #tableMain>div{
        padding:0 0.75rem;
    }
    .roomLine{
        width: 11.5rem;
        line-height: 2rem;
    }
    .roomName{
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
</style>