import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { fetchUsers } from "../../store/actions/users"

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersLists = useSelector(
    (state) => state.users.data
  );

  const [listData, setList] = useState([]);
  useEffect(() => {
    if (usersLists) return setList(usersLists);
  }, [usersLists]);
  return ( 
    <div>
      <h1 className="text-center">Social Media Dashboard</h1>
      {
        listData.map((item) => {
          const { id, name } = item;
          return (
            <Link to={`/user/${id}`}>
              <Card key={id} className="m-2">
                <CardBody>{name}</CardBody>
              </Card>
            </Link>
          )
        })
      }
    </div>
   );
}
 
export default Users;