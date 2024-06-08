import { Stack } from '@mui/material'

type LayoutProps = {
  children: any
}

export const Layout = ({ children }: LayoutProps) => {
  return <Stack p={2}>{children}</Stack>
}
