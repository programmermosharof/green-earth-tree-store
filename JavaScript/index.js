//  All ID
const categoriesContainer=document.getElementById('categories-container');
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById('loadingSpinner');
// hidden and show Function

const showLoading = () => {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
    treesContainer.innerHTML = "";
    
}
const hideLoading = () => {
    loadingSpinner.classList.add('hidden')
}

// 1. Get 🌴 All Categories
// get api
const loadCategories = async () => {
const res = await fetch('https://openapi.programming-hero.com/api/categories');
const data = await res.json();
// Loop
data.categories.forEach(category => {
// console.log(category);
const btnAdd = document.createElement('button');
btnAdd.className = 'btn btn-outline w-full';
btnAdd.textContent = category.category_name;
btnAdd.onclick = () => selectCategories(category.id, btnAdd)


categoriesContainer.appendChild(btnAdd)

});
// console.log(data);
// console.log(categoriesContainer);   
}

// Selected Categories onClick Function
const selectCategories = async (categoryId, btn) => {
  console.log(categoryId, btn);
  showLoading();
 
  const allButtons = document.querySelectorAll('#categories-container button , #all-trees-btn' )
//   console.log(allButtons);
  allButtons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline')
  }) 
   btn.classList.add('btn-primary')
  btn.classList.remove('btn-outline');


  const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)

  const data = await res.json();

  console.log(data);
  displayTrees(data.plants)

  hideLoading()
}


// 2. Get 🌴 All Plants

const loadTrees = async () => {
showLoading()
// loadingSpinner.classList.add('flex')
const res = await fetch('https://openapi.programming-hero.com/api/plants');
const data = await res.json();
hideLoading()
// console.log(data);
displayTrees(data.plants)

}
// All Plants Show Display
const displayTrees = (trees) =>{
    
trees.forEach((tree) => {
// console.log(tree);
// Creat a Div

const card = document.createElement('div')
card.className = 'card bg-base-100  shadow-sm';
card.innerHTML = `
<div class="card bg-base-100  shadow-sm">
      <figure>
        <img
          src="${tree.image}"
          alt="${tree.name}"
         title="${tree.name}"
         class="h-48 w-full obj" />
      </figure>
      <div class="card-body">
        <h2 class="card-title font-bold">${tree.name}</h2>
        <p class="line-clamp-2">${tree.description}</p>
        
        <div class="flex justify-between items-center">
          <div class="badge outline font-medium bg-[#CFF0DC] text-[#15803d] rounded-full">${tree.category}</div>
          <h2 class="font-bold text-xl ">$${tree.price}</h2>
        </div>
        <div class="card-actions justify-end">
          <button class="btn font-medium text-white bg-[#15803d] btn-block rounded-full">Add to Cart</button>
        </div>
      </div>
    </div>

`;
// appendChild
treesContainer.appendChild(card);
   
})

}
// All Categories function call
loadCategories()

//  All Plants function call
loadTrees()

