// * * * * * * * * * * * * * * * * * * * * * * * * * * * * Hooks * * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useState } from 'react'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import CardAgregarAmigo from '../components/CardAgregarAmigo'
import Chats from '../components/Chats'
import Contenedor from '../components/Contenedor'
import Cargando from '../components/Cargando'
import NotificacionFlotante from '../components/NotificacionFlotante'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { BiSearch } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AgregarAmigo = () => {
	// Constantes
	const miEmail = window.localStorage.getItem('email')
	const navigate = useNavigate()

	// useStates
	const [email, setEmail] = useState('')
	const [amigosEncontrados, setAmigosEncontrados] = useState([])
	// - - - variables que usa la notificacion flotante
	const [tipo, setTipo] = useState(0)
	const [titulo, setTitulo] = useState('')
	const [texto, setTexto] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	// - - - variable para saber si debo mostrar el componente cargando o no
	const [cargando, setCargando] = useState(false)


	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 

	// funcion que se ejecuta cuando da clic en boton agregar usuario
	const handleClick = async () => {
		setCargando(true)

		// Hacemos consulta a la API
		const res = await axios.get(
			'http://localhost/trabajos/apiChat/Usuarios/?email=' +
				email +
				'&miEmail=' +
				miEmail
		)

		// Esperamos 1 segundo y ejecutamos el codigo de la funcion
		window.setTimeout(() => {

			// si el arreglo - resultado de la consulta tiene algo hace lo siguiente...
			if (res.data.length > 0) {
				setAmigosEncontrados(res.data)
			} else {
				// En caso de que el arreglo este vacio significa que no hay usuarios
				changeNotificationValues(
					0,
					'Usuario no encontrado',
					'No se encontro ningun usuario asociado al correo electrónico'
				)
				setAmigosEncontrados([])	// asignamos un array vacio al estado para sobreescribir lo que tenga
			}
			setCargando(false)
		}, 1000)
	}

	// Click al boton de agregar al usuario encontrado
	const handleClickAgregarAmigo = async (email, miEmail) => {
		setCargando(true)
		// Consulta a la API
		const obj = { email, miEmail }
		const res = await axios.post(
			'http://localhost/trabajos/apiChat/Amigos/',
			obj
		)
		
		// 0 = Ya es su amigo
		// 1 = No es su amigo pero no se pudo insertar los datos en la tabla
		// 2 = se agrego al amigo correctamente
		switch (res.data) {
			// Ya es su amigo
			case 0:
				changeNotificationValues(
					0,
					'Error!',
					'El usuario y tu ya tienen una amistad.'
				)
				break

			// Ocurrio un error al insertar la amistad en la tabla
			case 1:
				changeNotificationValues(
					0,
					'Error!',
					'Ocurrio un error al insertar los datos en la base de datos.'
				)
				break

			// Se agrego el amigo
			case 2:
				changeNotificationValues(
					1,
					'Amigo agregado',
					'Has agregado al usuario a tus amigos, ahora pueden intercambiar mensajes.'
				)
				break

			default:
				break
		}
		setCargando(false)
	}

	// Cambiar valores de la notificacion
	const changeNotificationValues = (tipo, titulo, texto) => {
		setTipo(tipo)
		setTitulo(titulo)
		setTexto(texto)
		setShowNotification(true)
	}

	// Lo que se renderiza va a continuacion
	return (
		<div className='w-full min-h-screen max-h-screen bg-[var(--fondoOscuro)] lg:flex overflow-hidden'>
			<Cargando cargando={cargando} />
			<NotificacionFlotante
				tipo={tipo}
				titulo={titulo}
				texto={texto}
				show={showNotification}
				hide={() => setShowNotification(false)}
			/>
			<Chats />
			<Contenedor titulo='Buscar usuario'>
				<div className='flex w-full gap-x-4 mb-8'>
					{/* Input */}
					<div className='flex-1 rounded-md overflow-hidden flex items-center relative'>
						<AiOutlineMail className='absolute left-3 text-xl text-black' />
						<input
							type='text'
							placeholder='Correo electrónico del usuario'
							className='duration-200 pl-11 pr-5 py-1 h-full w-full font-light border border-gray-300 outline-none focus:border-[var(--colorPrincipal)] rounded-md'
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<button
						className='duration-200 p-2 rounded-md bg-[var(--colorPrincipal)] text-white border-gray-300 outline-none focus:opacity-75 hover:opacity-75'
						onClick={handleClick}
					>
						<BiSearch className='text-3xl' />
					</button>
				</div>

				{/* Personas encontradas */}
				{amigosEncontrados.length > 0 ? (
					<div className='h-[350px] flex flex-col gap-y-3 overflow-y-scroll'>
						{/* Map para recorrer cada amigo encontrado */}
						{amigosEncontrados.map(amigo => (
							<CardAgregarAmigo
								key={amigo.email}
								nombre={`${amigo.nombre} ${amigo.ap_paterno} ${amigo.ap_materno}`}
								email={amigo.email}
								avatar={amigo.avatar}
								handleClickAgregarAmigo={() =>
									handleClickAgregarAmigo(amigo.email, miEmail)
								}
							/>
						))}

					</div>
				) : (
					<div className='px-5 py-6 bg-white w-full border border-gray-200 overflow-hidden'>
						<p className='text-md font-light'>Sin resultados</p>
					</div>
				)}
			</Contenedor>
		</div>
	)
}

export default AgregarAmigo
