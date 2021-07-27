const filterToShow = handleFilter(newFilter);

  const addInfo = (event) => {
    event.preventDefault(); // aovid page refresh
    const exitMessage = `${newName} is already added to phonebook`;
    const updateMessage = `${exitMessage}, repalce the old number with a new one?`;
    const noUpdateMessage = `${exitMessage}, and the phone has no change`;

    const exitItem = persons.find((item) => item.name === newName);

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
              setErrorMsg(`${newItem.name} was already deleted from server`);
              setTimeout(() => {
                setErrorMsg(null);
              }, 5000);
            });
        }
      }
    } else {
      const infoObject = {
        name: newName,
        number: newPhone
      };

      phonebookService.addInfo(infoObject).then((returnInfo) => {
        setPersons(persons.concat(returnInfo));
        setSuccessMsg(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMsg(null);
        }, 5000);
        setNewName("");
        setNewPhone("");
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
