<template>
  <div class="login">
    <el-row>
      <el-col :span="8" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h3 class="title">欢迎来到{{ setting.title }}！</h3>
          <h2 class="signup">Sign Up</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              class="custom-input"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
              class="custom-input"
            />
          </el-form-item>
          <el-button
            :disabled="loading"
            :loading="loading"
            type="primary"
            size="default"
            @click="login"
            >Login in</el-button
          >
          <el-radio-group v-model="rememberMe">
            <el-radio label="true">Remember me</el-radio>
          </el-radio-group>
        </el-form>
      </el-col>
      <el-col :span="16" :xs="0"></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import useUserStore from "@/store/user";
import { useRouter, useRoute } from "vue-router";
import getTime from "@/utils/time";
let loginForms = ref();
import setting from "@/setting";

// 自定义表单检验规则
const validatorName = (rules: any, value: any, callback: any) => {
  if (value.length >= 1) {
    callback();
  } else {
    callback(new Error("用户名长度不少于1位"));
  }
};
const validatorPass = (rules: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度不少于6位"));
  }
};
const rules = {
  // username: [{ required: true, min: 6, max: 10, message: "账号长度6-10位", trigger: "change" }],
  username: [{ validator: validatorName, trigger: "change" }],
  // password: [{ required: true, min: 6, message: "密码至少6位", trigger: "change" }],
  password: [{ validator: validatorPass, trigger: "change" }],
};

let router = useRouter();
let route = useRoute();
const rememberMe = ref(false);
const userStore = useUserStore();
let loginForm = ref({
  username: "",
  password: "",
});
let loading = ref(false);
const login = async () => {
  await loginForms.value.validate(); //确保表单校验完成之后再发请求
  loading.value = true;
  try {
    await userStore.userLogin(loginForm.value);
    loading.value = false;

    router.push((route.query.redirect as string) || "/");
    ElNotification({
      title: `HI, ${loginForm.value.username}！`,
      message: `${getTime()}好, 欢迎回来`,
      type: "success",
    });
  } catch (error: any) {
    loading.value = false;
    ElNotification({
      title: "登录失败",
      type: "error",
    });
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/bg.jpg") no-repeat;
  background-size: cover;
}
.login_form {
  width: 80%;
  top: 2vh;
  position: relative;
  background-size: cover;
  padding: 60px;
  .title {
    color: #76aff0;
    margin-bottom: 170px;
  }
  .signup {
    font-weight: bold;
    font-size: 42px;
    margin: 60px 0;
  }

  button {
    width: 50%;
    height: 40px;
    // color: #fff;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
    background: linear-gradient(45deg, #1f6aed, #3d9ff6);
  }
}
</style>
