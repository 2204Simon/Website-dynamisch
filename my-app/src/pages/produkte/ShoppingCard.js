import React, { useState } from "react";
import { styles } from "./styles/ShoppingCard.styles";

const ShoppingCard = ({ image, title, price }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={image} alt="Product" style={styles.image} />
      </div>
      <div style={styles.details}>
        <h3 style={styles.title}>{title}</h3>
        <h4 style={styles.price}>Price: {price} €</h4>
        <div style={styles.quantity}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
            style={styles.quantityInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;
