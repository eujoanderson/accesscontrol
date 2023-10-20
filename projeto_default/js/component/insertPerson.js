import insertTable from './personTable.js';
import API from '../services/api.js';
import AUTH from '../component/autenticacao.js';
export let lista = [];
window.session_sair = AUTH.session_sair;


async function insertPerson(event){
	event.preventDefault();

    var persons = await API.read('person');

    //Testando se o user está autenticado para fazer alterações
    for(const sessi of AUTH.testUser){
        if(sessi.session === 1){
            const form = document.querySelector("form");
        
            const name = document.querySelector('#name').value.toUpperCase();
            const card = document.querySelector('#card').value;
            const setor = document.querySelector('#setor').value.toUpperCase();
        
            lista = {
                name: name,
                card: card,
                setor: setor
            };
        
            if(!persons.some(data => data.name === name)){
                let responses = await API.create('person', lista)
                for(let person of [responses]){
                    insertTable.personTable(person);
                }
            }
            else{
                alert("Usuário já existe.");
            }
        }
        else{
            AUTH.session_sair('0');
            break;
        }
}

}

async function remove(id){

    //Testando se o user está autenticado para fazer remoções

    for(const sessi of AUTH.testUser){

        if(sessi.session === 1){
            const remove_person = await API.remove(`person/${id}`);
            location.reload();
            break;
        }
        else{
            AUTH.session_sair('0')
        }
    }
    
	
};

async function update(ids, name, card, setor) {

    event.preventDefault();
    let idHtml = document.getElementById(`${ids}`);
    let input1, input2, input3;
    
    if (!idHtml.querySelector('input')) {
        console.log(!idHtml.querySelector('input'),  "Esse é o teste do query selector")
        console.log("teste")

        console.log(idHtml.children[1], "Esse é o teste content")
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
    
    buttonUpdate.removeEventListener("click", buttonClickHandler);

    async function buttonClickHandler() {
        idHtml.children[1].innerHTML = `${name.toUpperCase()}`;
        idHtml.children[2].innerHTML = `${card.toUpperCase()}`;
        idHtml.children[3].innerHTML = `${setor.toUpperCase()}`;

        lista = {
            name: name.toUpperCase(),
            card: card.toUpperCase(),
            setor: setor.toUpperCase()
        };

        const update_date = await API.update('person',ids, lista);
    }

    buttonUpdate.addEventListener("click", buttonClickHandler);
}

export default { insertPerson, remove, update }