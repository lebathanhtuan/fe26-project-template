import { Row, Button } from "antd";

const Payment = ({ setStep }) => {
  return (
    <>
      <div>Payment</div>
      <Row justify="space-between">
        <Button onClick={() => setStep(1)}>Back</Button>
        <Button type="primary" onClick={() => setStep(3)}>
          Submit
        </Button>
      </Row>
    </>
  );
};

export default Payment;
