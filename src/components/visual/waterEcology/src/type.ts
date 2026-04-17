import type { Ref } from "vue";

export interface form {
    [x: string]: any;
    //水量
    a1: number;
    a2: number;
    a3: number;
    a4: number;
    a5: number;
    a6: number;
    a7: number;
    //温度
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    t5: number;
    t6: number;
    t7: number;
    //ph
    p1: number;
    p2: number;
    p3: number;
    p4: number;
    p5: number;
    p6: number;
    p7: number;
    //浊度
    id: number;
    site: number;
    phos: number;
    sulfur: number;
    calcium: number;
    turbidity: number;
    //元素、溶解氧
    conductivity: number;
    inorganic: number;
    dissolve: number;
    organic: number;
    metal: number;
    salt: number;

}

export interface expose {
    formData: Ref<form>;
}
