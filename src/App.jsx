import { useState, useCallback, useEffect, useRef } from 'react'

function App()  {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])



  return (
    <>

   <div className="w-[400px] rounded-md border mx-auto  my-auto bh-fit bg-slate-100 font-serif">
    
      <h1 className="text-3xl text-center bg-blue-400 color-blue-800  py-4">
        Password Generator
      </h1>
     
    <div className="box mx-4 my-4 flex justify-around">
      <input
        type="text"
        name=""
        id=""
        value={password}
        readOnly=""
        placeholder="Password"
        className="px-2 py-2 rounded md border w-[280px]"
        ref={passwordRef}
      />

      <button className="rounded md border text-xl px-2 bg-blue-400 hover:bg-blue-500 color-blue-800" 
      onClick={copyPasswordToClipboard}>
        Copy
      </button>

    </div>

    <div className="text-xl mx-4 my-2 flex items-center">
      <label htmlFor="">Length:</label>
      <input 
      type="range" 
      name="" 
      id="" 
      value={length}
      min={8} 
      max={20} 
      className="w-60 cursor-pointer" 
      onChange={(e) => {setLength(e.target.value)}}/> {length} 
    </div>

    <div className="text-xl mx-4 my-2 flex justify-start gap-x-10">
      <div >
        <input 
        type="checkbox" 
        className="h-4 w-4"
        defaultChecked={numberAllowed} 
        id="numberInput"
        onChange={() => {
          setNumberAllowed((prev) => !prev);
      }}
        /> 
        <label htmlFor="numberInput"></label>  Digit
      </div>


      <div>
        <input 
        type="checkbox" 
        className="h-4 w-4"  
         id="characterInput"
         defaultChecked={charAllowed}
         onChange={() => {
          setCharAllowed((prev) => !prev )
      }}
         /> 
         <label htmlFor="numberInput"></label> Special Characters
      </div>
    </div>
  </div>
    </>
  )
}

export default App


