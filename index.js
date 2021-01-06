import { process } from "./process.mjs";

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

console.log(process(source));
