import React, { useState } from 'react'

const Button = (props) => (
	<button onClick={props.handleClick}>
		{props.text}
	</button>
)

const Statistic = (props) => (
	<p>{props.name} {props.value}</p>
)

const Statistics = (props) => {
	console.log(props)
	if (props.statistics.sum === 0) {
		return (
			<>
				<p>No feedback given</p>
			</>
		)
	}
	else {
		return (
			<>
				<Statistic name="good" value={props.statisticsgood} />
				<Statistic name="neutral" value={props.statistics.neutral} />
				<Statistic name="bad" value={props.statistics.bad} />
				<Statistic name="all" value={props.statistics.sum} />
				<Statistic name="average" value={props.statistics.average} />
				<Statistic name="positive" value={props.statistics.positive} />
			</>
		)
	}
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

	const statistics = {
		good: good, 
		neutral: neutral, 
		bad: bad, 
		sum: good+neutral+bad,
		average: (good-bad)/(good+neutral+bad),
		positive: good / (good+neutral+bad) * 100 + "%"		
	}

  return (
    <div>
			<h1>give feed back</h1>
			<Button handleClick={() => setGood(good + 1)} text="good"/>
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
			<Button handleClick={() => setBad(bad + 1)} text="bad"/>
			<h1>statistics</h1>
			<Statistics statistics={statistics}/>	
    </div>
  )
}

export default App
