<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="../../assets/logo.png" alt=""></h1>
        <el-menu default-active="1-4-1"  @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
          <template v-for="(item, index) in routers">
            <el-submenu :index="index + ''" :key="item.id" v-if="!item.hidden">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">{{item.meta.name}}</span>
                </template>
                <template v-for="childItem in item.children">
                  <el-menu-item v-if="!childItem.hidden" :index="childItem.path" :key="childItem.id">
                    {{childItem.meta.name}}
                  </el-menu-item>
                </template>
            </el-submenu>
          </template>
        </el-menu>
    </div>
</template>
<script>
import { reactive, computed, ref } from '@vue/composition-api';
export default {
    name: 'navMenu',
    setup(props, { root }) {
      const isCollapse = ref(false)
      const routers = reactive(root.$router.options.routes)
      const handleOpen = () => {

      }
      const handleClose = () => {
        
      }
      console.log('router:', root.$router.options.routes)
      return {
        isCollapse,routers,
        handleOpen, handleClose
      }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.logo {
  text-align: center;
  img { 
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all .3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all .3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
