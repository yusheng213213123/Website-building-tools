/**
 * 页面路由对应入口
 */
let pageConfig = null;
export const htmlMap = [
  {
    path: "/",
    entry: () => import("/src/entry/index.js"),
    cssListFunc: [
      // 不需要立即引入的样式表
      () => import("/src/css/animate.css"),
    ],
  },
];

export const loadCss = (path) => {
  for (let i = 0; i < htmlMap.length; i++) {
    pageConfig = htmlMap[i];
    if (pageConfig["path"] == path) {
      if (typeof pageConfig.cssListFunc === "function") {
        pageConfig.cssListFunc();
      } else if (Array.isArray(pageConfig.cssListFunc)) {
        for (let j = 0; j < pageConfig.cssListFunc.length; j++) {
          pageConfig.cssListFunc[j]();
        }
      }
      break;
    }
  }
};

export const loadResource = async () => {
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
