type Click = {
  onClick: () => void;
};

export const Button = ({ onClick }: Click) => {
  return (
    <button className="button-component" onClick={onClick}>
      Add card
    </button>
  );
};
