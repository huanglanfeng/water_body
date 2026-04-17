import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    type: string;
    id: number;
    status: string;
    updateTime: string;
    siteId: string;
    interval: number;
}

export interface expose {
    formData: Ref<form>;
    dialogTableVisible: Ref<boolean>;
    testRef: Ref<null>;
}
