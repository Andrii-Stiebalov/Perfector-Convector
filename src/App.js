import './App.css';
import React, { useEffect, useRef,} from 'react';
import Hotkeys from 'react-hot-keys';

function App() {
  const [inputValue, setInputValue] = React.useState('');
  // const [outputValue, setOutputValue] = React.useState('sdf');
  const [selectedCase, setSelectedCase] = React.useState('caps');
  const [separator, setSeparator] = React.useState('');
  const [isUnderScore, setIsUnderScore] = React.useState(false);
  // const [selectedValue, setSelectedValue] = useState('');
  // const [isInputFocus, setIsInputFocus] = useState(false)
  const refInput = useRef(null)

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
  ]

  const onSetSelectedCase = (caseType) => {
    if(caseType === selectedCase) {
      setSelectedCase('');
      return;
    }

    setSelectedCase(caseType)
  }


  React.useEffect(() => {

  }, [selectedCase])

  const inversCase = (value) => {
    let result = '';
    const upperValue = value.toLocaleUpperCase();
    for (let i = 0; i < value.length; i++) {
      result += upperValue[i] === value[i] 
      ? value[i].toLowerCase()
      : upperValue[i];
    }

    return result
  }

  const underCase = (value) => {
    const separetSymbol = !separator ? '_' : separator
    const arrOfWords = value.split(' ');

    return arrOfWords.join(separetSymbol)
  }

  const capitalCase = (value) => {
    const arrOfWords = value.split(' ');
    const cleanArr = arrOfWords.map(word => {
      if (!word.length) {
        return word;
      }
      const withoutFirstLetter = word.slice(1)
      return word[0].toLocaleUpperCase() + withoutFirstLetter;
    })

    return cleanArr.join(' ');
  }

  const changeCase = () => {
    if(!selectedCase && isUnderScore){
      return inputValue;
    }

    const value = inputValue;

    let result = '';

    switch (selectedCase) {
      case "caps":
        result =  value.toLocaleUpperCase();
        break;
      case 'lower' :
        result =  value.toLowerCase();
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

    return result
  }

  const outputValue = changeCase();

  // const selectionChangListener = () => {
  //     console.log(isInputFocus)
  //     setSelectedValue(getSelectionText())
  // }
  
  const handleFocus = (event) => {
    event.target.select();
    
  };

  const onKeyClearField = (event) => {
    if(event.code === 'Delete'){
      setInputValue('');
      refInput.current.focus()
    }
  }

    useEffect(() => {
      const element = refInput.current;

      console.log('width',refInput.current ? refInput.current.offsetWidth : 0);
      console.log(refInput.current)
      
    }, []);
   

  document.addEventListener('keydown', onKeyClearField)

  const onKeyDownHotKeyX = () => {
    if (!selectedCase) {
      setSelectedCase('caps');
      return
    }
    const currentIndex = buttons.findIndex(button => button.id === selectedCase);
    const nextIndex = currentIndex + 1;
    if (nextIndex > buttons.length - 1) {
      setSelectedCase(buttons[0].id)
      return
    }
    const nextCase = buttons[currentIndex + 1];
    console.log(nextCase)
    setSelectedCase(currentIndex)
    setSelectedCase(nextCase.id)
  }

  const onKeyDownHotKeyZ = () => {
    if (!selectedCase) {
      setSelectedCase('ivers');
      return
    }
    const currentIndex = buttons.findIndex(button => button.id === selectedCase);
    const nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      setSelectedCase(buttons[buttons.length - 1].id)
      return
    }
    const nextCase = buttons[nextIndex];
    console.log(nextIndex)
    setSelectedCase(currentIndex)
    setSelectedCase(nextCase.id)
  }

  function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }

    return text
  } 

    // document.addEventListener('selectionchange', selectionChangListener)
 
  
  return (
    <>
    <Hotkeys
      keyName='alt+x'
        filter={(event) => {
          return true;
        }}
      onKeyDown={onKeyDownHotKeyX}
    
    />
    <Hotkeys
      keyName='alt+z'
        filter={(event) => {
          return true;
        }}
      onKeyDown={onKeyDownHotKeyZ}
    />
    <Hotkeys
      keyName='alt+c'
        filter={(event) => {
          return true;
        }}
      onKeyDown={() => setIsUnderScore(!isUnderScore)}
    />
    <div className="area" >
      <header className="header">
       <h1 className="title">perfector</h1>
      </header>
      <main>
        {/* <InputForm 
          refInput={refInput} 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          onFocus={() => Add()}
        /> */}
        <form action="">
          <textarea 
            ref={refInput}
            name="input" 
            id="input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            autoFocus
            placeholder="Source text"
            className="input fild"
          ></textarea>
        </form>

        <form action="">
          <textarea 
            name="output" 
            value={outputValue}
            id="output" 
            placeholder="Result"
            className="output fild"
            onFocus={handleFocus}
            onChange={(e) => setInputValue(e.target.value)}
            >
          </textarea>
        </form>
      </main>
      <div className="bottomField">

    <div action="get" className="selectFild">
      

    {buttons.map(button => {
      const {id, name} = button;

      return (
        <button 
          onFocus={() => refInput.current.focus() }
          onClick={() => 
            onSetSelectedCase(id)} 
          className={`button ${selectedCase === id && 'isActive'}`} 
          >{name}
        </button>
        )
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
        onChange={(event) => setSeparator(event.target.value)}
      />
    </form>
    <div className='container'>
      <div className="contact">
        <a href="#/" className="contacts__link" tabIndex={-1} >CONTACT US</a>
        <a href="/#" className="contacts__link" tabIndex={-1} >HOTKEYS FOR QUICK WORK</a>
        <a href="https://war.ukraine.ua/donate/" className="contacts__link" tabIndex={-1} >DONATE TO ARMY OF UKRAINE</a>
      </div>
    </div>
  </div>
  </div>
  </>
  );
}

export default App;
