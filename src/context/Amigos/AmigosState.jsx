import { useReducer, useContext, createContext } from 'react' //Hooks React
import AmigosReducer from './AmigosReducer' // Logica - Funciones

// Creamos el contexto
const AmigosContext = createContext()

// Exportamos el uso del contexto
export const useAmigosContext = () => {
	return useContext(AmigosContext)
}
// export { useAmigosContext }

function AmigosState(props) {
	const initialState = []
	const [amigos, dispatchAmigos] = useReducer(AmigosReducer, initialState)

	return (
		<AmigosContext.Provider value={[amigos, dispatchAmigos]}>
			{props.children}
		</AmigosContext.Provider>
	)
}

export default AmigosState
