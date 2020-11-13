module.exports = {
//  syntax: require('postcss-html')({
	// syntax for parse scss (non-required options)
//	scss: require('postcss-scss'),
	// syntax for parse less (non-required options)
//	less: require('postcss-less'),
	// syntax for parse css blocks (non-required options)
//	css: require('postcss-safe-parser'),
//}),
  plugins: [
    require('postcss-custom-properties')({ }),
    require('autoprefixer')({ }),
  ],
}
