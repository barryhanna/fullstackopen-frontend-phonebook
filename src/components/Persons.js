const Persons = ({ persons, filter }) => (
	<div>
		<ul style={{ listStyle: 'none' }}>
			{filter
				? persons
						.filter((person) =>
							person.name.toLowerCase().includes(filter.toLowerCase())
						)
						.map((p) => (
							<li key={p.id}>
								{p.name} {p.number}
							</li>
						))
				: persons.map((p) => (
						<li key={p.id}>
							{p.name} {p.number}
						</li>
				  ))}
		</ul>
	</div>
);

export default Persons;
