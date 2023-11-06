import { useReducer, useContext, createContext } from 'react' //Hooks React
import UserReducer from './UserReducer' // Logica - Funciones

// Creamos el contexto
const UserContext = createContext()

// Exportamos el uso del contexto
const useUserContext = () => {
	return useContext(UserContext)
}
export { useUserContext }

function UserState(props) {
	const initialState = {}
	const [user, dispatch] = useReducer(UserReducer, initialState)

	return (
		<UserContext.Provider value={[user, dispatch]}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserState
