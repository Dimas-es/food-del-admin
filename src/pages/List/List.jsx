import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = ({ url }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const respons = await axios.get(`${url}/api/food/list`);
    if (respons.data.success) {
      setList(respons.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const respons = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (respons.data.success) {
      toast.success(respons.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img
                src={`https://food-del-backend-omega.vercel.app/images/${item.image}`} // Ganti dengan URL backend
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default List