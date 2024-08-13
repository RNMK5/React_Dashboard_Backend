import React from "react";

const SideBar = ({
  showAddFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        <li onClick={showAddFirmHandler}>Add Firm</li>  
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  );
};

export default SideBar;
