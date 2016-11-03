var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

var resultsObj = {};

//loop over sales data
function go(salesData, taxByProvince, storage) {
  for(var i = 0; i < salesData.length; i += 1) {
    //calculate total sales
    var totalSales = calcTotalSales(salesData[i].sales);
    //use total sales to calc sales tax
    var province = salesData[i].province;
    var taxRate = taxByProvince[province];
    var totalTax = calcTotalTax(totalSales, taxRate);
    //store data somewhere
    storeData(storage, salesData[i].name, totalTax, totalSales)
  }
  return resultsObj;
}

function calcTotalSales(transList) {
  var sum = 0;
  for(var i = 0; i < transList.length; i += 1){
    sum += transList[i];
  }
  return sum;
}

function calcTotalTax(sum, taxRate) {
  return sum * taxRate;
}

function storeData(storage, name, tax, sales) {
  //if company doesn't exist in the storage
  if (!storage[name]) {
    //create key for company and store data
    storage[name] = {
      totalTax: tax,
      totalSales: sales
    };
  } else {
    //else update company data
    storage[name].totalSales += sales;
    storage[name].totalTax += tax;
  }
}




console.log(go(companySalesData, salesTaxRates, resultsObj));
