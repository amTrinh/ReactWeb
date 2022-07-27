import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

	// Login
	const loginUser = async userForm => {
		try {
			const response = await axios.post(`http://localhost:5000/Login`, userForm)
			if (response.data.success)
				localStorage.setItem(
					'accessToken',
					response.data.accessToken
				)
			localStorage.setItem(
				'user_id',
				response.data.existingUser._id
			)
			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Register
	const registerUser = async userForm => {
		try {
			const response = await axios.post(`http://localhost:5000/Register`, userForm)
			if (response.data.success) {
				localStorage.setItem(
					'accessToken',
					response.data.accessToken
				)
				localStorage.setItem(
					'user_id',
					response.data.newUser._id
				)
			}
			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Logout
	// const logoutUser = () => {
	// 	localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
	// 	dispatch({
	// 		type: 'SET_AUTH',
	// 		payload: { isAuthenticated: false, user: null }
	// 	})
	// }

	const authContextData = { loginUser, registerUser }

	// Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
