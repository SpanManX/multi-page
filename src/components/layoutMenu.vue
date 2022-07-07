<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :router="true">
    <el-menu-item v-for="(item,i) in $router.options.routes[0].children" :key="i" :index="item.path">
      <i class="el-icon-menu"></i>
      <span slot="title">{{item.path}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "layoutMenu",
}
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
}
</style>
