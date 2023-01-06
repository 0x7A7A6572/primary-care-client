<template>
    <div style="padding: var(--padding-base);background:linear-gradient(150deg,var(--color-secondary),var(--color-box-bg)) ;height: 100vh;">
        <div class="passed">
            <van-icon  class-prefix="yl-icon" name="success"  size="23"/>
            <span class="span">预约成功</span>
        </div>
        <div class="result">

        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.passed{
    color: var(  --color-light-text);
    width: 30vw;
    margin: 10px auto;
    .span{
        margin-left: 10px;
        font-weight: bold;
        font-size: 20px;
        display: inline-block;
        margin-top: 10px;

    }
}
.result{
    background-color: var( --color-box-bg);
    width: 94vw;
    height: 100vh;
    margin-top: 26px;
}

</style>