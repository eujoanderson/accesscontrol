import insertTable from './personTable.js';

let ids = []

function insertPerson(event){
	event.preventDefault();

	const form = document.querySelector("form");
	
	const name = document.querySelector('#name').value;
	const card = document.querySelector('#card').value;
	const setor = document.querySelector('#setor').value;
	let id = 1;

	for(let id of ids){
console.log("Testex")
	}

	console.log(id)
	const person = {id,name,card,setor};

	insertTable.personTable(person);

	form.reset();

}

export default { insertPerson }