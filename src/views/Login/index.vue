<template>
  <div id="login">
    <div class="login-wrap">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginButtonStatus">{{ model === 'login' ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, watch } from '@vue/composition-api';
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate';
import { GetSms } from "@/api/login";

export default {
    name: 'login',
    setup(props, {refs, root}){
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //true
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        // 过滤后的数据
        ruleForm.password = stripscript(value);
        value = ruleForm.password;
        if (value === '') {
          callback(new Error("请输入密码"));
        } else if (validatePass(value)) {
          callback(new Error("密码为6至20位数字+字母"));
        } else {
          callback();
        }
      };
      // 验证重复密码
      let validatePasswords = (rule, value, callback) => {
        // 如果模块值为login, 直接通过
        if(model.value === 'login') { callback(); }
        // 过滤后的数据
        ruleForm.passwords = stripscript(value);
        value = ruleForm.passwords;
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != ruleForm.password) {
          callback(new Error('重复密码不正确'));
        } else {
          callback();
        }
      };
      // 验证验证码
      let validateCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入验证码'));
        }else if(validateVCode(value)){
          return callback(new Error('验证码格式有误'));
        }else{
          callback();
        }
      };

      // 模块值 
      const model = ref('login');
      // 登录按钮禁用状态
      const loginButtonStatus = ref(true);
      // 验证码按钮状态
      const codeButtonStatus = reactive(
        {
          status: false,
          text: '获取验证码'
        }
      );
      // 更新按钮状态
      const updataButtonStatus = ((params) => {
        codeButtonStatus.status = params.status;
        codeButtonStatus.text = params.text;
      })

      const ruleForm = reactive({
        username: '',
        password: '',
        passwords: '',
        code: ''
      });
      const rules = reactive({
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      })

      // 短信验证
      const getSms = async () =>{
        // 进行提示
        if(ruleForm.username == '' ) {
          root.$message.error('邮箱不能为空！！');
          return false;
        }
        // if(validateEmail(ruleForm.username)) {
        //   root.$message.error('邮箱格式有误，请重新输入！！');
        //   return false;
        // }
        // 获取验证码
        let requestData = {
          username: ruleForm.username, 
          module: model.value
        }
        // 修改获取验证按钮状态
        updataButtonStatus({
          status: true,
          text: '发送中'
        })
        // 延时多长时间
        // GetSms(requestData).then(response => {
        //   let data = response.data;
        //   root.$message({
        //     message: data.message,
        //     type: 'success'
        //   });
        //   // 启用登录或注册按钮
        //   loginButtonStatus.value = false;
        //   // 调定时器，倒计时
        //   countDown(60);
        // }).catch(error => {
        //   console.log(error);
        // })
        const res = await GetSms(requestData);
        console.log('res====', res)
        if (res.resCode === 0) {
          root.$message({
            message: res.message,
            type: 'success'
          });
          // 启用登录或注册按钮
          loginButtonStatus.value = false;
        }
        
      }

      const submitForm = (formName) => {
        refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // 页面跳转
            root.$router.push({
              path: '/index'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      const resetForm = (formName) => {
        refs[formName].resetFields();
      }

      return {
        // 变量
        ruleForm, rules, model, codeButtonStatus, loginButtonStatus,
        // 方法
        submitForm, resetForm, getSms
      }
    }
}
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}

.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from { margin-bottom: 13px; }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn { margin-top: 19px; }
}

</style>
<!--
密码加密：
1、在前端预先加密一次
登录的密码：123456（普通字符串）
经过加密后：sha1('123456') == '541216ad5s4f5ds1f5asd4f65asd4' （加密后的字符串）


2、后台加密
接收到字符串：'541216ad5s4f5ds1f5asd4f65asd4'
后台再次加密：md5('541216ad5s4f5ds1f5asd4f65asd4') == '8f9qwersd3g165y4d1sf3s1f6aew4'（最终的加密后的密码）
最终新的字符串写入数据库：8f9qwersd3g165y4d1sf3s1f6aew4


3、登录
用户名与加密后的密码进行匹配，成功则登录，失败则提示
-->