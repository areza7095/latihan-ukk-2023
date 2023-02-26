import React, { useState, useEffect } from "react";
import pengaduanService from "../services/pengaduan.service";

const Home = () => {
  const [pengaduan, setPengaduan] = useState([]);

  useEffect(() => {
    pengaduanService.getAllPengaduan().then(
      (response) => {
        // setPengaduan(response.data);
        // console.log(response.data)
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      {/* <h3>
        {posts.map((post, index) => (
          <div key={index}>{post}</div>
        ))}
      </h3> */}
    </div>
  );
};

export default Home;
