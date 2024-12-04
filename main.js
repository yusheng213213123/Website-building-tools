/**
 * 所有页面公共入口
 */
import { htmlMap, loadCss, loadResource } from "./mapFiles.js";
loadCss(location.pathname);
import "core-js";
import $ from "jquery";
if (window) {
  window.$ = window.jQuery = $;
  loadResource();
}
