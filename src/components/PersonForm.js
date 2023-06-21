const PersonForm = ({
	newName,
	setNewName,
	newNumber,
	setNewNumber,
	handleAddPerson,
}) => (
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
);

export default PersonForm;
