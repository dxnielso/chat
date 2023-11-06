// * * * * * * * * * * * * * * * * * * * * * * * * * * * * Hooks * * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useState } from 'react'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import Header from '../components/Header'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import NotificacionFlotante from '../components/NotificacionFlotante'
import Cargando from '../components/Cargando'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import clickSound from '../helpers/ClickSound';
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Contexto * * * * * * * * * * * * * * * * * * * * * * * * * * * 
import { useUserContext } from '../context/User/UserState'
import { types } from '../context/User/UserReducer'


const Register = () => {
	// Objetos
	const navigate = useNavigate()

	// Contextos
	const [user, dispatch] = useUserContext()

	// useStates -  variables
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [nombre, setNombre] = useState('')
	const [apPaterno, setApPaterno] = useState('')
	const [apMaterno, setApMaterno] = useState('')
	// - - - variables que usa la notificacion flotante
	const [tipo, setTipo] = useState(0)
	const [titulo, setTitulo] = useState('')
	const [texto, setTexto] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	// - - - variable para saber si debo mostrar el componente cargando o no
	const [cargando, setCargando] = useState(false)


	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	
	// funcion que se ejecuta cuando se hace clic en el formulario
	const handleClick = async e => {
		clickSound()	// se reproduce el sonido
		e.preventDefault()	// se evita que se refresque la pagina
		if (!validarCampos()) return false // Validaciones
		setShowNotification(false) // Ocultamos la notificacion porque ya paso la validacion de campos
		setCargando(true)	// mostramos componente de cargando
		// Codigo para registrar usuario -  consulta create a la api pasando un objeto
		const obj = { email, password, nombre, apPaterno, apMaterno }
    const res = await axios.post('http://localhost/trabajos/apiChat/Usuarios/', obj)

		// Error
		if (res.data == 0) {
			// Mostramos notificacion
			changeNotificationValues(
				0,
				'Error',
				'No se pudo registrar la cuenta en la base de datos.'
			)
		} else {
			changeNotificationValues(
				1,
				'Cuenta creada',
				'La cuenta se registro en la base de datos correctamente.'
			)
			// Cargamos usuario en el contexto
			dispatch({
				type: types.USER_LOGIN,
				payload: {
					email,
					nombre,
					apPaterno,
					apMaterno,
					estado: 'Conectado'
				},
			})

      // Guardamos variables locales
      window.localStorage.setItem("email", email)

			window.setTimeout(() => {
				setShowNotification(false)
				setCargando(false)
				navigate('/home')
			}, 3500)
		}
		setCargando(false)
	}

	const validarCampos = () => {
		if (!validarCamposVacios()) return false
		if (!validarEmail()) return false
		return true
	}

	const validarCamposVacios = () => {
		if (email == '') {
			changeNotificationValues(
				0,
				'Error',
				'El correo electrónico es requerido.'
			)
			return false
		}
		if (password == '') {
			changeNotificationValues(0, 'Error', 'La contraseña es requerida.')
			return false
		}
		if (nombre == '') {
			changeNotificationValues(0, 'Error', 'El nombre es requerido.')
			return false
		}
		if (apPaterno == '') {
			changeNotificationValues(0, 'Error', 'El apellido paterno es requerido.')
			return false
		}
		if (apMaterno == '') {
			changeNotificationValues(0, 'Error', 'El apellido materno es requerido.')
			return false
		}
		return true
	}

	const validarEmail = () => {
		const emailRegex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		if (emailRegex.test(email)) return true
		changeNotificationValues(0, 'Error', 'El correo electrónico no es válido.')
		return false
	}

  const changeNotificationValues = (tipo, titulo, texto) => {
		setTipo(tipo)
		setTitulo(titulo)
		setTexto(texto)
		setShowNotification(true)
	}

	return (
		<div className='flex flex-col min-h-screen w-full overflow-x-hidden'>
			<Cargando cargando = {cargando} />
			<Header />

			<div className='flex-1 bg-[var(--fondoOscuro)] flex justify-center items-center relative'>
				<NotificacionFlotante
					tipo={tipo}
					titulo={titulo}
					texto={texto}
					show={showNotification}
					hide={() => setShowNotification(false)}
				/>

				<form
					action=''
					className='w-5/6 md:w-3/4 max-w-[500px] p-10 rounded-2xl shadow-lg bg-white my-10'
				>
					<h1 className='text-3xl mb-5'>Registro</h1>

					{/* Inputs */}
					<div className='flex flex-col gap-y-2'>
						{/* Fila 1 */}
						<div className='flex flex-col sm:flex-row w-full gap-x-3 gap-y-2 sm:gap-y-0'>
							<FormInput
								title='Correo electrónico'
								type='email'
								onChange={e => setEmail(e.target.value)}
							/>
							<FormInput
								title='Contraseña'
								type='password'
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						{/* Fila 2 */}
						<div className='flex w-full gap-x-3'>
							<FormInput
								title='Nombre'
								type='text'
								onChange={e => setNombre(e.target.value)}
							/>
						</div>

						{/* Fila 3 */}
						<div className='flex flex-col sm:flex-row w-full gap-x-3 gap-y-2 sm:gap-y-0'>
							<FormInput
								title='Apellido paterno'
								type='text'
								onChange={e => setApPaterno(e.target.value)}
							/>
							<FormInput
								title='Apellido materno'
								type='text'
								onChange={e => setApMaterno(e.target.value)}
							/>
						</div>

						<FormButton
							texto='Continuar al chat'
							onClick={e => handleClick(e)}
						/>

						{/* Link para redirigir a Registro */}
						<p className='text-sm font-light mt-2'>
							¿Tienes una cuenta?{' '}
							<Link
								to='/login'
								className='font-medium text-[var(--colorPrincipal)]'
							>
								Entrar
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register

