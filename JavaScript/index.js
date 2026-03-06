// 1. Get 🌴 All Categories
const categoriesContainer = document.getElementById('categories-container')
// get api
const loadCategories = async () => {
const res = await fetch('https://openapi.programming-hero.com/api/categories');
const data = await res.json();
// Loop
data.categories.forEach(category => {
console.log(category);
const btnAdd = document.createElement('button');
btnAdd.className = 'btn btn-outline w-full';
btnAdd.textContent = category.category_name;

categoriesContainer.appendChild(btnAdd)


});
console.log(data);
console.log(categoriesContainer);

   
}
loadCategories()