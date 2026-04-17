import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    //预警
    id: number;
    site: string;
    warning: string;
    value: number;
    time: string;

    Ammonia: number;
    Sulfur: number;
    Hydrogrn: number;
    Nitrogen: number;
    Carbon: number;

    //反馈
    account: string;
    content: string;
}

export interface expose {
    formData: Ref<form>;
}
