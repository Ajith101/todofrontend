import React from "react";
import AddNotes from "./components/AddNotes";
import Details from "./components/detailsContext/Details";
import Header from "./components/Header";
import TodoLists from "./components/TodoLists";

const App = () => {
  return (
    <>
      <Details>
        <Header />
        <AddNotes />
        <TodoLists />
      </Details>
    </>
  );
};

export default App;
