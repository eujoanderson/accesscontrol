import API from '../services/api.js';
import md5 from 'js-md5';

let testUser = await API.read("users");

let nameTest = "";

// Function para criar os alertas dinamicos
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
	
	setTimeout(() => {
		const alerts = document.getElementById("alert");
		alerts.remove()	
	}, 2000);
}


// Função dos Alerts
async function remove_alert_user(cor, message, condic){
    const data = `
        <div id="alert_user" class="alert  alert-${cor} alert-dismissible fade show entrar_user" role="alert" >
		<i class='bx bx-x-circle px-2'></i>
            ${message}
            <button type="button" class="btn-close mt-2" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        const alerts = document.getElementById("entrar_user");
        alerts.innerHTML = data + alerts.innerHTML;

        const alert_user = document.getElementById("alert_user");
        setTimeout(() => {
            alert_user.remove();	
        }, 3000);
        
        if(Number(condic) === 1){
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
}

// Função para recuperar o ID da session do user
async function session_sair(id){
	for(const u of testUser){

		if(u.session === Number(id)){
			const data = {
				email: u.email,
				senha: u.senha,
				session: 0,
				name: nameTest
			};
			const persons_update = await API.update('users', u.id, data);
			window.location.href = "../../index.html";
			break;
		}
	}
}


// Função para logar no site
async function entrar(){
	const email = document.querySelector("#floatingInput").value;
	const senha = document.querySelector("#floatingPassword").value;

	testUser = await API.read("users");


	if( testUser.some(data => data.email === md5(email) && testUser.some(date => date.senha === md5(senha) ) )){
		const emailSplit = email.split("@");
		nameTest += emailSplit[0]

		for (const u of testUser){
			let i = testUser.indexOf(u);

			const data = {
				email: md5(email),
				senha: testUser[i].senha,
				session: 1,
				name: emailSplit[0]
			};
	
			if(testUser[i].email === md5(email)){
				const persons_update = await API.update('users', u.id, data);
				capture_alert(email, 'Autenticado', 'alerts');
				break;
			}
		}
		window.location.href = "../../pages/page-principal.html";
	}
	else{
		remove_alert_user('danger', 'Usuário não encontrado!', '0');

		if( testUser.some(data => data.email === md5(email))){
			capture_alert(email, 'Não autenticado','alerts_error');
		}
	}
}

async function times(){
	const dataHoraAtual = new Date();
	const dia = dataHoraAtual.getDate();
	const mes = dataHoraAtual.getMonth() + 1; 
	const ano = dataHoraAtual.getFullYear();
	const hora = dataHoraAtual.getHours();
	const minutos = dataHoraAtual.getMinutes();
	const segundos = dataHoraAtual.getSeconds();

	let resultado = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`

	return resultado;
}

async function capture_alert(email, message, db){
	
	const data = {
		email: email,
		message: message,
		date:await times()
	};
	const db_alert = await API.create(`${db}`,data);
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
				const emailSplit = createEmail.value.split("@");
				nameTest += emailSplit[0]

				const data = {
					email: md5_email,
					senha: md5_senha,
					session: 0,
					name: emailSplit[0]
				}
				const createUser = await API.create('users', data);

				createAlert(`<i class='bx bxs-check-square px-2'></i>`, 'Usuário criado com sucesso!', 'success');

				const tim = setTimeout(() => {
					window.location.href = "../../index.html";	
				}, 2000);
			}else{
				createAlert(`<i class='bx bx-repost px-2' ></i>`, 'Usuário já existe, tente novamente!', 'danger');
			}
		}
		else{
			createAlert(`<i class='bx bx-stop px-2'></i>`, 'As senhas precisam ser iguais!', 'info');
		}
	}else{
		createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' );
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
			const emailSplit = email.split("@");
			nameTest += emailSplit[0];

			for(const p of persons){
				if(md5(email) === p.email){
					
					const data = {
						email: md5(email),
						senha: md5(testPassword),
						session: 0,
						name: emailSplit[0]
						
					};
					const persons_update = await API.update('users', p.id, data);

					createAlert(`<i class='bx bxs-check-square px-2'></i>`, 'Senha alterada com sucesso!', 'success');
				}
			}
		}else{
			createAlert("<i class='bx bx-repost px-2' ></i>", 'As senhas precisam ser iguais!', 'danger');
		}
	}else{
		createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' );
	}	
}

export default {entrar, cadastrar, recuperarSenha, session_sair, testUser}