import CustomButton from '@/components/CustomButton'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Leave Days | Login',
	description: 'Login & Destroy.',
}

const Login = () => {

	return (
		<main>
			<CustomButton title='Register' />
		</main>
	)
}

export default Login