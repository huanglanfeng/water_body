import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    account: string;
    gender: string;
    mail: string;
    password: string;
}

export interface expose {
    formData: Ref<form>;
    dialogTableVisible: Ref<boolean>;
    testRef: Ref<null>;
}
