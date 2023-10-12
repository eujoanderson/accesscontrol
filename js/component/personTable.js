function personTable (person){

	const tbody = document.querySelector("table tbody");

	const row = `
	<tr>
		<th scope="row">${person.id}</th>
		<td>${person.name}</td>
		<td>${person.card}</td>
		<td>${person.setor}</td>
		<td class="icon-container ">
			<a class="icon-edit" style="cursor:pointer;"><i class='bx bxs-pencil' ></i></a>
			<a class=" icon-edit" style="cursor:pointer;"><i class='bx bx-x' ></i></a> 
		</td>

    </tr>
	`;

	if (tbody != null){
		tbody.insertAdjacentHTML('beforeend', row);
	}
};

export default { personTable };