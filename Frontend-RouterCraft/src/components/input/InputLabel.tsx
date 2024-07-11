interface InputLabelProps {
  label: string;
  type: string;
  id?: string;
  name: string;
  placeholder: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  color?: string;
}

const InputLabel = ({
  label,
  type,
  id,
  name,
  placeholder,
  error,
  onChange,
  color,
}: InputLabelProps) => {
  return (
    <div>
      <label htmlFor="password" className={color ? `text-${color}-500` :'text-white' }>
        {label}
      </label>
      <input
        type={type ?? "text"}
        name={name}
        id={id}
        placeholder={placeholder}
        className="w-full rounded-lg px-4 py-2"
        onChange={onChange}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputLabel;
