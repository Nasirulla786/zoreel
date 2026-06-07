import React, { useState } from "react";

const Pass = () => {
  let str = "abcdefghijklmnopqrstUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [lenght, setLenght] = useState(0);
  const [numbrs, setNumbrs] = useState(false);
  const [Symbols, setSymbols] = useState(false);

  const [answer, setAnswer] = useState("dkhdsjd");

  const handleGenerate = () => {
    if (numbrs) {
      str = str + "0123456789";
    }

    if (Symbols) {
      str = str + "@#$%^&*()_+";
    }

    let myPass = "";

    for (let i = 0; i <= lenght; i++) {
      const idx = Math.floor(str.length * Math.random());
      const ch = str[idx];
      myPass = myPass + ch;
    }

    console.log(myPass)

    setAnswer(myPass);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
  <div className="w-[420px] p-6 rounded-2xl bg-white/20 backdrop-blur-lg shadow-2xl flex flex-col gap-6 border border-white/30">

    {/* Title */}
    <h1 className="text-2xl font-bold text-white text-center tracking-wide">
      🔐 Password Generator
    </h1>

    {/* Password Display */}
    <div className="relative">
      <input
        type="text"
        className="w-full h-[50px] rounded-lg bg-white text-black px-4 pr-20 font-mono tracking-wider outline-none"
        value={answer}
        readOnly
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-md text-sm hover:bg-gray-800 transition"
        onClick={() => navigator.clipboard.writeText(answer)}
      >
        COPY
      </button>
    </div>

    {/* Length */}
    <div className="flex items-center gap-3">
      <label className="text-white w-[80px]">Length</label>
      <input
        type="number"
        className="w-full h-[40px] rounded-md px-3 outline-none"
        value={lenght}
        onChange={(e) => setLenght(Number(e.target.value))}
      />
    </div>

    {/* Options */}
    <div className="flex justify-between text-white">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={numbrs}
          onChange={() => setNumbrs(!numbrs)}
          className="accent-black"
        />
        Include Numbers
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={Symbols}
          onChange={() => setSymbols(!Symbols)}
          className="accent-black"
        />
        Include Symbols
      </label>
    </div>

    {/* Generate Button */}
    <button
      className="w-full h-[45px] rounded-lg font-semibold text-white bg-gradient-to-r from-black to-gray-800 hover:scale-105 transition-transform duration-200 shadow-lg"
      onClick={handleGenerate}
    >
      Generate Password
    </button>

  </div>
</div>


  );
};

export default Pass;
