<template>
  <div>
    <div  v-if="address.length>0">
    <el-button type="primary" @click="showPicker">+新增收货地址</el-button>
    <mine-address v-for="item in address" :key="item._id" :item="item" 
     :isShow="isShow" :isUpdate="isUpdate" @showPicker="showPicker" 
     @Update="Update" @dialog="dialog" @shan="search"></mine-address>
    </div>
    
    <div data-v-a9859a0c class="s-empty-pc" v-else>
      <span data-v-a9859a0c class="s-icon-size-pc">
        <i class="el-icon-map-location"></i>
      </span>
      您还没有添加收货地址
      <div class="button">
        <el-button type="primary" @click="showPicker">+新增收货地址</el-button>
      </div>
    </div>
    <address-picker ref="addressPickerChild" :isShow="isShow" :isUpdate="isUpdate" 
     @hidePicker="hidePicker" @search="search" @init="init"></address-picker>
  </div>
</template>
<script>
import mineAddress from "../../components/mineAddress";
import addressPicker from "../../components/addressPicker"
import API from "../../util/API";

export default {
  props: [],
  components: {
    mineAddress,
    addressPicker
  },
  data() {
    return {
      isShow:false,
      isUpdate:true,   
      phone: JSON.parse(localStorage.getItem("ReUser")).name,
      address: [],
      username:JSON.parse(localStorage.getItem("ReUser")).name,
    };
  },
  methods: {
    init(){
         this.$axios({
      url: API.address,
      params: {
        username: this.username
      }
    }).then(res => {
      this.address = res.data;
    });
    },
    search(){
      this.init()
    },
    dialog(){
      this.$refs.addressPickerChild.open()
    },
    showPicker(){
      this.isShow=true
      this.isUpdate=true
    },
      Update(){
         this.isUpdate=false
      },
      hidePicker(){
        this.isShow=false
      },
   showPicker(){
      
       this.isShow=true
   },
  
  },
  watch: {},
  computed: {},
  mounted() {
       this.init()
       
  }
};
</script>
<style scoped>
.s-empty-pc[data-v-a9859a0c] {
    background: #fff;
    margin-top: 10px;
    /* border: 1px solid #ddd; */
    color: #666;
    text-align: center;
    font-size: 16px;
    padding:60px 0;
   
    
}

.s-icon-size-pc[data-v-a9859a0c] {
    display: block;
    margin-bottom: 20px;
    font-size: 100px;
    
}
.button{
    padding: 10px 0;
}
.cursor{
    cursor:pointer
}
</style>