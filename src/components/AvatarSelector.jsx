// * * * * * * * * * * * * * * * * * * * * * * * * * * * * Hooks * * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useState } from 'react'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import FormInput from './FormInput'
import { BiSearch } from 'react-icons/bi'
import FormButton from './FormButton'
import NotificacionFlotante from './NotificacionFlotante'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Contexto * * * * * * * * * * * * * * * * * * * * * * * * * * * 
import { useUserContext } from '../context/User/UserState'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import axios from 'axios'
import clickSound from '../helpers/ClickSound'


const AvatarSelector = ({ setCargando }) => {

	// Contextos
	const [user, dispatch] = useUserContext()

	// useStates
	const [avatarNombre, setAvatarNombre] = useState('')
	const [genero, setGenero] = useState('adventurer-neutral')
	const [url, setUrl] = useState('')

	const [tipo, setTipo] = useState(0)
	const [titulo, setTitulo] = useState('')
	const [texto, setTexto] = useState('')
	const [showNotification, setShowNotification] = useState(false)

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 

	// Funcion ejecutar al dar clic en el boton de buscar avatar
	const handleClick = () => {
		setCargando(true)	// mostramos componente cargando
		clickSound()
		// cambiamos el valor del estado ulr concatenando la direccion de abajo con el genero seleccionado en el select, el valor del input y el ,svg
		setUrl(
			'https://avatars.dicebear.com/api/' + genero + '/' + avatarNombre + '.svg'
		)
		setCargando(false)	// ocultamos componente cargando
	}

	// Funcion a ejecutar cuando se da clic en guardar
	const handleClickSave = async () => {
		clickSound()
		setCargando(true)
		const obj = { email: user.email, url }	// creamos objeto con email y url
		// Realizamos solicitud PUT para crear un registro en la base de datos
		const res = await axios.put(
			'http://localhost/trabajos/apiChat/Usuarios/',
			obj
		)

		setCargando(false)
		// 1 = bien
		// 0 = error
		if (res.data == 1) {
		} else {
			changeNotificationValues(0, 'Error!', 'No se pudo actualizar el avatar.')
		}
	}

	const changeNotificationValues = (tipo, titulo, texto) => {
		setTipo(tipo)
		setTitulo(titulo)
		setTexto(texto)
		setShowNotification(true)
	}

	return (
		<div className='flex flex-col items-center'>
			<NotificacionFlotante
				tipo={tipo}
				titulo={titulo}
				texto={texto}
				show={showNotification}
				hide={() => setShowNotification(false)}
			/>
			<img
				src={url == '' ? user?.avatar : url}
				alt='Avatar'
				className='my-5 rounded-full w-[40%] md:w-[30%] lg:w-[25%] hover:animate-pulse'
			/>
			<div className='flex flex-col sm:flex-row sm:items-end gap-y-3 sm:gap-x-5 w-full'>
				<FormInput
					title='Nombre de avatar'
					type='text'
					value={avatarNombre}
					onChange={e => setAvatarNombre(e.target.value)}
				/>

				<select
					name=''
					id=''
					value={genero}
					className='px-2 py-2 rounded-sm border border-gray-300 outline-none font-light duration-200 focus:border-[var(--colorPrincipal)]'
					onChange={e => setGenero(e.target.value)}
				>
					<option value='adventurer-neutral'>Adventurer Neutral</option>
					<option value='big-ears'>Big Ears</option>
					<option value='big-smile'>Big Smile</option>
					<option value='bottts'>Bottts</option>
					<option value='pixel-art'>Pixel Art</option>
					<option value='initials'>Iniciales</option>
				</select>

				<button
					className='duration-200 h-min p-2 rounded-md bg-[var(--colorPrincipal)] text-white border-gray-300 outline-none focus:opacity-75 hover:opacity-75'
					onClick={handleClick}
				>
					<span className='sm:hidden'>Buscar</span>
					<BiSearch className='hidden sm:inline-block text-3xl' />
				</button>
			</div>
			<div className='w-full flex justify-start'>
				<FormButton texto='Guardar' onClick={handleClickSave} />
			</div>
		</div>
	)
}

export default AvatarSelector
