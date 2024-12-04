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
export function mounted(params) {}

// 页面的具体逻辑
$(function () {
  // 初始化折线图
  function initLineCharts(dom) {
    if (!dom) return;
    function getDaysInMonth(year, month) {
      var date = new Date(year, month, 0);
      return date.getDate();
    }
    function initMonth() {
      var array = [];
      let i = 1;
      for (
        ;
        i <=
        getDaysInMonth(new Date().getFullYear(), new Date().getMonth() + 1);
        i++
      ) {
        array.push(i);
      }
      return array;
    }
    var dayOfMonth = initMonth();
    var options = {
      tooltip: {
        trigger: "axis", // 触发类型，轴触发
        formatter: function (params) {
          // 自定义显示的内容
          // params 是一个包含当前点信息的数组
          var result = "<div class='tooltip'>";
          params.forEach(function (item) {
            result += "电煤: 750";
          });
          result = result + "</div>";
          return result;
        },
        textStyle: {
          fontSize: "14",
          color: "#FFFFFF",
        },
        backgroundColor: "#3376FF",
        boxShadow: "0px 0px 4px 0px rgba(156,176,255,0.5)",
        borderRadius: 5,
        padding: [5, 20, 5, 20],
        margin: [0],
      },
      grid: {
        top: 52,
        bottom: 34,
        left: 70,
        right: 32,
      },
      xAxis: {
        name: "(日)",
        type: "category",
        data: dayOfMonth,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#E0E0E0", // 轴线颜色
            width: 1, // 轴线宽度
          },
        },
        axisLabel: {
          textStyle: {
            color: "#000000", // 轴标签文字颜色
            fontSize: 16,
          },
        },
        nameTextStyle: {
          fontSize: 16,
          color: "#3376FF",
          padding: [100000, 100, 0, -10],
        },
      },
      yAxis: {
        type: "value",
        name: "价格 (元/吨）",
        nameTextStyle: {
          fontSize: 16,
          color: "#3376FF",
          padding: [1000, 0, 10, 14],
        },
        axisLabel: {
          textStyle: {
            color: "#000000", // 轴标签文字颜色
            fontSize: 16,
          },
        },
      },
      series: [
        {
          data: [
            150, 230, 224, 218, 135, 147, 260, 300, 672, 1231, 23, 342, 352,
            672, 721, 25, 214, 51, 65, 213, 2, 341, 512, 265, 125, 654, 651,
            721, 542, 213,
          ],
          type: "line",
          lineStyle: {
            color: "#3376FF",
          },
          itemStyle: {
            normal: {
              color: "#3376FF", // 点的颜色
              lineStyle: {
                color: "#3376FF", // 线的颜色
              },
            },
          },
          symbol: "circle", // 数据点的形状
          symbolSize: 8, // 数据点的大小
        },
      ],
    };
    var myChart = echarts.init(dom);
    myChart.setOption(options);
  }
  initLineCharts($("#canvas")[0]);
  //  初始化表情
  function initEmo(fn) {
    if ($(".emo_list").length == 0) return;
    for (let index = 12; index <= 80; index++) {
      $(".emo_list").append(`
            <li animation=${"ani" + index}>&#1285${index}</li>     
        `);
    }
    fn();
  }
  function getAllChildHeight($Dom) {
    var height = 0;
    $Dom.children().each((index, item) => {
      height += $(item).height();
    });
    console.log(height, "height");
    return height;
  }
  function addMessage(message) {
    $(".chat_list").append(`
        <li class="me">
             <img src="./assets/images/people.png" alt="" class="head_img right_head">
             <div class="right_chat_box">
                ${message}
             </div>
         </li>
     `);
    //  卷曲值变为0
    const height = getAllChildHeight($(".chat_list"));
    $(".chat_list").scrollTop(height);
  }
  initEmo(function () {
    // 绑定事件
    $(".emo_list").on("click", "li", function () {
      var sendMessage = $(this)[0].innerText;
      addMessage(sendMessage);
      $(".emo_box").hide();
    });
  });
  $(".emo").length > 0 &&
    $(".emo").click(function () {
      $(".emo_box").toggle();
    });
  $(".sendmessage").length > 0 &&
    $(".sendmessage").click(function () {
      var sendMessage = $.trim($("#textarea").val());
      if (!sendMessage) {
        alert("请输入信息");
      } else {
        addMessage(sendMessage);
        $("#textarea").val("");
      }
    });
  $(".chat_operate .mess").length > 0 &&
    $(".chat_operate .mess").click(function () {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/jpeg, image/png";
      input.click();
    });
  $(".contact_nav .tact_item").length > 0 &&
    $(".contact_nav .tact_item").click(function () {
      if ($(this).index() == 3) {
        $(this)
          .find("i")
          .removeClass("fa-angle-down fa-angle-up")
          .addClass("fa-angle-up");
        $("#htstatus").show();
        $("#htstatus li").bind("click", function () {
          $(this).addClass("on").siblings().removeClass("on");
        });
      } else {
        $("#oftenuseaddress + li")
          .find("i")
          .removeClass("fa-angle-up fa-angle-down")
          .addClass("fa-angle-down");
        $("#htstatus").hide();
        $("#htstatus li").unbind("click");
      }
      $(this).addClass("on").siblings().removeClass("on");
      $(".righttable > div").eq($(this).index()).show().siblings().hide();
      setNavHeight();
    });
  function setNavHeight() {
    if (!$(".leftnav")) return;
    $(".leftnav").height($(".righttable").height());
  }
  function saveToken(token) {
    if (token) {
      localStorage.setItem("token", token);
    }
  }
  function deleteToken() {
    localStorage.setItem("token", "");
  }
  window.addEventListener("message", function (e) {
    if (e.data) {
      saveToken(e.data);
    } else {
      deleteToken();
    }
  });
  setNavHeight();
});
