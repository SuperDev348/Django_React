import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid} from '@material-ui/core'

import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'

function TextComparison() {
  const classes = useStyles();
  const [string1, setString1] = useState('')
  const [string2, setString2] = useState('')
  const [domString1, setDomString1] = useState('')
  const [domString2, setDomString2] = useState('')

  const highlightChat = (val, key) => {
    return (
      <span style={{backgroundColor: '#c0ff00', color: 'red'}} key={key}>{val}</span>
    )
  }
  const handleCompare = () => {
    setDomString1(string1)
    let tmp = string2.split('').map((val, i) => {
      if (val != string1.charAt(i))
        return highlightChat(val, i)
      else
        return val
    });
    setDomString2(tmp)
  }

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="String1 Input"
              multiline
              rows={8}
              value={string1}
              onChange={(e) => setString1(e.target.value)}
              variant="outlined"
              style={{width:"100%", marginTop: 100, marginBottom: 10}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="String2 Input"
              multiline
              rows={8}
              value={string2}
              onChange={(e) => setString2(e.target.value)}
              variant="outlined"
              style={{width:"100%", marginTop: 100, marginBottom: 10}}
            />
          </Grid>
        </Grid>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleCompare}>Compare</Button>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <p>{domString1}</p>
          </Grid>
          <Grid item xs={6}>
            <p>{domString2}</p>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default TextComparison
