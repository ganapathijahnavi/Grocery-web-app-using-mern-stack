import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "./styledComponents";

const ProductItem = ({ id, name, description, price, img }) => {
  const handleAddToCart = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Please login to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5100/add-to-cart",
        {
          productId: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert(`${name} added to cart!`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} />
      <ProductName>{name}</ProductName>
      <p style={{ fontSize: "14px", color: "#666", margin: "0.5rem 0" }}>
        {description?.length > 80 ? `${description.slice(0, 80)}...` : description}
      </p>
      <ProductPrice>₹{price}</ProductPrice>

      <ButtonContainer>
        <Link
          to={`/order-details/${id}`}
          className="btn btn-sm btn-outline-primary"
          style={{ borderRadius: "5px", fontWeight: "500" }}
        >
          Buy Now
        </Link>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </ButtonContainer>
    </ProductContainer>
  );
};

export default ProductItem;
