export const types = {
	USER_LOGIN: 'USER_LOGIN',
	USER_LOGOUT: 'USER_LOGOUT',
	USER_UPDATE_AVATAR: 'USER_UPDATE_AVATAR'
}

export default (state, action) => {
	// const {item, type} = action

	switch (action.type) {

    case types.USER_LOGIN:
			return action.payload

    case types.USER_LOGOUT:
      return null
		
		// case types.USER_UPDATE_AVATAR:
		// 	return {
		// 		...state,
		// 		avatar: 1
		// 	}

		// DEFAULT
		default:
			return state
	}
}
