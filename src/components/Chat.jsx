// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import FormInput from './FormInput'
import FormButton from './FormButton'
import Mensaje from './Mensaje'
import NotificacionFlotante from './NotificacionFlotante'
import PuntoConectado from './PuntoConectado'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { BiDownArrow } from 'react-icons/bi'
import { MdRefresh } from 'react-icons/md'
import axios from 'axios'
import clickSound from '../helpers/ClickSound'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * Hooks * * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useState } from 'react'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Contexto * * * * * * * * * * * * * * * * * * * * * * * * * * * 
import { useMensajesContext } from '../context/Mensajes/MensajesState'


const Chat = ({ amigoData, cargarMensajes, setCargando }) => {
	// Constantes
	const miEmail = window.localStorage.getItem('email')

	// Contextos
	const [mensajes, dispatchMensajes] = useMensajesContext()

	// useStates
	const [mensajeVisible, setMensajeVisible] = useState(false)

	const [tipo, setTipo] = useState(0)
	const [titulo, setTitulo] = useState('')
	const [texto, setTexto] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	const [asunto, setAsunto] = useState('')
	const [mensaje, setMensaje] = useState('')

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	// Funcion para validar los campos del formulario para enviar un correo electronico
	const validarCampos = () => {
		if (asunto == '') {
			changeNotificationValues(
				0,
				'Falta asunto!',
				'Debes ingresar el asunto del correo electrónico.'
			)
			return false
		}
		if (mensaje == '') {
			changeNotificationValues(
				0,
				'Falta mensaje!',
				'Debes ingresar el mensaje del correo electrónico.'
			)
			return false
		}
	}

	// Funcion a ejecutar cuando se de clic en enviar correo
	const handleFormSubmit = async e => {
		setCargando(true)		// mostramos componente de cargando
		clickSound()	// ejecutamos funcion para reproducir sonido de clic
		e.preventDefault()	// evitamos que se envie el formulario y se recargue la pagina

		// Validar formulario
		if (validarCampos() == false) {
			setCargando(false)
			setMensajeVisible(false)
			return
		}

		// Creamos objeto necesario para realizar una solicitud post a la api
		const obj = {
			asunto,
			mensaje,
			emailRemitente: miEmail,
			emailDestinatario: amigoData.email,
		}
		// solicitud POST a la API para crear un nuevo registro de mensaje
		const res = await axios.post(
			'http://localhost/trabajos/apiChat/Mensajes/',
			obj
		)
		setCargando(false)	// ocultamos el componente de cargando
		// Error
		if (res.data == 0) {
			changeNotificationValues(
				0,
				'Error!',
				'El correo electrónico pudo enviarse.'
			)
		} else if (res.data == 1) {
			changeNotificationValues(
				0,
				'Error!',
				'Se registro el correo electrónico en la base de datos pero no se pudo enviar.'
			)
			// Consultamos los mensajes desde la bd y actualizamos el contexto
			cargarMensajes(amigoData.email)
		} else if (res.data == 2) {
			setAsunto('')
			setMensaje('')
			setMensajeVisible(false)

			// Consultamos los mensajes desde la bd y actualizamos el contexto
			cargarMensajes(amigoData.email)
		}
	}

	const changeNotificationValues = (tipo, titulo, texto) => {
		setTipo(tipo)
		setTitulo(titulo)
		setTexto(texto)
		setShowNotification(true)
	}

	// Funcion a ejecutar cuando se de clic en el boton de refrescar mensajes
	const handleRefresh = () => {
		setMensajeVisible(false)
		cargarMensajes(amigoData.email)
	}

	return (
		<div className='relative flex-1 bg-[var(--fondoOscuro)] w-[100vw] min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] lg:w-[calc(100vw-410px)] flex flex-col overflow-hidden lg:min-h-screen lg:max-h-screen'>
			<NotificacionFlotante
				tipo={tipo}
				titulo={titulo}
				texto={texto}
				show={showNotification}
				hide={() => setShowNotification(false)}
			/>
			{/* Barra superior */}
			<div className='w-full h-[60px] bg-[var(--colorPrincipal)] flex justify-between items-center px-5 sm:px-12'>
				<div className='flex justify-center items-center gap-x-5 '>
					{/* imagen */}
					<div className='relative w-[40px] h-[40px] rounded-full'>
						<img
							src={amigoData.avatar}
							alt=''
							className='w-full h-full object-cover rounded-full'
						/>
						{amigoData.estado == 'Conectado' && <PuntoConectado />}
					</div>
					{/* Nombre */}
					<p className='text-md sm:text-lg font-medium text-[var(--fondoOscuro)]'>
						{`${amigoData.nombre} ${amigoData.apPaterno} ${amigoData.apMaterno}`}
					</p>
				</div>
				<button className='text-gray-300 hover:text-gray-50 duration-200' onClick={handleRefresh}>
					<MdRefresh className='text-3xl' />
				</button>
			</div>

			{/* Contenedor de conversacion */}
			<div className='h-full flex-1 w-full py-10 relative'>
				<div className='absolute top-3 sm:top-10 bottom-20 sm:bottom-24 right-5 sm:right-20 left-5 sm:left-20 overflow-x-hidden overflow-y-auto flex flex-col-reverse'>
					{/* Mensaje */}
					{mensajes.map(mensaje => (
						<Mensaje
							key={mensaje.id}
							float={mensaje.emailRemitente == miEmail ? 1 : 0}
							asunto={mensaje.asunto}
							mensaje={mensaje.mensaje}
							avatarDestinatario={amigoData.avatar}
							fecha={mensaje.fecha}
							hora={mensaje.hora}
						/>
					))}
				</div>
			</div>

			{/* Caja para escribir mensaje */}
			<div
				className={`absolute right-0 w-full h-[400px] bg-white px-8 sm:px-20 py-4 rounded-t-3xl border border-gray-300 shadow-inner drop-shadow-2xl duration-500 ${
					mensajeVisible ? 'bottom-0 ' : 'bottom-[-345px]'
				}`}
			>
				{/* Contenedor de boton ocultar / mostrar */}
				<div className='w-full flex justify-end mb-5'>
					<button onClick={() => setMensajeVisible(!mensajeVisible)}>
						<BiDownArrow
							className={`duration-500 text-2xl text-gray-800 ${
								mensajeVisible ? 'rotate-0' : 'rotate-180'
							}`}
						/>
					</button>
				</div>

				<form action=''>
					<div className='flex flex-col sm:flex-row w-full gap-x-3 gap-y-2 sm:gap-y-0 mb-5'>
						<FormInput
							title='Asunto'
							type='text'
							value={asunto}
							onChange={e => setAsunto(e.target.value)}
						/>
					</div>

					<div className='min-w-1/2 w-full flex flex-col gap-y-1'>
						<label htmlFor='mensaje'>Mensaje</label>
						<textarea
							name=''
							id='mensaje'
							value={mensaje}
							onChange={e => setMensaje(e.target.value)}
							className='w-full h-[100px] max-h-[100px] min-h-[100px] px-2 py-2 rounded-sm border border-gray-300 outline-none font-light duration-200 focus:border-[var(--colorPrincipal)]'
						></textarea>
					</div>

					<FormButton texto='Enviar' onClick={e => handleFormSubmit(e)} />
				</form>
			</div>
		</div>
	)
}

export default Chat
