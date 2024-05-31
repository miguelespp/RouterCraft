interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button = ({type, value} : ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
