import React, {useState, useEffect} from 'react'
import {TextField, Container, Button} from '@material-ui/core'

import Nav from '../layout/nav'
import {useStyles} from '../style/material_ui_style'
import {toTitlecase, toAlternate, toInversecase, copyText, downloadText} from '../../service/textService'

function Home() {
  const classes = useStyles();
  const [string, setString] = useState('')

  const handleUppercase = () => {
    let tmp = string.toUpperCase()
    setString(tmp)
  }
  const handleLowercase = () => {
    let tmp = string.toLowerCase()
    setString(tmp)
  }
  const handleCapitalizationcase = () => {
    let tmp = toTitlecase(string)
    setString(tmp)
  }
  const handleAlternatingCapitals = () => {
    let tmp = toAlternate(string)
    setString(tmp)
  }
  const handleTitlecase = () => {
    let tmp = toTitlecase(string)
    setString(tmp)
  }
  const handleInversecase = () => {
    let tmp = toInversecase(string)
    setString(tmp)
  }
  const handleDownload = () => {
    downloadText('text.txt', string)
  }
  const handleCopy = () => {
    copyText(string)
  }
  const handleClear = () => {
    setString('')
  }

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
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
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleUppercase}>Uppercase</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleLowercase}>Lowercase</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleCapitalizationcase}>Capitalizationcase</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleAlternatingCapitals}>AlternatingCapitals</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleTitlecase}>Titlecase</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleInversecase}>Inversecase</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleDownload}>Download</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleCopy}>Copy</Button>
        <Button className={classes.button} variant="outlined" style={{marginRight: 10}} onClick={handleClear}>Clear</Button>
      </Container>
    </div>
  )
}
export default Home
