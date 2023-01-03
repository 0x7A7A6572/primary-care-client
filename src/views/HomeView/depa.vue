<template>
    <div>
        <div>
            <ul class="ad">
                <li>
                    <img src="../../assets/images/Snipaste_2022-12-28_19-24-28.jpg" alt="">
                    <div>
                        <h3>{{ hid.title }}</h3>
                        <span>{{ hid.grade }}</span>
                        <span v-if="hid.type">{{ hid.type }}</span>
                        <p>地址:{{ hid.address }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="li">
            <ylTitle title="科室列表" theme="left" color="var(--color-second-text)" />
        </div>
        <van-list class="SbjList">
            <van-cell class="sbjlist1 text-large" v-for="item in subjct" :key="item.did" :title="item.title"
                @click="doctor(item)" />
        </van-list>
    </div>
</template>
<script>
import doctor from '@/http/apis/doctor'
export default {
    data() {
        return {
            hid: {},
            list: [],
            subjct: []
        }
    },
    mounted() {
        this.hid = JSON.parse((sessionStorage.getItem('hid')))
        let data = { hid: this.hid.hid }
        doctor.subjct(data).then(res => {
            this.subjct = res.data.result
        })
    },
    methods: {
        doctor(e) {
            sessionStorage.setItem('doctor', JSON.stringify(e))
            this.$router.push(
                {path:'/doctorname',
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.ad {
    background-color: #e1e1e1;
    box-shadow: var(--box-shadow);
    li {
        display: flex;
        margin: 15px;
        background-color: #ffffff;
        >img {
            width: 50px;
            height: 50px;
            margin-top: 20px;
            margin-left: 15px;
        }
        >div {
            margin-left: 10px;

            >span:nth-child(2) {
                background-color: #145d8d;
                border-radius: 10px;
                width: 50px;
                display: inline-block;
                text-align: center;
                color: #ffffff;
                margin-top: 15px;
                margin-bottom: 15px;
            }
            >span:nth-child(3) {
                border: 1px solid #145d8d;
                color: #145d8d;
                margin-left: 10px;
                border-radius: 10px;
                width: 100px;
                text-align: center;
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: -4px;
            }
            p {
                color: #998a8d;
                margin-bottom: 15px;
            }
            >h3 {
                margin-top: 15px;
            }
        }
    }
}

.list {
    display: inline-block;
    color: #998a8d;
    margin-top: 2px;
    width: 100px;
}

.li {
    display: flex;
    margin-left: 10px;
    margin-top: 40px;
}

.SbjList {
    margin-top: 20px;

    >.sbjlist1 {
        border-bottom: 1px solid var(--color-second-text);
        width: 350px;
        margin: 10px auto;
        box-shadow: var(--box-shadow);
        border-radius: 10px;
    }
}
</style>