document.addEventListener("DOMContentLoaded", async () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
  
    // Fetch cart data
    const cartData = {
      original_total_price: 250000,
      items: [
        {
          id: 49839206859071,
          quantity: 1,
          title: "Asgaard sofa",
          price: 25000000,
          line_price: 25000000,
          final_line_price: 25000000,
          image: "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481",
          product_description: "The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials.",
        },
      ],
      currency: "INR",
    };
  
    // Populate cart items
    // Populate cart items


    cartData.items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>
            <div class="item-container">
              <img src="${item.image}" alt="${item.title}" class="item-image">
              <span class="item-title">${item.title}</span>
            </div>
          </td>
          <td><span class="item-price">₹${(item.price / 100).toFixed(2)}</span></td>
          <td><input type="number" value="${item.quantity}" min="1" class="quantity"></td>
          <td>₹${(item.line_price / 100).toFixed(2)}</td>
          <td><button class="remove">🗑️</button></td>
        `;
  
        cartItemsContainer.appendChild(row);

        // Add event listener for the remove button
        const removeButton = row.querySelector(".remove");
        removeButton.addEventListener("click", () => {
          const userConfirmed = window.confirm("Do you want to remove this item?");
          if (userConfirmed) {
            row.remove(); // Remove the row from the table
            console.log(`${item.title} removed from cart.`);
            // Additional logic can go here (e.g., updating the backend or recalculating totals)
          } else {
            console.log(`${item.title} removal canceled.`);
            // No action is taken if the user clicks "Cancel"
          }
        });


  
      // Handle quantity change
      const quantityInput = row.querySelector(".quantity");
      quantityInput.addEventListener("change", () => {
        const newQuantity = parseInt(quantityInput.value, 10);
        item.quantity = newQuantity;
        item.line_price = item.price * newQuantity;
        row.querySelector("td:nth-child(4)").innerText = `₹${(item.line_price / 100).toFixed(2)}`;
        updateTotals();
      });
  
      // Handle remove item
      row.querySelector(".remove").addEventListener("click", () => {
        row.remove();
        cartData.items = cartData.items.filter((cartItem) => cartItem.id !== item.id);
        updateTotals();
      });
    });
  
    // Update totals
    const updateTotals = () => {
        const subtotal = cartData.items.reduce((sum, item) => sum + item.line_price, 0);
        subtotalElement.classList.add("subtotal-highlight"); // Add class for subtotal
        subtotalElement.innerText = `₹${(subtotal / 100).toFixed(2)}`;
        totalElement.innerText = `₹${(subtotal / 100).toFixed(2)}`;
      };      
  
    // Initial totals calculation
    updateTotals();
  });
  