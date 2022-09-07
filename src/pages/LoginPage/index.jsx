import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <div>
      Login Page -{" "}
      <Button onClick={() => navigate(state.prevPath)}>Đăng nhập</Button>
    </div>
  );
};

export default LoginPage;
