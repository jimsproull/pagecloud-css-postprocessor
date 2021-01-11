const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcssHtml = require("postcss-html");
const postcssCustomProperties = require("postcss-custom-properties");

const syntax = postcssHtml({});

/**
 * Process an HTML string and auto-prefix CSS blocks and inline style. Expands CSS variables as well.
 *
 * @param {String} source HTML source
 */
const processCss = async (source) => {
    const post = postcss([postcssCustomProperties, autoprefixer]);
    return post
        .process(source, { syntax, from: undefined })
        .then((result) => result.content);
};

exports.processCss = processCss;
