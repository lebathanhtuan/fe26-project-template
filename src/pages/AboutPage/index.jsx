import { useEffect, useState, useMemo, useRef } from "react";
import { InputNumber, Button } from "antd";

const AboutPage = () => {
  const [pin1, setPin1] = useState(0);
  const [pin2, setPin2] = useState(0);
  const [pin3, setPin3] = useState(0);
  const [pin4, setPin4] = useState(0);

  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");

  const inputARef = useRef();
  const inputBRef = useRef();

  useEffect(() => {
    console.log("Khởi tạo About");

    return () => {
      console.log("Rời khỏi About");
    };
  }, []);

  useEffect(() => {
    if (pin1 === 1 && pin2 === 2 && pin3 === 3 && pin4 === 4) {
      alert("Unlock");
    }
  }, [pin1, pin2, pin3, pin4]);

  const handleSubmit = () => {
    console.log(inputARef.current.offsetTop);
  };

  const renderInputA = useMemo(() => {
    console.log("renderInputA");
    return (
      <input
        ref={inputARef}
        onChange={(e) => setInputA(e.target.value)}
        value={inputA}
        placeholder="Input A"
      />
    );
  }, [inputA]);

  const renderInputB = useMemo(() => {
    console.log("renderInputB");
    return (
      <input
        ref={inputBRef}
        onChange={(e) => setInputB(e.target.value)}
        value={inputB}
        placeholder="Input B"
      />
    );
  }, [inputB]);

  return (
    <div>
      About Page
      <div>
        <InputNumber onChange={(value) => setPin1(value)} />
        <InputNumber onChange={(value) => setPin2(value)} />
        <InputNumber onChange={(value) => setPin3(value)} />
        <InputNumber onChange={(value) => setPin4(value)} />
      </div>
      <div>{renderInputA}</div>
      <div>{renderInputB}</div>
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </div>
  );
};

export default AboutPage;
