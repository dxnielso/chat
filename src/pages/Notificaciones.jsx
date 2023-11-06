// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import CardNotificacion from '../components/CardNotificacion'
import Chats from '../components/Chats'
import Contenedor from '../components/Contenedor'
import NotificacionFlotante from '../components/NotificacionFlotante'
import Cargando from '../components/Cargando'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * Hooks * * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useState, useEffect } from 'react'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import axios from 'axios'


const Notificaciones = () => {
	// Constantes
	const email = window.localStorage.getItem('email')

	// useState
	const [tipo, setTipo] = useState(0)
	const [titulo, setTitulo] = useState('')
	const [texto, setTexto] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	
	const [notificaciones, setNotificaciones] = useState([])
	const [cargando, setCargando] = useState(false)

	// useEffect	-		se ejecuta la primera vez que se renderiza el componente Notificaciones (cuando carga la pagina)
	useEffect(() => {
		obtenerNotificaciones()
	}, [])

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 

	// Cambiar valores de la notificacion flotante
	const changeNotificationValues = (tipo, titulo, texto) => {
		setTipo(tipo)
		setTitulo(titulo)
		setTexto(texto)
		setShowNotification(true)
	}

	// Funcion que realiza una consulta a la API para obtener las notificaciones de un usuario
	const obtenerNotificaciones = async () => {
		const res = await axios.get(
			'http://localhost/trabajos/apiChat/Notificaciones/?email=' + email
		)
		setNotificaciones(res.data)	// asignamos el resultado de la consulta anterior a nuestro estado notificaciones
	}

	// Cambiar notificacion a leida o no leida
	const cambiarEstadoNotificacion = async(id, leida) => {
		setCargando(true)	// mostramos componente cargando
		
		// consulta a la bd para actualizar el estado de una notificacion
		const obj = {id, leida};
    const res = await axios.put('http://localhost/trabajos/apiChat/Notificaciones/', obj);
		
		// 1 = bien
		// 0 = error
		setCargando(false)	// ocultamos componente de carga
		if(res.data == 1) {
			obtenerNotificaciones();
			changeNotificationValues(
				1,
				'Notificación actualizada',
				'Se actualizo el estado de la notificación.'
			)
		} else {
			changeNotificationValues(
				0,
				'Error!',
				'Ocurrio un error al intentar actualizar el estado de la notificación.'
			)
		}
	}

	return (
		<div className='w-full h-screen bg-[var(--fondoOscuro)] lg:flex overflow-hidden'>
			<Chats />
			<Cargando cargando={cargando} />
			<NotificacionFlotante
				tipo={tipo}
				titulo={titulo}
				texto={texto}
				show={showNotification}
				hide={() => setShowNotification(false)}
			/>
			<Contenedor titulo='Notificaciones'>
				{notificaciones.length > 0 ? (
					<div className='flex flex-col gap-y-3'>
						{notificaciones.map(noti => (
							<CardNotificacion
								key={noti.id}
								nueva={noti.leida == 0 ? true : false}
								titulo={noti.titulo}
								desc={noti.mensaje}
								fecha={noti.fecha}
								hora={noti.hora}
								cambiarEstadoNotificacion = {() => cambiarEstadoNotificacion(noti.id, noti.leida)}
							/>
						))}
					</div>
				) : (
					<div className='px-5 py-6 bg-white w-full border border-gray-200 overflow-hidden'>
						<p className='text-md font-light'>Sin notificaciones</p>
					</div>
				)}
			</Contenedor>
		</div>
	)
}

export default Notificaciones
