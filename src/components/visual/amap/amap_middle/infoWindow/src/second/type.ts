import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    id: number;
    status: string;
    updateTime: string;
}

export interface expose {
    formData: Ref<form>;
}
