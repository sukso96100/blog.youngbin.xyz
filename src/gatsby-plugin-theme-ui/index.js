import Prism from '@theme-ui/prism'

export default {
  styles: {
    pre: {
      padding: 2,
      borderRadius: 5
    },
    code: {
      fontFamily: `monospace`,
      // from typography overrideThemeStyles
      // "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code"
      fontSize: `inherit`,
    },
    inlineCode: {
      borderRadius: 5,
      color: `secondary`,
      bg: `highlight`,
      paddingTop: `0.15em`,
      paddingBottom: `0.05em`,
      paddingX: `0.2em`,
    },
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#33e",
  },
  links: {
    bold: {
      fontWeight: "bold",
    },
    card: {
      color: "inherit",
      textDecoration: "none",
    },
    nav: {
      px: 2,
      py: 1,
      textTransform: "uppercase",
      letterSpacing: "0.2em",
    },
  },
  cards: {
    primary: {
      padding: 0,
      borderRadius: 10,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      backgroundColor: "white",
      textDecoration: "none",
      ":hover":{
        backgroundColor: "silver"
      }
    },
    compact: {
      padding: 0,
      borderRadius: 5,
      border: "1px solid",
      borderColor: "muted",
      backgroundColor: "white",
      textDecoration: "none",
      ":hover":{
        backgroundColor: "silver"
      }
    },
  },
  layout:{
    container:{
      ":hover":{
        backgroundColor: "silver"
      }
    }
  }
}
