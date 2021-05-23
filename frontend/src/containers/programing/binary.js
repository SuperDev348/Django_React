import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid} from '@material-ui/core'

import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'

function Binary() {
  const classes = useStyles();
  const [string, setString] = useState('')
  const [resultString, setResultString] = useState('')

  const handleEncode = () => {
    const characters = string.split('');
    let tmp = characters.map(function(char) {
      const binary = char.charCodeAt(0).toString(2)
      const pad = Math.max(8 - binary.length, 0);
      // Just to make sure it is 8 bits long.
      return '0'.repeat(pad) + binary;
    }).join('');
    setResultString(tmp)
  }
  const handleDecode = () => {
    let bytesLeft = resultString;
    let result = '';
    // Check if we have some bytes left
    while (bytesLeft.length) {
      // Get the first digits
      const byte = bytesLeft.substr(0, 8);
      bytesLeft = bytesLeft.substr(8);
      result += String.fromCharCode(parseInt(byte, 2));
    }
    setString(result)
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
              label="Binary"
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
export default Binary
