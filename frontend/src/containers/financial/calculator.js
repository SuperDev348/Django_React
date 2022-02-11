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

function Calculator() {
  const classes = useStyles();
  const [contributePercent, setContributePercent] = useState(9.9)
  const [salary, setSalary] = useState(40)
  const [salaryIncrease, setSalaryIncrease] = useState(0)
  const [age, setAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [balance, setBalance] = useState(1000)
  const [rate, setRate] = useState(7)
  const [match, setMatch] = useState(36.2)
  const [matchEnd, setMatchEnd] = useState(19.6)
  const [list, setList] = useState([])
  const [employeeContribution, setEmployeeContribution] = useState(0)
  const [employerContribution, setEmployerContribution] = useState(0)
  const [total, setTotal] = useState(0)

  const changeValue = (name, value) => {
    if (isNumeric(value)) {
      switch (name) {
        case 'percent':
          if (value > 0 && value < 100)
            setContributePercent(value)
          break
        case 'salary':
          setSalary(value)
          break
        case 'salaryIncrease':
          if (value>=0 && value<100)
            setSalaryIncrease(value)
          break
        case 'age':
          if (value>=0 && value<100)
            setAge(value)
          break
        case 'retirementAge':
          if (value>=0 && value<100)
            setRetirementAge(value)
          break
        case 'balance':
          setBalance(value)
          break
        case 'rate':
          if (value>=0 && value<100)
            setRate(value)
          break
        case 'match':
          if (value>=0 && value<100)
            setMatch(value)
          break
        case 'matchEnd':
          if (value>=0 && value<100)
            setMatchEnd(value)
          break
      }
    }
  }

  useEffect(() => {
    let n = 12
    let earned = balance * (Math.pow((1 + rate/(100 * n)), n * (retirementAge - age)) - 1)
    let employeeContribution = salary * (contributePercent + salaryIncrease) * (retirementAge - age) / 100
    let employerContribution = employeeContribution * match / 100
    let total = employeeContribution + employerContribution + earned
    let list = []
    for (let i = 0; i < retirementAge - age; i++) {
      let tmpEarned = balance * (Math.pow((1 + rate/(100 * n)), n * (i + 1)) - 1)
      let tmpEmployeeContribution = salary * (contributePercent + salaryIncrease) * (i + 1) / 100
      let tmpEmployerContribution = employeeContribution * match / 100
      let tmpTotal = tmpEmployeeContribution + tmpEmployerContribution + tmpEarned
      let tmpTotalWithout = tmpEmployeeContribution + tmpEarned
      let tmp = {name: age + i, employer: Number(tmpTotal.toFixed(2)), withoutEmployer: Number(tmpTotalWithout.toFixed(2))}
      list.push(tmp)
    }

    setEmployeeContribution(employeeContribution.toFixed(2))
    setEmployerContribution(employerContribution.toFixed(2))
    setTotal(total.toFixed(2))
    setList(list)
  }, [contributePercent, salary, salaryIncrease, age, retirementAge, balance, rate, match])
  return (
    <div>
      <Nav />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{marginTop: 100, marginBottom: 10}}>
          <Grid item lg={4} md={6} xs={12}>
            <div style={{paddingBottom: 30}}>
              <InputLabel id="" style={{color: '#3f51b5'}}>Employee Savings Plan</InputLabel>
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Percent to Contribute"
                value={contributePercent}
                onChange={(e) => changeValue('percent', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={1}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Annual Salary"
                value={salary}
                onChange={(e) => changeValue('salary', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={2}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Annual Salary Increase"
                value={salaryIncrease}
                onChange={(e) => changeValue('salaryIncrease', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={3}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Current age"
                value={age}
                onChange={(e) => changeValue('age', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={4}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Age of retirement"
                value={retirementAge}
                onChange={(e) => changeValue('retirementAge', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={5}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Current 401 balance"
                value={balance}
                onChange={(e) => changeValue('balance', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={6}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Annual rate of return"
                value={rate}
                onChange={(e) => changeValue('rate', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={7}
              />
            </div>
            <Divider variant="middle" style={{marginBottom: 30}} />
            <div>
              <InputLabel id="" style={{color: '#3f51b5'}}>Employer Match</InputLabel>
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Employer Match"
                value={match}
                onChange={(e) => changeValue('match', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={8}
              />
              <TextField
                id="outlined-multiline-static"
                className={classes.text}
                label="Employer Match ends"
                value={matchEnd}
                onChange={(e) => changeValue('matchEnd', e.target.value)}
                variant="outlined"
                autoComplete="off"
                key={9}
              />
            </div>
          </Grid>
          <Grid item lg={8} md={6} xs={12} style={{paddingTop: 50}}>
            
            <div style={{fontSize: 20}}><b>Calculate result</b></div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Total Employee Contributions</span>
              <span><b>$ {employeeContribution}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{padding: '15px 0px', borderBottom: 'solid gray 1px'}}
            >
              <span>Total Employer Contributions</span>
              <span><b>$ {employerContribution}</b></span>
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
              <span><b>$ {total}</b></span>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{padding: '30px 0px'}}
            >
              <ResponsiveContainer width="99%" aspect={3}>
                <BarChart
                  data={list}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="employer" fill="#8884d8" />
                  <Bar dataKey="withoutEmployer" fill="#b8cbe4" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
            
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Calculator
