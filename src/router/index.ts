import { createRouter, createWebHistory } from "vue-router";
import { GET_TOKEN } from "@/utils/cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layout/index.vue"),
      name: "Main",
      redirect: '/ShouYe',
    },
    {
      path: "/index",
      component: () => import("@/views/visual/index.vue"),
      name: "index",
      redirect: { name: "map" },
      children: [
        {
          path: "video",
          component: () => import("@/views/visual/supervisor/index.vue"),
        },
        {
          path: "water_detection",
          component: () => import("@/views/visual/water_detection/index.vue"),
        },
        {
          path: "worning_detection",
          component: () => import("@/views/visual/worning_detection/index.vue"),
        },
        {
          path: "map",
          name: "map",
          component: () => import("@/views/visual/amap/index.vue"),
        },
        // {
        //   path: "waterecology",
        //   name: "waterecology",
        //   component: () => import("@/views/visual/waterEcology/index.vue"),
        // },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    // {
    //   path: "/personal",
    //   component: () => import("@/views/backstage/personal/index.vue")
    // },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/notFound/index.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    },
  ],
});

//防止动态路由页面刷新后丢失
router.beforeEach(async (to, from, next) => {
  if (to.path !== "/login" && GET_TOKEN() == undefined)
    next({ path: "/login" });
  else if (to.matched.length === 0) next({ path: to.path });
  else next();
});

export default router;
