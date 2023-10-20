import requisicao from './js/ajax.js';
import './js/script.js';
import './css/page-principal.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './img/icon.png';
import INSERT from './js/component/insertPerson.js';
import personTable from './js/component/personTable.js';
import { lista } from './js/component/insertPerson.js'
import API from './js/services/api.js';
import AUTH from './js/component/autenticacao.js';

window.requisicaoPaginas = requisicao.requisicaoPaginas;
window.insertPerson = INSERT.insertPerson;
window.remove = INSERT.remove;
window.update = INSERT.update;
window.entrar = AUTH.entrar;
window.cadastrar = AUTH.cadastrar;
window.recuperarSenha = AUTH.recuperarSenha;
window.session_sair = AUTH.session_sair;

const persons = await API.read("person")

for (const person of persons) {
	personTable.personTable(person);
}