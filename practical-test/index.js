import { pricing, products } from "./data.js";


/* Provided Products Array and Pricing Array 
are sorted and both has same index ordering as sample data provided 
we can dirvecly merge that array with O(n) complecity with constant 
storage becouse of Products Array is mutated intead of creating copy
*/

function mergeMostOptimized(products, pricing) {
    for (let index = 0; index < products.length; index++) {
        let productObj = products[index];
        let priceObj = pricing[index];
        //this line is only for adding space in productName in final output its shown thats why
        productObj.productName = productObj.productName.replace(/([a-zA-Z])(\d)/, '$1 $2');
        productObj.price = priceObj.price;
    }
    return products;
}

const mergedArray = mergeMostOptimized(products, pricing);

console.log("mergeMostOptimized", mergedArray);



/* Assuming Products Array and Pricing Array 
are not-sroted and both has dont have same index ordering in 
that situation we have to traverse pricing array again and again each iteration of product
which is not optimal. 
*/


function mergeNotSoOptimized(products, pricing) {
    for (let index = 0; index < products.length; index++) {
        let productObj = products[index];
        productObj.productName = productObj.productName.replace(/([a-zA-Z])(\d)/, '$1 $2');
        const pricingIndex = pricing.findIndex((pricing) => pricing.sku === productObj.sku);
        let priceObj = pricing[pricingIndex];
        productObj.price = priceObj.price;
    }
    return products;
}

const mergedSimpleArray = mergeNotSoOptimized(products, pricing);

console.log("mergeNotSoOptimized", mergedSimpleArray)


/* 
above code is optimized with cache lets assume we have muliple 'sku'
fields are same as products2 in product if we want to merge pricing with same id 
we can use cache in Map so we dont have to perform findIndex loop we just get price in O(1)
if cache not exist we perform iteration its just bit more optimized way to merge.
*/


const products2 = [
    {
        "id": 1,
        "sku": "abc",
        "productName": "name1",
        "category": 1
    },
    {
        "id": 2,
        "sku": "def",
        "productName": "name2",
        "category": 2
    },
    {
        "id": 3,
        "sku": "abc",
        "productName": "name1",
        "category": 2
    },
    {
        "id": 4,
        "sku": "klm",
        "productName": "name1",
        "category": 3
    },
    {
        "id": 5,
        "sku": "klm",
        "productName": "name1",
        "category": 1
    }
];



function mergeOptimized(products, pricing) {
    const cache = new Map();
    for (let index = 0; index < products.length; index++) {
        let productObj = products[index];
        productObj.productName = productObj.productName.replace(/([a-zA-Z])(\d)/, '$1 $2');
        if (cache.has(productObj.sku)) {
            productObj.price = cache.get(productObj.sku);
            continue;
        }
        const pricingIndex = pricing.findIndex((pricing) => pricing.sku === productObj.sku);
        let priceObj = pricing[pricingIndex];
        cache.set(productObj.sku, priceObj.price);
        productObj.price = priceObj.price;
    }
    return products;
}

const mergeCacheOptimized = mergeOptimized(products2, pricing);

console.log("mergeCacheOptimized", mergeCacheOptimized)
