import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssHtml from "postcss-html";
import postcssCustomProperties from "postcss-custom-properties";

const syntax = postcssHtml({});

/**
 * Process an HTML string and auto-prefix CSS blocks and inline style. Expands CSS variables as well.
 *
 * @param {String} source HTML source
 */
export const processCss = async (source) => {
    return postcss([postcssCustomProperties, autoprefixer])
        .process(source, { syntax, from: undefined })
        .then((result) => result.content);
};
