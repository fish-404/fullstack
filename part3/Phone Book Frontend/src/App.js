import React, { useState, useEffect } from "react";
import phonebookService from "./services/phoneBook";

const SuccessMsg = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

const ErrorMsg = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Input = (props) => {
  return (
    <div>
      {props.text}: <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <>
      <Input
        text="filter shown with"
        value={props.newFilter}
        onChange={props.handleFilterChange}
      />
    </>
  );
};

const AddForm = (props) => {
  return (
    <>
      <form onSubmit={props.addInfo}>
        <Input
          text="name"
          value={props.newName}
          onChange={props.handleNameChange}
        />
        <Input
          text="phone number"
          value={props.newPhone}
          onChange={props.handlePhoneChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Person = (props) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${props.person.name} ?`)) {
      phonebookService.deleteInfo(props.person.id).then((response) => {
        props.deletePerson(props.person.id);
        alert(`Deleted successfully! `);
      });
    }
  };

  return (
    <>
      <p>
        {props.person.name} {props.person.number}
        <button onClick={handleDelete}>delete</button>
      </p>
    </>
  );
};

const Persons = (props) => {
  return (
    <>
      {props.filterToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={props.deletePerson}
          showSuccessMsg={props.showSuccessMsg}
          showErrorMsg={props.showErrorMsg}
        />
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setFilter] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log("effect");
    phonebookService
      .getAll()
      .then((initialPhoneBook) => setPersons(initialPhoneBook));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value.trim());
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value.trim());
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  function handleFilter(newFilter) {
    console.log(newFilter);
    if (newFilter === "") {
      return persons;
    } else {
      const regex = new RegExp(newFilter, "i"); // case insensitive
      //const result =  persons.filter(item=>regex.test(item.name))
      //console.log("result", result)
      return persons.filter((item) => regex.test(item.name));
    }
  }

  const filterToShow = handleFilter(newFilter);

  const addInfo = (event) => {
    event.preventDefault(); // aovid page refresh
    const exitMessage = `${newName} is already added to phonebook`;
    const updateMessage = `${exitMessage}, repalce the old number with a new one?`;
    const noUpdateMessage = `${exitMessage}, and the phone has no change`;

    const exitItem = persons.find((item) => item.name === newName);

    const showSuccessMsg = (successMessage) => {
      setSuccessMsg(successMessage);
      setTimeout(() => {
        setSuccessMsg(null);
      }, 5000);
    };

    const showErrorMsg = (errorMessage) => {
      setErrorMsg(errorMessage);
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    };

    if (exitItem !== undefined) {
      if (exitItem.number === newPhone) {
        alert(noUpdateMessage);
      } else {
        if (window.confirm(updateMessage)) {
          const newItem = { ...exitItem, number: newPhone };
          phonebookService
            .updateInfo(newItem.id, newItem)
            .then((response) => {
              //console.log("test", response);
              setPersons(
                persons.map((person) =>
                  person.id !== newItem.id ? person : response
                )
              );
            })
            .catch((error) => {
              showErrorMsg(error.response.data.error);
            });
        }
      }
    } else {
      const infoObject = {
        name: newName,
        number: newPhone
      };

      phonebookService
        .addInfo(infoObject)
        .then((returnInfo) => {
          setPersons(persons.concat(returnInfo));
          showSuccessMsg(`Add ${infoObject.name} successfully`);
          setNewName("");
          setNewPhone("");
        })
        .catch((error) => {
          showErrorMsg(error.response.data.error);
        });
    }
  };

  const deletePerson = (deleteId) => {
    console.log("id", deleteId);
    setPersons(persons.filter((person) => person.id !== deleteId));
  };

  return (
    <div>
      <h1>Phone Book</h1>
      <SuccessMsg message={successMsg} />
      <ErrorMsg message={errorMsg} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add New</h2>
      <AddForm
        addInfo={addInfo}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons filterToShow={filterToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
