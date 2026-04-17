import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    Ammonia: number;
    Sulfur: number;
    Hydrogrn: number;
    Nitrogen: number;
    Carbon: number;

    //反馈
    id: number;
    time: string;
    site: string;
    account: string;
    content: string;
}

export interface expose {
    formData: Ref<form>;
}
