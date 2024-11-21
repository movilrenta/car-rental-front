type Props = {
  placeHolder: string;
  type: string;
  icon?: React.ReactNode;
  id?: string;
  registerName: string;
  register: any;
  errors: Record<string, any>;
};
export const InputConfirm = ({
  icon,
  id,
  type,
  placeHolder,
  registerName,
  register,
  errors,
}: Props) => {
  return (
    <div className="w-full flex items-center gap-x-4">
      <label htmlFor={id}>
        {/* <IoPersonOutline size={25} className="text-red-700"/> */}
        {icon}
      </label>
      <div className="w-full flex flex-col justify-center">
        <input
          className="w-full form-input"
          type={type}
          placeholder={placeHolder}
          {...register(registerName)}
        />
        <p className="text-red-700 text-xs ps-3">{errors[registerName]?.message}</p>
      </div>
    </div>
  );
};
