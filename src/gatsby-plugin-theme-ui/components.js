import React from 'react'
import ThemeUIPrism from '@theme-ui/prism'
import PrismCore from 'prismjs/components/prism-core'

const langs = [
  "markup",
  "bash",
  "clike",
  "c",
  "cpp",
  "css",
  "css-extras",
  "javascript",
  "jsx",
  "js-extras",
  "coffeescript",
  "diff",
  "git",
  "go",
  "graphql",
  "handlebars",
  "less",
  "makefile",
  "markdown",
  "objectivec",
  "ocaml",
  "python",
  "reason",
  "sass",
  "scss",
  "sql",
  "stylus",
  "tsx",
  "typescript",
  "wasm",
  "yaml",
  "csharp",
  "java"]
langs.forEach(lang => {
  require(`prismjs/components/prism-${lang}`)
})
export default {
  pre: props => props.children,
  code: props => <ThemeUIPrism {...props} Prism={PrismCore} />,
}
