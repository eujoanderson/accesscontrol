//import API from '../services/api.js';
import md5 from 'js-md5';
import Auth from '../lib/auth';

//let testUser = await API.read("users");

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


/************************** LOGIN ******************************** */


// Função para logar no site
async function entrar(){
	event.preventDefault();

	const form = document.querySelector('form');
	const user = Object.fromEntries(new FormData(form));

	const configRequest = {
	  method: 'post',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(user),
	};
  
	const { auth, token } = await (
	  await fetch('/api/signin', configRequest)
	).json();
  
	if (auth) {
	  Auth.signin(token);
	} else {
	  remove_alert_user('danger', 'Error no login!', '0');
	}
}

// Função para recuperar o ID da session do user
async function session_sair(id){
	
}


/********************************************************** */

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
	/*
		const data = {
			email: email,
			message: message,
			date:await times()
		};
		const db_alert = await API.create(`${db}`,data);
	*/
}


async function cadastrar(){

	event.preventDefault();

	const createEmail = document.querySelector("#createEmail").value;
	const createPassword = document.querySelector("#createPassword").value;
	const createTestPassword = document.querySelector("#createTestPassword").value;

	if(createPassword != "" && createTestPassword != ""){

		if(createPassword != createTestPassword ){
			createAlert("<i class='bx bx-repost px-2' ></i>", 'As senhas precisam ser iguais!', 'danger');
		}else{
			const form = document.querySelector('form');
			const user_new = Object.fromEntries(new FormData(form));
		
			const configRequest = {
				method: 'get',
			};
			
			const response = await fetch('/api/users/emails', configRequest);
			const email = await response.json();
	
			const name = user_new.email_new.split("@")[0];
			const capitalized = name[0].toUpperCase() + name.substr(1);
			const list_emails = [];
	
			for (let i = 0; i < email.length; i++) {
				const currentObject = email[i];
				list_emails.push(currentObject.email);
			}
	
			//Se o email já exite no banco de dados	
			if(!list_emails.includes(user_new.email_new)){
				const user = {
					"name": capitalized,
					"email": user_new.email_new,
					"password":user_new.password_new,
				};
	
				const configRequest = {
					method: 'post',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify(user),
				};
	
				const user_response = await (
					await fetch('/api/users', configRequest)
				).json();
	
				createAlert("<i class='bx bx-repost px-2' ></i>", 'O usuário foi criado com sucesso!', 'success');
	
			}else{
				createAlert("<i class='bx bx-repost px-2' ></i>", 'User já existe!', 'danger');
			}
		}
	}else{
		createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' )
	}
}

async function recuperarSenha(){
	event.preventDefault();
	
	const email = document.querySelector("#inputMail").value;
	const testPassword = document.querySelector("#testPassword").value;
	const newPassword = document.querySelector("#newPassword").value;

	if(testPassword != "" && newPassword != ""){
		if(newPassword != testPassword){
			createAlert("<i class='bx bx-repost px-2' ></i>", 'As senhas precisam ser iguais!', 'danger')
		}else{
			const configRequest = {
				method: 'get',
			};
			
			const response = await fetch('/api/emails', configRequest);
			const email_res = await response.json();
			let id = 0;
			
			for (let i = 0; i < email_res.length; i++) {
				const currentObject = email_res[i];

				console.log(currentObject.email)

				if(email === currentObject.email){
					id = currentObject.id;
					break;
				}else{
					id = -1;
				}
			}

			const user = {
				"password":testPassword,
			};

			const configRequestPut = {
				method: 'put',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			};

			const responsePut = await fetch(`/api/user/update_user/${id}`, configRequestPut);
			const emailPut = await responsePut.json();
			createAlert(`<i class='bx bxs-check-square px-2'></i>`, 'Senha alterada com sucesso!', 'success');
		}
		
	}else{
		createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' )
	}
	
	//createAlert(`<i class='bx bxs-check-square px-2'></i>`, 'Senha alterada com sucesso!', 'success');
	//createAlert(`<i class='bx bx-x-circle px-2'></i>`, 'Os campos não podem ser vazio!','danger' );
}

export default {entrar, cadastrar, recuperarSenha, session_sair}