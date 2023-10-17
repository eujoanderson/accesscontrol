import API from '../services/api.js';
import md5 from 'js-md5';

async function entrar(){

	const email = document.querySelector("#floatingInput").value;
	const senha = document.querySelector("#floatingPassword").value;

	const users = await API.read("users");

	if(users.length != 0){
		for(const user of users){

			console.log(md5(email))
			if( !(md5(email) === md5(user.email)) &&  !(md5(user.senha) === md5(senha))){
				alert("Autenticado")
				break;
			}else{
				alert("Ocorreu algum error")
			}
		}
	}	
}


async function cadastrar(){
	const createEmail = document.querySelector("#createEmail").value;
	const createPassword = document.querySelector("#createPassword").value;
	const createTestPassword = document.querySelector("#createTestPassword").value;

	if( createPassword === createTestPassword){
		const testUser = await API.read("users");

		if(!testUser.some(data => md5(data.email) === md5(createEmail) )){
			const md5_senha = md5(createPassword);
			const md5_email = md5(createEmail);

			const data = {
				email: md5_email,
				senha: md5_senha
			}
			const createUser = await API.create('users', data);

			alert("Criado");
		}else{
			alert("Usuário já existe")
		}
	}
	else{
		alert("As senhas não são iguais!")
	}
}

async function recuperarSenha(){
	
}




export default {entrar, cadastrar, recuperarSenha}
