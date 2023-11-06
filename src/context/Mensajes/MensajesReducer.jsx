export const typesMensajes = {
	SET_MENSAJES: 'SET_MENSAJES',
	SET_REMITENTE_AVATAR: 'SET_REMITENTE_AVATAR',
	SET_DESTINATARIO_AVATAR: 'SET_DESTINATARIO_AVATAR'
}

export default (state, action) => {
	// const {item, type} = action

	switch (action.type) {

    case typesMensajes.SET_MENSAJES:
			return action.payload
		
		case typesMensajes.SET_REMITENTE_AVATAR:
			return {
				...state,
				avatarRemitente: action.payload
			}

		case typesMensajes.SET_DESTINATARIO_AVATAR:
			return {
				...state,
				avatarDestinatario: action.payload
			}

		// DEFAULT
		default:
			return state
	}
}