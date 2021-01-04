import 'intersection-observer'
import React from "react"
import { MDXProvider } from "@mdx-js/react"
import * as chakraComponents from "@chakra-ui/react"
import MDXComponents from "./src/components/mdx/mdx"
export const wrapRootElement = ({ element }) => {
    return <MDXProvider components={{ ...MDXComponents, ...chakraComponents }}>{element}</MDXProvider>;
};