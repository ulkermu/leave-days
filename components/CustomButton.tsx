import { CustomButtonProps } from '@/types'
import React from 'react'

const CustomButton = ({ title, containerStyles, handleClick, disable, btnType }: CustomButtonProps) => {
	return (
		<button
			disabled={disable}
			onClick={handleClick}
			className={`dark:bg-slate-600 dark:hover:bg-slate-800 ease-out duration-150 py-1 px-2 rounded-md ${containerStyles}`}
		>
			<span className={`flex-1`}>
				{title}
			</span>
		</button>
	)
}

export default CustomButton