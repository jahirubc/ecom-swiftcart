const productContainer = document.getElementById("product-container");
const categoryContainer = document.getElementById("category-container");

async function loadCategories() {
    try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const categories = await res.json();

        displayCategories(categories);
    } catch (error) {
        console.log(error);
    }
}

function displayCategories(categories) {
    categoryContainer.innerHTML = "";

    // Add "All" button
    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.className = "btn btn-primary";
    allBtn.onclick = () => loadProducts();
    categoryContainer.appendChild(allBtn);

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.className = "btn btn-outline";
        btn.onclick = () => loadProductsByCategory(category);
        categoryContainer.appendChild(btn);
    });
}

async function loadProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    displayProducts(data);
}

async function loadProductsByCategory(category) {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    displayProducts(data);
}

function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");

        div.innerHTML = `
      <div class="card bg-base-100 shadow-xl">
        <figure class="px-6 pt-6">
          <img src="${product.image}" 
               class="rounded-xl h-48 object-contain w-full" />
        </figure>
        <div class="card-body items-center text-center">
          <h3 class="card-title text-sm">${product.title}</h3>
          <p class="text-gray-500 font-bold">$${product.price}</p>
          <div class="card-actions mt-4">
            <button class="btn btn-primary btn-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

        productContainer.appendChild(div);
    });
}

// Initial Load
loadCategories();
loadProducts();
