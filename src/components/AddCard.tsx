import { TriggerButton } from "./TriggerButton";
import { useState } from "react";

type Props = {
  onAdd: (input: string) => void;
};

export const AddCard = ({ onAdd }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const addCard = () => {
    onAdd(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="input-text"
      ></input>
      <TriggerButton onClick={addCard} />
    </div>
  );
};
