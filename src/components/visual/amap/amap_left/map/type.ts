import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    alertLevel: number;
    alertNumber: number;
    photoOne: string;
    photoTwo: string;
    photoThree: string;
    site: string;
    waterQualityParameters: number;
    siteId: string;
}

export interface expose {
    formData: Ref<form>;
}
