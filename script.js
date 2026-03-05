// style on active category button
let buttons = [];
const activeInactive = id => {
    buttons.forEach(button => {
        const buttonElement = document.getElementById(button);
        if (button === id) {
            buttonElement.classList.remove('btn-outline');
        } else {
            buttonElement.classList.add('btn-outline');
        }
    });
}


// load functions
const loadCategoreis = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    displayCategories(data.categories);
}
loadCategoreis();

const loadTrees = async (category) => {
    if (category === 'button-all') {
        // load all the plants
        // the url is going to be different
        const res = await fetch('https://openapi.programming-hero.com/api/plants');
        const data = await res.json();
        displayTrees(data.plants);
    } else {
        // load particular categories plants
        // different url
        const id = category.split('-')[1];
        const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
        const data = await res.json();
        displayTrees(data.plants);
    }
    activeInactive(category);
}

loadTrees('button-all');

// display functions
const displayTreeInfo = plant => {
    console.log('hello from info', plant);
    const modal = document.getElementById('plant-info-modal');
    modal.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'modal-box space-y-2';
    div.innerHTML = `
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-2xl text-success font-semibold">${plant.name}</h3>
        <figure class="h-[300px] cursor-pointer">
            <img src="${plant.image}" alt="" class="w-full h-full object-cover">
        </figure>
        <div class="badge badge-outline badge-success">${plant.category}</div>
        <p>
            Description: ${plant.description}
        </p>
        <div class="card-actions justify-between items-center">
            <p class="text-success text-2xl">$${plant.price}</p>
        </div>
    `;
    modal.appendChild(div);
    modal.showModal();
}
const displayTrees = plants => {
    const treesContainerElement = document.getElementById('trees-container');
    treesContainerElement.innerHTML = '';
    plants.forEach(plant => {
        const plantElement = createPlantElement(plant);
        treesContainerElement.appendChild(plantElement);
    });
}
const displayCategories = (categories) => {
    const categoriesButtonElement = document.getElementById('categories-buttons');
    categories.forEach(cat => {
        const btn = createCategoriesButton(cat);
        categoriesButtonElement.appendChild(btn);
    });
    buttons.push('button-all');
}

// create html elements
const createCategoriesButton = cat => {
    const btn = document.createElement('button');
    btn.className = "btn btn-outline w-full btn-success";
    btn.id = `button-${cat.id}`
    buttons.push(btn.id);
    btn.innerHTML = `
        ${cat.category_name}
    `;
    btn.onclick = function() {
        loadTrees(btn.id);
    }
    return btn;
}

const createPlantElement = plant => {
    const plnt = document.createElement('div');
    plnt.className = 'card bg-base-100 shadow-sm';
    plnt.id = `${plant.id}`;
    plnt.innerHTML = `
        <figure onclick='displayTreeInfo(${JSON.stringify(plant)})' id='figure' class="h-[200px] cursor-pointer">
            <img src="${plant.image}" alt="">
        </figure>
        <div class="card-body">
            <h2 class="card-title">${plant.name}</h2>
            <p class="line-clamp-2">${plant.description}
            </p>
            <div class="badge badge-outline badge-success">${plant.category}</div>
            <div class="card-actions justify-between items-center">
                <p class="text-success text-2xl">$${plant.price}</p>
                <button class="btn btn-sm btn-success">Buy Now</button>
            </div>
        </div>
    `;
    // plnt.onclick = function() {
    //     displayTreeInfo(plant);
    // }
    return plnt;
}


// event listener
