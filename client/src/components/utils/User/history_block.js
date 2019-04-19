import React from 'react';

import moment from 'moment';

const UserHistory = (props) => {
  const renderBlocks = () => (
    props.products 
      ? props.products.map((product, i) => (
        <tr key={i}>
          <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
          <td>{product.brand} {product.name}</td>
          <td>$ {product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.pOrder}</td>
        </tr>
      ))
      : null
  ) 
  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr className="thead_tr">
            <th>
              Order date
            </th>
            <th>
              Product
            </th>
            <th>
              Price paid
            </th>
            <th>
              Quantity
            </th>
            <th>
              Order Number
            </th>
          </tr>
        </thead>
        <tbody>
          {renderBlocks()}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistory;