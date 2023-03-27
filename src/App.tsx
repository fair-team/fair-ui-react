function App() {
  return (
    <div className="max-w-full min-w-full min-h-screen h-screen max-h-screen overflow-hidden bg-gray-100 flex">
      <nav id="navbar" className="w-80 p-4 flex sticky top-0 left-0">
        <div className="flex-auto bg-gray-400 rounded-lg"></div>
      </nav>
      <div id="main" className="p-4 flex-auto min-h-screen overflow-y-scroll">
        <header
          id="header"
          className="bg-gray-100 sticky top-0 w-full h-16 rounded-lg flex"
        >
          <div className="flex-auto bg-gray-400 rounded-lg"></div>
        </header>
        <main id="content"></main>
      </div>
    </div>
  );
}

export default App;
