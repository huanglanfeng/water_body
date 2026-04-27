import type { InjectionKey, Ref } from "vue";

export const videoUrl = Symbol() as InjectionKey<Ref<string>>;

export interface CameraInfo {
  name: string;
  location: string;
  status: string;
  ip: string;
  resolution: string;
}

export const cameraInfoKey = Symbol() as InjectionKey<Ref<CameraInfo>>;
