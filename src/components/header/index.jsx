import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-scroll";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fashion Portfolio
        </Typography>
        <Link to="about" smooth={true} duration={500}>
          <Button color="inherit">About</Button>
        </Link>
        <Link to="portfolio" smooth={true} duration={500}>
          <Button color="inherit">Portfolio</Button>
        </Link>
        <Link to="contact" smooth={true} duration={500}>
          <Button color="inherit">Contact</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
