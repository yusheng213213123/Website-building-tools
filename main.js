/**
 * 所有页面公共入口
 */
import { htmlMap, loadCss, loadResource } from "./mapFiles.js";
import "./public.less";
const pageConfig = loadCss(location.pathname);
import "core-js";
if (window) {
  loadResource(pageConfig);
}
