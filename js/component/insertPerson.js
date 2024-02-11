import AUTH from '../component/autenticacao.js';
export let lista = [];

window.session_sair = AUTH.session_sair;

async function remove_alert_user(cor, message, condic){
    const data = `
        <div id="alert_user" class="alert  alert-${cor} alert-dismissible fade show container-user" role="alert" >
            ${message}
            <button type="button" class="btn-close mt-2" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

        const alerts = document.getElementById("container_2");
        alerts.innerHTML = data + alerts.innerHTML;

        const alert_user = document.getElementById("alert_user");
        const tim = setTimeout(() => {
            alert_user.remove();	
        }, 3000);
        
        if(Number(condic) === 1){
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
}

async function insertPerson(event){
	event.preventDefault();

    const name = document.querySelector('#name').value.toUpperCase();
    const card = document.querySelector('#card').value;
    const setor = document.querySelector('#setor').value.toUpperCase();

    const persons = {
        "name": name,
        "card": card,
        "setor":setor,
    };

    const configRequest = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(persons),
    };

    const user_response = await (
        await fetch('/api/insert/persons', configRequest)
    ).json();   
}

async function list_persons(){
	const configRequest = {
        method: 'get',
    };
    
    const response = await fetch('/api/persons', configRequest);
    const persons = await response.json();
    
    persons.forEach(person => {
        	const tbody = document.querySelector("table tbody");

	const row = `
	<tr id="${person.id}">
		<th scope="row" >${person.id}</th>
		<td >${person.name}</td>
		<td >${person.card}</td>
		<td >${person.setor}</td>
		<td class="icon-container ">
			<a class="icon-edit" id="iconEdit-${person.id}" style="cursor:pointer;" onclick="update('${person.id}', '${person.name}', '${person.card}', '${person.setor}')" ><i class='bx bxs-pencil' ></i></a>
			<a class=" icon-edit" style="cursor:pointer;" onclick="remove_user('${person.id}')"><i class='bx bx-x' ></i></a> 
		</td>
    </tr>
	`;

	if (tbody != null){
		tbody.insertAdjacentHTML('beforeend', row);
	}
    });
}

async function remove_user(id){

    /*
    persons = await API.read('person');
    users = await API.read('users');
    
    for (const u of users){
        let i = users.indexOf(u);

        if(users[i].session === 1 && users[i].email === u.email){
            const remove_person = await API.remove(`person/${id}`);
            
            remove_alert_user('info', 'Usuário removido com sucesso!', '1');
            
            break;
        }
        else{
            AUTH.session_sair('0');
            break;
        }
    }*/

};

async function update(ids, name, card, setor) {

    event.preventDefault();
    /* 
    let idHtml = document.getElementById(`${ids}`);
    let input1, input2, input3;
    users = await API.read('users');

    for (const u of users){
        let i = users.indexOf(u);

        if(users[i].session === 1){
            if (!idHtml.querySelector('input')) {
                idHtml.children[1].innerHTML = `<input id="1" type="text" class="edit" value="${name}" />`;
                idHtml.children[2].innerHTML = `<input id="2" type="text" class="edit" value="${card}" />`;
                idHtml.children[3].innerHTML = `<input id="3" type="text" class="edit" value="${setor}" />`;

                input1 = idHtml.children[1].querySelector('input');
                input2 = idHtml.children[2].querySelector('input');
                input3 = idHtml.children[3].querySelector('input');

                input1.addEventListener("input", function () {
                    name = input1.value;
                });

                input2.addEventListener("input", function () {
                    card = input2.value;
                });

                input3.addEventListener("input", function () {
                    setor = input3.value;
                }); 
            }

            break;
        }else{
            AUTH.session_sair('0');
        }
    }
    
    let buttonUpdate = document.querySelector(`#iconEdit-${ids}`);
    buttonUpdate.removeEventListener("click", buttonClickHandler);

    async function buttonClickHandler() {
        idHtml.children[1].innerHTML = `${name.toUpperCase()}`;
        idHtml.children[2].innerHTML = `${card.toUpperCase()}`;
        idHtml.children[3].innerHTML = `${setor.toUpperCase()}`;

        lista = {
            name: name.toUpperCase(),
            card: card.toUpperCase(),
            setor: setor.toUpperCase()
        };

        const update_date = await API.update('person',ids, lista);
    }

    buttonUpdate.addEventListener("click", buttonClickHandler);
    */
}

async function alert_load(){
    /*
    const div_users = document.getElementById("alerts_users");

    let alerts = await API.read('alerts');
    let alerts_users = await API.read('alerts_error');

    for (let i = alerts.length - 1; i >= 0; i--) {
        const row = `{
            <div class="alert alert-success d-flex align-items-center" style="margin-bottom: -10px;">
                <i class='bx bxs-check-square px-2'></i>
                <div class="d-flex flex-column ">
                    <div><Strong>Email</Strong>: ${alerts[i].email}</div> 
                    <div><Strong>Error</Strong>: ${alerts[i].message}</div>
                </div>
    
                <div class="date_box">
                    <strong>Data: ${alerts[i].date}</strong>
                </div>
            </div>
        }`;

        if (div_users != null){
            div_users.insertAdjacentHTML('beforeend', row);   
        }
    }

    for (let i = alerts_users.length - 1; i >= 0; i--) {
        const row = `{
            <div class="alert alert-danger d-flex align-items-center">
                <i class='bx bx-x-circle px-3'></i>
                <div class="d-flex flex-column ">
                    <div><Strong>Email</Strong>: ${alerts_users[i].email}</div> 
                    <div><Strong>Error</Strong>: ${alerts_users[i].message}</div>
                </div>
    
                <div class="date_box">
                    <strong>Data: ${alerts_users[i].date}</strong>
                </div>
            </div>
        }`;

        if (div_users != null){
            div_users.insertAdjacentHTML('beforeend', row);   
        }
    }
    */
}

export default { insertPerson, remove_user, update, alert_load, list_persons }