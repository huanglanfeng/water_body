import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    //预警
    site: string;
    warning: string;
    time: string;

}

export interface expose {
    formData: Ref<form>;
}
