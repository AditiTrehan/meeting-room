import React, {Component} from "react";
import {
    CssBaseline, 
    Typography,
    Grid,
    Paper,
    withStyles
} 
from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import {clientId} from "../constants";
import {saveObject} from "../utils";

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
        margin: theme.spacing(30, 4),
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
    loginBtn:{
        textAlign:"center"
    }
})

class Login extends Component{
    constructor(props){
        super(props);
            this.state={
                user:{
                    email:""
                },
                loading:false
            }
    }

    onSuccess = (response) => {
        const { profileObj } = response;
        this.setState({
            loading: true
        });
        const {
            email,
            familyName,
            givenName,
            googleId,
            imageUrl = ""
        } = profileObj;
        const session = {
            email,
            lastName: familyName,
            firstName: givenName,
            provider: "google",
            providerId: googleId,
            imageUrl
        };

    saveObject("session", session);
    
    setTimeout(() => {
        this.setState({
            loading: false
        });
        this.props.history.push("/booking");
        }, 1000);
    }

    onFailure = (error) => {
        console.log('error')
    }
    
    render(){
        const {classes} = this.props;
        const {loading} = this.state;
        return(
            <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    Sign In
                </Typography>
                <form className={classes.form}>
                    <div className={classes.loginBtn}>
                        <GoogleLogin
                            clientId={clientId}
                            onSuccess={this.onSuccess}
                            onFailure={this.onFailure}
                            icon={loading ? false : true}
                            buttonText={
                                loading ? "Signing In...": 
                                "Sign In With Google"
                            }
                            disabled={loading}
                        />
                    </div>
                </form>
                </div>
            </Grid>
        </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

const LoginConnected = withStyles(classes)(Login);
const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const LoginPage = connect(mapStateToProps)(LoginConnected)

export default LoginPage;