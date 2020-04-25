import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function CategoryItem (props) {

  let { url } = useRouteMatch();

  const {
    id,
    thumb,
    title
  } = props;

  return(
    <div className="category-item">
      <Link to={`${url}/${id}`}>
        <img src={ thumb } />
        <h2>{ title }</h2>
      </Link>
    </div>
  );
}
