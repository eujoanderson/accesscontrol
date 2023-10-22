import API from '../services/api.js';
import md5 from 'js-md5';

let testUser = await API.read("users");
	
function removeElement(){
	const tim = setTimeout(() => {
		const alerts = document.getElementById("alert");
		alerts.remove()	
	}, 2000);
}

async function session_sair(id){
	for(const u of testUser){

		if(u.session === Number(id)){
			const data = {
				email: u.email,
				senha: u.senha,
				session: 0
			};
			const persons_update = await API.update('users', u.id, data);
			window.location.href = "../../index.html";
			break;
		}
	}
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

		const data = {
			email: md5(email),
			senha: md5(senha),
			session: 1
		};

		for (const u of users){
			let i = users.indexOf(u);
	
			if(users[i].email === md5(email)){
				const persons_update = await API.update('users', u.id, data);
				break;
			}
		}
		window.location.href = "../../pages/page-principal.html";
	}
	else{
		alert("Usuário não encontrado!");
	}
}


async function cadastrar(){

	event.preventDefault();
	const createEmail = document.querySelector("#createEmail");
	const createPassword = document.querySelector("#createPassword");
	const createTestPassword = document.querySelector("#createTestPassword");


	const emailValue = createEmail.value;
	const passwordValue = createPassword.value;
	const testPasswordValue = createTestPassword.value;

	if(createEmail.value != "" && createPassword.value != "" && createTestPassword.value != "" ){
		if( createPassword.value === createTestPassword.value){
			
			if(!testUser.some(data => data.email === md5(createEmail.value) )){
				const md5_email = md5(createEmail.value);
				const md5_senha = md5(createPassword.value);
	
				const data = {
					email: md5_email,
					senha: md5_senha,
					session: 0
				}
				const createUser = await API.create('users', data);

				createAlert(`<i class='bx bxs-check-square px-2'></i>`, 'Usuário criado com sucesso!', 'success');

				const tim = setTimeout(() => {
					window.location.href = "../../index.html";	
				}, 2000);
				removeElement();
			}else{
				createAlert(`<i class='bx bx-repost px-2' ></i>`, 'Usuário já existe, tente novamente!', 'danger');
				removeElement();
			}
		}
		else{
			createAlert(`<i class='bx bx-stop px-2'></i>`, 'As senhas precisam ser iguais!', 'info');
			removeElement();
		}
	}else{
		createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' );
		removeElement();
	}	
}

async function recuperarSenha(){
	event.preventDefault();
	const email = document.querySelector("#inputMail").value;
	const testPassword = document.querySelector("#testPassword").value;
	const newPassword = document.querySelector("#newPassword").value;

	const persons = await API.read('users');
	if(email != "" && testPassword != "" && newPassword != ""){
		if(testPassword === newPassword){
			for(const p of persons){
				if(md5(email) === p.email){
					
					const data = {
						email: md5(email),
						senha: md5(testPassword),
						session: 0
					};
					const persons_update = await API.update('users', p.id, data);

					createAlert(`<i class='bx bxs-check-square px-2'></i>`, 'Senha alterada com sucesso!', 'success');
					removeElement();
				}
			}
		}else{
			createAlert("<i class='bx bx-repost px-2' ></i>", 'As senhas precisam ser iguais!', 'danger');
			removeElement();
		}
	}else{
		createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' );
		removeElement();
	}	
}

export default {entrar, cadastrar, recuperarSenha, session_sair, testUser}
