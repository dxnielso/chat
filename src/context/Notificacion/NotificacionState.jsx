import { createContext, useContext, useReducer } from 'react'
import NotificacionReducer from './NotificacionReducer'

// creacion del contexto
const NotificacionContext = createContext()

// Funcion para usar el contexto
const useNotificacionContext = () => {
	return useContext(NotificacionContext)
}
export {useNotificacionContext}

const NotificacionState = props => {
	const initialState = []
	const [notificaciones, dispatch] = useReducer(
		NotificacionReducer,
		initialState
	)

	return (
		<NotificacionContext.Provider value={[notificaciones, dispatch]}>
			{props.children}
		</NotificacionContext.Provider>
	)
}

export default NotificacionState
