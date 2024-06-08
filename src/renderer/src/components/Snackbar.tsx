import * as React from 'react'
import Box from '@mui/material/Box'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import { useEffect } from 'react'

interface State extends SnackbarOrigin {
  open: boolean
}

type CustomSnackbarProps = {
  message: string
  visible: boolean
}

export default function CustomSnackbar({ message, visible }: CustomSnackbarProps) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })

  const { vertical, horizontal, open } = state

  useEffect(() => {
    setState({ ...state, open: visible })
  }, [visible])

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
  )
}
