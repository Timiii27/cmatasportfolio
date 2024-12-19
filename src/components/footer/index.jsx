import { Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-primary text-light py-4  w-full opacity-100 z-10">
      <Container maxWidth="md">
        <Typography variant="body2" align="center" color="inherit">
          © 2024 Your Name. All Rights Reserved.
        </Typography>
        <Typography variant="body2" align="center" color="inherit">
          Follow me on: Instagram | LinkedIn | Twitter
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
