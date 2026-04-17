import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    //水溶物
    phos: number;
    sulfur: number;
    nitrogen: number;
    dissolvedOxygen: number;
    site: string;
    detectTime: string;
    //溶解盐
    siteId: string;
    sulfate: number;
    nitrate: number;
    permanganate: number;
    condutivity: number;

    //微生物
    exceptionArea: string;
    germ: number;
    fungus: number;
    animal: number;
    phage: number;

    //重金属

    sodium: number;
    mercury: number;
    calcium: number;
    zinc: number;
    magnesium: number;

    //放射元素

    ray1: number;
    ray2: number;
    thorium: number;
    radium: number;
    uranium: number;
}

export interface expose {
    formData: Ref<form>;
    // dialogTableVisible: Ref<boolean>;
    // testRef: Ref<null>;
}
