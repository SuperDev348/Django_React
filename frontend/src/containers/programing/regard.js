import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid} from '@material-ui/core'

import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'
import {stringToRegex} from '../../service/textService'

function Regard() {
  const classes = useStyles();
  const [string, setString] = useState('')
  const [regex, setRegex] = useState('')
  const [resultString, setResultString] = useState('')

  const handlePerform = () => {
    if(regex === '' || string === '')
      return
    var pattern = stringToRegex(regex);
    if(pattern == null)
      return
    var result = pattern.exec(string);
    setResultString(result)
  }

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{marginTop: 100, marginBottom: 10}}>
          <Grid item xs={6}>
            <TextField
              id="outlined-helperText"
              label="Regex"
              variant="outlined"
              value={regex}
              onChange={(e)=>setRegex(e.target.value)}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="String Input"
              multiline
              rows={8}
              value={string}
              onChange={(e) => setString(e.target.value)}
              variant="outlined"
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="Result"
              multiline
              rows={8}
              value={resultString}
              // onChange={(e) => setListString(e.target.value)}
              variant="outlined"
              style={{width: '100%'}}
            />
          </Grid>
        </Grid>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handlePerform}>Perform</Button>
      </Container>
    </div>
  )
}
export default Regard
