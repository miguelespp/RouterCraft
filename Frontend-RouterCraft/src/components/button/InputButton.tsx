interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    value: string;
    disable?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button = ({type, value, disable} : ButtonProps) => {
  return (
    <div>
      <button
        type={type}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
        disabled={disable} 
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
