import React, {useState, useEffect} from 'react'
import {TextField, Container, FormControl, Grid, InputLabel, Select, MenuItem, Divider} from '@material-ui/core'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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

function LoanCalculator() {
  const classes = useStyles();
  const [amount, setAmount] = useState(1000)
  const [periodY, setPeriodY] = useState(1)
  const [periodM, setPeriodM] = useState(12)
  const [apy, setApy] = useState(10)
  const [list, setList] = useState([])
  const [principalPaid, setPrincipalPaid] = useState(0)
  const [interestPaid, setInterestPaid] = useState(0)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  const changeValue = (name, value) => {
    if (isNumeric(value)) {
      switch (name) {
        case 'amount':
          setAmount(value)
          break
        case 'periodY':
          setPeriodY(value)
          let monthPeriod = value * 12
          setPeriodM(monthPeriod)
          break
        case 'periodM':
          setPeriodM(value)
          let yearPeriod = value / 12
          setPeriodY(yearPeriod.toFixed(2))
          break
        case 'apy':
          if (value>=0 && value<100)
            setApy(value)
          break
      }
    }
  }

  useEffect(() => {
    const n = 12
    const initAmount = amount||0
    const interest = initAmount * (Math.pow((1 + apy/(100 * n)), n * periodY) - 1)
    const monthlyPayment = (parseFloat(initAmount) + parseFloat(interest)) / periodM
    
    setPrincipalPaid(initAmount)
    setInterestPaid(interest.toFixed(2))
    setMonthlyPayment(monthlyPayment.toFixed(2))
  }, [amount, periodY, periodY, apy])
  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid 
          container spacing={2} 
          style={{marginTop: 100, 
          marginBottom: 10}}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item lg={4} md={6} xs={12}>
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="Loan Amount"
              value={amount}
              onChange={(e) => changeValue('amount', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={2}
            />
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="Loan term in years"
              value={periodY}
              onChange={(e) => changeValue('periodY', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={3}
            />
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="Loan term in months"
              value={periodM}
              onChange={(e) => changeValue('periodM', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={1}
            />
            <TextField
              id="outlined-multiline-static"
              className={classes.text}
              label="Interest rate per year"
              value={apy}
              onChange={(e) => changeValue('apy', e.target.value)}
              variant="outlined"
              autoComplete="off"
              key={4}
            />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <div>Monthly Payments</div>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{fontSize: 50}}
            >
              <span><b>$ {monthlyPayment}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Total Principal Paid</span>
              <span><b>$ {principalPaid}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Total Interest Paid</span>
              <span><b>$ {interestPaid}</b></span>
            </Grid>
            
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default LoanCalculator
