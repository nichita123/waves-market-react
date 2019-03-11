import React from 'react';

import Card from './card';

const CardBlockShop = (props) => {

  const renderCards = () => (
    props.products 
      ? props.products.map(product => (
        <Card 
          key={product._id}
          {...product}
          grid={props.grid}
        />
      ))
      : null 
  )

  return (
    <div className="card_block_shop">
      <div>
        <div className="card_block_shop_wrapper" style={{
          flexDirection: `${props.grid ? 'column' : 'row'}`
        }}>
          {props.products
            ? props.products.length === 0
              ? <div className="no_result">
                  Sorry, no results
                </div>
              : null
             : null
          }
          {renderCards(props.products)}
        </div>
      </div>
    </div>
  );
};

export default CardBlockShop;