import React from 'react'

const Header = ({name}) => {
	return (
		<>
			<h2>{name}</h2>
		</>
	)
}

const Part = ({part}) => {
	return (
		<>
			<p>
        {part.name} {part.exercises}
      </p>
		</>
	)
}

const Total = ({parts}) => {

	const total = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}))
	console.log("total", total)

	return (
		<>
      <p>
				<strong>
					total of exercises {total.exercises}
				</strong>
			</p>
		</>
	)
}

const Content = ({parts}) => {
	return (
		<>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</>
	)
}

const Course = ({course}) => {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts}/>
		</>
	)
}

export default Course
