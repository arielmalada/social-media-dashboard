import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchUserDetail } from "../store/actions/userDetail";

const DetailUser = () => {
  const { userId } = useParams();
  const [userData, setUser] = useState(null);
  const userDetail = useSelector(
    (state) => state.userDetail.data
  );
  
  useEffect(() => {
    if (userDetail) setUser(userDetail);
  }, [userDetail]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUserDetail(userId));
  }, [dispatch,userId]);
  
  const { name, username } = {...userData};
  return ( 
    <div>
      {name} ( {username} )
    </div>
   );
}
 
export default DetailUser;