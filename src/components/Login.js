import React, {Component} from "react";
import {
    CssBaseline, 
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    withStyles
} 
from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from '../actions';

const classes = (theme) => ({
    root:{
        height:'100vh'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button:{
        width:"100%"
    }
})

class Login extends Component{
    constructor(props){
        super(props);
            this.state={
                user:{
                    email:""
                },
                error:false
            }
    }
    
    handleChange = (e) => {
        const {value} = e.target;
        const {user} = this.state;
        let updatedUser = {
            ...user,
            email:value
        }
        this.setState({
            user:updatedUser
        })
    }

    onSignIn = (e) => {
        e.preventDefault();
        const {user} = this.state;
        if(user.email){
            actions.login(user)
            this.props.history.push('/booking')
        }
        else{
            this.setState({
                error:true
            })
        }
    }

    googleSignIn = (googleUser) => {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    
    render(){
        const {classes} = this.props;
        const {user = {}, error} = this.state;
        return(
            <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange = {this.handleChange}
                        value={user.email}
                        error={error}
                        helperText={error ? "Email is required!":""}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.onSignIn}
                    >
                        Sign In
                    </Button>
                    <Button 
                        fullWidth
                        className = "g-signin2" 
                        data-onsuccess={this.googleSignIn}
                    >
                    </Button>
                </form>
                </div>
            </Grid>
        </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme:PropTypes.object.isRequired
}

const LoginConnected = withStyles(classes)(Login);
const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const LoginPage = connect(mapStateToProps)(LoginConnected)

export default LoginPage;