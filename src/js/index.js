const tCost = document.querySelector('#costs');
const tRevenue = document.querySelector('#revenue');
const totalCost = document.querySelectorAll('#cost .value');
const totalRevenue = document.querySelectorAll('#revenue .value');
const balance = document.querySelector('#balance');

let sum=0;

const url = 'http://localhost:8080';

const getCosts = async (idUser)=>{
  const costs = await acess(`cost/${idUser}`);
  
  tCost.appendChild(createThead());

  const tbody = document.createComment('tbody');
  tCost.appendChild(tbody);

  for(cost of costs){
    tCost.appendChild(createRow(cost, 'cost'));
  }
  balance.textContent = sum;
}

const getRevenue = async (idUser)=>{
  const costs = await acess(`revenue/${idUser}`);
  
  tRevenue.appendChild(createThead());

  const tbody = document.createComment('tbody');
  tRevenue.appendChild(tbody);

  for(cost of costs){
    tRevenue.appendChild(createRow(cost, 'revenue'));
  }
  balance.textContent = sum;
}

const createThead = ()=>{
  const thead = document.createElement('thead');
  const thDescription = document.createElement('th');
  const thValue = document.createElement('th');
  const thDate = document.createElement('th');

  thDescription.innerHTML = 'Descrição';
  thValue.innerHTML = 'Valor';
  thDate.innerHTML = 'Data';

  thead.appendChild(thDescription);
  thead.appendChild(thValue);
  thead.appendChild(thDate);

  return thead;
}

const createRow = (data, type)=>{
  if(type === 'cost')
  sum-=Number(data.value);
  else
  sum+=Number(data.value);

  const tr = document.createElement('tr');
  const tdDescription = document.createElement('td');
  const tdValue = document.createElement('td');
  const tdDate = document.createElement('td');

  tdValue.className = 'value';
  tdValue.setAttribute('type', 'number');
  tdDate.setAttribute('type', 'date');

  data.date = new Date();
  data.date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

  tdDescription.innerHTML = data.description;
  tdValue.innerHTML = data.value;
  tdDate.innerHTML = data.date;

  tr.appendChild(tdDescription);
  tr.appendChild(tdValue);
  tr.appendChild(tdDate);

  return tr;
}

const acess = async (route)=>{
  const acess = await fetch(`${url}/${route}`);
  const data = await acess.json();
  
  return data
}

const actionPost = async (url, body)=>{
  const cost = await fetch(url, {method:'POST', body:JSON.stringify(body), bodyUsed:true, headers:{'Content-type': 'application/json'}});
}


const createCost= ()=>{
  event.preventDefault();

  const newCost = `${url}/cost/1`;
  let description = document.querySelector('#costDescription').value;
  let value = document.querySelector('#costValue').value;
  
  const body = {
    "description": description, 
    "value": value
  };

  actionPost(newCost, body);
  location.reload();
  alert('Cadastro realizado com sucesso!');
}

const createRevenue= ()=>{
  event.preventDefault();

  const newRevenue = `${url}/revenue/1`;
  let description = document.querySelector('#revenueDescription').value;
  let value = document.querySelector('#revenueValue').value;

  const body = {
    "description": description, 
    "value": value
  };

  actionPost(newRevenue, body);
  location.reload();
  alert('Cadastro realizado com sucesso!');
}

getCosts(1);
getRevenue(1);