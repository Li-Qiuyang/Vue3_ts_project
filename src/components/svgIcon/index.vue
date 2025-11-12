<template>
  <div>
    <svg :style="{ width, height }">
      <!-- xlink:href执行用哪一个图标,属性值务必#icon-图标名字 -->
      <use :xlink:href="`${prefix}${name}`" :fill="fill"></use>
    </svg>
  </div>
</template>
<script lang="ts" setup name="SvgIcon">
let props = defineProps({
  prefix: {
    type: String,
    default: "#icon-",
  },
  name: {
    type: String,
  },
  fill: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "30px",
  },
  height: {
    type: String,
    default: "30px",
  },
});
</script>
<style scoped lang="scss"></style>
