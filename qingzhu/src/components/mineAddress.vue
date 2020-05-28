<template>
  <div>
   <div v-if="item" class="address">
       <p><b>{{item.name}}</b>&nbsp;&nbsp;&nbsp;<b>{{item.phone}}</b></p>
       <p>
           <span>{{item.address}}</span>&nbsp;&nbsp;&nbsp;   
            <span class="moren">{{item.value?"默认收货地址":null}}</span>&nbsp;&nbsp;&nbsp;   
      </p>
       <p>
           <span @click="change(item._id)" class="iconfont icon-xiugai07 cursor"></span>&nbsp;&nbsp;&nbsp;
           <span @click="shan(item._id)" class="iconfont icon-xiugai07 icon-shanchu"></span>
        </p>
   </div>
  </div>
</template>
<script>
import API from '../util/API'
import qs from 'qs'
export default {
props: ["item"],

data(){
return{
    addressJson: null
}
},
methods: {

      change(id){
          this.$axios({
              url:API.addressId,
              params:{
                  _id:id
              }
          }).then(res=>{
              this.addressJson=res.data[0]
             
              console.log(this.addressJson)
              this.$store.dispatch("addressJson",this.addressJson)
               this.$emit("dialog")

              })
          this.$emit("showPicker")
          this.$emit("Update")
      },
      shan(id){
         this.$axios({
             url:API.addressDel,
             params:{
                 _id:id
             }
         }).then(res=>{
            this.$message({
            message: res.data,
            type: "success"
           });
         })
         this.$emit("shan")
      }
},
watch: {},
computed: {
    // ...mapGetters(["address"])
},
mounted(){}
}
</script>
<style scoped>
.address{
    background-color: #eee;
    margin: 10px 0;
}
.moren{
   color:tomato;
}

</style>