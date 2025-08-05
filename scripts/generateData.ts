import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

const NUM_PRODUCTS = 20;
const NUM_DEALS = 10;
const NUM_CUSTOMERS = 50;
const NUM_SELLERS = 10;
const NUM_REVIEWS = 100;

const IMAGE_EXTS = [".jpg"];
function getLocalImages() {
  const imagesDir = path.resolve(process.cwd(), "public", "images");
  if (!fs.existsSync(imagesDir)) return [];
  return fs
    .readdirSync(imagesDir)
    .filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    .map((f) => `/images/${f}`);
}
const localImages = getLocalImages();

const sellers = Array.from({ length: NUM_SELLERS }, () => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
}));

const customers = Array.from({ length: NUM_CUSTOMERS }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
}));

const products = Array.from({ length: NUM_PRODUCTS }, () => {
  const createdAt = faker.date.past({ years: 1 });
  const updatedAt = faker.date.between({ from: createdAt, to: new Date() });
  return {
    id: faker.string.uuid(),
    sellerId: faker.helpers.arrayElement(sellers).id,
    name: faker.commerce.productName(),
    basePrice: faker.number.int({ min: 5000, max: 50000 }),
    isActive: true,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
});

const productInventories = products.map((p) => {
  const lastUpdated = faker.date.between({
    from: new Date(p.createdAt),
    to: new Date(),
  });
  return {
    id: faker.string.uuid(),
    productId: p.id,
    currentStock: faker.number.int({ min: 0, max: 100 }),
    lastUpdated: lastUpdated.toISOString(),
  };
});

const productOptions = products.flatMap((p) => {
  const sizes = ["S", "M", "L"];
  const colors = ["Red", "Blue", "Green"];
  return sizes.flatMap((size) =>
    colors.map((color) => ({
      id: faker.string.uuid(),
      productId: p.id,
      optionValue: JSON.stringify({ size, color }),
      additionalPrice: faker.number.int({ min: 0, max: 1000 }),
      stockQuantity: faker.number.int({ min: 5, max: 50 }),
      maxPurchaseQuantity: faker.number.int({ min: 3, max: 5 }),
    }))
  );
});

const productDiscounts = products.slice(0, NUM_DEALS).map((p) => {
  const startDate = faker.date.between({
    from: new Date(p.createdAt),
    to: new Date(),
  });
  const endDate = faker.date.future({ refDate: startDate });
  const discountRate = faker.number.int({ min: 10, max: 90 });
  return {
    id: faker.string.uuid(),
    productId: p.id,
    discountType: faker.helpers.arrayElement([
      "daily_deal",
      "brand_deal",
      "sale",
    ]),
    discountRate,
    discountedPrice: Math.round(p.basePrice * (1 - discountRate / 100)),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
});

const productImages = products.flatMap((p) => {
  const thumb = faker.helpers.arrayElement(localImages);
  let detail = faker.helpers.arrayElement(localImages);
  if (localImages.length > 1) {
    while (detail === thumb) {
      detail = faker.helpers.arrayElement(localImages);
    }
  }
  return [
    {
      id: faker.string.uuid(),
      productId: p.id,
      imageUrl: thumb,
      imageType: "thumbnail",
    },
    {
      id: faker.string.uuid(),
      productId: p.id,
      imageUrl: detail,
      imageType: "detail",
    },
  ];
});

const productReviews = Array.from({ length: NUM_REVIEWS }, () => {
  const product = faker.helpers.arrayElement(products);
  const createdAt = faker.date.between({
    from: new Date(product.createdAt),
    to: new Date(),
  });
  const reviewImage = faker.helpers.arrayElement(localImages);
  return {
    id: faker.string.uuid(),
    customerId: faker.helpers.arrayElement(customers).id,
    productId: product.id,
    reviewDetail: faker.lorem.sentence(),
    imageUrl: reviewImage,
    reviewScore: faker.number.int({ min: 1, max: 5 }),
    createdAt: createdAt.toISOString(),
    reviewFavorite: faker.number.int({ min: 0, max: 20 }),
  };
});

const cart = customers.map((c) => ({
  id: faker.string.uuid(),
  customerId: c.id,
}));

const cartProduct = cart.flatMap((c) => {
  return Array.from({ length: 2 }, () => {
    const option = faker.helpers.arrayElement(productOptions);
    const product = products.find((p) => p.id === option.productId)!;
    const addedAt = faker.date.between({
      from: new Date(product.createdAt),
      to: new Date(),
    });
    return {
      id: faker.string.uuid(),
      cartId: c.id,
      optionId: option.id,
      quantity: faker.number.int({ min: 1, max: 5 }),
      isSelectedCheckbox: true,
      addedAt: addedAt.toISOString(),
    };
  });
});

const db = {
  sellers,
  customers,
  products,
  productInventories,
  productOptions,
  productDiscounts,
  productImages,
  productReviews,
  cart,
  cartProduct,
};

fs.writeFileSync(path.join("db", "db.json"), JSON.stringify(db, null, 2));

console.log("더미 데이터 생성: src/lib/db/db.json");
