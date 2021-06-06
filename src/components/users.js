import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../store/actions/users"

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersLists = useSelector(
    (state) => state.users.data
  );

  const [listData, setList] = useState([]);
  // console.log(usersLists);
  useEffect(() => {
    if (usersLists) return setList(usersLists);
    // 
  }, [usersLists]);
  return ( 
    <div>
      {
        listData.map((item) => {
          const { id, name } = item;
          return (
            <Link to={`/${id}`}>
              <div key={id}>{name}</div>
            </Link>
          )
        })
      }
    </div>
   );
}
 
export default Users;