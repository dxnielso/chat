import { useReducer, useContext, createContext } from 'react' //Hooks React
import MensajesReducer from './MensajesReducer' // Logica - Funciones

// Creamos el contexto
const MensajesContext = createContext()

// Exportamos el uso del contexto
export const useMensajesContext = () => {
	return useContext(MensajesContext)
}

function MensajesState(props) {
	const initialState = []
	const [mensajes, dispatchMensajes] = useReducer(MensajesReducer, initialState)

	return (
		<MensajesContext.Provider value={[mensajes, dispatchMensajes]}>
			{props.children}
		</MensajesContext.Provider>
	)
}

export default MensajesState