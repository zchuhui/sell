<template>
  <div >
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
import Header from './components/header/Header.vue'

// 数据是否正确
const ERR_OK = 0;

export default {
  data(){
    return {
      seller:{}
    }
  },
  created(){
    this.$http.get('/api/seller').then((response) => {

      response = response.body

      if (response.result === ERR_OK) {
          this.seller = response.data
          console.log(this.seller.data);
      }
      else{
        console.log("xx");
      }
    })
  },
  components: {
    'v-header':Header
  }
}
</script>

<style lang='stylus'  rel="stylesheet/stylus">
@import './common/styles/mixin.styl'

.tab
  display: flex;
  width:100%;
  height:40px;
  line-height: 40px;
  border-1px(red);

  .tab-item
    flex: 1;
    text-align: center;

    a
      display: block;

    .active
       color:red;

</style>
