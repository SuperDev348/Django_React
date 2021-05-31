import React, {useState, useEffect} from 'react'
import {TextField, Container, FormControl, Grid, InputLabel, Select, MenuItem, Divider} from '@material-ui/core'
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
  formControl: {
    margin: theme.spacing(2),
    width: '90%',
    padding: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))
const FREQUENCY_LIST = [
  {name : 'Weekly(52/Yr)', value: 52},
  {name : 'Bi-Weekly(26/Yr)', value: 26},
  {name : 'Semi-Monthly(24/Yr)', value: 24},
  {name : 'Monthly(12/Yr)', value: 12},
  {name : 'Bi-Monthly(6/Yr)', value: 6},
  {name : 'Quarterly(4/Yr)', value: 4},
  {name : 'Semi-Annually(2/Yr)', value: 2},
  {name : 'Annually(1/Yr)', value: 1},
]
const WHEN_LIST = [
  'beginning',
  'end'
]
const COMPOUNDING_LIST = [
  {name : 'Daily(356/Yr)', value: 356},
  {name : 'Weekly(52/Yr)', value: 52},
  {name : 'Bi-Weekly(26/Yr)', value: 52},
  {name : 'Semi-Monthly(24/Yr)', value: 24},
  {name : 'Monthly(12/Yr)', value: 12},
  {name : 'Bi-Monthly(6/Yr)', value: 6},
  {name : 'Quarterly(4/Yr)', value: 4},
  {name : 'Semi-Annually(2/Yr)', value: 2},
  {name : 'Annually(1/Yr)', value: 1},
]

function SavingsCalculator() {
  const classes = useStyles();
  const [startingBalance, setStartingBalance] = useState(10000)
  const [amount, setAmount] = useState(50)
  const [frequency, setFrequency] = useState(FREQUENCY_LIST[3].value)
  const [when, setWhen] = useState(WHEN_LIST[0])
  const [period, setPeriod] = useState(1)
  const [apy, setApy] = useState(10)
  const [compounding, setCompounding] = useState(COMPOUNDING_LIST[8].value)
  const [list, setList] = useState([])
  const [earned, setEarned] = useState(0)
  const [totalContribution, setTotalContribution] = useState(0)
  const [totalEarned, setTotalEarned] = useState(0)

  const changeValue = (name, value) => {
    if (isNumeric(value)) {
      switch (name) {
        case 'balance':
          setStartingBalance(value)
          break
        case 'amount':
          setAmount(value)
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
    const earned = startingBalance * (Math.pow((1 + apy/(100 * n)), n * period * compounding) - 1)
    const totalContribution = amount * period * frequency
    const totalEarned = parseFloat(startingBalance) + parseFloat(totalContribution) + parseFloat(earned)
    const chartList = [
      { name: "balance", pv: startingBalance },
      { name: "contribute", pv: totalContribution },
      { name: "earned", pv: earned },
    ]
    setList(chartList)
    setEarned(earned.toFixed(2))
    setTotalContribution(totalContribution.toFixed(2))
    setTotalEarned(totalEarned.toFixed(2))
  }, [startingBalance, amount, frequency, when, period, apy, compounding])
  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{marginTop: 100, marginBottom: 10}}>
          <Grid item lg={4} md={6} xs={12}>
            <div style={{paddingBottom: 30}}>
              <InputLabel id="" style={{color: '#3f51b5'}}>Deposits</InputLabel>
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Amount"
                value={amount}
                onChange={(e) => changeValue('amount', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={2}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="deposite-frequency">Frequency</InputLabel>
                <Select
                  labelId="deposite-frequency"
                  id="demo-simple-select"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  { FREQUENCY_LIST.map((item, index) => {
                      return <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="when">When</InputLabel>
                <Select
                  labelId="when"
                  id="demo-simple-select"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                >
                  { WHEN_LIST.map((item, index) => {
                      return <MenuItem value={item} key={index}>{item}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="For How Long"
                value={period}
                onChange={(e) => changeValue('period', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={3}
              />
            </div>
            <Divider variant="middle" style={{marginBottom: 30}} />
            <div>
              <InputLabel id="" style={{color: '#3f51b5'}}>Base Value</InputLabel>
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Starting Balance"
                value={startingBalance}
                onChange={(e) => changeValue('balance', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={1}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Interest Rate"
                value={apy}
                onChange={(e) => changeValue('apy', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={4}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="compunding">Compounding</InputLabel>
                <Select
                  labelId="compunding"
                  id="demo-simple-select"
                  value={compounding}
                  onChange={(e) => setCompounding(e.target.value)}
                >
                  { COMPOUNDING_LIST.map((item, index) => {
                      return <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item lg={4} md={6} xs={12} style={{paddingTop: 50}}>
            <ResponsiveContainer width="99%" aspect={3}>
              <BarChart
                data={list}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
              <span>Feature Saving</span>
              <span><b>$ {earned}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Total deposit</span>
              <span><b>+ ${totalContribution}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Starting Balance</span>
              <span><b>+ ${startingBalance}</b></span>
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
export default SavingsCalculator
