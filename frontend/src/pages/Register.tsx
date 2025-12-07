import { NavLink } from "react-router";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <>
      <NavLink to={"/"}>Go to Home Page</NavLink>
      <RegisterForm />
    </>
  );
};

export default Register;
