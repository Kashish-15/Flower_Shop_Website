//quiz

const quizData = [
  {
    question: "What's the occasion?",
    options: ["Birthday", "Anniversary", "Apology", "Just Because"]
  },
  {
    question: "What's their favorite color?",
    options: ["Red", "Pink", "White", "Yellow"]
  },
  {
    question: "What scent do they prefer?",
    options: ["Sweet", "Fresh", "Mild", "No Preference"]
  },
  {
    question: "What's their personality?",
    options: ["Romantic", "Cheerful", "Elegant", "Calm"]
  },
  {
    question: "Which flower do they like most?",
    options: ["Roses", "Lilies", "Tulips", "Mixed"]
  },
  {
    question: "What size bouquet do you want?",
    options: ["Small", "Medium", "Large", "Extra Large"]
  }
];

let currentQuestionIndex = 0;
let selectedAnswers = [];
let matchedProduct = null;

window.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const quizResult = document.getElementById("quiz-result");

  function showQuestion() {
    const current = quizData[currentQuestionIndex];
    questionContainer.innerHTML = `
      <h3>${current.question}</h3>
      ${current.options.map(option => `
        <button class="quiz-btn" onclick="selectAnswer('${option}')">${option}</button>
      `).join('')}
    `;
  }

  window.selectAnswer = function (answer) {
    selectedAnswers.push(answer);
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  };

  function showResult() {
    matchedProduct = getBouquetSuggestion(selectedAnswers);
    quizResult.innerHTML = `We recommend: <strong>${matchedProduct.name}</strong><br><img src="${matchedProduct.image}" alt="${matchedProduct.name}" style="max-width: 200px; margin-top: 10px;"><br><span style="font-size: 18px; color: #800000;">${matchedProduct.price}</span>`;
    resultContainer.style.display = "block";
    questionContainer.innerHTML = "";
  }

  function getBouquetSuggestion(answers) {
    const bouquets = [
      {
        name: "Midnight Romance",
        image: "img9.avif",
        price: "₹1199",
        preferences: {
          occasion: "Anniversary",
          flower: "Roses",
          color: "Red",
          personality: "Romantic"
        }
      },
      {
        name: "Petal Basket",
        image: "img14.webp",
        price: "₹1099",
        preferences: {
          occasion: "Birthday",
          color: "Pink",
          flower: "Tulips",
          personality: "Cheerful"
        }
      },
      {
        name: "Serene Grace",
        image: "img7.avif",
        price: "₹1199",
        preferences: {
          flower: "Lilies",
          personality: "Elegant",
          scent: "Mild"
        }
      },
      {
        name: "Blushing Garden",
        image: "img3.avif",
        price: "₹1199",
        preferences: {
          flower: "Mixed",
          scent: "Fresh",
          color: "Yellow"
        }
      },
      {
        name: "Heart & Soul",
        image: "img15.webp",
        price: "₹2999",
        preferences: {
          size: "Extra Large",
          flower: "Roses",
          occasion: "Just Because"
        }
      },
      {
        name: "Scarlet Passion",
        image: "img1.avif",
        price: "₹999",
        preferences: {}
      }
    ];
  
    // Map answers to question labels
    const answerMap = {
      occasion: answers[0],
      color: answers[1],
      scent: answers[2],
      personality: answers[3],
      flower: answers[4],
      size: answers[5]
    };
  
    // Score each bouquet
    let bestMatch = bouquets[0];
    let maxScore = 0;
  
    for (let bouquet of bouquets) {
      let score = 0;
      for (let key in bouquet.preferences) {
        if (bouquet.preferences[key] === answerMap[key]) {
          score++;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = bouquet;
      }
    }
  
    return bestMatch;
  }
  

  window.addToCart = function () {
    if (!matchedProduct) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingIndex = cart.findIndex(p => p.name === matchedProduct.name);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...matchedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${matchedProduct.name} has been added to your cart!`);
  };

  showQuestion();
});




// Function to add a product to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior

    const productBox = button.closest('.box');
    const productId = productBox.id;
    const productName = productBox.querySelector('h3').textContent;
    const productPrice = parseInt(productBox.querySelector('.price').textContent.trim().replace('₹', ''));
    const productImage = productBox.querySelector('img').src;
    const productDescription = productBox.querySelector('p').textContent;

    // Create a product object
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription,
      quantity: 1
    };

// Function to add a product to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior

    const productBox = button.closest('.box');
    const productId = productBox.id;  // Assuming each product has a unique ID (use it as cart key)
    const productName = productBox.querySelector('h3').textContent;
    const productPrice = parseInt(productBox.querySelector('.price').textContent.trim().replace('₹', ''));
    const productImage = productBox.querySelector('img').src;
    const productDescription = productBox.querySelector('p').textContent;

    // Create a product object
    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription,
      quantity: 1
    };

    // Get the cart from localStorage, or create a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
      // If it exists, update the quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If it doesn't exist, add it to the cart
      cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, alert the user that the product was added
    alert('Product added to cart!');
  });
});

















































// Function to add a product to the cart
/*const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent default link behavior
        
        // Get product details from the product box
        const productBox = button.closest('.box');
        const productId = productBox.id;
        const productName = productBox.querySelector('h3').textContent;
        const productPrice = productBox.querySelector('.price').textContent.trim();
        const productImage = productBox.querySelector('img').src;
        
        // Create an object for the product
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        };

        // Retrieve existing cart from localStorage or create a new one
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the new product to the cart
        cart.push(product);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Optionally, alert the user or update UI
        alert('Product added to cart!');
    });
});*/














































































































































//add to cart
/*document.addEventListener('DOMContentLoaded', () => {
  const cartButtons = document.querySelectorAll('.cart-btn');
  let cartCount = 0;

  cartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default anchor behavior
          cartCount++;
          alert(`Item added to cart! Total items: ${cartCount}`);
          // You can later store in localStorage or redirect
      });
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.image}" style="width:40px; height:40px; object-fit:cover; margin-right:10px;">
      ${item.name} - ${item.price}
    `;
    cartItemsContainer.appendChild(li);
  });
}

// Cart icon click
document.getElementById('cart-icon').addEventListener('click', (e) => {
  e.preventDefault();
  cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
});

function closeCart() {
  cartContainer.style.display = 'none';
}
function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}*/