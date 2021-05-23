import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid} from '@material-ui/core'
  
import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'

function Base64() {
  const classes = useStyles();
  const [string, setString] = useState('')
  const [resultString, setResultString] = useState('')

  const handleEncode = () => {
    let tmp = Buffer.from(string).toString('base64')
    setResultString(tmp)
  }
  const handleDecode = () => {
    let tmp = Buffer.from(resultString, 'base64').toString('ascii')
    setString(tmp)
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
              label="Base64"
              multiline
              rows={8}
              value={resultString}
              // onChange={(e) => setListString(e.target.value)}
              variant="outlined"
              style={{width:"100%", marginTop: 100, marginBottom: 10}}
            />
          </Grid>
        </Grid>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleEncode}>Encode</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleDecode}>Decode</Button>
      </Container>
    </div>
  )
}
export default Base64
