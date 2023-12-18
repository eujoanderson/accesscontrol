import './js/script.js';
import './css/page-principal.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './img/icon.png';
import INSERT from './js/component/insertPerson.js';
import personTable from './js/component/personTable.js';
import { lista } from './js/component/insertPerson.js'
//import API from './js/services/api.js';
import AUTH from './js/component/autenticacao.js';
import AUTH_USER from './js/lib/auth.js';

//window.requisicaoPaginas = requisicao.requisicaoPaginas;
window.insertPerson = INSERT.insertPerson;
window.remove_user = INSERT.remove_user;
window.update = INSERT.update;
window.entrar = AUTH.entrar;
window.cadastrar = AUTH.cadastrar;
window.recuperarSenha = AUTH.recuperarSenha;
window.session_sair = AUTH.session_sair;
window.alert_load = INSERT.alert_load;
window.signout = AUTH_USER.signout;


//const persons = await API.read("person");
//const users = await API.read("users");

/*

const qtde_users = document.getElementById("qtde_users");
const qtde_cards = document.getElementById("qtde_cards");
const header_img = document.querySelector("#header_img");
let cards_user = 0;
*/

/*for (const person of persons) {
	personTable.personTable(person);
}*/
/*



for (const u of users){
	let i = users.indexOf(u);
	if(users[i].session === 1 && users[i].email === u.email){
		header_img.insertAdjacentHTML('beforeend', users[i].name);
		console.log(users[i])
	}
}


for (const cards of persons) {
	if(cards.card != "" && cards.card != " " && cards.card != "-"){
		cards_user += 1
	}
}

if(qtde_users != null){
	qtde_users.insertAdjacentHTML('beforeend', persons.length);
	qtde_cards.insertAdjacentHTML('beforeend', cards_user);
}
*/

INSERT.alert_load();

