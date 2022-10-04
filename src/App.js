import './App.css';
import React from 'react';

function App() {
  const [inputValue, setInputValue] = React.useState('');
  // const [outputValue, setOutputValue] = React.useState('sdf');
  const [selectedCase, setSelectedCase] = React.useState('');
  const [separator, setSeparator] = React.useState('');
  const [isUnderScore, setIsUnderScore] = React.useState(false);


  console.log(selectedCase)

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

    let result = '';

    switch (selectedCase) {
      case "caps":
        result = inputValue.toLocaleUpperCase();
        break;
      case 'lower' :
        result = inputValue.toLowerCase();
        break;
      case 'capital':
        result = capitalCase(inputValue);
        break;
      case 'ivers':
        result = inversCase(inputValue);
        break;

        default:
       result = inputValue;
    }

    result = isUnderScore? underCase(result) : result;

    return result
  }

  const outputValue = changeCase();

  console.log(outputValue)


  return (
    <div class="area" >
      <header class="header">
       <h1 class="title">perfector</h1>
      </header>
      <main>
        <form action="">
          <textarea 
            name="" 
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
            name="" 
            value={outputValue}
            id="output" 
            placeholder="result"
            className="output fild"
            >
          </textarea>
        </form>
      </main>

    <div action="get" class="selectFild">

    {buttons.map(button => {
      const {id, name} = button;

      return (
        <button 
        tabIndex={-1}
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

    <form  className='inputForm'> 
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
        <a href="/#" className="contacts__link" tabIndex={-1} >CONTACT US</a>
        <a href="/#" className="contacts__link" tabIndex={-1} >HOTKEYS FOR QUICK WORK</a>
        <a href="/#" className="contacts__link" tabIndex={-1} >DONATE TO ARMY OF UKRAINE</a>
      </div>
    </div>
  </div>
  );
}

export default App;
