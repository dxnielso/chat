// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import TarjetaChat from './TarjetaChat'
import Cargando from './Cargando'
import NotificacionFlotante from './NotificacionFlotante'
import Chat from './Chat'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { ImExit } from 'react-icons/im'
import {
	AiOutlineUserAdd,
	AiOutlineBell,
	AiOutlineMenu,
	AiOutlineClose,
} from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import clickSound from '../helpers/ClickSound'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * Hooks * * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useState } from 'react'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Contexto * * * * * * * * * * * * * * * * * * * * * * * * * * * 
import { types } from '../context/User/UserReducer'
import { useUserContext } from '../context/User/UserState'
import { useNotificacionContext } from '../context/Notificacion/NotificacionState'
import { useAmigosContext } from '../context/Amigos/AmigosState'
import { useMensajesContext } from '../context/Mensajes/MensajesState'
import { typesMensajes } from '../context/Mensajes/MensajesReducer'


const Chats = () => {
	// Contantes
	const email = window.localStorage.getItem('email')
	// Objetos
	const navigate = useNavigate()
	// useStates
	const [user, dispatch] = useUserContext()
	const [amigos, dispatchAmigos] = useAmigosContext()
	const [mensajes, dispatchMensajes] = useMensajesContext()
	const [notificaciones, dispatchNotificaciones] = useNotificacionContext()

	// useState
	const [tipo, setTipo] = useState(0)
	const [titulo, setTitulo] = useState('')
	const [texto, setTexto] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	const [cargando, setCargando] = useState(false)
	const [mostrarMenu, setMostrarMenu] = useState(false)

	const [amigoData, setAmigoData] = useState(null)

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	// Funcion a ejecutar cuando se da clic en el boton de cerrar session
	const logOut = async () => {
		setCargando(true)		// mostramos componente de carga
		const obj = { email, estado: 'Desconectado' }		// creamos objeto que vamos a utilizar para una solicitud PUT
		// Solicitud a la API para actualizar el estado del usuario
		await axios.put('http://localhost/trabajos/apiChat/Usuarios/', obj)

		// Actualizamos los datos del contexto
		dispatch({ type: types.USER_LOGOUT, payload: {} })
		
		// Mostramos notificacion
		changeNotificationValues(
			1,
			'Sesión cerrada',
			'Cerraste sesión correctamente.'
		)
		// Despues de 3 segundo ejecuta el siguiente codigo
		window.setTimeout(() => {
			setCargando(false)
			setShowNotification(false)
			window.localStorage.removeItem('email')
			navigate('/login')
		}, 3000)
	}

	const changeNotificationValues = (tipo, titulo, texto) => {
		setTipo(tipo)
		setTitulo(titulo)
		setTexto(texto)
		setShowNotification(true)
	}

	// Funcion que se ejecuta cuando se da clic a una tarjeta - chat de un amigo - usuario
	const handleClick = (email, nombre, apPaterno, apMaterno, estado, avatar) => {
		// Actualizo los datos de mi estado amigoData con los datos del amigo al que di clic
		setAmigoData({
			email: email,
			nombre: nombre,
			apPaterno: apPaterno,
			apMaterno: apMaterno,
			estado: estado,
			avatar: avatar,
		})
		setMostrarMenu(false)	// en caso de estar en telefono oculto el menu
		cargarMensajes(email)	//cargo los mensaje con ese amigo
	}

	// Solicitud GET para cargar todos los mensaje que se tienen con un amigo
	const cargarMensajes = async email => {
		setCargando(true)		// mostramos componente de carga
		const miEmail = window.localStorage.getItem('email')	// obtenemos email de variable local llamada email

		// solicitud get a la api
		const res = await axios.get(
			'http://localhost/trabajos/apiChat/Mensajes/?miEmail=' +
				miEmail +
				'&emailAmigo=' +
				email
		)
		// Cargamos los mensajes al contexto
		dispatchMensajes({
			type: typesMensajes.SET_MENSAJES,
			payload: res.data,
		})
		setCargando(false)	// ocultamos componente de carga
	}

	// funcion a ejecutar cuando se da clic en la foto del avatar del usuario dueño de la cuenta
	const handleClickAvatar = () => {
		setMostrarMenu(false)		// ocultamos menu
		setAmigoData(null)		// asignamos null a el estado amigoData para que se oculte el chat que muestra los mensaje y poder ver el componente donde podemos cambiar el avatar de la cuenta
		navigate('/home')		// en caso de que no se encuentre en la ruta home y este en notificaciones o agregarUsuario, se redirige a /home 
	}

	return (
		<div className='w-min max-w-full h-min lg:flex'>
			<div className='relative w-screen h-min lg:min-h-screen lg:max-h-screen lg:w-[410px] bg-[#111B21] md:flex md:flex-col'>
				<Cargando cargando={cargando} />
				<NotificacionFlotante
					tipo={tipo}
					titulo={titulo}
					texto={texto}
					show={showNotification}
					hide={() => setShowNotification(false)}
				/>

				<header className='relative z-40 min-h-[60px] h-[60px] bg-[#26353d] flex justify-between items-center px-6'>
					<div className='flex justify-center items-center gap-x-3 overflow-hidden'>
						{/* imagen */}
						<div
							className='min-w-[45px] min-h-[45px] max-w-[45px] max-h-[45px] rounded-full overflow-hidden cursor-pointer'
							onClick={() => {
								handleClickAvatar()
								clickSound()
							}}
						>
							<img
								src={user?.avatar}
								alt=''
								className='w-full h-full object-cover'
							/>
						</div>
						{/* Datos */}
						<div className='hidden text-white w-max lg:block'>
							<p className='text-xs font-normal truncate'>{`${user?.nombre} ${user?.apPaterno} ${user?.apMaterno}`}</p>
							<p className='text-xs font-light truncate'>{user?.email}</p>
						</div>
					</div>

					<nav className='flex justify-center items-center gap-x-3'>
						{/* Campana */}
						<Link
							to='/notificaciones'
							className='relative'
							onClick={() => {
								setMostrarMenu(false)
								setAmigoData(null)
								clickSound()
							}}
						>
							<span className='absolute text-white font-semibold text-base right-[-2px] top-[-10px]'>
								{notificaciones.length}
							</span>
							<AiOutlineBell className='text-[#AEBAC1] text-2xl duration-200  hover:text-white' />
						</Link>
						{/* Agregar amigo */}
						<Link
							to='/agregar-amigo'
							onClick={() => {
								setAmigoData(null)
								setMostrarMenu(false)
								clickSound()
							}}
						>
							<AiOutlineUserAdd className='text-[#AEBAC1] text-2xl duration-200  hover:text-white' />
						</Link>
						{/* Salir */}
						<button
							onClick={() => {
								logOut()
								clickSound()
							}}
						>
							<ImExit className='text-[#AEBAC1] text-2xl duration-200  hover:text-white' />
						</button>
						{/* Menu */}
						{!mostrarMenu ? (
							<button
								onClick={() => {
									setMostrarMenu(true)
									clickSound()
								}}
								className='lg:hidden ml-3'
							>
								<AiOutlineMenu className='text-[#AEBAC1] text-2xl duration-200  hover:text-white' />
							</button>
						) : (
							<button
								onClick={() => {
									clickSound()
									setMostrarMenu(false)
								}}
								className='lg:hidden ml-3'
							>
								<AiOutlineClose className='text-[#AEBAC1] text-2xl duration-200  hover:text-white' />
							</button>
						)}
					</nav>
				</header>

				<div
					className={`absolute z-30 h-[calc(100vh-60px)] duration-500 bg-[#111B21] ${
						mostrarMenu ? 'top-[60px]' : 'top-[-100vh]'
					} lg:relative lg:top-0 lg:flex-1 lg:h-full lg:flex lg:flex-col lg:overflow-y-auto`}
				>
					{/* Buscador */}
					<form
						action=''
						className='w-[85%] md:min-h-[40px] mx-auto my-3 flex items-center relative bg-[#26353d] rounded-md'
					>
						<BiSearch className='absolute left-3 text-xl text-[#AEBAC1]' />
						<input
							type='text'
							placeholder='Busca un chat o inicia uno nuevo'
							className='rounded-md w-full bg-transparent outline-none pl-10 pr-5 py-2 font-light text-[#AEBAC1] text-sm border border-transparent focus:border-[var(--colorSecundario)] duration-200 '
						/>
					</form>

					{/* Chats */}
					<div className='flex-1 overflow-x-hidden'>
						{amigos.map(usuario => (
							<TarjetaChat
								key={usuario.email}
								nombre={usuario.nombre}
								apPaterno={usuario.apPaterno}
								apMaterno={usuario.apMaterno}
								estado={usuario.estado}
								avatar={usuario.avatar}
								onClick={() =>
									handleClick(
										usuario.email,
										usuario.nombre,
										usuario.apPaterno,
										usuario.apMaterno,
										usuario.estado,
										usuario.avatar
									)
								}
							/>
						))}
					</div>
				</div>
			</div>

			{amigoData && (
				<Chat
					amigoData={amigoData}
					cargarMensajes={cargarMensajes}
					setCargando={setCargando}
				/>
			)}
		</div>
	)
}

export default Chats
