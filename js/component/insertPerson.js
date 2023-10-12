import insertTable from './personTable.js';
import API from '../services/api.js'

export var lista = []
async function insertPerson(event){
	event.preventDefault();

	const form = document.querySelector("form");
	
	const name = document.querySelector('#name').value;
	const card = document.querySelector('#card').value;
	const setor = document.querySelector('#setor').value;

	lista = {
		name: name,
		card: card,
		setor: setor
	};

	const response = await API.create('person', lista)
	
	for(let person of response){
		insertTable.personTable(person)
	}
	
	form.reset();
}

export default { insertPerson }