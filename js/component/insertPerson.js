import insertTable from './personTable.js';


let ids = []
let id = 0;
function insertPerson(event){
	event.preventDefault();

	const form = document.querySelector("form");
	
	const name = document.querySelector('#name').value;
	const card = document.querySelector('#card').value;
	const setor = document.querySelector('#setor').value;
	
	if(!ids.includes(id)){
		ids.push(id)
	}else{
		id += 1
		ids.push(id)
	}
	const person = {id, name, card, setor};

	insertTable.personTable(person);
	form.reset();
}

export default { insertPerson }