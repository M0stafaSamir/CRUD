const productTitle = document.getElementById("productTitle");
const titleMsg = document.getElementById("titleMsg");
const productPrice = document.getElementById("productPrice");
const priceMsg = document.getElementById("priceMsg");
const productCount = document.getElementById("productCount");
const countMsg = document.getElementById("countMsg");
const productImage = document.getElementById("productImage");
const imgMsg = document.getElementById("imgMsg");
const productRating = document.getElementById("productRating");
const ratingMsg = document.getElementById("ratingMsg");
const productDesc = document.getElementById("productDesc");
const descMsg = document.getElementById("descMsg");
const searchProduct = document.getElementById("searchProduct");
let index = 0;

let productList = [];

(function () {
  if (localStorage.getItem("productList") !== null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayAndSearchProduct(false);
    console.log(productList);
  }
})();

function addProduct() {
  if (
    validation(productTitle, "titleMsg") &&
    validation(productPrice, "priceMsg") &&
    validation(productCount, "countMsg") &&
    validation(productDesc, "descMsg") &&
    validation(productImage, "imgMsg") &&
    validation(productRating, "ratingMsg")
  ) {
    const product = {
      title: productTitle.value,
      price: productPrice.value,
      count: productCount.value,
      rating: productRating.value,
      desc: productDesc.value,
      img: productImage.files[0]?.name
        ? `/imgs/${productImage.files[0].name}`
        : "https://princetoncryo.com/media/catalog/category/default_product.jpg",
    };
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayAndSearchProduct(false);
    clearInputs();
  }

  productTitle.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCount.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}

function deleteProduct(i) {
  productList.splice(i, 1);
  displayAndSearchProduct(false);
  localStorage.setItem("productList", JSON.stringify(productList));
}

function setUpdateForm(i) {
  index = i;
  productTitle.value = productList[i].title;
  productPrice.value = productList[i].price;
  productCount.value = productList[i].count;
  productRating.value = productList[i].rating;
  productDesc.value = productList[i].desc;

  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.remove("d-none");
}

function updateProduct() {
  if (
    validation(productTitle, "titleMsg") &&
    validation(productPrice, "priceMsg") &&
    validation(productCount, "countMsg") &&
    validation(productDesc, "descMsg") &&
    validation(productImage, "imgMsg")
  ) {
    const product = {
      title: productTitle.value,
      price: productPrice.value,
      count: productCount.value,
      rating: productRating.value,
      desc: productDesc.value,
      img: productImage.files[0]?.name
        ? `/imgs/${productImage.files[0].name}`
        : "https://princetoncryo.com/media/catalog/category/default_product.jpg",
    };
    productList.splice(index, 1, product);
    displayAndSearchProduct();
    localStorage.setItem("productList", JSON.stringify(productList));

    document.getElementById("addBtn").classList.remove("d-none");
    document.getElementById("updateBtn").classList.add("d-none");
    clearInputs();
  }

  productTitle.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCount.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}

function displayAndSearchProduct(search) {
  let box = ``;

  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].title
        .toLowerCase()
        .includes(searchProduct.value.toLowerCase())
    ) {
      var rating = ``;

      //for rating
      switch (productList[i].rating) {
        case "1":
          rating = `
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
         <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
           <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        `;
          break;
        case "2":
          rating = `
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        
          <i class="fa-regular fa-star"></i>
           <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        `;
          break;

        case "3":
          rating = `
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
           <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        `;
          break;

        case "4":
          rating = `
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
            <i class="fa-regular fa-star"></i>
        `;
          break;

        case "5":
          rating = `
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        <i class="fa-solid fa-star" style="color: #ffd43b"></i>
        `;
          break;
        default:
          console.log("error");
      }

      box += `

      
            <tr>
              <td>${i + 1}</td>
              <td>${productList[i].title}</td>
              <td>${productList[i].price}</td>
              <td>${productList[i].count}</td>
           
              <td>
              ${rating}
              </td>
              <td class="description">${productList[i].desc}</td>
              <td>
                <img
                  width="80"
                  src="${productList[i].img}"
                  alt="Product" />
              </td>
              <td>
                <div class="d-flex gap-3">
                  <button onclick="setUpdateForm(${i})" class="btn btn-outline-primary">Update</button>
                  <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button>
                </div>
              </td>
            </tr>

    `;
    }
  }
  let dataBox = document.getElementById("dataBox");
  dataBox.innerHTML = box;

  if (dataBox.innerHTML === "" && search && searchProduct.value !== "") {
    dataBox.innerHTML =
      "<h1 class='text-danger fw-bold'><i class='fa-regular fa-circle-question'></i> Result Not Found</h1>";
  }
}

function clearInputs() {
  productTitle.value = null;
  productPrice.value = null;
  productCount.value = null;
  productRating.value = null;
  productDesc.value = null;
  productImage.value = null;
}

function validation(element, msg) {
  let errMsg = document.getElementById(msg);
  if (testRegex(element) === true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    errMsg.classList.add("d-none");
    errMsg.classList.remove("d-block");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    errMsg.classList.add("d-block");
    errMsg.classList.remove("d-none");
    return false;
  }
}

function removeInvalidOninput(element, msg) {
  let errMsg = document.getElementById(msg);
  if (element.classList.contains("is-invalid") && testRegex(element) === true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    errMsg.classList.add("d-none");
    errMsg.classList.remove("d-block");
  } else if (
    element.classList.contains("is-valid") &&
    testRegex(element) === false
  ) {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    errMsg.classList.remove("d-none");
    errMsg.classList.add("d-block");
  }
}

function testRegex(element) {
  const regex = {
    productTitle: /^.{3,}$/g,
    productPrice: /^(?!0\d)\d{1,6}(\.\d{1,2})?$/g,
    productCount: /^[1-9][0-9]{0,4}$/g,
    productDesc: /^\w{3,}$/gm,
    productRating: /^[1-5]$/gm,
    productImage: /^.{1,}\.(jpg|jpeg|png|svg|web|avif)$/gm,
  };

  if (regex[element.id].test(element.value) === true) {
    return true;
  } else {
    return false;
  }
}
