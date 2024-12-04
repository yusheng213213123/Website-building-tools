# What is it?

This is a scaffolding tool based on webpack 5 for building websites

# advantage

It can efficiently optimize code chunks, compress code, handle JavaScript, CSS syntax compatibility, and more

# Usage Introduction

## mapFile.js

    export const htmlMap = [
        {
            path: "/",
            entry: () => import("/src/entry/index.js"),
            cssListFunc: [
                () => import("/src/css/animate.css"),
            ],

        },
    ];

1. Each page corresponds to an object, path is the routing address for each page, and entry is the entry JS file for each page

2. Some minor CSS files (not the first screen or animation library) can be loaded after waiting for the main CSS files to finish loading.The cssListFunc property is used to load secondary CSS style sheets

## main.js

main.js can introduce some common libraries, such as jQuery, core-js, etc

Mount onto a global object so that other libraries that use this object can use it

1. example

   ```
   import { htmlMap, loadCss, loadResource } from "./mapFiles.js";
   // 加载次级 CSS
   loadCss(location.pathname);
   import "core-js";
   import $ from "jquery";
   if (window) {
        window.$ = window.jQuery = $;
        loadResource();
   }
   ```
