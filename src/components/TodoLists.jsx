import axios from "axios";
import React, { useContext } from "react";
import { AllDataContext } from "./detailsContext/Details";

const TodoLists = () => {
  const {
    allDatas,
    setAllDatas,
    setName,
    setEmail,
    setPhmNum,
    setSingledata,
    setAddOrEdite,
  } = useContext(AllDataContext);

  const removeListUpdate = (values) => {
    const newListOne = [...allDatas];
    const newList = newListOne.filter((item) => !(item._id === values._id));
    setAllDatas(newList);
  };

  const deleteList = (value) => {
    axios
      .delete(`http://localhost:2030/api/todos/${value._id}`)
      .then((res) => removeListUpdate(res.data))
      .catch((err) => console.log(err));
  };

  // edite notes
  const editeBTN = (valuess) => {
    setAddOrEdite(true);
    setSingledata({ valuess });
    setEmail(valuess.email);
    setPhmNum(valuess.mobnum);
    setName(valuess.name);
  };

  const likeUpadate = (values) => {
    const newList = [...allDatas];
    newList.forEach((item) => {
      if (item._id === values._id) {
        item.like = values.like;
      }
    });

    setAllDatas(newList);
  };
  const likeBTN = (value) => {
    axios
      .put(`http://localhost:2030/api/todos/${value._id}`, {
        _id: value._id,
        name: value.name,
        email: value.email,
        mobnum: value.mobnum,
        like: !value.like,
      })
      .then((res) => likeUpadate(res.data))
      .catch((err) => console.log(err));
  };

  const displayList =
    allDatas &&
    allDatas.map((item, id) => {
      return (
        <div key={id} className="flex justify-center items-center gap-5">
          <h1>name: {item.name}</h1>
          <h1>Email: {item.email}</h1>
          <h1>Phone Number: {item.mobnum}</h1>
          <button
            onClick={() => likeBTN(item)}
            className="bg-red-400 text-white p-2 text-center"
          >
            {item.like ? "Liked" : "like"}
          </button>
          <button
            onClick={() => deleteList(item)}
            className="bg-red-400 text-white p-2 text-center"
          >
            x
          </button>
          <button
            onClick={() => editeBTN(item)}
            className="bg-red-400 text-white p-2 text-center"
          >
            edite
          </button>
        </div>
      );
    });

  return (
    <div>
      <h1>TodoLists</h1>
      <div className="flex flex-col gap-3">{displayList}</div>
    </div>
  );
};

export default TodoLists;
