<template>
    <div id="toastMsg">
        <div class="errMsg">
            {{toastData.msg}}
        </div>
    </div>
</template>
<script>
    export default ({
        props:['toastData'],
        data(){
            return{

            }
        }
    })
</script>
<style lang="scss" scoped type="text/css">
    $fontSize:(375*20)/320;
    #toastMsg{
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        text-align: center;
    }
    .errMsg{
        display: inline-block;
        font-size: 16/$fontSize*1rem;
        margin: 0 auto;
        margin-top: 50%;
        padding:10px 15px;
        border-radius: 5px;
        background: rgba(0,0,0,.5);
        color: #fff;
    }
</style>