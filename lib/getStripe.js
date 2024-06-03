import { loadStripe } from "@stripe/stripe-js";

let stripeConnectionProm;

// Виконує підключення до платіжної системи
const connectToStripe = () => {
  if (!stripeConnectionProm) {
    stripeConnectionProm = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }

  return stripeConnectionProm;
};

export default connectToStripe;
