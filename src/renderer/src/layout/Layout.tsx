import { Stack } from "@mui/material";
import React from "react";

type LayoutProps = {
  children: any;
};

export const Layout = ({ children }: LayoutProps) => {
  return <Stack p={2}>{children}</Stack>;
};
