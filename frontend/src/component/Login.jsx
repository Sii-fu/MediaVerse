import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import './Login.css';

import cloud1 from '../assets/cloud1.png';
import cloud2 from '../assets/cloud2.png';
import cloud3 from '../assets/cloud3.png';

const Login = ({ setUserType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userType = selectedUserType;

    try {
      const response = await fetch(`http://localhost:5000/login/${selectedUserType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('userType', selectedUserType);
        localStorage.setItem('username', username);
        
        setUserType(selectedUserType);

        navigate(`/${username}/home`);
      } else {
        Swal.fire({
          title: 'Invalid credentials!',
          text: 'Please enter valid credentials',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-background">
      {/* Floating cloud images */}
      <img src={cloud1} alt="Cloud 1" className="cloud cloud1" />
      <img src={cloud2} alt="Cloud 2" className="cloud cloud2" />
      <img src={cloud3} alt="Cloud 3" className="cloud cloud3" />

      <div className="login-container0">
        <h1 className="login-title">Welcome to <br /> Media & Merchandising <br /> Platform</h1>
        <h1 className="login-title1">Discover, Watch, and Own: Your Gateway to Media & Merchandising</h1>
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group-login1">
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{
                input: { color: 'white' },
                label: { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#888',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: ' #ff640a',
                  },
                },
              }}
            />
          </div>
          <div className="form-group-login1">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                input: { color: 'white' },
                label: { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#888',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: ' #ff640a',
                  },
                },
              }}
            />
          </div>
          <div className="form-group-login">
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="user-type-label" sx={{ color: '#ccc' }}>User Type</InputLabel>
              <Select
                labelId="user-type-label"
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
                label="User Type"
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: ' #ff640a',
                  },
                }}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: ' #ff640a',
              '&:hover': {
                backgroundColor: '#ff900a',
              },
              marginTop: '15px',
            }}
          >
            Login
          </Button>

          <Link to={`/registration`}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ marginTop: '15px', borderColor: '#fff', color: '#fff',
                backgroundColor: 'transparent',
              '&:hover': {
                borderColor: '#ff900a',
              },
               }}
            >
              Registration
            </Button>
          </Link>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;






// import DeleteIcon from "@mui/icons-material/Delete";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FlagIcon from "@mui/icons-material/Flag";
// import GoogleIcon from "@mui/icons-material/Google";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import PersonIcon from "@mui/icons-material/Person";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import RssFeedIcon from "@mui/icons-material/RssFeed";
// import SearchIcon from "@mui/icons-material/Search";
// import SettingsIcon from "@mui/icons-material/Settings";
// import SortIcon from "@mui/icons-material/Sort";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Container,
//   Divider,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import React from "react";

// const ListWatchlist = () => {
//   return (
//     <Box sx={{ bgcolor: "black", minHeight: "100vh" }}>
//       <AppBar position="static" sx={{ bgcolor: "#23252b" }}>
//         <Toolbar>
//           <img
//             src="/rectangle2.png"
//             alt="Logo"
//             style={{ width: 92, height: 30 }}
//           />
//           <Box sx={{ flexGrow: 1 }} />
//           <Button color="inherit">Home</Button>
//           <Button color="inherit">Browse</Button>
//           <Button color="inherit">Music</Button>
//           <Button color="inherit">Community</Button>
//           <Box sx={{ flexGrow: 1 }} />
//           <IconButton color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <FlagIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <PersonIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Typography variant="h4" color="white" gutterBottom>
//           My Lists
//         </Typography>
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//           <Button color="inherit">WATCHLIST</Button>
//           <Button color="inherit">MUSICLIST</Button>
//           <Button color="inherit">VERSELIST</Button>
//           <Button color="inherit">People</Button>
//         </Box>
//         <Divider sx={{ bgcolor: "white" }} />

//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//           <Typography variant="h6" color="white">
//             Plan To Watch
//           </Typography>
//           <Box>
//             <IconButton color="inherit">
//               <SortIcon />
//             </IconButton>
//             <IconButton color="inherit">
//               <SettingsIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           {[
//             {
//               title: "Mojave Diamonds",
//               image: "/image-41.png",
//               genre: "Action, Thriller, Sci-fi",
//               duration: "135m",
//             },
//             {
//               title: "Hypnotic",
//               image: "/rectangle-4200.svg",
//               genre: "Action, Thriller, Sci-fi",
//               duration: "135m",
//             },
//             {
//               title: "Mojave",
//               image: "/image-39.png",
//               genre: "Action, Thriller, Sci-fi",
//               duration: "135m",
//             },
//             {
//               title: "Crossfire",
//               image: "/image-41-2.png",
//               genre: "Action, Thriller, Sci-fi",
//               duration: "135m",
//             },
//             {
//               title: "The Pregnancy Promise",
//               image: "/image-41-3.png",
//               genre: "Action, Thriller, Sci-fi",
//               duration: "135m",
//             },
//             {
//               title: "THE DAYS",
//               image: "/image-41-4.png",
//               genre: "Action, Thriller, Sci-fi",
//               duration: "135m",
//             },
//           ].map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card sx={{ bgcolor: "black" }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={item.image}
//                   alt={item.title}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" color="white">
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {item.genre}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {item.duration}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <IconButton color="inherit">
//                     <FavoriteIcon />
//                   </IconButton>
//                   <IconButton color="inherit">
//                     <DeleteIcon />
//                   </IconButton>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       <Box sx={{ bgcolor: "#23252b", mt: 4, py: 4 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={3}>
//               <img
//                 src="/rectangle9.png"
//                 alt="Logo"
//                 style={{ width: 179, height: 58 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="body2" color="white">
//                 345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
//               </Typography>
//               <Typography variant="body2" color="white">
//                 (123) 456-7890
//               </Typography>
//               <Typography variant="body2" color="white">
//                 (123) 456-7890
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="body2" color="white">
//                 Social Media
//               </Typography>
//               <Box sx={{ display: "flex", mt: 1 }}>
//                 <IconButton color="inherit">
//                   <FacebookIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <TwitterIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <LinkedInIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <YouTubeIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <InstagramIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <GoogleIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <PinterestIcon />
//                 </IconButton>
//                 <IconButton color="inherit">
//                   <RssFeedIcon />
//                 </IconButton>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <List>
//                 <ListItem>
//                   <ListItemText primary="ABOUT US" />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText primary="CONTACT US" />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText primary="HELP" />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText primary="PRIVACY POLICY" />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemText primary="DISCLAIMER" />
//                 </ListItem>
//               </List>
//             </Grid>
//           </Grid>
//           <Divider sx={{ bgcolor: "white", my: 2 }} />
//           <Typography
//             variant="body2"
//             color="white"
//             align="center"
//             sx={{ opacity: 0.7 }}
//           >
//             Copyright © 2018 •MediaVerse Inc.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default ListWatchlist;