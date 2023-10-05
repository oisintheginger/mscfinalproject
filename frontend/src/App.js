import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
//make this more secure using aws secretsmanager!!
// needs to be without client secret because the javascript sdk doesnt support client secret
const poolData = {
    UserPoolId: 'eu-north-1_ItPdvWwXq',
    ClientId: '5eoaskcluu217r636qnef1icib',
};
const userPool = new CognitoUserPool(poolData);

export default function App() {
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const attributeList = [];

        const dataUsername = {
            Name: 'preferred_username',
            Value: data.get('firstName') + data.get('lastName'),
        };
        const attributeUsername = new AmazonCognitoIdentity.CognitoUserAttribute(dataUsername);

        attributeList.push(attributeUsername);

        userPool.signUp(
            data.get('email'),
            data.get('password'),
            attributeList,
            null,
            (err, result) => {
                // Unsuccesfull signup
                if (err) {
                    setError(err.message);
                    return;
                }
                // Successful signup
                const cognitoUser = result.user;
                alert('Signup successful!');
            }
        );
    };

    //SKELETON CODE THAT HAS NOT BEEN TESTED FOR IMPLEMENTING THE MFA
    // we have implemented MFA only with email, so amazon cognito will send
    // a code to the user's email and then we need to prompt the user to enter that
    // code and verify it using the confirmRegistration method:
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Email: 'email@example.com',
        Pool: userPool
    });

    cognitoUser.confirmRegistration('<CODE-FROM-EMAIL>', true, function(err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Code verification result:', result);
    });


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
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
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
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
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