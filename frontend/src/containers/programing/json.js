import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid} from '@material-ui/core'
   
import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'
import {isJsonString} from '../../service/textService'

function Json() {
  const classes = useStyles();
  const [string, setString] = useState('')
  const [listString, setListString] = useState('')
  const [isValidate, setIsValidate] = useState(true)

  const onChangeString = (e) => {
    const tmp = e.target.value
    setString(tmp)
    if(!isJsonString(tmp))
      setIsValidate(false)
    else
      setIsValidate(true)
  }
  const handleBeatify = () => {
    const obj = JSON.parse(string);
    const tmp = JSON.stringify(obj, null, 2)
    setListString(tmp)
  }
  const handleMinify = () => {
    const obj = JSON.parse(string);
    const tmp = JSON.stringify(obj)
    setListString(tmp)
  }

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{marginTop: 100, marginBottom: 10}}>
          <Grid item xs={6}>
            { string == '' ?
              <div>please input json data</div> : 
              isValidate ?
                <div>valid json data</div> : 
                <div style={{color: 'red'}}>invalid json data</div>
            }
            <TextField
              id="outlined-multiline-static"
              label="Json Input"
              multiline
              rows={8}
              value={string}
              onChange={onChangeString}
              variant="outlined"
              style={{width:"100%", paddingTop: 5}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="Json Result"
              multiline
              rows={8}
              value={listString}
              // onChange={(e) => setListString(e.target.value)}
              variant="outlined"
              style={{width:"100%", marginTop: 28}}
            />
          </Grid>
        </Grid>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleBeatify}>Beautify</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleMinify}>Minify</Button>
      </Container>
    </div>
  )
}
export default Json
