import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' },
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
			<div>
				<p>
					filter shown with
					<input
						type="text"
						name="filter"
						onChange={(e) => setFilter(e.target.value)}
						value={filter}
					/>
				</p>
			</div>
			<form onSubmit={handleAddPerson}>
				<div>
					name:{' '}
					<input
						name="name"
						type="text"
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
					/>
				</div>
				<div>
					number:{' '}
					<input
						name="tel"
						type="text"
						value={newNumber}
						onChange={(e) => setNewNumber(e.target.value)}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				<ul style={{ listStyle: 'none' }}>
					{filter
						? persons
								.filter((person) => person.name.includes(filter))
								.map((p, i) => (
									<li key={i}>
										{p.name} {p.number}
									</li>
								))
						: persons.map((p, i) => (
								<li key={i}>
									{p.name} {p.number}
								</li>
						  ))}
				</ul>
			</div>
		</div>
	);
};

export default App;
