<template>
  <div>
    <el-dialog title="添加收货地址" :visible.sync="isShow" :show-close="false">
      <el-form :model="user">
        <el-form-item label="收货人">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader v-model="addressObj" :options="options" @change="addressChange()"></el-cascader>
        </el-form-item>

        <el-form-item label="详细地址">
          <el-input v-model="user.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否设为默认地址">
         <el-switch v-model="user.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="agree" v-if="isUpdate">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
import { mapGetters } from "vuex";
import API from "../util/API";
export default {
  props: ["isShow", "isUpdate"],
  components: {},
  data() {
    return {
      user: {
        id:"",
        username: JSON.parse(localStorage.getItem("ReUser")).name,
        name: "",
        phone: "",
        address: "",
        value:true
      },
      addressObj: "",
      options: regionData
    };
  },
  methods: {
    open() {
      this.user.id=this.addressJson._id;
      this.user.name=this.addressJson.name;
      this.user.phone=this.addressJson.phone;
      this.user.address=this.addressJson.address;
      this.user.value=this.addressJson.value;

    },
    update() {
      this.$emit("hidePicker");
      this.$axios.post(API.addressEdit,this.user).then(res=>{
        let arr=res.data
        if(arr.length!==0){
          this.$message({
          message: "修改成功",
          type: "success"
      });
      this.$emit("init")
      this.user= {
        id:"",
        username: JSON.parse(localStorage.getItem("ReUser")).name,
        name: "",
        phone: "",
        address: "",
        value:""
      }
        }
      })
       
    },
    cancel() {
      this.$emit("hidePicker");
        this.user= {
        id:"",
        username: JSON.parse(localStorage.getItem("ReUser")).name,
        name: "",
        phone: "",
        address: "",
        value:""
      }
    },
    agree() {
      // this.$store.dispatch("addAddress", this.user);
      this.$axios.post(API.addAddress, this.user).then(res => {});
      this.$message({
        message: "添加成功",
        type: "success"
      });
      this.user = {
        name: "",
        phone: "",
        address: ""
      };
      this.$emit("hidePicker");
      this.$emit("search");
    },
    addressChange() {
      this.user.address =
        CodeToText[this.addressObj[0]] +
        CodeToText[this.addressObj[1]] +
        CodeToText[this.addressObj[2]];
    }
  },
  computed: {
    ...mapGetters(["addressJson"])
  }
};
</script>
<style scoped>
.select-address {
  width: 30%;
}
</style>