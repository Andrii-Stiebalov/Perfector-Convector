import React from 'react';
import Hotkeys from 'react-hot-keys';

// eslint-disable-next-line react/prop-types
export const HotKeys = ({ onKeyDownHotKeyX, onKeyDownHotKeyZ, setIsUnderScore }) => {
  return (
    <>
      <Hotkeys
        keyName='alt+x'
        filter={() => {
          return true;
        }}
        onKeyDown={onKeyDownHotKeyX}
      />
      <Hotkeys
        keyName='alt+z'
        filter={() => {
          return true;
        }}
        onKeyDown={onKeyDownHotKeyZ}
      />
      <Hotkeys
        keyName='alt+c'
        filter={() => {
          return true;
        }}
        onKeyDown={() => setIsUnderScore((prevIsUnderScore) => !prevIsUnderScore)}
      />
    </>
  );
};
