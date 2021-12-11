import React, {useState, useEffect} from 'react'
import {TextField, Container, Button, Grid, Radio, RadioGroup, FormControlLabel} from '@material-ui/core'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {makeStyles} from "@material-ui/core/styles"
   
import Nav from '../layout/nav'
import {isNumeric} from '../../service/textService'

const useStyles = makeStyles((theme) => ({
  text: {
    width: '100%',
    padding: 10
  },
}))

function SimpleSavingsCalculator() {
  const classes = useStyles();
  const [deposit, setDeposit] = useState(10000)
  const [contribution, setContribution] = useState(10)
  const [period, setPeriod] = useState(1)
  const [apy, setApy] = useState(10)
  const [unit, setUnit] = useState('year')
  const [list, setList] = useState([])
  const [earned, setEarned] = useState(0)
  const [totalContribution, setTotalContribution] = useState(0)
  const [totalEarned, setTotalEarned] = useState(0)

  const changeValue = (name, value) => {
    if (isNumeric(value)) {
      switch (name) {
        case 'deposit':
          setDeposit(value)
          break
        case 'contribution':
          setContribution(value)
          break
        case 'period':
          setPeriod(value)
          break
        case 'apy':
          setApy(value)
          break
      }
    }
  }

  useEffect(() => {
    const n = 12
    let unitPeriod = 1
    if (unit == 'month')
      unitPeriod = 1/12
    const earned = deposit * (Math.pow((1 + apy/(100 * n)), n * period * unitPeriod) - 1)
    const totalContribution = contribution * period * unitPeriod * 12
    const totalEarned = parseFloat(deposit) + parseFloat(totalContribution) + parseFloat(earned)
    const chartList = [
      { name: "Deposit", pv: deposit },
      { name: "Contributions", pv: totalContribution },
      { name: "Earned", pv: earned },
    ]
    setList(chartList)
    setEarned(earned.toFixed(2))
    setTotalContribution(totalContribution.toFixed(2))
    setTotalEarned(totalEarned.toFixed(2))
  }, [deposit, contribution, period, apy, unit])
  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{marginTop: 100, marginBottom: 10}}>
          <Grid item lg={4} md={6} xs={12}>
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="Initial deposit"
              value={deposit}
              onChange={(e) => changeValue('deposit', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={1}
            />
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="Monthly contribution"
              value={contribution}
              onChange={(e) => changeValue('contribution', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={2}
            />
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="Period"
              value={period}
              onChange={(e) => changeValue('period', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={3}
            />
            <RadioGroup aria-label="unit_period" name="unit_period" 
              value={unit} 
              onChange={(e) => {setUnit(e.target.value)}}
              style={{padding: 10}}
            >
              <FormControlLabel value="month" control={<Radio />} label="Month" />
              <FormControlLabel value="year" control={<Radio />} label="Year" />
            </RadioGroup>
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="APY"
              value={apy}
              onChange={(e) => changeValue('apy', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={4}
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12} style={{paddingTop: 50}}>
            <ResponsiveContainer width="99%" aspect={3}>
              <BarChart
                width={400}
                height={300}
                data={list}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <div style={{fontSize: 20}}><b>Total savings breakdown</b></div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Interest earned</span>
              <span><b>$ {earned}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Total contributions</span>
              <span><b>+ ${totalContribution}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Initial deposit</span>
              <span><b>+ ${deposit}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{paddingTop: 20}}
            >
              <span><b>Your total savings</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={{paddingTop: 20, fontSize: 30}}
            >
              <span><b>$ {totalEarned}</b></span>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default SimpleSavingsCalculator
