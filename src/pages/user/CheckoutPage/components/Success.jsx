import { Row, Button } from "antd";

const Success = ({ setStep }) => {
  return (
    <>
      <div>Success</div>
      <Row justify="center">
        <Button type="primary" onClick={() => null}>
          Go to home
        </Button>
      </Row>
    </>
  );
};

export default Success;
