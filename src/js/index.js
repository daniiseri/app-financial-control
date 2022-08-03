const tCost = document.querySelector('#costs');
const tRevenue = document.querySelector('#revenue');

const url = 'http://localhost:8080';

const getCosts = async (idUser)=>{
  const acess = await fetch(`${url}/cost/${idUser}`);
  const costs = await acess.json();
  
  tCost.appendChild(createThead());

  const tbody = document.createComment('tbody');
  tCost.appendChild(tbody);

  for(cost of costs){
    tCost.appendChild(createRow(cost));
  }
}

const getRevenue = async (idUser)=>{
  const acess = await fetch(`${url}/revenue/${idUser}`);
  const costs = await acess.json();
  
  tRevenue.appendChild(createThead());

  const tbody = document.createComment('tbody');
  tRevenue.appendChild(tbody);

  for(cost of costs){
    tRevenue.appendChild(createRow(cost));
  }
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

const createRow = (data)=>{
  const tr = document.createElement('tr');
  const tdDescription = document.createElement('td');
  const tdValue = document.createElement('td');
  const tdDate = document.createElement('td');

  tdDescription.innerHTML = data.description;
  tdValue.innerHTML = data.value;
  tdDate.innerHTML = data.date;

  tr.appendChild(tdDescription);
  tr.appendChild(tdValue);
  tr.appendChild(tdDate);

  return tr;
}

getCosts(1);
getRevenue(1);