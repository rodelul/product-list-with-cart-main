const gridList = document.querySelector('hero-grid');

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
            gridList.insertAdjacentHTML('beforeend', `<h1>pret ${data.name}</h1>`);
        })
    })