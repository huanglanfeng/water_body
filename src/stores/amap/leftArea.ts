import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useLeftAreaStore = defineStore("leftArea", () => {
  const kecaiqu = ref("鄱阳湖");

  return {
    kecaiqu,
  };
});
