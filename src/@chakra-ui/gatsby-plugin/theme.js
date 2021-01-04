import { extendTheme, ChakraProvider } from "@chakra-ui/react"
const config = {
    useSystemColorMode: true,
    initialColorMode: "light",
  }
const theme = extendTheme({ config })
export default theme