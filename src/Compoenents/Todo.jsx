import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoElement from "./TodoElement";
import axios from "axios";
import { v4 as uuid } from "uuid";

export default function Todo() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log("hi");
  const getData = () => {
    return axios({
      method: "get",
      url: `http://localhost:3000/todos`
    });
  };

  // useEffect(() => {
  //   handleReload();
  // }, []);

  const handlePosting = (task) => {
    const payload = {
      title: task,
      status: false,
      id: uuid()
    };
    // return axios({
    //   method: "post",
    //   url: `http://localhost:3000/todos`,
    //   data: payload
    // });
    return axios.post(`http://localhost:3000/todos`, payload);
  };

  const handleSubmit = async (task) => {
    await handlePosting(task);
    await handleReload();
  };

  const handleReload = () => {
    setIsLoading(true);
    getData()
      .then((res) => {
        setData(res.data);
        setIsError(false);
      })
      .catch((err) => {
        alert(err);
        setIsError(true);
      });
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    await handleReload();
  };

  const handleToggleStatus = async (id, mystatus) => {
    // let data = ;
    await axios.patch(`http://localhost:3000/todos/${id}`, {
      status: !mystatus
    });
    await handleReload();
  };

  // console.log(data);

  return (
    <>
      <h1>Todo For Learning Axios</h1>
      <TodoInput handleSubmit={handleSubmit} />
      {isError ? <h1>Something Went Wrong</h1> : <p></p>}
      <div>
        {isLoading ? (
          <h1>...Loading</h1>
        ) : (
          data.map((item) => (
            <TodoElement
              key={item.id}
              title={item.title}
              status={item.status}
              id={item.id}
              handleDelete={handleDelete}
              handleToggleStatus={handleToggleStatus}
            />
          ))
        )}
      </div>
    </>
  );
}
