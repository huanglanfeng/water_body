import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    account: string;
    gender: string;
    id: number;
    mail: string;
    name: string;
    password: string;
    photo: string;
    role: string;
}

export interface expose {
    formData: Ref<form>;
}
