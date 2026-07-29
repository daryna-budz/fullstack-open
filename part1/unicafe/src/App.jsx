import { useState } from 'react'

const Button = ( {text, onClick }) =>{
  return (
    <button onClick={onClick}>{text}</button>
  )
}


const StatisticLine = ({ text, value}) =>{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({ title, good, neutral, bad }) => {
  return (
    <>
      <h2>{title}</h2>

      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={(good*1 +neutral*0+bad*(-1))/(good+bad+neutral)} />
          <StatisticLine text="positive" value={good/(good+neutral+bad) *100 + " %"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      {(good > 0 || bad > 0 || neutral > 0) ? <Statistics title="statistics" good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App
