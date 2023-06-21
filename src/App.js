import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	const handleAddPerson = (e) => {
		e.preventDefault();
		const alreadyUsed = persons.find((p) => p.name === newName);
		if (alreadyUsed) {
			return alert(
				`The name ${newName} has already been added to the phonebook`
			);
		}

		const newPersons = [
			...persons,
			{ name: newName, number: newNumber },
		];
		setPersons(newPersons);
		setNewName('');
		setNewNumber('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<PersonForm
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				handleAddPerson={handleAddPerson}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} filter={filter} />
		</div>
	);
};

export default App;
