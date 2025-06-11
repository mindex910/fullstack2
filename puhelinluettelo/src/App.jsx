import axios from "axios";
import { useEffect, useState } from "react";
import personService from './services/persons'

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

const Persons = ({filterNames, persons, setPersons}) => {

  const handleDelete = (id, name) => {
    if (window.confirm("Delete " + name + "?")) {
    personService.remove(id)
    setPersons(persons.filter(person => person.id !== id))}
  }

  return filterNames.map((person) => (
    <p key={person.id}>
      {person.name} {person.number} <button onClick={()=> handleDelete(person.id, person.name)}>delete</button>
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(response => {
      console.log('fulfilled')
      setPersons(response.data)
    })
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
    const isAlreadyAdded = persons.some((person) => person.name === newName);
    if (isAlreadyAdded) {
      alert(newName + " is already added to phonebook");
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

   personService
    .create(nameObject)
    .then(response => {
      console.log(response)
      setPersons([
        ...persons,
        response.data
      ])
    })
  };

  const filterNames = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filterNames={filterNames} persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
