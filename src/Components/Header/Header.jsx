import React from 'react';

// eslint-disable-next-line react/prop-types
export const Header = ({onChangeTheme, colorTheme }) => (
  <header className="header">
    <div className='secret'>have a good day</div>
    <h1 className="title">perfector</h1>
    <div
      className={`toggler ${colorTheme === 'dark' ? 'toggler-dark' : 'toggler-light'}`}
      onClick={onChangeTheme}
    >
      <div className={`circle ${colorTheme === 'dark' ? 'circle-dark' : 'circle-light'}`} />
    </div>
  </header>
);