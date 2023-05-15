import { endpoint } from "./rest.js";

async function calculateTotalSubscription() {
  const response = await fetch(`${endpoint}/participants/${subscription}.json`);
  const subscription = await response.json();

  let total = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    total += s[i].price;
  }

  return total;
}

const subscriptions = [
  { name: "senior", price: 1600 },
  { name: "junior", price: 1000 },
  { name: "pensionist", price: 1200 },
  { name: "passiv", price: 500 },
];

const totalPrice = await calculateTotalSubscription(subscriptions);
console.log("Total Price:", totalPrice);
