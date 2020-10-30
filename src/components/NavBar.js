import React from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    button: {
        fontSize : '17px',
        textTransform : 'capitalize',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
    }
})


const NavBar = (props) => {

    const { classes } = props

    return (
        <div >
            <AppBar position="relative" color="transparent" >
                <Toolbar style={{ height: 50}}>

                    {/* login */}
                    <Button className={classes.button} color="primary" >
                        Login
                    </Button>
                    
                    {/* signup */}
                    <Button className={classes.button} color="primary" >
                        Signup
                    </Button>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default (withStyles(styles)(NavBar))
