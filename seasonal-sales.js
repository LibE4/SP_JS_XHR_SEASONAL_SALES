var saleDiscount = 0;
var saleSeason = "";
var productData = {};
var dataSales = {};
var categoryRequest = new XMLHttpRequest;
categoryRequest.addEventListener("load", seasonalSales); //Callback
categoryRequest.open("GET", "categories.json")
categoryRequest.send();
var saleEmt =  document.getElementById('sale');
saleEmt.addEventListener("change", seasonAction);

function seasonAction(){
	saleSeason = saleEmt.value;
  for (var j = 0; j < dataSales.categories.length; j++) {
  	if (dataSales.categories[j].season_discount == saleSeason) {
  		saleDiscount = dataSales.categories[j].discount;
      break;
  	}
  }
  productDisplay(productData);
}; // end of seasonAction

function seasonalSales() {
  dataSales = JSON.parse(categoryRequest.responseText);
  var saleData = "<option disabled selected value> -- select an option -- </option>";
  var currentSale;
  for (var i = 0; i < dataSales.categories.length; i++) {
    currentSale = dataSales.categories[i];
    saleData += `<option>${currentSale.season_discount}</option>`;
  };
  saleEmt.innerHTML = saleData;

	var productRequest = new XMLHttpRequest;
	productRequest.addEventListener("load", setProductDisplay); //Callback
	productRequest.open("GET", "products.json")
	productRequest.send();
	function setProductDisplay (){
	  productData = JSON.parse(productRequest.responseText);
	  productDisplay(productData);
  }
} // end of seasonalSales

function productDisplay(productData) {
  var productInDOM = "";
  var currentProduct;
	var tableEmt =  document.getElementById('dataDisplay');
  for (var i = 0; i < productData.products.length; i++) {
    currentProduct = productData.products[i];
    productInDOM += "<tr>";
      productInDOM += `<td>${currentProduct.name}</td>`;
      for (var j = 0; j < dataSales.categories.length; j++) {
      	if (dataSales.categories[j].id == currentProduct.category_id) {
		      productInDOM += `<td>${dataSales.categories[j].name}</td>`;
		      if (dataSales.categories[j].season_discount === saleSeason){
		      	productInDOM += `<td>${currentProduct.price * (1 - saleDiscount)}</td>`;
	      	}  else {
			      productInDOM += `<td>${currentProduct.price}</td>`;
	      	}
		      break;
      	}
      }
    productInDOM += "</tr>";
  };
  tableEmt.innerHTML = productInDOM;
} // end of productDisplay
