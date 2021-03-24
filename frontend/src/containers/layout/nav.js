import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

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
            Home
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Nav
