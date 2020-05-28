<template>
  <div class="inner">
    <div class="form">
      <h3>登录</h3>
      <div>
        <el-input v-model="user.name" placeholder="请输入账号" clearable></el-input>
      </div>
      <div>
        <el-input type="password" v-model="user.pass" placeholder="请输入密码" clearable show-password></el-input>
      </div>
      <div class="p">
        没有账号？
        <router-link to="/register">请去注册</router-link>
      </div>
      <div>
        <el-button type="primary" class="login" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../util/API";
import qs from "qs";
export default {
  data() {
    return {
      user: {
        name: "",
        pass: ""
      },
      confirm: "",
      BUserName: null,
      BUserPass: null,
      BUserArr: []
    };
  },
  methods: {
    // search() {
    //     console.log("!!!!!!!!!")
     
    // },

    login() {
      if (this.user.name == "" || this.user.pass == "") {
        this.$message({
          message: "账号或密码不能为空",
          type: "warning"
        });
        return;
      }
      var mark = this.BUserArr.some(item => {
        return item.phone == this.user.name;
      });
      console.log(mark);
      if (mark==false) {
        this.$message({
          message: "您还未注册，请注册",
          type: "warning"
        });
        return;
      }
        // this.search();
         var name = this.user.name;
        this.$axios({
        url: API.sBefore,
        params: {
          phone: name
        }
      }).then(res => {
          console.log(222222222)
        this.BUserName = res.data[0].phone;
        this.BUserPass = res.data[0].pass;
        console.log(this.BUserName);
        console.log(this.BUserPass);
          if (
          this.user.name !== this.BUserName ||
          this.user.pass !== this.BUserPass
        ) {
          this.$message({
            message: "账号或密码错误",
            type: "warning"
          });
          return;
        }
             if (
          this.user.name == this.BUserName &&
          this.user.pass == this.BUserPass
        ) {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          localStorage.setItem("ReUser", JSON.stringify(this.user));
          localStorage.setItem("tag", "tag");
          this.$router.push("/index");
        }
      });
      

   
      
    
     
     
    }
  },
  mounted() {
    this.$axios({
      url: API.sBefore
    }).then(res => {
      this.BUserArr = res.data;
    });
  }
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