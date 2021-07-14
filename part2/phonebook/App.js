import React, { useState } from 'react'


const Input = (props) => {
	return (
		<div>
			{props.text}: <input value={props.value} onChange={props.onChange}/>
		</div>
	)
}

const Filter = (props) => {
	return (
		<>
			<Input text="filter shown with" value={props.newFilter} onChange={props.handleFilterChange} />
		</>
	)
}

const AddForm = (props) => {
	return (
		<>
      <form onSubmit={props.addInfo}>
				<Input text="name" value={props.newName} onChange={props.handleNameChange}/>				
        <Input text="phone number" value={props.newPhone} onChange={props.handlePhoneChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
		</>
	)
}

const Persons = ({filterToShow}) => {
	return (
		<>
			{filterToShow.map(person => 
				<p key={person.id}>{person.name} {person.phone}</p>
			)}	
		</>
	)
}

const App = () => {
	const initPhoneBook = [
		{ id: 1, name: 'Arto Hellas', phone: '040-1234567'}, 
		{ id: 2, name: 'Test', phone: '040-1234675'}
	]
  const [ persons, setPersons ] = useState(initPhoneBook)
  const [ newName, setNewName ] = useState('')
	const [ newPhone, setNewPhone ] = useState('')
	const [ newFilter, setFilter] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handlePhoneChange = (event) => {
		setNewPhone(event.target.value)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	function handleFilter(newFilter) {
		console.log(newFilter)	
		if (newFilter === "") {
			return persons
		}
		else {
			const regex = new RegExp(newFilter, 'i') // case insensitive
			//const result =  persons.filter(item=>regex.test(item.name))
			//console.log("result", result)
			return persons.filter(item=>regex.test(item.name)) 
		}
	} 

	const filterToShow = handleFilter(newFilter)

	const addInfo = (event) => {
		event.preventDefault(); // aovid page refresh
		const alertMessage = `${newName} is already added to phonebook`

		if (persons.filter(item => item.name === newName).length > 0) {
			alert(alertMessage)
		}
		else {
			const infoObject = {
				id: persons.length + 1, 
				name: newName, 
				phone: newPhone
			}	
	
			setPersons(persons.concat(infoObject))
			setNewName('')
			setNewPhone('')
		}
	}

  return (
    <div>
			<h1>Phone book</h1>
			<Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
			<AddForm addInfo={addInfo} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
			<Persons filterToShow={filterToShow} />	
    </div>
  )
}

export default App
