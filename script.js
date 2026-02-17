const productContainer = document.getElementById("product-container");

async function loadProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        displayProducts(data);
    } catch (error) {
        console.log(error);
    }
}

function displayProducts(products) {
    productContainer.innerHTML = "";

    products.slice(0, 8).forEach(product => {
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

loadProducts();
