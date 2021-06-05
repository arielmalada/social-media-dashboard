import { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import Page404 from "../404";

const Users = () => {
  const [listData, setList] = useState([]);
  useEffect(() => {
    getUsers().then(
      (res) => {
        setList(res.data);
      }
    );
  }, []);
  
  return ( 
    <div>
      {
        listData.map((item) => {
          const { id, name } = item;
          return <div key={id}>{name}</div>
        })
      }
    </div>
   );
}
 
export default Users;