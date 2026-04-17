import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    address: string;
    river: string;
    waterQuality: string;
    pollutionIndex: number;
    alertLevel: number;
    alertNumber: number;
    latitude: number;
    longitude: number;
    site: string;
    garbageNumber: string;
}

export interface expose {
    formData: Ref<form>;
}
