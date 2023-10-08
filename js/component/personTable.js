function personTable (host){

	const tbody = document.querySelector("table tbody");

	const row = `
	<tr>
		<th scope="row">${host.id}</th>
		<td>${host.name}</td>
		<td>${host.card}</td>
		<td>${host.setor}</td>
		<td class="icon-container">
			<a class="icon-edit"><i class='bx bxs-pencil' ></i></a>
			<a class=" icon-edit" ><i class='bx bx-x' ></i></a> 
		</td>

    </tr>
	`;

	tbody.insertAdjacentHTML('beforeend', row);
};

export default { personTable };