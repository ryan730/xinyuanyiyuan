<template>
<div class="banner">
    <div class="swiper-container">
        <swiper :modules="modules" :slides-per-view="1.085" :speed="1200" :loop="true" :space-between="15" :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange" :autoplay="{ delay: 3000, disableOnInteraction: false }">

            <swiper-slide @click="goToContent(item.id, item.product_id,item.title)" v-for="item in listData" :key="item.id">
                <img :src="item.image" alt="" />
            </swiper-slide>
        </swiper>
    </div>
</div>
</template>

<script>
import {
    Autoplay,
    EffectFade,
    Pagination
} from 'swiper';
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';
import {
    type
} from "@/config/type";
import {
    focusList
} from "@/service/recommend";
import {
    useRouter
} from 'vue-router';
import {
    reactive,
    onMounted,
    ref,
    toRefs
} from 'vue';
import {
    useStore
} from 'vuex';
export default {
    name: "banner",
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        info: {

        }
    },
    data() {
        return {};
    },
    computed: {

    },
    mounted() {

    },
    

    setup() {
        const store = useStore();
        const router = useRouter();

        const state = reactive({
            listData: [],
            currentIndex: 15
        })

        const onSwiper = (swiper) => {}
        const onSlideChange = () => {}

        onMounted(async () => {
            const {
                data
            } = await focusList();
            state.listData = data;
        })
        const goToContent = (id, pid,title) => {
            store.commit('addTestId', id);
            store.commit('addProductId', pid);
            if(!title){
                store.commit('addTitle', '脉塔心理');
            }else{
                store.commit('addTitle', title);
            }
            
            router.push({ name: 'content', params: { id, pid } });
        }

        return {
            ...toRefs(state),
            onSwiper,
            onSlideChange,
            goToContent,
            modules: [Autoplay, EffectFade, Pagination],
        }
    }
};
</script>

<style scoped>
@import 'swiper/css';
@import 'swiper/css/autoplay';
@import 'swiper/css/effect-fade';
@import 'swiper/css/pagination';

.banner img {
    margin: 0 auto;
    width: 680px;
}

.banner .swiper-container {
    margin-left: 20px;
    height: 347px;
}
</style>
