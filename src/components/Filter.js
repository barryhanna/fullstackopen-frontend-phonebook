const Filter = ({ filter, setFilter }) => (
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
);

export default Filter;
