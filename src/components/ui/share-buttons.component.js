import React from 'react';

export function VKShareButton(props) {
  return(
    <a
      className="vk-share-button"
      href={`https://vk.com/share.php?url=${props.link}`}
      target="_blank"
    >
    </a>
  );
}

export function FBShareButton(props) {
  return(
    <a
      className="fb-share-button"
      href={`https://www.facebook.com/sharer/sharer.php?u=${props.link}`}
      target="_blank"
    >
    </a>
  );
}

export function FavButton(props) {
  return(
    <button
      className="add-to-fav-button"
    >
    </button>
  );
}
