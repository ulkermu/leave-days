import { CustomButtonProps } from '@/types'

const CustomButton = ({ title, containerStyles, handleClick, disable }: CustomButtonProps) => {
	return (
		<button
			disabled={disable}
			onClick={handleClick}
			className={`dark:bg-slate-600 dark:hover:bg-slate-800 ease-out duration-150 py-1 px-2 rounded-md ${containerStyles}`}
			type={"button"}
		>
			<span className={`flex-1`}>
				{title}
			</span>
		</button>
	)
}

export default CustomButton