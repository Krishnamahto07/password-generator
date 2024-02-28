import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNum, setIsNum] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  // definition of password generator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNum) {
      str += "0123456789";
    }
    if (isChar) {
      str += "~!@#$%^&*()_+";
    }
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, isNum, isChar, setPassword]);

  const passwordRef = useRef(null);

  const copyPassword = () => {
    //copy text
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  // password genrating function callind
  useEffect(() => {
    passwordGenerator();
  }, [isChar, isNum, length, setPassword]);

  return (
    <div className="bg-[#8C7272] w-[100vw] h-[100vh] text-white">
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <h1 className="shadow-5xl text-4xl mt-5 font-bold p-1">Password Generator</h1>
        </div>
        <div className="flex gap-2 mt-5">
          <input 
            className="text-black p-2 font-Arial border border-black rounded-md"
            ref={passwordRef}
            type="text"
            value={password}
            placeholder="Enter Password"
            readOnly
          />
          <button onClick={copyPassword}
          className="left-0 border w-[50px] p-1 hover:font-bold hover:bg-gray-800  transition-all rounded"
          >copy</button>
        </div>

        <div className="flex gap-4">
          <input
            onChange={(e) => {
              setLength(e.target.value);
            }}
            type="range"
            name=""
            min={6}
            max={20}
            value={length}
            className="cursor-pointer	"
          />
          <label >Length : {length}</label>
        </div>
        <div className="flex gap-4">
          <input className="cursor-pointer w-5"
            type="checkbox"
            defaultChecked={isNum}
            id="numBox"
            onClick={() => {
              setIsNum((prev) => !prev);
            }}
          />
          <label htmlFor="numBox">Number</label>
        </div>
        <div className="flex gap-4 ml-7 mt-[-5px]">
          <input
            className="cursor-pointer w-5"
            type="checkbox"
            defaultChecked={isChar}
            id="charBox"
            onClick={() => {
              setIsChar((prev) => !prev);
            }}
          />
          <label htmlFor="charBox">Special Char</label>
        </div>
      </div>
    </div>
  );
}

export default App;
