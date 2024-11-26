let appDom = document.getElementById("page-body");
const bodyScale = () =>
  (appDom.style.zoom = document?.documentElement?.clientWidth / 1920);
bodyScale() && (window.onresize = bodyScale);
