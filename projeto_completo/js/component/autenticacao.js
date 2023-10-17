import API from '../services/api';

function entrar(event){
	const email = document.querySelector("#floatingInput").value
	const senha = document.querySelector("#floatingPassword").value

	const user = API.read("users");

	console.log(user)
	console.log(email,senha)
}

export default {entrar}