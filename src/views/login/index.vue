<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到后台管理系统！</h2>
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-button
            :disabled="loading"
            :loading="loading"
            type="primary"
            size="default"
            @click="login"
            >登录</el-button
          >
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";
import getTime from "@/utils/time";

let router = useRouter();
const userStore = useUserStore();
let loginForm = ref({
  username: "admin",
  password: "111111",
});
let loading = ref(false);
const login = async () => {
  loading.value = true;
  let res = await userStore.userLogin(loginForm.value);
  loading.value = false;
  if (res.ok) {
    router.push("/");
    ElNotification({
      message: "欢迎回来",
      title: `HI！${getTime()}好`,
      type: "success",
    });
  } else {
    ElNotification({
      type: "error",
      message: res.msg,
    });
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
}
.login_form {
  width: 80%;
  top: 30vh;
  position: relative;
  background: url("@/assets/images/login_form.png");
  background-size: cover;
  padding: 40px;
  h1 {
    color: #fff;
    font-size: 40px;
  }
  h2 {
    margin: 20px 0;
    color: #fff;
    font-size: 20px;
  }
  button {
    width: 100%;
    color: #fff;
  }
}
</style>
