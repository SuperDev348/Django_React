import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, IconButton, Button, MenuItem, ClickAwayListener, Grow, Popper, Paper, MenuList} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

import {useStyles} from '../style/material_ui_style'

function Nav() {
  const classes = useStyles()
  const [openP, setOpenP] = React.useState(false)
  const anchorRefP = React.useRef(null)
  const prevOpenP = React.useRef(openP)
  const [openF, setOpenF] = React.useState(false)
  const anchorRefF = React.useRef(null)
  const prevOpenF = React.useRef(openP)

  const handleToggleP = () => {
    setOpenP((prevOpen) => !prevOpen);
  }
  const handleCloseP = (event) => {
    if (anchorRefP.current && anchorRefP.current.contains(event.target)) {
      return;
    }
    setOpenP(false);
  }
  const handleToggleF = () => {
    setOpenF((prevOpen) => !prevOpen);
  }
  const handleCloseF = (event) => {
    if (anchorRefF.current && anchorRefF.current.contains(event.target)) {
      return;
    }
    setOpenF(false);
  }
  
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenP(false);
      setOpenF(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  React.useEffect(() => {
    if (prevOpenP.current === true && openP === false) {
      anchorRefP.current.focus();
    }
    prevOpenP.current = openP;
  }, [openP]);
  React.useEffect(() => {
    if (prevOpenF.current === true && openF === false) {
      anchorRefF.current.focus();
    }
    prevOpenF.current = openF;
  }, [openF]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <Button
              ref={anchorRefP}
              aria-controls={openP ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleP}
              className={classes.button} 
              style={{color: 'white', paddingLeft: 20}}
            >
              Programing
            </Button>
            <Popper open={openP} anchorEl={anchorRefP.current} role={undefined} transition disablePortal style={{zIndex: 999}}>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseP}>
                      <MenuList autoFocusItem={openP} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <Link to="/">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Text</MenuItem>
                        </Link>
                        <Link to="/list">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>List</MenuItem>
                        </Link>
                        <Link to="/json">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Json</MenuItem>
                        </Link>
                        <Link to="/base64">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Base64</MenuItem>
                        </Link>
                        <Link to="/regard">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Regard</MenuItem>
                        </Link>
                        <Link to="/cron">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Cron</MenuItem>
                        </Link>
                        <Link to="/binary">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Binary</MenuItem>
                        </Link>
                        <Link to="/classGenerator">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Class Generator</MenuItem>
                        </Link>
                        <Link to="/textComparison">
                          <MenuItem onClick={handleCloseP} style={{color: 'black'}}>Text Comparison</MenuItem>
                        </Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Button
              ref={anchorRefF}
              aria-controls={openF ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleF}
              className={classes.button} 
              style={{color: 'white', paddingLeft: 20}}
            >
              Financial
            </Button>
            <Popper open={openF} anchorEl={anchorRefF.current} role={undefined} transition disablePortal style={{zIndex: 999}}>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseF}>
                      <MenuList autoFocusItem={openF} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <Link to="/simpleSavingCalculator">
                          <MenuItem onClick={handleCloseF} style={{color: 'black'}}>Simple Savings Calculator</MenuItem>
                        </Link>
                        <Link to="/calculator">
                          <MenuItem onClick={handleCloseF} style={{color: 'black'}}>401k Calculator</MenuItem>
                        </Link>
                        <Link to="/savingCalculator">
                          <MenuItem onClick={handleCloseF} style={{color: 'black'}}>Savings Calculator</MenuItem>
                        </Link>
                        <Link to="/loanCalculator">
                          <MenuItem onClick={handleCloseF} style={{color: 'black'}}>Loan/credit Calculator</MenuItem>
                        </Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Nav
