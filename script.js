// load functions
const loadCategoreis = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    displayCategories(data.categories);
}
loadCategoreis();

// display functions
const displayCategories = (categories) => {
    const categoriesButtonElement = document.getElementById('categories-buttons');
    categories.forEach(cat => {
        const btn = createCategoriesButton(cat);
        categoriesButtonElement.appendChild(btn);
    });

}

// create html elements
const createCategoriesButton = cat => {
    const btn = document.createElement('button');
    btn.className = "btn btn-outline w-full btn-success";
    btn.id = `button-${cat.id}`
    btn.innerHTML = `
        ${cat.category_name}
    `;
    return btn;
}