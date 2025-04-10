import { twMerge } from "tailwind-merge";
import FormattedPrice from "./FormattedPrice";

const PriceTag = ({ regularPrice, discountedPrice, className }) => {
  // If no discountedPrice, show regularPrice only
  const showRegularPrice = regularPrice && !discountedPrice;
  const showDiscountedPrice = discountedPrice && regularPrice;

  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      {/* Regular Price, only show if there is a discounted price */}
      {showDiscountedPrice && regularPrice && (
        <p className="line-through text-gray-500 font-medium">
          <FormattedPrice amount={regularPrice} />
        </p>
      )}

      {/* Discounted Price */}
      {showDiscountedPrice && discountedPrice ? (
        <p className="font-bold text-skyText">
          <FormattedPrice amount={discountedPrice} />
        </p>
      ) : showRegularPrice ? (
        // Show regular price if no discounted price
        <p className="font-bold text-skyText">
          <FormattedPrice amount={regularPrice} />
        </p>
      ) : null}
    </div>
  );
};

export default PriceTag;
