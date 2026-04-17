import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    id: number;
    uname: string;
    sex: string;
    email: string;
    password: string;
}

export interface expose {
    formData: Ref<form>;
    dialogTableVisible: Ref<boolean>;
    testRef: Ref<null>;
}
