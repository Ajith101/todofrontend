import axios from "axios";
import React, { useContext, useState } from "react";
import { AllDataContext } from "./detailsContext/Details";

const AddNotes = () => {
  const {
    name,
    setName,
    email,
    allDatas,
    setEmail,
    phnNum,
    setPhmNum,
    setAllDatas,
    setAddOrEdite,
    singleData,
    addOrEdite,
  } = useContext(AllDataContext);

  //   edite post
  const updateEdite = (values) => {
    const newList = [...allDatas];
    newList.forEach((item) => {
      if (item._id === values._id) {
        (item.name = values.name),
          (item.email = values.email),
          (item.mobnum = values.mobnum);
      }
    });
    setAllDatas(newList);
    setAddOrEdite(false);
    setEmail("");
    setName("");
    setPhmNum("");
  };
  const editeDetails = () => {
    if (name === "" || email === "" || phnNum === "") {
      return;
    } else {
      axios
        .put(`http://localhost:2030/api/todos/${singleData.valuess._id}`, {
          _id: singleData.valuess._id,
          name: name,
          email: email,
          mobnum: phnNum,
          like: singleData.valuess.like,
        })
        .then((res) => updateEdite(res.data))
        .catch((err) => console.log(err));
    }
  };
  const addDetails = () => {
    if (name === "" || email === "" || phnNum === "") {
      return;
    } else {
      axios
        .post(`http://localhost:2030/api/todos/`, {
          name: name,
          email: email,
          mobnum: phnNum,
          like: false,
        })
        .then((res) => {
          setAllDatas([...allDatas, res.data]);
          setName("");
          setEmail("");
          setPhmNum("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section>
      <div className="">
        <h1>AddNotes</h1>
        <div className="flex gap-4 justify-center items-center">
          <div className="flex flex-col">
            <h1>Name</h1>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[2px] border-blue-300"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <h1>Email</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[2px] border-blue-300"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <h1>Phone Number</h1>
            <input
              value={phnNum}
              onChange={(e) => setPhmNum(e.target.value)}
              className="border-[2px] border-blue-300"
              type="text"
            />
          </div>
          <div className="flex items-baseline">
            <button
              onClick={() => (addOrEdite ? editeDetails() : addDetails())}
              className={`bg-yellow-600 rounded-md text-white px-4 py-1 text-center ${
                name === "" || email === "" || phnNum === ""
                  ? "bg-opacity-40"
                  : "bg-opacity-100"
              }`}
            >
              {addOrEdite ? "Upadate" : "Add Details"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddNotes;
