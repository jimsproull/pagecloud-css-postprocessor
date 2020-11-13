const htmlSource = `<html>
<head>
<style>
    :root {
        --pc-color-1: rgba(0,1,2,.3);
        --pc-color-2: red;
    }
</style>
<style>
    .foo {
        color: var(--pc-color-1);
        background-color: var(--pc-color-2);
    }

    ::placeholder {
        color: gray;
        }

        .image {
        background-image: url(image@1x.png);
        }
        @media (min-resolution: 2dppx) {
        .image {
            background-image: url(image@2x.png);
        }
        }
</style>
<div class="foo">
    hi!
</div>
</html>`;

const cssSource = `:root {
    --pc-color-1: rgba(0,1,2,.3);
    --pc-color-2: red;
}
.foo {
    color: var(--pc-color-1);
    background-color: var(--pc-color-2);
}`;

const source = htmlSource;

import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssHtml from "postcss-html";
import postcssCustomProperties from "./postcss-custom-properties/src/index.mjs";

// const postcss = require("postcss");
// const autoprefixer = require("autoprefixer");
const syntax = postcssHtml({
  // syntax for parse scss (non-required options)
  //scss: require('postcss-scss'),
  // syntax for parse less (non-required options)
  //less: require('postcss-less'),
  // syntax for parse css blocks (non-required options)
  //css: require('postcss-safe-parser'),
});
// const postcssCustomProperties = require("postcss-custom-properties");

postcss([postcssCustomProperties, autoprefixer])
  .process(source, { syntax })
  //.process(source)
  .then(function (result) {
    // An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
    console.log(result.content);
  });
