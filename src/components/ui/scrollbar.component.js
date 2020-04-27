import React, { useEffect } from 'react';

export default function Scrollbar() {

  useEffect(() => { initiateScrollbar() });

  function initiateScrollbar() {
    let parent = document.getElementsByClassName('initiate-scrollbar')[0];
    let rail = parent.getElementsByClassName('scrollbar-rail')[0];
    let thumb = parent.getElementsByClassName('scrollbar-thumb')[0];

    let scrollLength = parent.scrollHeight;
    let parentHeight = parent.offsetHeight;

    thumb.style.height = parentHeight * (parentHeight / scrollLength) + 'px';

    parent.addEventListener( 'mousewheel', (e) => {
      parent.scrollTo(0, e.deltaY);
      let scrollTop = parent.scrollTop;
      thumb.style.top = scrollTop * parentHeight / scrollLength  + 'px';
    });

    parent.classList.remove('initiate-scrollbar');
    parent.classList.add('scrollbar-initiated');
  }

  return(
    <div className="scrollbar-rail">
      <div className="scrollbar-thumb">
      </div>
    </div>
  );
}
