import {
    Container,
    Box,
    chakra,
    ListItem,
    UnorderedList,
    OrderedList,
    Kbd,
    useColorModeValue,
    Heading,
    Link,
    Divider,
    Text
} from "@chakra-ui/react"
import React from "react"
import CodeBlock from "./codeblock"

const Pre = (props) => <chakra.div my="2em" borderRadius="sm" {...props} />

const Table = (props) => (
    <chakra.div overflowX="auto">
        <chakra.table textAlign="left" mt="32px" width="full" {...props} />
    </chakra.div>
)

const THead = (props) => (
    <chakra.th
        bg={useColorModeValue("gray.50", "whiteAlpha.100")}
        fontWeight="semibold"
        p={2}
        fontSize="sm"
        {...props}
    />
)

const TData = (props) => (
    <chakra.td
        p={2}
        borderTopWidth="1px"
        borderColor="inherit"
        fontSize="sm"
        whiteSpace="normal"
        {...props}
    />
)

const InlineCode = (props) => (
    <chakra.code
        apply="mdx.code"
        color={useColorModeValue("purple.500", "purple.200")}
        {...props}
    />
)

const Quote = (props) => (
    <Box maxW="7xl" borderWidth="1px" borderRadius="lg" px="5" my="2"
        bg={useColorModeValue("gray.50", "gray.900")}  {...props}/>
)
const MDXComponents = {
    h1: (props) => <Heading my="5" as="h1" {...props}><Link href={`#${props.children}`}>{props.children}</Link></Heading>,
    h2: (props) => <Heading my="5" as="h2" {...props}><Link href={`#${props.children}`}>{props.children}</Link></Heading>,
    h3: (props) => <Heading my="5" as="h3" {...props}><Link href={`#${props.children}`}>{props.children}</Link></Heading>,
    h4: (props) => <Heading my="5" as="h4" {...props}><Link href={`#${props.children}`}>{props.children}</Link></Heading>,
    hr: (props) => <Divider {...props} />,
    strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
    inlineCode: InlineCode,
    pre: Pre,
    code: CodeBlock,
    kbd: Kbd,
    br: (props) => <Box height="24px" {...props} />,
    table: Table,
    th: THead,
    td: TData,
    a: (props) => <Link {...props}><Text as="u">{props.children}</Text></Link>,
    p: (props) => <Box my="5"><Text>{props.children}</Text></Box>,
    ul: (props) => <UnorderedList {...props} />,
    ol: (props) => <OrderedList {...props} />,
    li: (props) => <ListItem {...props} />,
    blockquote: Quote
}

export default MDXComponents
