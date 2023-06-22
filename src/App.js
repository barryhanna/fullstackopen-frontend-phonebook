import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		personService.getAll().then((res) => setPersons(res));
	}, []);

	const handleAddPerson = (e) => {
		e.preventDefault();
		const alreadyUsed = persons.find((p) => p.name === newName);
		if (alreadyUsed) {
			return alert(
				`The name ${newName} has already been added to the phonebook`
			);
		}

		personService
			.create({ name: newName, number: newNumber })
			.then((data) => {
				const newPersons = [
					...persons,
					{ id: data.id, name: data.name, number: data.number },
				];
				setPersons(newPersons);
				setNewName('');
				setNewNumber('');
			});
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
