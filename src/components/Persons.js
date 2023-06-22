const Persons = ({ persons, filter, handleDelete }) => (
	<div>
		<ul style={{ listStyle: 'none' }}>
			{filter
				? persons
						.filter((person) =>
							person.name.toLowerCase().includes(filter.toLowerCase())
						)
						.map((p) => (
							<li key={p.id}>
								{p.name} {p.number}{' '}
								<button onClick={() => handleDelete(p.id)}>
									delete
								</button>
							</li>
						))
				: persons.map((p) => (
						<li key={p.id}>
							{p.name} {p.number}{' '}
							<button onClick={() => handleDelete(p.id)}>
								delete
							</button>
						</li>
				  ))}
		</ul>
	</div>
);

export default Persons;
