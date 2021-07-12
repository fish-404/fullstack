
import React, { useState } from 'react'

var total = 7;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = (propts) => {
	return (
		<>
			<button onClick={propts.handelClick}>
				{propts.name}
			</button>
		</>
	)
}

const Title = (propts) => {
	return (
		<>
			<h1>{propts.title}</h1>
		</>
	)
}

const Anecdote = (propts) => {
	return (
		<>
			<p>
				{propts.text}
			</p>
		</>
	)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   

	const initPoints = Array(total).fill(0)
  const [selected, setSelected] = useState(getRandomInt(total)) 
	const [points, setVote] = useState(initPoints)

	const setToValue = newValue => {
		setSelected(newValue)
		console.log(points)
	}

	const setPoint = selected => {
		console.log(selected)
		const copy = [...points]
		copy[selected] += 1
		console.log("points", points)
		console.log("copy", copy)
		setVote(copy)
	}

  return (
		<>
			<Title title = "Anecdote of the day"/>
			<Anecdote text={anecdotes[selected]}/>
			<Button name="vote" handelClick={()=> setPoint(selected)}/>
			<Button name="next anecdote" handelClick = {()=> setToValue(getRandomInt(total))}/>
			<Title title="Anecdote with most votes" />
			<Anecdote text={anecdotes[points.indexOf(Math.max(...points))]} />
		</>
  )
}

export default App;
