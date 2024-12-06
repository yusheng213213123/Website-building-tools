/**
 * 所有页面公共入口
 */
import { htmlMap, loadResource } from "./mapFiles.js";
import "core-js";
import $ from "jquery";
if (window) {
  window.$ = window.jQuery = $;
  loadResource();
}
