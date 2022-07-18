import React from 'react';
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";
const  Footer = () =>{
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        LUMI
      </Typography>
      <Typography variant="subtitle1"align="center"color="text.secondary"component="p">
        <IconButton target="_blank" href="https://github.com/halil180">
          <GitHubIcon  />
        </IconButton>
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        Lumi &nbsp;
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
export default Footer;