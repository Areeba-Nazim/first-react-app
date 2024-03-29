import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setlength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [Password, setPassword] = useState("");
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    charAllowed ? (string += "{}#@%*()!?><") : string;
    numberAllowed ? (string += "1234567890") : string;

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(randomIndex);
    }

    setPassword(pass)

  },[length, charAllowed, numberAllowed, setPassword]);

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(Password) 
  },[Password])

  
  useEffect(()=>{
    passwordGenerator()
  },[length, charAllowed, numberAllowed, passwordGenerator])
  

  return (
    <div className="w-full h-screen bg-slate-900 ">
      <h1 className="text-4xl font-semibold text-white/80 text-center tracking-wide py-8">
        Password Generator
      </h1>
      <div className="m-auto w-[40%] bg-slate-400 p-10 rounded-xl">
        <div className="flex bg-slate-300 rounded-full">
          <input
            className="w-full p-2 bg-transparent text-xl tracking-wider pl-8 outline-none border-none"
            value={Password}
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className="bg-blue-500 hover:bg-blue-500/85 transition-all rounded-full px-6 text-xl text-white">
            copy
          </button>
        </div>
        <div className="pt-9 flex items-start gap-10">
          <div className="flex flex-col text-center">
            <input
              type="range"
              name="pass-length"
              min={5}
              max={100}
              value={length}
              onChange={(e) => setlength(e.target.value)}
              className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-200/45 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
            <label htmlFor="pass-length" className="text-2xl py-1 px-4">
              {length}
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
            className="h-6 w-6" 
            type="checkbox" 
            name="number"
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
             />
            <label className="text-xl" htmlFor="number">
              Number
            </label>
          </div>
          <div className="flex items-center gap-1">
          <input
            className="h-6 w-6" 
            type="checkbox" 
            name="character"
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}
             />
            <label className="text-xl " htmlFor="character">
              Character
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
