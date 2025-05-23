import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045 1234567', id: 1}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const addName = (event) => {
  event.preventDefault()
  const alreadyExists = persons.some(person => person.name === newName)
  if (alreadyExists){
    alert(newName + ' is already added to phonebook')
    return
  }
  const nameObject = {
    name: newName,
    number: newNumber,
    id: String(persons.length + 1)
  }
  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <p key={person.id}>{person.name} {person.number}</p>
        )}
    </div>
  )
}

export default App