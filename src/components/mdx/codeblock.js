/* eslint react/jsx-key: 0 */

import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { mdx } from '@mdx-js/react'
import dracula from 'prism-react-renderer/themes/dracula';
import Prism from 'prismjs/components/prism-core';

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


export default ({ children, className, live, render }) => {
  const language = (!className || className=="")? "": className.replace(/language-/, '')

  if (live) {
    return (
      <div style={{ marginTop: '40px', backgroundColor: 'black' }}>
        <LiveProvider
          code={children.trim()}
          transformCode={code => '/** @jsx mdx */' + code}
          scope={{ mdx }}
        >
          <LivePreview />
          <LiveEditor />
          <LiveError />
        </LiveProvider>
      </div>
    )
  }

  if (render) {
    return (
      <div style={{ marginTop: '40px' }}>
        <LiveProvider code={children}>
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }

  return (
    <Highlight {...defaultProps} Prism={Prism} code={children.trim()} language={language} theme={dracula}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} 
            style={{ ...style, padding: '20px', overflowX: 'scroll', borderRadius: '5px'}}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
      )}
    </Highlight>
  )
}