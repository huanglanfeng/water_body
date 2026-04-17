import type { InjectionKey, Ref } from "vue";

export const videoUrl = Symbol() as InjectionKey<Ref<string>>;
