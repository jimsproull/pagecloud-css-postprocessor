const htmlSource = `<html>
<head>
<style>
    :root {
        --pc-color-1: rgba(0,1,2,.3);
        --pc-color-2: red;
    }
    :root {
        --my-custom-color: var(--pc-color-2);
    }
</style>
<style>
    .foo {
        color: var(--pc-color-1);
        background-color: var(--pc-color-2);
        border-color: var(--my-custom-color);
    }

    ::placeholder {
        color: gray;
        }

        @media (min-resolution: 2dppx) {
        .image {
            background-image: url(image@2x.png);
        }
        }
</style>
<div class="foo" style="color: var(--my-custom-color);">
    hi!
</div>
</html>`;

const source = htmlSource;

import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssHtml from "postcss-html";
import postcssCustomProperties from "../postcss-custom-properties/index.esm.mjs";

const syntax = postcssHtml({});

postcss([postcssCustomProperties, autoprefixer])
  .process(source, { syntax })

  .then(function (result) {
    console.log(result.content);
  });
