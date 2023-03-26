import React from "react";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

function Header() {
  return (
    <nav className="bg-gray-300">
      <div className="flex items-center justify-between px-10 mx-auto max-w-7xl h-14">
        <div>한결</div>
        <ul className="flex items-center text-sm font-medium text-white">
          <li className="p-2 mx-2">포트폴리오</li>
          <li className="p-2 mx-2">방명록</li>
        </ul>
      </div>
    </nav>
  );
}

export default App;
