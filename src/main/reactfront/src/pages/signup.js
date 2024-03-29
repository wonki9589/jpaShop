import React, { useState,useEffect } from 'react';
import API from '../api.js'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { history } from  'react-router-dom';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       JPA SHOP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
//axios.defaults.withCredentials = true; // withCredentials 전역 설정


export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [duplicate, setDuplicate] = useState(false);



  const handleSubmit = (event) => {
    event.preventDefault();
    if( duplicate == false){
        alert("중복검사부터 해주세요.");
        return false;
    }
    API
    .post('/member/new',{
      username : username,
      email: email,
      password: password,
      city : city,
      street : street,
      zipcode : zipcode
    })
    .then((response) => {
        console.log(response.data);
         if(response.status === 200){
            alert("회원가입에 성공하셨습니다.")
         }
         document.location.href = "/login";
    }
    )
    .catch((error) => {
    // 400 코드면 여기로옴
       if(error.response.status === 400){
              /* 서버에서 날라오는 유효성검사 message*/
             alert(error.response.data.errors[0].defaultMessage);
       }
    })
  };

  const dupliUsername = (event) => {
    // 클릭시 아이디 중복검사
    event.preventDefault();
    if(username===""){
        alert("이름을 입력해주세요");
        return false;
    }
    API
       .get('/member/new/exist',{
         params:{
            username : username
         }
       })
       .then((response) => {
            console.log("response : " +response.data);
            if(response.data === false){
                alert("이미 가입된 이름이 있습니다.");
                setDuplicate(false);
            }
            else{
              alert("가입 가능한 이름입니다.");
             setDuplicate(true);
            }
        })
        .catch((error) => {
            alert("다시 시도해주세요.");
            console.log("error" +error.data);
        })
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                  value = {username}
                  onChange= {(e) => {
                        setUsername(e.target.value);
                    }
                  }
                />
              </Grid>
              <Grid item xs={12} >
                 <button onClick={dupliUsername} >duplicate</button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value = {email}
                  onChange= {(e) => {
                      setEmail(e.target.value);
                      }
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value = {password}
                  onChange= {(e) => {
                      setPassword(e.target.value);
                    }
                 }
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    label="city"
                    type="city"
                    id="city"
                    autoComplete="new-city"
                    value = {city}
                    onChange= {(e) => {
                      setCity(e.target.value);
                      }
                    }
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="street"
                  type="street"
                  id="street"
                  autoComplete="new-street"
                  value = {street}
                  onChange= {(e) => {
                     setStreet(e.target.value);
                    }
                  }
                />
              </Grid>
              <Grid item xs={12}>
                   <TextField
                     required
                     fullWidth
                     name="zipcode"
                     label="zipcode"
                     type="zipcode"
                     id="zipcode"
                     autoComplete="new-zipcode"
                     value = {zipcode}
                     onChange= {(e) => {
                        setZipcode(e.target.value);
                       }
                     }
                   />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
