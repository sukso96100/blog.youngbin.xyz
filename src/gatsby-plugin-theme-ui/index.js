import { system, deep } from "@theme-ui/presets"
import { darken, lighten } from '@theme-ui/color'
import prism from '@theme-ui/prism/presets/theme-ui'

export default {
  useColorSchemeMediaQuery: true,
  ...system,
  styles: {
    ...system.styles,
    blockquote: {
      borderLeft: "5px solid",
      borderLeftColor: 'text',
      padding: 1,
      paddingLeft: 2,
      backgroundColor: darken('background', 0.01),
    },
    code: {
      ...prism,
    }
  },
  colors: {
    ...system.colors,
    modes: {
      dark: {
        ...deep.colors,
      },
    },
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
      backgroundColor: lighten('background', 0.1),
      textDecoration: "none",
      ":hover": {
        backgroundColor: darken('background', 0.1),
      },
    },
    compact: {
      padding: 0,
      borderRadius: 5,
      border: "1px solid",
      borderColor: "muted",
      backgroundColor: lighten('background', 0.1),
      textDecoration: "none",
      ":hover": {
        backgroundColor: darken('background', 0.1),
      },
    },
  },
  layout: {
    container: {
      ":hover": {
        backgroundColor: darken('background', 0.1),
      },
    },
  },
}
