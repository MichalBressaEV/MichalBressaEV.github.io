type Click = {
  onClick: () => void;
};

export const Button = ({ onClick }: Click) => {
  return (
    <button
      role="button"
      className="button-component button-24"
      onClick={onClick}
    >
      Add card
    </button>
  );
};
