/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

export default function Protected(props) {
  if (localStorage.getItem("userToken") != null) {
    console.log(props.children);
    return props.children
  }
  else {
    return <Navigate to={'/login'} />
  }
}
