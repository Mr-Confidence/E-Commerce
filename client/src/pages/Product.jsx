import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../config";
import Loading from "../ui/Loading";
import Container from "../ui/Container";
import _ from "lodash";
import PriceTag from "../ui/PriceTag";
import { MdOutlineStarOutline, MdOutlineStarHalf, MdOutlineStar } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import FormattedPrice from "../ui/FormattedPrice";
import { IoClose } from "react-icons/io5";
import AddToCartButton from "../ui/AddToCartButton";
import { productPayment } from "../assets";
import ProductCart from "../ui/ProductCart";
import CategoryFilters from "../ui/CategoryFilters";

const Product = () => {
  const [productData, setProductData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor] = useState("");
  const { id } = useParams();

  const endpoint = id
    ? `${config?.baseUrl}/products/${id}`
    : `${config?.baseUrl}/products/`;

  // Custom fetchData function to fetch JSON data
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await fetchData(endpoint);
        if (id) {
          setProductData(data);
          setAllProducts([]);
        } else {
          setAllProducts(data);
          setProductData(null);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id, endpoint]);

  useEffect(() => {
    if (productData) {
      setImgUrl(productData?.images[0]);
      setColor(productData?.colors[0]);
    }
  }, [productData]);

  // Star rating calculation (same as ProductCart)
  const calculateStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return { fullStars, hasHalfStar, emptyStars };
  };

  // Generate review count with minimum 1 million
  const getReviewCount = () => {
    return productData?.reviews?.length || Math.floor(Math.random() * 9000000) + 1000000;
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {!!id && productData && _.isEmpty(allProducts) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product images section */}
              <div className="flex flex-start gap-4">
                <div className="flex flex-col gap-2">
                  {productData?.images?.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      alt="img"
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                        imgUrl === item && "border border-gray-500 rounded-sm opacity-100"
                      }`}
                      onClick={() => setImgUrl(item)}
                    />
                  ))}
                </div>
                <div>
                  <img src={imgUrl} alt="mainImage" className="w-full h-auto" />
                </div>
              </div>

              {/* Product details and price */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold">{productData?.name}</h2>

                {/* Price and Reviews section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PriceTag
                      regularPrice={productData?.regularPrice}
                      discountedPrice={productData?.discountedPrice}
                      className="text-xl"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(calculateStars(productData?.rating).fullStars)].map((_, i) => (
                        <MdOutlineStar key={`full-${i}`} className="w-5 h-5" />
                      ))}
                      {calculateStars(productData?.rating).hasHalfStar && (
                        <MdOutlineStarHalf className="w-5 h-5" />
                      )}
                      {[...Array(calculateStars(productData?.rating).emptyStars)].map((_, i) => (
                        <MdOutlineStarOutline key={`empty-${i}`} className="w-5 h-5" />
                      ))}
                    </div>
                    <p className="text-base font-semibold">
                      ({formatNumber(getReviewCount())} reviews)
                    </p>
                  </div>
                </div>

                {/* Viewing and Savings Section */}
                <p className="flex items-center">
                  <FaRegEye className="mr-1" />
                  <span className="font-semibold mr-1">{formatNumber(getReviewCount())}</span> people are viewing this right now
                </p>

                <p>
                  You are saving{" "}
                  <span className="text-base font-semibold text-green-500">
                    <FormattedPrice
                      amount={productData?.regularPrice - productData?.discountedPrice}
                    />
                  </span>{" "}
                  upon purchase
                </p>

                {/* Color Selection Section */}
                <div>
                  {color && (
                    <p>
                      Color:{" "}
                      <span className="font-semibold capitalize" style={{ color: color }}>
                        {color}
                      </span>
                    </p>
                  )}
                  <div className="flex items-center gap-x-3">
                    {productData?.colors.map((item) => (
                      <div
                        key={item}
                        className={`${
                          item === color
                            ? "border border-black p-1 rounded-full"
                            : "border-transparent"
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full cursor-pointer"
                          style={{ backgroundColor: item }}
                          onClick={() => setColor(item)}
                        />
                      </div>
                    ))}
                  </div>
                  {color && (
                    <button
                      onClick={() => setColor("")}
                      className="font-semibold mt-1 flex items-center gap-1 hover:text-red-600 duration-200"
                    >
                      <IoClose /> Clear
                    </button>
                  )}
                </div>

                {/* Product Brand and Category */}
                <p>
                  Brand: <span className="font-medium">{productData?.brand}</span>
                </p>
                <p>
                  Category: <span className="font-medium">{productData?.category}</span>
                </p>

                {/* Add to Cart Button */}
                <AddToCartButton
                  product={productData}
                  title="Buy now"
                  className="bg-black/80 py-3 text-base text-gray-200 hover:scale-100 hover:text-white duration-200"
                />

                {/* Payment Information */}
                <div className="bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2">
                  <img
                    src={productPayment}
                    alt="payment"
                    className="w-auto object-cover"
                  />
                  <p className="font-semibold">
                    Guaranteed safe & secure checkout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-10">
              <CategoryFilters id={id} />
              <div>
                <p className="text-4xl font-semibold mb-5 text-center">Products Collection</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {allProducts?.map((product) => (
                    <ProductCart key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Product;