
// template para lista
export const listItemTemplate = data =>
    `   <li class="list-item" data-id="${data.number}">
        <span class="list-meta-info">
            <img src="${data.imageUrl}" class="item-avatar-img" alt="${data.name}">
            <span class="number">${String(data.number).padStart(3, '0')}</span>
        </span>
        <span class="list-info">
            <span class="name">${data.name}</span>
        </span>
    </li>`;


// template para secao de detalhes
export const detailSection = data => `            
                <div class="back-to-list">x</div>
                <header class="list-item selected">
                    <span class="list-meta-info">
                        <img src="${data.imageUrl}" class="${data.imageUrl}" alt="">
                        <span class="number">00${data.number}</span>
                    </span>
                    <span class="list-info">
                        <span class="name">${data.name}</span>
                    </span>
                </header>
                <dl id="details">
                    <dt id="detail-title">Implementar desafio</dt>
                    <dt>Tipo(s)</dt>
                    <dd id="detail-types">
                        <span class="type">${data.tipo}</span>
                    </dd>
                    <dt>Altura</dt>
                    <dd id="detail-height">${data.altura}</dd>
                    <dt>Peso</dt>
                    <dd id="detail-weight">${data.peso}</dd>
                </dl>
    `

// template para o time
export const typeTemplate = name => `<span class="type">${name}</span>`
