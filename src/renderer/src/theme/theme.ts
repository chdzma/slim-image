import { createTheme } from '@mui/material/styles'

// `extendTheme` is a new API
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5be0e5'
    },
    secondary: {
      main: '#ffffff'
    },
    background: {
      default: '#001718',
      paper: '#001718'
    },
    error: {
      main: '#d32f2f'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
})

export default theme
