import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    deviceId: number;
    exceptionArea: string;
    id: number;
    warningTime: string;
    content: string;
    element: string;
    name: string;
    number: number;
    exception: string;
    ph: number;
}

export interface expose {
    formData: Ref<form>;
    // dialogTableVisible: Ref<boolean>;
    // testRef: Ref<null>;
}
