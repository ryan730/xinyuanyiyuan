
<template>
 	<dl 
	class="list-cell"
	:key="item.utid"
	v-for="item in listData.list"
	@click="goToContent(item.id, item.product_id)"
	>
		<dt><img :src="item.image" alt=""></dt>
		<dd>
			<strong class="title">{{item.title}}</strong>
			<p class="sub-title">{{item.sub_title}}</p>
			<div class="aside">
				<span class="lab" style="background: #fff">{{item.type}}</span>
				<p class="price-btn">¥{{item.price}}<del>¥{{item.price_show}}</del></p>
			</div>
		</dd>
	</dl>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    goTo(url) {
      window.open(url)
    }
  }
}
</script>

<style lang='less' scoped>
  .my-swipe {
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
