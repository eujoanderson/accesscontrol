function requisicaoPaginas(url){
	let ajax = new XMLHttpRequest();
	let conteudo = document.getElementById('container')

	conteudo.innerHTML = ' ';

	//requisao nao iniciada | state = 0
	console.log(ajax.readyState);

	ajax.open('GET', url);
	//conexao estabelecida com o servidor | state = 1
	console.log(ajax.readyState);


	//logica para requisicao estabelecida
	ajax.onreadystatechange = () => {
		if(ajax.readyState == 4 && ajax.status == 200){
			conteudo.innerHTML = ajax.responseText;
		}

		if(ajax.readyState == 4 && ajax.status == 404){
			conteudo.innerHTML = 'Requisição realizada com sucesso, porém o recurso solicitado não foi encontrado com sucesso o status é 404';
		}
	}

	ajax.send();
	//console.log(ajax);
}

export default { requisicaoPaginas };

