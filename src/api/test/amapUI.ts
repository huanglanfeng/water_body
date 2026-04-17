import requests from "@/utils/request";

export const AMapUIget = () => {
  return requests.get("https://a.amap.com/amap-ui/static/data/big-routes.json");
};
