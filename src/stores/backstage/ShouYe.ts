import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDashBoardStore = defineStore("ShouYe", () => {
  const isCollapse = ref(true);

  return {
    isCollapse,
  };
});
