import logo from "./logo.svg";
import "./App.css";

import Header from "./Header";
import Footer from "./Footer";
import List from "./List";

function App() {
  const arr = [
    {
      name: "A",
    },
    {
      name: "B",
    },
  ];
  const newArr = arr.map((item, index) => {
    return {
      name: `${item.name}${index + 1}`,
      index: index + 1,
    };
  });
  console.log("🚀 ~ file: App.js ~ line 22 ~ newArr ~ newArr", newArr);
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <List />
      <Footer />
    </div>
  );
}

export default App;
