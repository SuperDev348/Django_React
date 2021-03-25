import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid} from '@material-ui/core'

import Nav from './layout/nav'
import {useStyles} from './style/material_ui_style'
import {toTitlecase, toAlternate, toInversecase, copyText, downloadText} from '../service/textService'

function List() {
  const classes = useStyles();
  const [string, setString] = useState('')
  const [listString, setListString] = useState('')

  const handleUppercase = () => {
    const tmp = string.toUpperCase().split(',').join('\n')
    setListString(tmp)
  }
  const handleLowercase = () => {
    const tmp = string.toLowerCase().split(',').join('\n')
    setListString(tmp)
  }
  const handleReverse = () => {
    const tmp = string.toLowerCase().split(',').reverse().join('\n')
    setListString(tmp)
  }
  const handleDuplicates = () => {
    let list = string.toLowerCase().split(',');
    list = list.reduce(function(acc, el, i, arr) {
      if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
    }, []);
    const tmp = list.join('\n')
    setListString(tmp)
  }
  const handleUniques = () => {
    const list = string.toLowerCase().split(',');
    const tmp = [...new Set(list)].join('\n')
    setListString(tmp)
  }

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="String Input"
              multiline
              rows={8}
              value={string}
              onChange={(e) => setString(e.target.value)}
              variant="outlined"
              style={{width:"100%", marginTop: 100, marginBottom: 10}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="Result List"
              multiline
              rows={8}
              value={listString}
              // onChange={(e) => setListString(e.target.value)}
              variant="outlined"
              style={{width:"100%", marginTop: 100, marginBottom: 10}}
            />
          </Grid>
        </Grid>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleUppercase}>Uppercase</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleLowercase}>Lowercase</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleReverse}>Reverse</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleDuplicates}>Duplicates</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleUniques}>Uniques</Button>
      </Container>
    </div>
  )
}
export default List
