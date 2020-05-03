const { products } = require('./data/products.json');

const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids = [], productsList = []) {
	const categories = [];
	let totalPrice = 0;
	let totalRegular = 0;

	const producstCar = productsList.filter((item) =>
		ids.find((e) => e === item.id)
	);

	producstCar.forEach((item) => {
		if (!categories.find((e) => e === item.category)) {
			categories.push(item.category);
		}
	});

	const productsCarList = producstCar.map((item) => {
		let productPrice = item.regularPrice;
		item.promotions.forEach((element) => {
			const { looks, price } = element;
			if (looks.find((e) => e === promotions[categories.length - 1])) {
				productPrice = price;
			}
		});

		totalPrice += productPrice;
		totalRegular += item.regularPrice;
		return {
			name: item.name,
			category: item.category,
		};
	});

	return {
		products: productsCarList,
		promotion: promotions[categories.length - 1],
		totalPrice: totalPrice.toFixed(2),
		discountValue: (totalRegular - totalPrice).toFixed(2),
		discount:
			`${(((totalRegular - totalPrice) / totalRegular) * 100).toFixed(2)}` +
			'%',
	};
}

console.log(getShoppingCart([130, 140, 230, 260], products));
module.exports = { getShoppingCart };
