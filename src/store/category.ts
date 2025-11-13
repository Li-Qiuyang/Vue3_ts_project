import { defineStore } from "pinia";
import type {
  firstCategoryData,
  secondCategoryData,
  thirdCategoryData,
  attrList,
} from "@/api/product/attr/type";
import {
  reqGetFirstCategoary,
  reqGetSecondCategoary,
  reqGetThirdCategoary,
} from "@/api/product/attr";
import { ref } from "vue";

export default defineStore("Category", () => {
  let firstOptions = ref<firstCategoryData[]>([]);
  let secondOptions = ref<secondCategoryData[]>([]);
  let thirdOptions = ref<thirdCategoryData[]>([]);
  let firstValue = ref();
  let secondValue = ref();
  let thirdValue = ref();
  let attrList = ref<attrList[]>([]);

  const getFirstCategory = async () => {
    let res = await reqGetFirstCategoary();
    if (res.code == 200) {
      firstOptions.value = res.data;
    }
  };
  const getSecondCategory = async () => {
    let res = await reqGetSecondCategoary(firstValue.value);
    console.log(res);
    if (res.code == 200) {
      secondOptions.value = res.data;
    }
  };
  const getThirdCategory = async () => {
    let res = await reqGetThirdCategoary(secondValue.value);
    if (res.code == 200) {
      thirdOptions.value = res.data;
    }
  };

  return {
    firstOptions,
    secondOptions,
    thirdOptions,
    firstValue,
    secondValue,
    thirdValue,
    attrList,
    getFirstCategory,
    getSecondCategory,
    getThirdCategory,
  };
});
