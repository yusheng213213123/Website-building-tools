/**
 * 页面路由对应入口
 */
export const htmlMap = [
  {
    path: "/",
    entry: () => import("/src/entry/index.js"),
  },
];
export const loadResource = async () => {
  let pageConfig = null;
  let routeName = "";
  if (location.pathname.indexOf(".html") != -1) {
    routeName = location.pathname.split(".html")[0];
  } else {
    routeName = "/";
  }
  for (let i = 0; i < htmlMap.length; i++) {
    console.log(htmlMap[i]["path"], routeName);
    if (htmlMap[i]["path"] == routeName) {
      pageConfig = htmlMap[i];
      break;
    }
  }
  if (pageConfig) {
    try {
      const resource = await pageConfig.entry();
      const { mounted = null } = resource;
      const searchParams = new URLSearchParams(location.search);
      const params = {};
      if (searchParams.size > 0) {
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
      }
      mounted && mounted(params);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error("无法找到页面入口配置！");
  }
};
