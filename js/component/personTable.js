function personTable (host){

	const tbody = document.querySelector("table tbody");

	const row = `
	<tr>
		<th scope="row">${host.id}</th>
		<td>${host.name}</td>
		<td>${host.card}</td>
		<td>Null</td>
		<td>${host.setor}</td>
    </tr>
	`;

	tbody.insertAdjacentHTML('beforeend', row);
};

export default { personTable };