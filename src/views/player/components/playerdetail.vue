<template>
  <div>
    <el-form ref="form" :model="playerForm">
      <el-form-item prop="accountname" label="账户名">
        <el-input v-model="playerForm.accountname"></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="playerForm.nickname"></el-input>
      </el-form-item>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
      >
      <!-- 预览 -->
      <img v-if="imageUrl" :src="imageUrl" alt="" class="avatar">
      <!-- 添加按钮 -->
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item type="primary">
        <el-button @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
/* tslint:disable */
import { ElUploadInternalFileDetail } from "element-ui/types/upload";
import { update } from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  defaultPlayerData,
  getPlayer,
  updatePlayer,
  createPlayer
} from "../../../api/players";

@Component
export default class extends Vue {
  @Prop({ default: false })
  isEdit?: boolean;

  //数据的模型
  playerForm = Object.assign({}, defaultPlayerData);

  //加载状态
  loading = false;

  //上传头像预览地址
  imageUrl=""

  //根据 isEdit 状态决定是否获取玩家详细信息
  created() {
    //编辑状态路由: players/edit/:id
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(parseInt(id));
    }
  }

  async fetchData(id: number) {
    try {
      const { data } = await getPlayer(id);
      this.playerForm = data.player;
    } catch (error) {
      console.error(error);
    }
  }
  //上传之前
  beforeAvatarUpload(file: ElUploadInternalFileDetail){
    const isLt1M=true;
    if(!isLt1M){
      this.$message.error('上传头像图片大小不能超过1MB！')
    }

    return isLt1M
  }

  //上传成功后处理

  handleAvatarSuccess(resp:any,file:ElUploadInternalFileDetail){
    //预览图片
    this.imageUrl=URL.createObjectURL(file.raw)

    //赋值 //todo: avatar的值应该在rep中返回
    this.playerForm.avatar=file.name

  }

  //处理表单提交
  async submitForm() {
    this.loading = true;
    //提交操作
    try {
      if (this.isEdit) {
        await updatePlayer(this.playerForm.id, this.playerForm);
      } else {
        await createPlayer(this.playerForm);
      }
      //操作成功提示信息
      this.$notify({
        title: "操作成功",
        message: "新增玩家信息成功",
        type: "success",
        duration: 2000
      });
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
<style >
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
 width: 178px;
 height: 178px;
 line-height: 178px;
 text-align: center;
}
.avatar {
 width: 178px;
 height: 178px;
 display: block;
}
</style>
