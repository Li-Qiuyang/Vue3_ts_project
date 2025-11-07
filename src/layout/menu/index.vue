<template>
  <template v-for="item in props.routesList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="item.meta.isShow">
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <template #title>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.children[0].path" v-if="item.children[0].meta.isShow">
        <el-icon><component :is="item.children[0].meta.icon" /></el-icon>
        <template #title>
          <span>
            {{ item.children[0].meta.title }}
          </span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu
      :index="item.path"
      v-if="item.meta.isShow && item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon><component :is="item.meta.icon" /></el-icon>
        <span>
          {{ item.meta.title }}
        </span>
      </template>
      <Menu :routesList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<script lang="ts" setup name="Menu">
let props = defineProps(["routesList"]);
console.log(props);
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped lang="scss"></style>
