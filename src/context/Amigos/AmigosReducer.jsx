export const typesAmigos = {
	SET_AMIGOS: 'SET_AMIGOS',
}

export default (state, action) => {
	// const {item, type} = action

	switch (action.type) {

    case typesAmigos.SET_AMIGOS:
			return action.payload

		// DEFAULT
		default:
			return state
	}
}
