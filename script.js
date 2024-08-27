const gridLi = document.querySelector('.hero-grid');

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
       data.forEach(product => {
        const card = `
            <div class="product">
                    <img src="${product.image.desktop}" />
                     <button>Add to Cart</button>
                    <h2>${product.category}</h2>
                    <h1>${product.name}</h1>
                    <p>${product.price}</p>
                   
            </div>
        `;
        gridLi.innerHTML += card;

       })
    })


