<template>
  <div>
    <el-dialog title="修改个人资料" :visible.sync="isShow">
      <el-form>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.phone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="user.idx"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="user.sex" label="男">男</el-radio>
          <el-radio v-model="user.sex" label="女">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="submit" @click="agree">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../util/API";
import qs from "qs";
export default {
  props: ["userinfo","isShow"],
  components: {},

  data() {
    return {
      imageUrl: "",
      user: this.userinfo,
      value1: ""
    };
  },
  // mounted() {
  //   this.$axios({
  //     url: API.sBefore
  //   }).then(res => {
  //     this.user.phone = res.data[0].phone;
  //   });
  // },
  methods: {
    cancel(){
        this.$emit("hidePicker");
    },
    agree() {
      let data = qs.stringify(this.user);
      console.log(data);
      this.$axios.post(API.beforeUserEdit, data).then(res => {});
      this.$emit("hidePicker");
    }
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M;
    // }
  },
  watch: {},
  computed: {}
};
</script>
<style scoped>
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
  font-size: 20px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>