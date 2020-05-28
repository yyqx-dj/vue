<template>
  <div class="inner">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>所有文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h2>所有文章</h2>
    <article-item v-for="item in article" :key="item.id" :item="item"></article-item>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import articleItem from "../components/articleItem";
export default {
  components: {
    articleItem
  },
  mounted() {
    this.$store.dispatch("addArticle");
  },
  computed: {
    ...mapGetters(["article"])
  }
   
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.nav {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
</style>