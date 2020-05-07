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
    TextField,
    Button
}
from '@material-ui/core';
import { DatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import PropTypes from "prop-types";
import MomentUtils from '@date-io/moment';
import {timeSlots} from '../constants';

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
        marginTop: theme.spacing(4),
    },
    datePicker:{
        margin: theme.spacing(4)
    },
    slot:{
        margin: theme.spacing(1)
    },
    bookButton:{
        margin: theme.spacing(3, 0, 2),
    }
})

class Booking extends Component{
    constructor(props){
        super(props);
        this.state={
            employee:{
                name:'',
                room:'',
                description:'',
                date:new Date(),
                slot:''
            }
        }       
    }

    onChange = (e,prop,detail) => {
        const {employee} = this.state;

        if(prop === "date"){
            let updatedEmployee = {
                ...employee,
                [prop]:e
            }
            this.setState({
                employee:updatedEmployee
            })
        }
        else if(prop === "slot"){
            let updatedEmployee = {
                ...employee,
                [prop]:detail
            }
            this.setState({
                employee:updatedEmployee
            })
        }
        else{
            const {value} = e && e.target;
            let updatedEmployee ={
                ...employee,
                [prop]:value
            }
            this.setState({
                employee:updatedEmployee
            })
        }
    }

    createBooking = (e) => {
        const {employee} = this.state;
        console.log(employee , "employee")
    }

    render(){
        const {classes} = this.props;
        const {employee={}} = this.state;
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
                                value={employee.room}
                                onChange={(e)=>{this.onChange(e,"room")}}
                                label="Meeting Room"
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"room1"}>Room 1</MenuItem>
                                <MenuItem value={"room2"}>Room 2</MenuItem>
                                <MenuItem value={"room3"}>Room 3</MenuItem>
                            </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        label="Name"
                        autoFocus
                        fullWidth
                        onChange = {(e)=>this.onChange(e,"name")}
                        value={employee.name}
                    />
                    <TextField
                        label="Meeting Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={employee.description}
                        onChange={(e)=>this.onChange(e,"description")}
                    />
                    <div className={classes.datePicker}>
                        <MuiPickersUtilsProvider utils={MomentUtils} >
                            <DatePicker
                            autoOk
                            orientation="landscape"
                            variant="static"
                            openTo="date"
                            value={employee.date}
                            onChange={(e) => this.onChange(e,"date")}
                            fullWidth
                            
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <Typography component="h5" noWrap  align="center">
                        Please select your preffered slot
                    </Typography>
                    {
                        timeSlots && timeSlots.map((slot,key)=>{
                            return(
                                <Button variant="outlined" className={classes.slot} onClick={(e)=>this.onChange(e,"slot",slot)}>
                                    {slot}
                                </Button>
                            )
                           
                        })
                    }
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={this.createBooking}
                        className={classes.bookButton}
                    >
                        Book Appointment
                    </Button>
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