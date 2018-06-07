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

function calculateSalesTax(salesData, taxRates) {
  const add = (a, b) => a + b; // Create an add function
  let sumSales; let taxRate; let sumTaxes;
  let result = {};

  salesData.forEach((salesItem, index) => {
    sumSales = salesItem.sales.reduce(add); // Add up all the sales
    taxRate = salesTaxRates[salesItem.province]; // Applicable tax rate by province
    sumTaxes = sumSales * taxRate;
    
    salesData[index].totalSales = sumSales; // Add the key-value pair for total sales
    salesData[index].totalTaxes = sumTaxes; // Add the key-value pair for total taxes
  })
  
  let companyName;
  salesData.filter(sales => {
    companyName = sales.name;
    
    // Check if each company exists as a key in result Object. If not, add the key and its corresponding totalSales and total Taxes
    if (Object.keys(result).indexOf(companyName) === -1) {
      result[companyName] = {'totalSales': sales.totalSales, 'totalTaxes': sales.totalTaxes};
    } else {
      // If the company name already exists in result, add the new totalSales and totalTaxes to the existing values.
      result[companyName].totalSales += sales.totalSales; 
      result[companyName].totalTaxes += sales.totalTaxes;
    }
  })
  
  return result;
}

var results = calculateSalesTax(companySalesData, salesTaxRates);
console.log(results);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/