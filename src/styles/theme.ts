import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },

  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        color: props.colorMode === 'dark' ? 'gray.300' : 'gray.900',
      },
    }),
  },
})

export default theme
