/**
 * 为了渲染更快，组件最好优先加载
 */
import "../components/header/AppHeader.js";
/**
 * 公共库
 */
import $ from "jquery";
import * as echarts from "echarts";
/**
 * 公共js文件
 */
import "../js/unocss.js";
import "../js/zoom.js";

/**
 * 导出mounted函数可以获取search params
 */
// export function mounted(params) {}
