import * as template from "./AppHeader.html";
import $ from "jquery";
class AppHeader extends HTMLElement {
  shadowRoot = null;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template.default;
    /**
     * 使用jquery获取当前组件元素
     * $(this)
     */
  }
  // 挂载
  connectedCallback() {}
  // 卸载
  disconnectedCallback() {}
}

customElements.define("app-header", AppHeader);
