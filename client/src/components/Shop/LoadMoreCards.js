import React from 'react';

import CardBlockShop from '../utils/card_block_shop';

const LoadMoreCards = (props) => {

  const handleLoginPage = () => {
    this.props.history.push('/login')
  }

  return (
    <div>
      <div>
        <CardBlockShop 
          grid={props.grid}
          products={props.products}
          notLogged={handleLoginPage()}
        />
      </div>

      {props.size > 0 && props.size >= props.limit
        ? <div className="load_more_container">
            <span onClick={() => props.loadMore()}>
              Load More
            </span>
          </div>
        : null
      }
    </div>
  );
};

export default LoadMoreCards;