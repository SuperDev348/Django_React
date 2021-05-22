import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid, Chip} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"
    
import Nav from '../layout/nav'
import {getCron} from '../../service/textService'

const useStyles = makeStyles((theme) => ({
  cronText: {
    textAlign: 'center', 
    fontSize: '200%', 
    marginTop: 20,
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic'
  },
}))
function Cron() {
  const classes = useStyles();
  const [string, setString] = useState('')
  const [resCron, setResCron] = useState({})

  useEffect(() => {
    const resCron = getCron(string)
    setResCron(resCron)
  }, [string])

  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <TextField
          id="outlined-multiline-static"
          label="Cron mask"
          inputProps={{min: 0, style: { textAlign: 'center', fontSize: 35, paddingTop: 10, paddingBottom: 10 }}}
          value={string}
          onChange={(e) => setString(e.target.value)}
          variant="outlined"
          autoComplete="off"
          style={{width:"100%", marginTop: 100, marginBottom: 10}}
        />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item lg={5}>
            <Chip label="minute" color={ resCron?.error?.minute? "secondary":"primary"} style={{margin: 10}} />
            <Chip label="hour" color={ resCron?.error?.hour? "secondary":"primary"} style={{margin: 10}} />
            <Chip label="day of month" color={ resCron?.error?.dayMonth? "secondary":"primary"} style={{margin: 10}} />
            <Chip label="month" color={ resCron?.error?.month? "secondary":"primary"} style={{margin: 10}} />
            <Chip label="day of week" color={ resCron?.error?.dayWeek? "secondary":"primary"} style={{margin: 10}} />
          </Grid>
        </Grid>
        <div className={classes.cronText}>
          {resCron.string}
        </div>
      </Container>
    </div>
  )
}
export default Cron
