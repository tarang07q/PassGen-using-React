import { useState, useCallback, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  // Ref for the input field
  const passwordInputRef = useRef(null);

  const passwordGenerator = useCallback(() => { 
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"
    
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex) 
    }
    setPassword(pass)    
  }, [length, charAllowed, numberAllowed])

  // Copy password to clipboard
  const copyToClipboard = () => {
    if (passwordInputRef.current) {
      // Copy password to clipboard
      navigator.clipboard.writeText(passwordInputRef.current.value)
        .then(() => {
          alert('Password copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-900'>
        <h1 className='text-white text-center my-3'> Password Generator </h1>
        <div className='flex shadow-lg rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            ref={passwordInputRef}  // Attach ref here
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />   
          <button
            onClick={copyToClipboard}  // Call the copy function
            className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>

        {/* Length Input */}
        <div className='flex text-sm gap-x-2 mb-4'>
          <div className='flex items-center gap-x-2'>
            <label> Length: {length}</label>
            <input 
              type="range"
              min={6}
              max={64}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Options - Numbers & Characters */}
        <div className='flex items-center gap-x-4 mb-4'>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={passwordGenerator}
          className='w-full bg-green-500 text-white px-4 py-2 rounded-md'
        >
          Generate Password
        </button>
      </div>
    </>
  )
}

export default App
