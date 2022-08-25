export const name = "Tuấn";
export const age = 20;

export default function Header(props) {
  const { name, age, handleChangeSelect } = props;
  return (
    <div>
      <h1>
        Header - {name} - {age}
      </h1>
    </div>
  );
}
