import insertTable from './personTable.js';
import API from '../services/api.js';

export var lista = []
const persons = await API.read('person')

async function insertPerson(event){
	event.preventDefault();

	const form = document.querySelector("form");
	
	const name = document.querySelector('#name').value.toUpperCase();
	const card = document.querySelector('#card').value;
	const setor = document.querySelector('#setor').value.toUpperCase();

	lista = {
		name: name,
		card: card,
		setor: setor,
		users:{
			name: "Joanderson"
		}
	};

	if(!persons.some(data => data.name === name)){
		let responses = await API.create('person', lista)
		for(let person of [responses]){
			insertTable.personTable(person)
		}
		location.reload()
	}else{
		alert("Usuário já existe.");
	}

}

function remove(id){
	const remove_person = API.remove(`person/${id}`)
	location.reload()
};

function update(ids, name, card, setor) {
    let idHtml = document.getElementById(`${ids}`);
    let input1, input2, input3;

    if (!idHtml.querySelector('input')) {

        idHtml.children[1].innerHTML = `<input id="1" type="text" class="edit" value="${name}" />`;
        idHtml.children[2].innerHTML = `<input id="2" type="text" class="edit" value="${card}" />`;
        idHtml.children[3].innerHTML = `<input id="3" type="text" class="edit" value="${setor}" />`;

        input1 = idHtml.children[1].querySelector('input');
        input2 = idHtml.children[2].querySelector('input');
        input3 = idHtml.children[3].querySelector('input');

        input1.addEventListener("input", function () {
            name = input1.value;
        });

        input2.addEventListener("input", function () {
            card = input2.value;
        });

        input3.addEventListener("input", function () {
            setor = input3.value;
        });
    }

    let buttonUpdate = document.querySelector(`#iconEdit-${ids}`);

    buttonUpdate.addEventListener("click", (event) => {
        idHtml.children[1].innerHTML = `${name}`;
        idHtml.children[2].innerHTML = `${card}`;
        idHtml.children[3].innerHTML = `${setor}`;
    });
}

export default { insertPerson, remove, update }