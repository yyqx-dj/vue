<template>
  <div class="inner">
    <div class="form">
      <h3>注册</h3>
      <div>
        <el-input v-model="user.name" placeholder="请输入账号" clearable></el-input>
      </div>
      <div>
        <el-input type="password" v-model="user.pass" placeholder="请输入密码" clearable show-password></el-input>
      </div>
      <div>
        <el-input type="password" v-model="confirm" placeholder="请确认密码" clearable show-password></el-input>
      </div>
      <div class="p">
        已有账号？
        <router-link to="/login">请直接登录</router-link>
      </div>
      <div>
        <el-button type="primary" class="login" @click="register()">注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import API from '../util/API';
import qs from 'qs';

export default {
  data() {
    return {
      user: {
        name: "",
        pass: ""
      },
      confirm: "",
      BUserName:"",
      ReUser:"",
      resData:""
    };
  },
  computed:{
    //  ...mapGetters(["ReUser"])
  },
  methods: {
    register() {
      
      if (this.user.name == "" || this.user.pass == "") {
        this.$message({
          message: "账号或密码不能为空",
          type: "warning"
        });
        return;
      }
      if (this.user.pass !== this.confirm) {
        this.$message({
          message: "两次密码不一致，请检查",
          type: "warning"
        });
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.user.name)) {
        this.$message({
          message: "请输入正确格式手机号",
          type: "warning"
        });
        return;
      }
      
       //查询
      this.$axios({
      url: API.sBefore,
      params:{
         phone:JSON.parse(localStorage.getItem("ReUser")).name
      }
    }).then(res => {
      if(res.data.length==0){
           this.$message({
          message: "注册成功",
          type: "success"
        });
         var data=qs.stringify(this.user)
         console.log(data)
         this.$axios.post(API.beforeUserAdd,data).then(res=>{
      })
        this.$router.push("/login")   
      }else{
         this.$axios({
      url: API.sBefore,
      params:{
         phone:JSON.parse(localStorage.getItem("ReUser")).name
      }
         }).then(res=>{
          this.BUserName=res.data[0].phone
         if(this.BUserName==this.user.name){
        this.$message({
          message: "该手机号已注册，请直接登录！",
          type: "warning"
        });
       
      }
         })
       
      }
      
    });
        
      
     
        
      
      }

  },
  mounted(){
    console.log(555555555555)
     
  },
};
</script>
<style lang="stylus" scoped>
@import '../stylus/index.styl';

div {
  padding: 5px 0;
}

.inner {
  background-color: #f8f8f8;
  padding: 100px 0;
}

.form {
  width: 40%;
  height: 300px;
  margin: 0 auto;
  background-color: #fff;
  padding: 50px;
  text-align: center;
}

.login {
  width: 100%;
}

.p {
  text-align: left;
}

a {
  color: blue;
  text-decoration: underline;
}
</style>