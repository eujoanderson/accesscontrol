import './js/script.js';
import './css/page-principal.css';
import './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './img/icon.png';
import INSERT from './js/component/insertPerson.js';
import { lista } from './js/component/insertPerson.js'
import AUTH from './js/component/autenticacao.js';
import AUTH_USER from './js/lib/auth.js';

window.insertPerson = INSERT.insertPerson;
window.remove_user = INSERT.remove_user;
window.update = INSERT.update;
window.entrar = AUTH.entrar;
window.cadastrar = AUTH.cadastrar;
window.recuperarSenha = AUTH.recuperarSenha;
window.session_sair = AUTH.session_sair;
window.alert_load = INSERT.alert_load;
window.signout = AUTH_USER.signout;
window.list_persons = INSERT.list_persons;

INSERT.alert_load();

