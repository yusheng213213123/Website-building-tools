/**
 * 公共库
 */
import $ from "jquery";
import * as echarts from "echarts";
// import Pike from "pike";

//<script type="text/javascript" src="static/js/scroll.js"></script>
//<script type="text/javascript" src="static/js/scroll.pic.js"></script>
//<script type="text/javascript" src="static/js/wow.js"></script>
//<script type="text/javascript" src="static/js/top.js"></script>
//<script type="text/javascript" src="static/js/chart2.js"></script>
//<script type="text/javascript" src="static/js/china2.js"></script>

//<script type="text/javascript" src="static/js/login_ajax.js"></script> *\
//<script type="text/javascript" src="static/js/login_ajax2.js"></script>
/**
 * 公共js文件
 */
// import "../js/unocss.js";
// import "../js/zoom.js";
/**
 * 组件
 */
// import "../components/header/AppHeader.js";
/**
 * 导出mounted函数可以获取search params
 */
// export function mounted(params) {}

// 页面的具体逻辑
var _czc = _czc || [];
_czc.push(["_setAccount", "1833042"]);
wow = new WOW({
  animateClass: "animated",
});
wow.init();
$(function () {
  var url2 = window.location.href;
  if (url2.indexOf("pxe.ctctc.cn") > 0) {
    $("#pxtblink").attr("href", "http://pxe.ctctc.cn/skip.jspx?stype=tbyl");
    $("#xxbglink").attr("href", "http://pxecmp.ctctc.cn/S5BeiASys/login.aspx");
  }

  getTotalData();
  getTradeData1();
  getTradeData2();
  getTradeDataForC1();
  getTradeDataForC2();
  getTradeOrderData();
  getHighWayData();
  getHighWayDataEcharts();
  getHighWayDataDetail();
  getFinanceData();
  loadJgzsZb("动力煤");
  loadJgzsZbEchartsdata("山西动力煤5500");
  loadJgzsPs("动力煤");
  loadTermList();
  //getNoticeData2();
});

function getTotalData() {
  $.get("/datacenter/index/totaldata.jspx", function (data) {
    var json = eval("(" + data + ")");
    for (var i = 0; i < json.length; i++) {
      var tempval = "";
      if (json[i].danw == "吨") {
        var tempv = Number(json[i].value) / 10000;
        tempval = tempv.toFixed(0);
      } else {
        tempval = json[i].value;
      }
      if (String(tempval).length > 1) {
        var v1 = String(tempval).substring(
          0,
          (String(tempval).length / 2).toFixed()
        );
        tempval = (v1 + "00000000").substr(0, String(tempval).length);
      }
      //document.getElementById("d" + json[i].zhibid).innerHTML = tempval + "<span>+</span>";
      if (json[i].zhibid == "1") {
        document.getElementById("d" + json[i].zhibid).innerHTML =
          "<h4>" + tempval + "<span>+</span></h4><p>累计注册交易商</p> ";
      } else if (json[i].zhibid == "10") {
        document.getElementById("d" + json[i].zhibid).innerHTML =
          "<h4>" + tempval + "<span>+</span></h4><p>本年自动成交交易场次</p> ";
      } /* else if (json[i].zhibid == '11') {
                      document.getElementById("d" + json[i].zhibid).innerHTML = "<h4>" +  tempval + "<span>+</span></h4><p>本年自动成交交易委托量（万吨）</p> ";
                  } */ else if (json[i].zhibid == "12") {
        document.getElementById("d" + json[i].zhibid).innerHTML =
          "<h4>" +
          tempval +
          "<span>+</span></h4><p>本年自动成交交易成交量（万吨）</p> ";
      }
    }
  });
}

function getTradeData1() {
  $.get("/datacenter/index/tradedata1.jspx", function (data) {
    var json = eval("(" + data + ")");
    document.getElementById("jr").innerHTML = json.jr;
    document.getElementById("zr").innerHTML = json.zr;
    document.getElementById("ddjr").innerHTML = json.ddjr;
    var jzrfx = "ping";
    var jqrfx = "ping";
    var djzrfx = "ping";
    if (json.jzrfx > 0) {
      jzrfx = "sheng";
    } else if (json.jzrfx < 0) {
      jzrfx = "jiang";
    }
    if (json.jqrfx > 0) {
      jqrfx = "sheng";
    } else if (json.jqrfx < 0) {
      jqrfx = "jiang";
    }
    if (json.djzrfx > 0) {
      djzrfx = "sheng";
    } else if (json.djzrfx < 0) {
      djzrfx = "jiang";
    }
    document.getElementById("jzr").innerHTML =
      "较昨日<span class='" + jzrfx + "'><i></i>" + json.jzr + "</span>";
    document.getElementById("jqr").innerHTML =
      "较前日<span class='" + jqrfx + "'><i></i>" + json.jqr + "</span>";
    document.getElementById("djzr").innerHTML =
      "较昨日<span class='" + djzrfx + "'><i></i>" + json.djzr + "</span>";
  });
}

function getTradeData2() {
  $.get("/datacenter/index/tradedata2.jspx", function (data) {
    var json = eval("(" + data + ")");
    document.getElementById("bz").innerHTML = json.bz;
    document.getElementById("sz").innerHTML = json.sz;
    var jszfx = "ping";
    var jsszfx = "ping";
    if (json.jszfx > 0) {
      jszfx = "sheng";
    } else if (json.jszfx < 0) {
      jszfx = "jiang";
    }
    if (json.jsszfx > 0) {
      jsszfx = "sheng";
    } else if (json.jsszfx < 0) {
      jsszfx = "jiang";
    }
    document.getElementById("jsz").innerHTML =
      "较上周<span class='" + jszfx + "'><i></i>" + json.jsz + "</span>";
    document.getElementById("jssz").innerHTML =
      "较上上周<span class='" + jsszfx + "'><i></i>" + json.jssz + "</span>";
  });
}

function getTradeDataForC1() {
  $.get("/datacenter/index/tradedata/data1.jspx", function (data) {
    var json = eval("(" + data + ")");
    loadC0(json.data1, json.data2, json.data3);
  });
}

function getTradeDataForC2() {
  $.get("/datacenter/index/tradedata/data2.jspx", function (data) {
    var json = eval("(" + data + ")");
    loadC2(json.data1, json.data2, json.data3);
  });
}

function getTradeOrderData() {
  $.get(
    "/datacenter/index/tradedata/tradeorderdata.jspx?num=10",
    function (data) {
      var json = eval("(" + data + ")");
      var liHtml = "";
      for (var i = 0; i < json.length; i++) {
        var v =
          "<li><div class='text1 clearfix'><span class='meiz'>" +
          json[i].varietyname +
          "</span><span><i class='cjj'>" +
          json[i].toprice +
          "</i>元/吨</span></div><div class='text2 clearfix'><span class='shul'>成交量&nbsp;<i>" +
          json[i].toquality +
          "</i>&nbsp;吨</span><span class='zhib'>成交时间&nbsp;<i>" +
          json[i].time +
          "</i></span></div></li>";
        liHtml = liHtml + v;
      }
      document.getElementById("tradeorderlist").innerHTML = liHtml;
      $(".zxcj_list").myScroll({
        speed: 50, //数值越大，速度越慢
        rowHeight: 75, //li的高度
      });
    }
  );
}

function getHighWayData() {
  $.get("/datacenter/index/highwaydata.jspx", function (data) {
    var json = eval("(" + data + ")");
    for (var i = 0; i < json.length; i++) {
      if (i == 3) {
        var tempv = json[i].value / 10000;
        document.getElementById("d" + json[i].zhibid).innerHTML =
          tempv.toFixed(2) + "<span>万吨</span>";
      } else {
        document.getElementById("d" + json[i].zhibid).innerHTML =
          json[i].value + "<span>" + json[i].danw + "</span>";
      }
    }
  });
}

function getHighWayDataEcharts() {
  $.get("/datacenter/index/highwaydataechart.jspx", function (data) {
    var json = eval("(" + data + ")");
    //console.log("---------" + JSON.stringify(json) );
    loadC3(json);
  });
}

function getHighWayDataDetail() {
  $.get("/datacenter/index/highwaydata/detail.jspx", function (data) {
    var json = eval("(" + data + ")");
    var tempval = "";
    for (var i = 0; i < json.length; i++) {
      tempval =
        tempval +
        "<li><span>" +
        json[i].weid +
        "</span><span>" +
        json[i].weid2 +
        "</span><span>" +
        json[i].weid4 +
        "</span><span>" +
        json[i].weid3 +
        "</span><span>" +
        json[i].weid5 +
        "</span><span><b>" +
        json[i].value +
        "</b>吨</span></li>";
    }
    document.getElementById("highwaydatadetail").innerHTML = tempval;
    $("#s2").Scroll({
      line: 2,
      speed: 500,
      timer: 4000,
    });
  });
}

function getFinanceData() {
  $.get("/datacenter/index/financedata.jspx", function (data) {
    var json = eval("(" + data + ")");
    for (var i = 0; i < json.length; i++) {
      if (json[i].zhibid == "31") {
        var tempval = json[i].value;
        if (String(tempval).length > 1) {
          var v1 = String(tempval).substring(
            0,
            (String(tempval).length / 2).toFixed()
          );
          tempval = (v1 + "00000000").substr(0, String(tempval).length);
        }
        document.getElementById("d" + json[i].zhibid).innerHTML =
          tempval + "<i>+</i><span>" + json[i].danw + "</span>";
      } else if (json[i].zhibid == "53") {
        var tempv = (json[i].value / 10000).toFixed();
        tempv = Math.floor(tempv);
        if (String(tempv).length > 1) {
          var v2 = String(tempv).substring(
            0,
            (String(tempv).length / 2).toFixed()
          );
          tempv = (v2 + "00000000").substr(0, String(tempv).length);
        }
        document.getElementById("d" + json[i].zhibid).innerHTML =
          tempv + "<i>+</i><span>亿元</span>";
      } else if (json[i].zhibid == "33") {
        var tempval1 = json[i].value;
        if (String(tempval1).length > 1) {
          var v3 = String(tempval1).substring(
            0,
            (String(tempval1).length / 2).toFixed()
          );
          tempval1 = (v3 + "00000000").substr(0, String(tempval1).length);
        }
        document.getElementById("d" + json[i].zhibid).innerHTML =
          tempval1 + "<i>+</i><span>" + json[i].danw + "</span>";
      } else if (json[i].zhibid == "34") {
        var tempv2 = Math.floor(json[i].value);
        if (String(tempv2).length > 1) {
          var v4 = String(tempv2).substring(
            0,
            (String(tempv2).length / 2).toFixed()
          );
          tempv2 = (v4 + "00000000").substr(0, String(tempv2).length);
        }
        document.getElementById("d" + json[i].zhibid).innerHTML =
          tempv2 + "<i>+</i><span>万元</span>";
      }
    }
  });
}

function loadJgzsZb(name) {
  $.get("/datacenter/jgzs/datalist.jspx", function (data) {
    var json = eval("(" + data + ")");
    for (var i = 0; i < json.data.length; i++) {
      if (name == json.data[i].INDEX_CLASS) {
        var tabhtml = "";
        var defname = "";
        for (var j = 0; j < json.data[i].list.length; j++) {
          if (j == 0) {
            tabhtml =
              tabhtml +
              "<span class='over'>" +
              json.data[i].list[j].INDEX_NAME +
              "</span>";
            defname = json.data[i].list[j].INDEX_NAME;
          } else {
            tabhtml =
              tabhtml + "<span>" + json.data[i].list[j].INDEX_NAME + "</span>";
          }
        }
        document.getElementById("jgzs-tab2").innerHTML = tabhtml;
      }
    }
    initJgzsTab();
    loadJgzsZbdata(defname);
    loadJgzsPs(name);
  });
}

function loadJgzsZbdata(name) {
  $.get("/datacenter/jgzs/datalist.jspx", function (data) {
    var json = eval("(" + data + ")");
    for (var i = 0; i < json.data.length; i++) {
      for (var j = 0; j < json.data[i].list.length; j++) {
        if (name == json.data[i].list[j].INDEX_NAME) {
          document.getElementById("bq").textContent =
            json.data[i].list[j].BQ_JG;
          document.getElementById("sq").textContent =
            json.data[i].list[j].PREPRICE;
          var fx = "ping";
          var dz = Number(json.data[i].list[j].DZ);
          if (dz > 0) {
            fx = "sheng";
          } else if (dz < 0) {
            fx = "jiang";
          }
          document.getElementById("hb").innerHTML =
            "环比（元/吨）<span class='" +
            fx +
            "'><b></b>" +
            json.data[i].list[j].DZ;
        }
      }
    }
    loadJgzsZbEchartsdata(name);
  });
}

function loadJgzsZbEchartsdata(name) {
  $.post(
    "/datacenter/jgzs/echarts/datalist.jspx",
    { indexname: name },
    function (data) {
      var json = eval("(" + data + ")");
      render("zstb", json, "", name);
    }
  );
}

function loadJgzsPs(name) {
  $.get("/datacenter/jgzs/datadesclist.jspx", function (data) {
    var json = eval("(" + data + ")");
    var bhtml =
      "<a href='http://cj.ctctc.cn/newjgzs/rest/jgzsfl/v3/getPriceInfo' target='_blank' class='shup_more'>更多<b></b></a>";
    if (name == "动力煤") {
      document.getElementById("zbps").innerHTML = json.data.dlm_ps + bhtml;
    } else if (name == "炼焦煤") {
      document.getElementById("zbps").innerHTML = json.data.ljm_ps + bhtml;
    } else if (name == "无烟煤") {
      document.getElementById("zbps").innerHTML = json.data.wym_ps + bhtml;
    }
  });
}

function loadTermList() {
  $.get("/datacenter/jgzs/termlist.jspx", function (data) {
    var json = eval("(" + data + ")");
    var thtml = "";
    if (json.data.length > 0) {
      for (var i = 0; i < json.data.length; i++) {
        thtml +=
          "<li> <a href='http://cj.ctctc.cn/newjgzs/rest/jgzsfl/v3/getPriceInfo?id=" +
          json.data[i].id +
          "'  target='_blank'>总" +
          json.data[i].stageNo +
          "期(" +
          json.data[i].issueDate +
          ")</a></li>";
      }
      document.getElementById("jgzstermlist").innerHTML = thtml;
    }
  });
}

jQuery(".slide-item-box .bd li").each(function (i) {
  jQuery(".slide-item-box .bd li")
    .slice(i * 9, i * 9 + 9)
    .wrapAll("<ul></ul>");
});
var option = {
  titCell: ".hd ul",
  mainCell: ".bd .ygList",
  autoPage: true,
  effect: "leftLoop",
  autoPlay: true,
  interTime: 7000,
};
if ($(".ygList li").length <= 9) {
  option.vis = 9;
}
jQuery(".slide-item-box").slide(option);

function loadC0(data1, data2, data3) {
  var myChart0 = echarts.init(document.getElementById("c0"));
  // 4、指定配置项和数据(option)
  var option0 = {
    legend: {
      data: ["今日", "昨日"],
      x: "right", // 图例水平居中
      y: "buttom", // 图例垂直居上
    },
    xAxis: {
      data: data1,
      axisLabel: {
        interval: false,
      },
    },
    yAxis: [
      {
        type: "value",
        name: "成交量（万吨）",
        position: "left",
        alignTicks: false,
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter: "",
        },
      },
      {
        type: "value",
        name: "",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
        },
      },
    ],

    series: [
      {
        name: "今日",
        type: "line",
        data: data2,
        color: "#ff7f7e",
        yAxisIndex: 1,
        label: {
          show: true,
          position: "top",
          textStyle: {
            fontSize: 12,
          },
        },
      },
      {
        name: "昨日",
        type: "line",
        data: data3,
        color: "#5f95ff",
        yAxisIndex: 1,
        label: {
          show: true,
          position: "top",
          textStyle: {
            fontSize: 12,
          },
        },
      },
    ],
  };
  // 5、将配置项设置给 echarts 实例对象
  myChart0.setOption(option0);
}

function loadC2(data1, data2, data3) {
  // 3、初始化 echarts 实例对象
  var myChart2 = echarts.init(document.getElementById("c2"));
  // 4、指定配置项和数据(option)
  var option2 = {
    legend: {
      data: ["本周", "上周"],
      x: "right", // 图例水平居中
      y: "buttom", // 图例垂直居上
    },
    xAxis: {
      data: data1,
    },
    yAxis: [
      {
        type: "value",
        name: "成交量（万吨）",
        position: "left",
        alignTicks: false,
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter: "",
        },
      },
      {
        type: "value",
        name: "",
        position: "left",
        alignTicks: true,
        axisLine: {
          show: true,
        },
      },
    ],

    series: [
      {
        name: "本周",
        type: "bar",
        data: data3,
        color: "#ff7f7e",
        yAxisIndex: 1,
        label: {
          show: true,
          position: "top",
          textStyle: {
            fontSize: 12,
          },
        },
      },
      {
        name: "上周",
        type: "bar",
        data: data2,
        color: "#5f95ff",
        yAxisIndex: 1,
        label: {
          show: true,
          position: "top",
          textStyle: {
            fontSize: 12,
          },
        },
      },
    ],
  };
  // 5、将配置项设置给 echarts 实例对象
  myChart2.setOption(option2);
}

//线上服务专员默认加载
$(document).ready(function () {
  fwztTab([1], 1);
});
$(document).on("click", ".fwzy-main", function (e) {
  var itemClass = $(e.target)[0].className;
  if (itemClass && itemClass.split(0, 3)[0] == "tab") {
    if (!$(e.target).hasClass("over")) {
      $(e.target).siblings().removeClass("over");
      $(e.target).addClass("over");
      var tabID = $(e.target).parent()[0].id;
      var arr = tabID.split("-");
      arr.splice(0, 2);
      var level = itemClass.split("0")[1];
      fwztTab(arr, level);
    }
  }
});
//线上服务专员 标签切换方法
function fwztTab(arr, level) {
  var str = "";
  for (i = 0; i < arr.length; i++) {
    str += "-" + arr[i];
  }
  var con = $("#fwzy-con" + str + " .con0" + level);
  var tab = $("#fwzy-con" + str + " .con0" + level);
  con.hide();
  for (var i = 1; i <= con.length; i++) {
    var item = $("#fwzy-tab" + str).children(
      ".tab0" + level + ":nth-child(" + i + ")"
    );
    if (item.hasClass("over")) {
      var itemCon = $(
        "#fwzy-con" + str + " .con0" + level + ":nth-child(" + i + ")"
      );
      itemCon.show();
      if (itemCon.children().hasClass("fwzy-line02")) {
        arr.push(i);
        fwztTab(arr, 2);
      } else if (itemCon.children().hasClass("fwzy-line03")) {
        arr.push(i);
        fwztTab(arr, 3);
      }
      console.log("#roll-new" + str + "-" + i);
      console.log($("#roll-new" + str + "-" + i + " li").length);
      if (
        !$("#roll-new" + str + "-" + i).hasClass("checkRoll") &&
        $("#roll-new" + str + "-" + i + " li").length >= 5
      ) {
        fwztRoll(str, i);
      }
    }
  }
}
//线上服务专员 滚动
function fwztRoll(str, i) {
  $("#roll-new" + str + "-" + i).parallelRoll({
    boxName: "fwzy2",
    tagName: "li",
    time: 3000,
    direction: "left",
    visual: 5, //可视数
    prev: "fwzy_next",
    next: "fwzy_prev",
    amount: 1,
  });
  $("#roll-new" + str + "-" + i).addClass("checkRoll");
}

var Tags_index01 = document
  .getElementById("jgzs-tab")
  .getElementsByTagName("a");
//var TagsCnt_index01 = document.getElementById('jgzs-con').getElementsByTagName('em');
var len_index01 = Tags_index01.length;
var flag_index01 = 0;
for (i = 0; i < len_index01; i++) {
  Tags_index01[i].value = i;
  Tags_index01[i].onclick = function () {
    changeNav_index01(this.value);
  };
  //TagsCnt_index01[i].className = 'undis';
}
Tags_index01[flag_index01].className = "over";
//TagsCnt_index01[flag_index01].className = 'dis';

function changeNav_index01(v) {
  Tags_index01[flag_index01].className = "out";
  // TagsCnt_index01[flag_index01].className = 'undis';
  flag_index01 = v;
  Tags_index01[v].className = "over";
  // TagsCnt_index01[v].className = 'dis';
}

jQuery(document).ready(function ($) {
  $(".ls_btn").click(function () {
    $(".ls_list").fadeIn(100);
  });

  $(".ls_btnqd .close").click(function () {
    $(".ls_list").fadeOut(100);
  });
});

const MIXCHAT_WIDGET = "mixchat-widget:";
const CW_CONVERSATION = "cw_conversation";

const sendMessage = function (key) {
  document
    .getElementById("chat-iframe")
    .contentWindow.postMessage(
      MIXCHAT_WIDGET + JSON.stringify({ event: key }),
      "*"
    );
};

const setCookie = function (key, value, expirationDate, sameSite) {
  var cookieString = key + "=" + value;
  if (expirationDate) {
    cookieString += "; expires=" + expirationDate.toUTCString();
  }
  if (sameSite) {
    cookieString += "; SameSite=" + sameSite;
  }
  cookieString += "; path=/";
  document.cookie = cookieString;
};

const getCookie = function (key) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    if (cookie.indexOf(key + "=") === 0) {
      return cookie.substring(key.length + 1);
    }
  }
  return null;
};

const entries = function (obj) {
  var keys = Object.keys(obj);
  return keys;
};

const isIE = function () {
  return typeof Set === "undefined" || typeof Set.prototype.keys !== "function";
};

document.addEventListener("DOMContentLoaded", function () {
  var openChatBtn = document.getElementById("open-chat-btn");
  var chatContainer = document.getElementById("chat-container");
  var closeBtn = document.getElementById("close-btn");
  var chatIframe = document.getElementById("chat-iframe");
  var tip = document.getElementById("tip");
  var url =
    "https://chatai.mixcom.cn/h5?website_token=TE76W39nJLyQfXpYUUxvSsno";
  var cw = getCookie(CW_CONVERSATION);
  if (cw) {
    url += "&" + CW_CONVERSATION + "=" + cw;
  }
  //if (!isIE()) {
  chatIframe.src = url;
  //}

  openChatBtn.addEventListener("click", function () {
    chatContainer.classList.add("open");
    //if (!isIE()) {
    sendMessage("init_open");
    //} else {
    // tip.classList.add("show");
    //}
  });

  closeBtn.addEventListener("click", function () {
    chatContainer.classList.remove("open");
    tip.classList.remove("show");
  });
});

window.onmessage = function (e) {
  if (typeof e.data !== "string" || e.data.indexOf(MIXCHAT_WIDGET) !== 0) {
    return;
  }
  const message = JSON.parse(e.data.replace(MIXCHAT_WIDGET, ""));
  if (message.event == "loaded") {
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    const entries = Object.keys(message.data);
    entries.forEach(function (key) {
      setCookie(key, message.data[key], expirationDate, "Lax");
    });
  }
};

var myPi2 = new Pike(".scgg-scroll", {
  type: 3, // 轮播的类型(1渐隐)
  automatic: true, //是否自动轮播 (默认false)
  autoplay: 4000, //自动轮播毫秒 (默认3000)
  hover: true, //鼠标悬停轮播 (默认false)
  mousewheel: true, //是否开启鼠标滚动轮播(默认false)
  drag: false, //是否开启鼠标拖动 (默认为: true, 如不需要拖动设置false即可)
  loop: true, //是否循环轮播 (默认为: false)
});
var Tags1 = document.getElementById("gg_tit").getElementsByTagName("a");
var TagsCnt1 = document.getElementById("gg_cont").getElementsByTagName("ul");
var len1 = Tags1.length;
var flag1 = 0; //修改默认值
for (i = 0; i < len1; i++) {
  Tags1[i].value = i;
  Tags1[i].onmouseover = function () {
    changeNav1(this.value);
  };
  TagsCnt1[i].className = "undis";
}
Tags1[flag1].className = "over";
TagsCnt1[flag1].className = "dis";
function changeNav1(v) {
  Tags1[flag1].className = "out";
  TagsCnt1[flag1].className = "undis";
  flag1 = v;
  Tags1[v].className = "over";
  TagsCnt1[v].className = "dis";
}
var myPi = new Pike(".lubo_box", {
  type: 1, // 轮播的类型(1渐隐)
  automatic: true, //是否自动轮播 (默认false)
  autoplay: 8000, //自动轮播毫秒 (默认3000)
  hover: true, //鼠标悬停轮播 (默认false)
  arrowColor: "white", //箭头颜色 (默认绿色)
  arrowBackgroundType: 1, //箭头背景类型 (1: 方形, 2:圆形)
  arrowBackground: 2, //箭头背景色 (1:白色,2:黑色, 默认:无颜色)
  arrowTransparent: 0.2, //箭头背景透明度 (默认: 0.5)
  spotColor: "white", //圆点颜色 (默认: 白色)
  spotType: 2, //圆点的形状 (默认: 圆形, 1:圆形, 2.矩形)
  spotSelectColor: "#333333", //圆点选中颜色 (默认绿色)
  spotTransparent: 0.8, //圆点透明度 (默认0.8)
  mousewheel: true, //是否开启鼠标滚动轮播(默认false)
  drag: false, //是否开启鼠标拖动 (默认为: true, 如不需要拖动设置false即可)
  loop: true, //是否循环轮播 (默认为: false)
});
function loadC3(data) {
  var myChart = echarts.init(document.getElementById("main"));
  // 数据格式 地图上标点为citys，value为经纬度，symbolSize为标记点的大小
  // 数据格式 moveLines，fromName为线条出发城市，toName为线条到达城市，coords为数组经纬度，第一个为出发点经纬度，第二个为到达点经纬度
  var allData = data;
  option = {
    backgroundColor: "#fff", // 地图背景颜色
    title: {
      text: "", // 地图标题设置
      subtext: "", // 地图小标题设置
      sublink: "", //小标题链接
      target: "", //'self' 当前窗口打开，'blank' 新窗口打开
      padding: 5, // 标题内边距 5  [5, 10]  [5,10,5,10]
      left: "center", // 组件离容器左侧的距离,'left', 'center', 'right','20%'
      top: "5%", // 组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
      right: "auto", // 组件离容器右侧的距离,'20%'
      bottom: "auto", // 组件离容器下侧的距离,'20%'
      textStyle: {
        color: "#ffffff", //文字颜色
        fontStyle: "normal", // italic斜体  oblique倾斜
        fontWeight: "normal", // 文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
        fontFamily: "sans-serif", // 字体系列
        fontSize: 20, // 字体大小
      },
    },
    legend: {
      // 右下角图例
      show: false, // 是否显示
      orient: "vertical", // 图例排列方向
      top: "bottom", // 位置
      left: "right", // 位置
      data: ["地点", "线路"], // 数据
      textStyle: {
        // 文字设置
        color: "#666",
      },
    },
    geo: {
      show: true, // 是否显示
      zoom: 5, // 设置地图的初始缩放级别
      map: "china", // 地图类型。world世界地图，china中国地图
      center: [112.548879, 37.87059], //当前视角的中心点，用经纬度表示
      label: {
        normal: {
          //普通状态下的标签文本样式。(省份名称)
          show: true, //是否在普通状态下显示标签。
          textStyle: {
            // 文字设置
            color: "#000000",
            fontSize: 16,
          },
        },
        emphasis: {
          // 是否在高亮状态下显示标签。(省份名称)
          show: true,
          textStyle: {
            // 文字设置
            color: "#ffffff",
          },
        },
      },
      roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
      itemStyle: {
        // 地图板块区域的多边形 图形样式
        normal: {
          // 默认板块信息
          areaColor: "#d0d2da",
          borderColor: "#b5b6b9",
        },
        emphasis: {
          // 高亮版板块信息
          areaColor: "#a2a6b4",
        },
      },
    },
    series: [
      {
        name: "地点",
        type: "effectScatter", // 特效散点图
        coordinateSystem: "geo", // 'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
        zlevel: 2, // 所有图形的 zlevel 值。
        rippleEffect: {
          //涟漪特效相关配置。
          brushType: "stroke", //波纹的绘制方式，可选 'stroke' 和 'fill'。
          period: 4, // 动画的时间。
          scale: 2.5, // 动画中波纹的最大缩放比例。
        },
        label: {
          normal: {
            show: true, //是否显示标签。
            // position: "inside",          //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
            // offset: [30, 40],             //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
            //  formatter: '{b}',       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
            formatter: function (param) {
              if (
                param.name == "太原市" ||
                param.name == "大同市" ||
                param.name == "晋城市" ||
                param.name == "临汾市" ||
                param.name == "吕梁市" ||
                param.name == "朔州市" ||
                param.name == "阳泉市" ||
                param.name == "运城市" ||
                param.name == "长治市" ||
                param.name == "晋中市" ||
                param.name == "忻州市"
              ) {
                return param.name;
              } else {
                return "";
              }
            },
            textStyle: {
              // 文字设置
              color: "#000000",
              fontSize: 12,
            },
          },
          emphasis: {
            show: true,
            position: "right",
            formatter: "{b}",
          },
        },
        symbolSize: 2, // 标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
        showEffectOn: "render", // 配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
        itemStyle: {
          // 图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
          normal: {
            color: "#46bee9",
          },
        },
        data: allData.citys,
      },
      {
        name: "线路",
        type: "lines",
        coordinateSystem: "geo", // 'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
        zlevel: 2,
        large: true, // 是否开启大规模散点图的优化，在数据图形特别多的时候（>=5k）可以开启。开启后配合 largeThreshold 在数据量大于指定阈值的时候对绘制进行优化。缺点：优化后不能自定义设置单个数据项的样式。
        effect: {
          show: true,
          constantSpeed: 15, // 点移动的速度
          symbol: "pin", // 图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
          symbolSize: 5, // 标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
          trailLength: 0, // 线的宽度
        },
        lineStyle: {
          // 线的颜色、宽度，样式设置
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#d0101a",
                },
                {
                  offset: 1,
                  color: "#d0111a",
                },
              ],
              false
            ),
            width: 1, // 线的宽度
            opacity: 0.5, // 线的透明度
            curveness: 0.15, // 线的完全程度
          },
        },
        data: allData.moveLines,
      },
    ],
  };
  myChart.setOption(option);
}

var Tags_index04 = document
  .getElementById("nyzx_tab")
  .getElementsByTagName("span");
var TagsCnt_index04 = document
  .getElementById("nyzx_list")
  .getElementsByTagName("ul");
var len_index04 = Tags_index04.length;
var flag_index04 = 0;
for (i = 0; i < len_index04; i++) {
  Tags_index04[i].value = i;
  Tags_index04[i].onclick = function () {
    changeNav_index04(this.value);
  };
  TagsCnt_index04[i].className = "undis";
}
Tags_index04[flag_index04].className = "over";
TagsCnt_index04[flag_index04].className = "dis";

function changeNav_index04(v) {
  Tags_index04[flag_index04].className = "out";
  TagsCnt_index04[flag_index04].className = "undis";
  flag_index04 = v;
  Tags_index04[v].className = "over";
  TagsCnt_index04[v].className = "dis";
}
function initJgzsTab() {
  var Tags_index02 = document
    .getElementById("jgzs-tab2")
    .getElementsByTagName("span");
  //var TagsCnt_index02 = document.getElementById('jgzs-con2').getElementsByTagName('i');
  var len_index02 = Tags_index02.length;
  var flag_index02 = 0;
  for (i = 0; i < len_index02; i++) {
    Tags_index02[i].value = i;
    Tags_index02[i].onclick = function () {
      changeNav_index02(this.value);
      loadJgzsZbdata($(this).text());
    };
    // TagsCnt_index02[i].className = 'undis';
  }
  Tags_index02[flag_index02].className = "over";
  //TagsCnt_index02[flag_index02].className = 'dis';

  function changeNav_index02(v) {
    Tags_index02[flag_index02].className = "out";
    //TagsCnt_index02[flag_index02].className = 'undis';
    flag_index02 = v;
    Tags_index02[v].className = "over";
    //TagsCnt_index02[v].className = 'dis';
  }
}

jQuery(document).ready(function () {
  var qcloud = {};

  $("[_t_nav]").hover(
    function () {
      var _nav = $(this).attr("_t_nav");

      clearTimeout(qcloud[_nav + "_timer"]);

      qcloud[_nav + "_timer"] = setTimeout(function () {
        $("[_t_nav]").each(function () {
          $(this)[_nav == $(this).attr("_t_nav") ? "addClass" : "removeClass"](
            "nav-up-selected"
          );
        });

        $("#" + _nav)
          .stop(true, true)
          .slideDown(200);
      }, 150);
    },
    function () {
      var _nav = $(this).attr("_t_nav");

      clearTimeout(qcloud[_nav + "_timer"]);

      qcloud[_nav + "_timer"] = setTimeout(function () {
        $("[_t_nav]").removeClass("nav-up-selected");

        $("#" + _nav)
          .stop(true, true)
          .slideUp(200);
      }, 150);
    }
  );
});
//滚动插件
(function ($) {
  $.fn.extend({
    Scroll: function (opt, callback) {
      //参数初始化
      if (!opt) var opt = {};
      var _this = this.eq(0).find("ul:first");
      var lineH = _this.find("li:first").height(), //获取行高
        line = opt.line
          ? parseInt(opt.line, 10)
          : parseInt(this.height() / lineH, 10), //每次滚动的行数，默认为一屏，即父容器高度
        speed = opt.speed ? parseInt(opt.speed, 10) : 500, //卷动速度，数值越大，速度越慢（毫秒）
        timer = opt.timer ? parseInt(opt.timer, 10) : 3000; //滚动的时间间隔（毫秒）
      if (line == 0) line = 1;
      var upHeight = 0 - line * lineH;
      //滚动函数
      scrollUp = function () {
        _this.animate(
          {
            marginTop: upHeight,
          },
          speed,
          function () {
            for (i = 1; i <= line; i++) {
              _this.find("li:first").appendTo(_this);
            }
            _this.css({
              marginTop: 0,
            });
          }
        );
      };
      //鼠标事件绑定
      _this
        .hover(
          function () {
            clearInterval(timerID);
          },
          function () {
            timerID = setInterval("scrollUp()", timer);
          }
        )
        .mouseout();
    },
  });
})(jQuery);
document.write(
  unescape(
    "%3Cspan id='cnzz_stat_icon_1833042'%3E%3C/span%3E%3Cscript src='https://s6.cnzz.com/stat.php%3Fid%3D1833042%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"
  )
);
