export const typesNotificaciones = {
	SET_NOTIFICACIONES: 'SET_NOTIFICACIONES',
	ADD_NOTIFICACIONES: 'ADD_NOTIFICACIONES',
}

export default (state, action) => {
	// const {item, type} = action

	switch (action.type) {

    case typesNotificaciones.SET_NOTIFICACIONES:
			return action.payload
    
    case typesNotificaciones.ADD_NOTIFICACIONES:
      return state

		// DEFAULT
		default:
			return state
	}
}