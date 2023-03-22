import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AllDataContext = createContext();
export const BASE_URL = "http://localhost:2030";

const Details = ({ children }) => {
  const [allDatas, setAllDatas] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phnNum, setPhmNum] = useState("");
  const [singleData, setSingledata] = useState("");
  const [addOrEdite, setAddOrEdite] = useState(false);
  async function getAllDatas() {
    axios
      .get(`${BASE_URL}/api/todos/`)
      .then((docs) => setAllDatas(docs.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAllDatas();
  }, []);
  return (
    <AllDataContext.Provider
      value={{
        allDatas,
        setAllDatas,
        name,
        setName,
        email,
        setEmail,
        phnNum,
        setPhmNum,
        setSingledata,
        singleData,
        addOrEdite,
        setAddOrEdite,
      }}
    >
      {children}
    </AllDataContext.Provider>
  );
};

export default Details;
