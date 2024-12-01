import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const respons = await axios.get(`${url}/api/food/list`);
    if (respons.data.success) {
      setList(respons.data.data);
    } else {
      toast.error("Terjadi kesalahan");
    }
  };

  const removeFood = async (foodId) => {
    const respons = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (respons.data.success) {
      toast.success(respons.data.message);
    } else {
      toast.error("Terjadi kesalahan");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex col">
      <p>Daftar Semua Makanan</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Gambar</b>
          <b>Nama</b>
          <b>Kategori</b>
          <b>Harga</b>
          <b>Aksi</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rp{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">Hapus</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
