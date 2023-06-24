import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personService from './services/persons';
import './index.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState({});

	const MessageTypes = {
		error: 'error',
		warning: 'warning',
		success: 'success',
	};

	useEffect(() => {
		personService.getAll().then((res) => setPersons(res));
	}, []);

	const showMessage = (type, message) => {
		setMessage({ type: type, text: message });
		setTimeout(() => setMessage(''), 3000);
	};

	const handleDelete = (id) => {
		const { name } = persons.find((person) => person.id === id);

		if (window.confirm(`Delete ${name}?`)) {
			personService
				.delete(id)
				.catch((err) =>
					showMessage(
						MessageTypes.error,
						`Information of ${name} has already been removed from the server`
					)
				);
			const updatedPersons = persons.filter((p) => p.id !== id);
			setPersons(updatedPersons);
			showMessage(`${name} deleted.`);
		}
	};

	const resetInputs = () => {
		setNewName('');
		setNewNumber('');
	};

	const handleAddPerson = async (e) => {
		e.preventDefault();
		const alreadyUsed = persons.find((p) => p.name === newName);

		if (alreadyUsed) {
			if (alreadyUsed.number !== newNumber) {
				if (window.confirm(`Update phone number for ${newName}?`)) {
					const updatedPerson = await personService.update(
						alreadyUsed.id,
						{
							name: alreadyUsed.name,
							number: newNumber,
						}
					);

					const updateIndex = persons.findIndex(
						(person) => person.id === updatedPerson.id
					);

					const newPersons = [
						...persons.slice(0, updateIndex),
						updatedPerson,
						...persons.slice(updateIndex + 1),
					];

					setPersons(newPersons);
					resetInputs();
					showMessage(
						MessageTypes.success,
						`${updatedPerson.name}'s phone number has been updated to ${updatedPerson.number}`
					);
					return;
				}
			} else {
				showMessage(
					MessageTypes.error,
					`The name ${alreadyUsed.name} already has the number ${alreadyUsed.number}`
				);

				return;
			}
		} else {
			personService
				.create({ name: newName, number: newNumber })
				.then((data) => {
					if (!data) {
						throw Error('No data returned');
					}
					const newPersons = [
						...persons,
						{ id: data.id, name: data.name, number: data.number },
					];
					setPersons(newPersons);
					resetInputs();
					showMessage(
						MessageTypes.success,
						`${newName} has been added to your phonebook`
					);
				})
				.catch((error) => {
					showMessage(MessageTypes.error, `Validation error`);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			{message.text && (
				<p className={`notification ${message.type}`}>
					{message.text}
				</p>
			)}
			<Filter filter={filter} setFilter={setFilter} />
			<PersonForm
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				handleAddPerson={handleAddPerson}
			/>
			<h2>Numbers</h2>
			<Persons
				persons={persons}
				filter={filter}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default App;
