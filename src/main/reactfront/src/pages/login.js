import React, { useState } from 'react';
import API from '../api.js';
import DataTest from './login.js';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';




export default function Login() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
//    const dispatch = useDispatch();

    const handleSubmit = (event) => {
     event.preventDefault();

     API
         .post('/login',{
           username : username,
           password: password,

         })
         .then((response) => {
             console.log({
                   username : username,
                    password: password,
             });
             console.log(' success!!!',response.data );
     //        push('/')
             }
         )
         .catch((error) => {
             console.log('error !!!',error.response);
         })

    };

    return (
       <Container component="main" maxWidth="xs">
           <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
           >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
           margin ="normal"
           label="name"
           required
           fullWidth
           name="username"
           autoComplete="username"
           autoFocus
           onChange= {(e) => {
                   setUsername(e.target.value);
                }
           }
           />
          <TextField
           label="Password"
           type="password"
           required
           fullWidth 
           name="password"
           autoComplete="current-password"
           onChange= {(e) => {
               setPassword(e.target.value);
                }
           }
           />
           <FormControlLabel
            control={<Checkbox value="remember"
            color="primary" />}
            label="Remember me"
           />
           <Button type="submit" onClick ={handleSubmit} fullWidth variant="contained"
           sx={{ mt:3, mb:2}}>
              Sign in !
            </Button>
           <Grid container>
            <Grid item xs>
               <Link href="/api/member/new">Forgot password?</Link>
            </Grid>
            <Grid item>
                 <Link href="/api/signup" variant="body2"> Sign up</Link>
            </Grid>
           </Grid>
        </Box>
      </Container>
    );

 }

  