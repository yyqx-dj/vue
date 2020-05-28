<template>
  <div>
    <div class="left">
      <div class="leftInner">
        <div class="img">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <span class="marginLeft">我的头像</span>
      </div>
      <div class="spacing"></div>
      <div class="info">
        <div>昵称：{{user.nickname}}</div>
        <div>手机号码：{{user.phone}}</div>
        <div>身份证号：{{user.idx}}</div>
        <div>电子邮箱：{{user.email}}</div>
        <div>
          性别：
          <input type="text" v-model="user.sex" />
        </div>
      </div>
      <div class="right">
        <div>
          <el-button type="primary" @click="showPicker">修改</el-button>
        </div>
        <div>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
      </div>
    </div>
    <v-picker :isShow="isShow" :userinfo="user" @hidePicker="hidePicker"></v-picker>
  </div>
</template>
<script>
import vPicker from "./picker";
import API from "../util/API";
import qs from "qs";
export default {
  props: [],
  components: {
    vPicker
  },
  data() {
    return {
      isShow: false,
      imageUrl: "",
      user: {
        nickname: "",
        phone: "",
        idx: "",
        email: "",

        sex: ""
      }
      // ReUserName:JSON.parse(localStorage.getItem("ReUser")).name,
    };
  },
  methods: {
    hidePicker() {
      this.isShow = false;
    },
    showPicker() {
      this.isShow = true;
    },
    logout() {
      localStorage.removeItem("tag");
      this.$router.push("/index");
    },
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  watch: {},
  computed: {},
  mounted() {
    this.$axios({
      url: API.sBefore,
      params:{
         phone:JSON.parse(localStorage.getItem("ReUser")).name
      }
    }).then(res => {
      this.user.phone = res.data[0].phone;
      this.user.nickname=res.data[0].nickname;
      this.user.email=res.data[0].email;
      this.user.idx=res.data[0].idx;
      this.user.sex=res.data[0].sex;

    });
  }
};
</script>
<style scoped>
.left {
  overflow: hidden;
}
.leftInner {
  float: left;
}
.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #eee;
  overflow: hidden;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.marginLeft {
  margin-left: 20px;
}
.spacing {
  width: 1px;
  height: 150px;
  background-color: #eee;
  float: left;
  margin: 0 50px;
}
input {
  border: none;
}
.left {
  position: relative;
}
.right {
  position: absolute;
  top: 0;
  right: 0;
}
.right > div {
  padding: 5px 0;
}
</style>