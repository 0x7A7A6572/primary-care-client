<template>
    <div>
<div class="list">
img
</div>
    </div>
</template>

<script>


export default {
    data(){
        return {
            name:'',
        title:'',
        subject:'',
        }
    },
    mounted(){
        this.title=JSON.parse((sessionStorage.getItem('hid'))).title
        this.subject=JSON.parse( sessionStorage.getItem('doctor')).title
        this.name=JSON.parse( sessionStorage.getItem('name'))

    }
}
</script>

<style lang="scss" scoped>

</style>