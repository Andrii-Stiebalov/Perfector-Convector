export const InputForm = ({ refInput, inputValue, setInputValue }) => {
  return (
    <form action="">
    <textarea 
      ref={refInput}
      name="" 
      id="input"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      autoFocus
      placeholder="Source text"
      className="input fild"
    ></textarea>
  </form>
  )
} 