import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, IconButton, Button} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

import {useStyles} from '../style/material_ui_style'

function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit">
            <Link to="/">
              <Button className={classes.button} style={{color: 'white'}}>Text</Button>
            </Link>
            <Link to="/list">
              <Button className={classes.button} style={{color: 'white'}}>List</Button>
            </Link>
            <Link to="/json">
              <Button className={classes.button} style={{color: 'white'}}>Json</Button>
            </Link>
            <Link to="/base64">
              <Button className={classes.button} style={{color: 'white'}}>Base64</Button>
            </Link>
            <Link to="/regard">
              <Button className={classes.button} style={{color: 'white'}}>Regard</Button>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Nav
