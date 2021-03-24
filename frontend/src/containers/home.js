import React, {useState, useEffect} from 'react'
import {TextField, Container, Button} from '@material-ui/core'

import Nav from './layout/nav'

function Home() {
  const [string, setString] = useState('')
  
  const handleUppercase = () => {
    console.log(string)
    let tmp = string.toUpperCase()
    setString(tmp)
  }
  const handleLowercase = () => {
    let tmp = string.toLowerCase()
    setString(tmp)
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
        <Button variant="outlined" style={{marginRight: 10}} onClick={handleUppercase}>Uppercase</Button>
        <Button variant="outlined" style={{marginRight: 10}} onClick={handleLowercase}>Lowercase</Button>
      </Container>
    </div>
  )
}
export default Home
