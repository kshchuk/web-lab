function onProductClick(name, price, image) {
    fetch(`https://uk.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exlimit=max&explaintext&exintro&titles=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            let pages = data.query.pages;
            let pageId = Object.keys(pages)[0];
            let description = pages[pageId].extract;

            let productPageHtml = `
                <div class="product-detail">
                    <h1 class="product-detail__title">${name}</h1>
                    <div class="product-detail__image">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="product-detail__description">${description}</div>
                    <p class="product-detail__price">${price}</p>
                    <button class="product-detail__buy-button">Додати до кошика</button>
                    <button onclick="window.open('https://uk.wikipedia.org/wiki/${encodeURIComponent(name)}', '_blank')" class="product-detail__wiki-button">Більше на Wiki</button>
                </div>
            `;

            let mainContent = document.querySelector('.main__central-content');
            mainContent.innerHTML = productPageHtml;
        })
        .catch(error => console.error('Error:', error));
}
