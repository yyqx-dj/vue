<template>
  <div class="inner">
    <div class="left">
          <mine-left></mine-left>
    </div>
    <div class="rightMain">
        <div class='rightMainInner'>
            <h2>{{$route.name}}</h2>
           <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
import mineLeft from "../components/mineLeft";
export default {
  components: {
    mineLeft
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
  
  }
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.inner {
  display: flex;
  padding: 50px 10px;
}

.left {
  width: 200px;
}
.right {
  flex: 1
}
h2{
    margin: 10px 0;
}
.rightMainInner{
    width: 900px;
    border: 1px solid #eee
    padding: 20px;
  
}
</style>