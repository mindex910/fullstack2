import { useEffect, useState } from "react";
import personService from "./services/persons";
import Notification from "./Notification";

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterChange} />{" "}
    </div>
  );
};

const PersonForm = ({
  addName,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />{" "}
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filterNames, persons, setPersons, setNotification }) => {
  const handleDelete = (id, name) => {
    if (window.confirm("Delete " + name + "?")) {
      personService.remove(id).catch(error => {
        setNotification({
        message: name + " has already been deleted",
        isError: true,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      });
      setPersons(persons.filter((person) => person.id !== id));
      setNotification({
        message: name + " has been deleted",
        isError: false,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return filterNames.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person.id, person.name)}>
        delete
      </button>
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const isAlreadyAdded = persons.some(
      (person) => person.name === newName && person.number === newNumber
    );
    if (isAlreadyAdded) {
      setNotification({
        message: newName + " is already added to phonebook",
        isError: true,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      return;
    }

    const isChanging = persons.some(
      (person) => person.name === newName && person.number !== newNumber
    );
    if (isChanging) {
      if (
        window.confirm(
          newName +
            " is already added to the phonebook. Do you wish to replace the old number with a new one?"
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        personService
          .update(id, { name: newName, number: newNumber })
          .then((response) => {
            const updatedPersons = persons.map((person) => {
              if (person.id !== id) {
                return person;
              }
              return response.data;
            });
            setPersons(updatedPersons);
            setNotification({
              message: "The number of " + newName + " has been changed",
              isError: false,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
      }
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(nameObject).then((response) => {
      console.log(response);
      setPersons([...persons, response.data]);
      setNotification({
        message: newName + " has been added",
        isError: false,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  const filterNames = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <Notification message={notification} />
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        filterNames={filterNames}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
