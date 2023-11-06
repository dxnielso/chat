// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Contexto * * * * * * * * * * * * * * * * * * * * * * * * * * * 
import { useUserContext } from '../context/User/UserState'
import { types } from '../context/User/UserReducer'
import { useNotificacionContext } from '../context/Notificacion/NotificacionState'
import { typesNotificaciones } from '../context/Notificacion/NotificacionReducer'
import { useAmigosContext } from '../context/Amigos/AmigosState'
import { typesAmigos } from '../context/Amigos/AmigosReducer'


const PrivateRoutes = () => {
	// Constantes
	const email = window.localStorage.getItem('email')	// obtenemos la variable local llamada email

	// Contextos
	const [user, dispatch] = useUserContext() // obtenemos el dispatch para cargar un usuario al contexto
	const [notificaciones, dispatchNotificaciones] = useNotificacionContext()
	const [amigos, dispatchAmigos] = useAmigosContext()

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	// Funcion para cargar el usuario despues de haber cerrado la pestaña
	const cargarUsuario = async email => {
		// Buscamos en la base de datos el usuario
		const res = await axios.get(
			'http://localhost/trabajos/apiChat/Usuarios/?email=' + email
		)
		// Si el usuario existe hará lo siguiente
		if (res.data.length > 0) {
			const usuarioData = {
				email: res.data[0].email,
				nombre: res.data[0].nombre,
				apPaterno: res.data[0].ap_paterno,
				apMaterno: res.data[0].ap_materno,
				estado: res.data[0].estado,
				avatar: res.data[0].avatar,
			}

			// Cargamos usuario en el contexto
			dispatch({
				type: types.USER_LOGIN,
				payload: usuarioData,
			})
		}
	}

	// Funcion para cargar notificacion que no han sido leidas
	const cargarNotificaciones = async email => {
		const res = await axios.get(
			'http://localhost/trabajos/apiChat/Notificaciones/?email=' +
				email +
				'&leida=' +
				0
		)
		// Cargamos las notificaciones al contexto
		dispatchNotificaciones({
			type: typesNotificaciones.SET_NOTIFICACIONES,
			payload: res.data,
		})
	}

	// Funcion para cargar los amigos de un usuario
	const cargarAmigos = async email => {
		const res = await axios.get(
			'http://localhost/trabajos/apiChat/Usuarios/?miEmail=' + email
		)
		// Cargamos los amigos al contexto
		dispatchAmigos({
			type: typesAmigos.SET_AMIGOS,
			payload: res.data,
		})
	}

	// Si si hay un email en la variable local va a ejecutar las funciones que hay dentro
	if (email != null) {
		cargarUsuario(email)
		cargarNotificaciones(email)
		cargarAmigos(email)
	}

	// si existe una variable local en el navegador llamada email, el return va renderizar todo lo haya dentro de las etiquetas de este componente, en caso de que NO exista una variable local llamada email, va redireccionar al usuario al login
	return email ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoutes
