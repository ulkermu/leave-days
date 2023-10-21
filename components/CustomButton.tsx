import { CustomButtonProps } from "@/types";

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  disable,
  icon,
  type,
}: CustomButtonProps) => {
  return (
    <button
      disabled={disable}
      onClick={handleClick}
      className={`dark:bg-slate-600 dark:hover:bg-slate-800 ease-out duration-150 py-1 px-2 rounded-md normal-case disabled:opacity-30 ${containerStyles}`}
      type={type}
    >
      <span
        className={icon ? "flex justify-center items-center gap-1" : `flex-1`}
      >
        {icon} {title}
      </span>
    </button>
  );
};

export default CustomButton;
