import React from 'react';
import Products from 'components/catalogue/products.component';

export default function CategoryPage(props) {
  return(
    <main id="category">
      <Products {...props}/>
    </main>
  );
}
