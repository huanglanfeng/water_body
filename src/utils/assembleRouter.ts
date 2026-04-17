import { useRouter } from "vue-router";

export const assRouter = (menu: Array<any>) => {
  const allRouter = [];
  const router = useRouter();

  const menuArray: Array<any> = [];
  const modules = import.meta.glob("../views/backstage/*/index.vue");
  const submodules = import.meta.glob("../views/backstage/*/*/index.vue");

  // 然后动态路由的时候这样来取
  //menu.component = modules[`../views/${url}.vue`]

  menu.forEach((item) => {
    if (item.meta.type !== "1") {
      item.children.forEach((subitem: any) => {
        subitem.component =
          submodules[
          `../views/backstage/${item.component}/${subitem.component}/index.vue`
          ];
        menuArray.push(subitem);
      });
    } else {
      // item.component = () => import(`@/components/backstage/${item.component}/index.vue`)
      item.component =
        modules[`../views/backstage/${item.component}/index.vue`];
      // console.log(item.component);

      menuArray.push(item);
    }
  });

  menuArray.forEach((item) => {
    router.addRoute("Main", item);
  });
};
