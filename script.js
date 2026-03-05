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
        const res = await fetch(`https://openapi.programming-hero.com/api/category/${category}`);
        const data = await res.json();
        displayTrees(data.plants);
    }
    activeInactive(category);
}

loadTrees('button-all');

// display functions
const displayTrees = plants => {
    const treesContainerElement = document.getElementById('trees-container');
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
    return btn;
}

const createPlantElement = plant => {
    const plnt = document.createElement('div');
    plnt.className = 'card bg-base-100 shadow-sm';
    plnt.id = `${plant.id}`;
    plnt.innerHTML = `
        <figure class="h-[200px]">
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
    return plnt;
}


