import React, { Component,Fragment } from "react";
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    withStyles,
    Paper,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    TextField
}
from '@material-ui/core';
import PropTypes from "prop-types";

const classes = (theme) => ({
    appBar:{
        position:'relative'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
    },
    formControl: {
        margin: theme.spacing(4),
        width:'90%'
    }
})

class Booking extends Component{
    render(){
        const {classes} = this.props;
        return(
            <Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Meeting Room
                </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h5" variant="h5" align="center">
                        Meeting Room Booking
                    </Typography>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Meeting Room</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                // value={}
                                // onChange={}
                                label="Meeting Room"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Room 1</MenuItem>
                                <MenuItem value={20}>Room 2</MenuItem>
                                <MenuItem value={30}>Room 3</MenuItem>
                            </Select>
                    </FormControl>
                </Paper>
                
            </main>
        </Fragment>
        )
    }
}

Booking.propTypes = {
    classes: PropTypes.object.isRequired,
    theme:PropTypes.object.isRequired
}

const MeetingBooking = withStyles(classes)(Booking);

export default MeetingBooking;