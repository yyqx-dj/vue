<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="商品">
       <mine-collection></mine-collection>
      </el-tab-pane>
      <el-tab-pane label="文章">
         <div v-if="collection.length!==0">
          <div class="item" v-for="item in collection" :key="item.id">
            <img :src="item.img" alt />
            <span @click="toArticleDetail(item.id)">{{item.title}}</span>
            <!-- <span class="iconfont icon-shanchu" @click="del(item.id)"></span> -->
            <el-tooltip content="取消收藏" placement="top">
              <el-button class="iconfont icon-shanchu" @click="del(item.id)"></el-button>
            </el-tooltip>
          </div>
        </div>
        <mine-collection v-else></mine-collection>
        
      </el-tab-pane>
      <el-tab-pane label="专题">
        <mine-collection></mine-collection>
      </el-tab-pane>
      <el-tab-pane label="图集">
        <mine-collection></mine-collection>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mineCollection from "../../components/mineCollection";
import { mapGetters } from "vuex";

export default {
  props: [],
  components: {
    mineCollection
  },
  data() {
    return {};
  },
  methods: {
    toArticleDetail(id){
      console.log("123")
      console.log(id)
      this.$router.push("/articleDetail?id="+id)
        },
    del(id) {
      this.$store.dispatch("dele", id);
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["collection"])
  },
  mounted() {
    console.log(this.collection);
  }
};
</script>
<style scoped>
img {
  width: 100px;
  vertical-align: middle;
}
.item {
  margin-bottom: 10px;
  position: relative;
}
.iconfont {
  position: absolute;
  right: 20px;
  top: 30%;
}
img{
  width: 100px;
  height: 80px;
}
</style>