<template>
    <div style="background:#fff;">
        <div class="banner">
            <banner />
        </div>
        
        <div class="catalog">
            <h1>精品测试<span>#为你推荐</span></h1>
            <a 
                class="catalogLink"
                v-for="item in listData"
                :key="item.id"
                @click="goToContent(item.id, item.product_id,item.title)"
            >
                <dl>
                    <dt><img :src="item.image" alt=""></dt>
                    <dd>
                        <strong>{{item.title}}</strong>
                        <p>{{item.sub_title}}</p>
                        <div class="lab">{{item.type_text}}</div>
                        <div class="r">
                            <div class="num">{{item.finish_base}}<span>人已测</span></div>
                            <p>¥{{item.price}}<del>¥{{item.price_show}}</del></p>
                        </div>
                    </dd>
                </dl>
            </a>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted, ref, toRefs } from 'vue';
import { getRecommend } from "@/service/recommend";
import { type } from "@/config/type";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import banner from "@/views/reportsComponent/banner.vue"

export default {
    components: {
    
        banner,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const state = reactive({
            listData: [],
            currentIndex: 15
        })

     
        
        onMounted(async () => {
            const { data } = await getRecommend();
            data.forEach((value, key) => {
                value.type = type[value.type];
            });
            state.listData = data;
        })

        const goToContent = (id, pid,title) => {
            store.commit('addTestId', id);
            store.commit('addProductId', pid);
            store.commit('addTitle', title);
            router.push({ name: 'content', params: { id, pid } });
        }

        return {
            ...toRefs(state),
            goToContent
        }
    }
}
</script>
<style scoped>

</style>



