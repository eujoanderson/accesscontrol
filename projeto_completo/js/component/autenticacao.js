import API from '../services/api.js';
import md5 from 'js-md5';

let mail = ""
let password = ""
let passwordTest = ""

function removeElement(){
	const tim = setTimeout(() => {
		const alerts = document.getElementById("alert");
		alerts.remove()	
	}, 2000);
}

function createAlert(icone, mensagem, cor){
	const alertCreate = `
	<div id="alert" class="alert  alert-${cor} alert-dismissible fade show user-create" role="alert">
		${icone}
		${mensagem}
		<button type="button" class="btn-close mt-2" data-bs-dismiss="alert" aria-label="Close"></button>
	</div>
	`;

	const cadastro = document.getElementById("cadastro");
	cadastro.innerHTML = alertCreate + cadastro.innerHTML;	
}

async function entrar(){

	const email = document.querySelector("#floatingInput").value;
	const senha = document.querySelector("#floatingPassword").value;

	const users = await API.read("users");

	if( users.some(data => data.email === md5(email) && users.some(date => date.senha === md5(senha) ) )){
		window.location.href = "../../pages/page-principal.html";
	}else{
		alert("Usuário não encontrado!")
	}
}


async function cadastrar(){
	const createEmail = document.querySelector("#createEmail");
	const createPassword = document.querySelector("#createPassword");
	const createTestPassword = document.querySelector("#createTestPassword");


	const emailValue = createEmail.value;
	const passwordValue = createPassword.value;
	const testPasswordValue = createTestPassword.value;

	if(createEmail.value != "" && createPassword.value != "" && createTestPassword.value != "" ){
		if( createPassword.value === createTestPassword.value){
			const testUser = await API.read("users");
	
			if(!testUser.some(data => data.email === md5(createEmail.value) )){
				const md5_email = md5(createEmail.value);
				const md5_senha = md5(createPassword.value);
	
				const data = {
					email: md5_email,
					senha: md5_senha
				}
				const createUser = await API.create('users', data);

				createAlert(`<i class='bx bxs-check-square px-2'></i>`, 'Usuário criado com sucesso!', 'success');
				removeElement();
				
				
			}else{
				createAlert(`<i class='bx bx-repost' ></i>`, 'Usuário já existe, tente novamente!', 'danger');
				removeElement();
			}
		}
		else{
			createAlert(`<i class='bx bx-stop'></i>`, 'As senhas precisam ser iguais!', 'info');
			removeElement();
		}
	}else{
		createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' );
		removeElement();
	}	
}

async function recuperarSenha(){
	
}

export default {entrar, cadastrar, recuperarSenha}
