import './App.css';
import React, { useEffect, useRef, useState,} from 'react';
import { useColorTheme } from './Hooks/useColorTheme';
import { HotKeys } from './Components/HotKeys/HotKeys';
import { Contacts } from './Components/Contacts/Contacts';
import {Header} from './Components/Header/Header';

function App() {
  const [inputValue, setInputValue] =useState('');
  const [outputValue, setOutputValue] = useState('');
  const [selectedCase, setSelectedCase] = useState('caps');
  const [separator, setSeparator] = useState('');
  const [isUnderScore, setIsUnderScore] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const refInput = useRef(null);

  const buttons = [
    {name: 'CAPS',
      id: 'caps',
    },
    {name: 'lower',
      id: 'lower',
    },
    {name: 'Capital',
      id: 'capital',
    },
    {name: 'iNVERSION',
      id: 'ivers',
    },
  ];

  const onSetSelectedCase = (caseType) => {
    if(caseType === selectedCase) {
      setSelectedCase('');
      return;
    }

    setSelectedCase(caseType);
  };

  const inversCase = (value) => {
    let result = '';
    const upperValue = value.toLocaleUpperCase();
    for (let i = 0; i < value.length; i++) {
      result += upperValue[i] === value[i] 
        ? value[i].toLowerCase()
        : upperValue[i];
    }

    return result;
  };

  const underCase = (value) => {
    const separetSymbol = separator || '_';
    const arrOfWords = value.split(' ');

    return arrOfWords.join(separetSymbol);
  };

  const capitalCase = (value) => {
    const arrOfWords = value.split(' ');
    const cleanArr = arrOfWords.map(word => {
      if (!word.length) {
        return word;
      }
      const withoutFirstLetter = word.slice(1);
      return word[0].toLocaleUpperCase() + withoutFirstLetter;
    });

    return cleanArr.join(' ');
  };

  const changeCase = () => {
    if (!selectedCase && isUnderScore) {
      return inputValue;
    }

    const value = inputValue ;

    let result = '';

    switch (selectedCase) {
    case 'caps':
      result = value.toLocaleUpperCase();
      break;
    case 'lower' :
      result = value.toLowerCase();
      break;
    case 'capital':
      result = capitalCase(value);
      break;
    case 'ivers':
      result = inversCase(value);
      break;

    default:
      result = inputValue;
    }

    result = isUnderScore? underCase(result) : result;

    return result;
  };

  useEffect(() => {
    setOutputValue(changeCase());
  }, [inputValue, selectedCase, isUnderScore, separator]);
 

  const handleFocus = (event) => {
    if(isTab) {
      
      event.target.select();
    }
    setIsTab(false);
  };

  useEffect(() => {
    const hight = refInput.current ? refInput.current.offsetHeight: 0;
    const hightWIndow = window.innerHeight;
    if (hight > hightWIndow * 0.7) {
      console.log('resize');
    }
    
  }, [inputValue]);
   

  const onKeyDownHotKeyX = () => {
    if (!selectedCase) {
      setSelectedCase('caps');
      return;
    }

    const currentIndex = buttons.findIndex(button => button.id === selectedCase);
    const nextIndex = currentIndex + 1;
    if (nextIndex > buttons.length - 1) {
      setSelectedCase(buttons[0].id);
      return;
    }
    const nextCase = buttons[currentIndex + 1];
    console.log(nextCase);
    setSelectedCase(currentIndex);
    setSelectedCase(nextCase.id);
  };

  const onKeyDownHotKeyZ = () => {
    if (!selectedCase) {
      setSelectedCase('ivers');
      return;
    }
    const currentIndex = buttons.findIndex(button => button.id === selectedCase);
    const nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      setSelectedCase(buttons[buttons.length - 1].id);
      return;
    }
    const nextCase = buttons[nextIndex];
    setSelectedCase(currentIndex);
    setSelectedCase(nextCase.id);
  };

  const { colorTheme, toggleColorTheme } = useColorTheme();

  const onChangeTheme = () => {
    toggleColorTheme();
  };

  const clrearInput = (event) => {
    event.preventDefault();
    setInputValue('');
  };

  const copyOutput = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(outputValue)
      .then(() => {
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  };

  return (
    <div className={`bground ${colorTheme === 'dark' ? 'bground-dark' : ''}`}>
      <HotKeys 
        onKeyDownHotKeyX={onKeyDownHotKeyX}
        onKeyDownHotKeyZ={onKeyDownHotKeyZ}
        setIsUnderScore={setIsUnderScore}
      />
      <div className="area">
        <Header 
          onChangeTheme={onChangeTheme}
          colorTheme={colorTheme}
        /> 
        <main>
          <form className='textare' action="">
            <button
              tabIndex={-1}
              type='button' 
              className='delete button-inFild'
              onClick={clrearInput}
            />
            <div className='wraper'>
              <textarea 
                ref={refInput}
                name="input" 
                id="input"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onFocus={() => setIsTab(false)}
                autoFocus
                placeholder="Source text"
                className="input fild"
              ></textarea>
            </div>
          </form>
          <form className='textare' action="">
            <button 
              tabIndex={-1}
              type='button' 
              className='copy button-inFild'
              onClick={copyOutput}
            />
            <div className='wraper'>
              <textarea 
                name="output" 
                value={outputValue}
                id="output" 
                placeholder="Result"
                className="output fild"
                onFocus={handleFocus}
                onChange={(e) => setOutputValue(e.target.value)}
              >
              </textarea>
            </div>
          </form>
        </main>
        <div className="bottomField">
          <div action="get" className="selectFild">
            {buttons.map(button => {
              const {id, name} = button;

              return (
                <button 
                  key={id}
                  onFocus={() => refInput.current.focus() }
                  onClick={() => 
                    onSetSelectedCase(id)} 
                  className={`button ${selectedCase === id && 'isActive'}`} 
                >{name}
                </button>
              );
            })}
            <button
              tabIndex={-1}
              onClick={() => 
                setIsUnderScore(!isUnderScore)} 
              className={`button ${isUnderScore && 'isActive'}`} 
            >under_score
            </button>
          </div>

          <form className='inputForm'> 
            <input 
              tabIndex={-1}
              type="text" 
              className='changeSpaceInput'
              placeholder='Change SPACE on:'
              value={separator}
              onChange={(event) => {
                setSeparator(event.target.value);
                setIsUnderScore(true);
              }}
            />
          </form>
          <Contacts />
        </div>
      </div>
    </div>
  );
}

export default App;
