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


const Login = () => {
	// Objetos
	const navigate = useNavigate()

	// Contextos
	const [user, dispatch] = useUserContext()

	// useStates - variables
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	// - - - variables que usa la notificacion flotante
	const [tipo, setTipo] = useState(0)
	const [titulo, setTitulo] = useState('')
	const [texto, setTexto] = useState('')
	const [showNotification, setShowNotification] = useState(false)
	// - - - variable para saber si debo mostrar el componente cargando o no
	const [cargando, setCargando] = useState(false)

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * * 

	// funcion que se ejecuta cuando se hace clic en el boton del formulario
	const handleClick = async e => {
		clickSound()	// reproducimos sonido clic
		e.preventDefault()	// evitamos que se envie el formulario
		if (!validarCampos()) return false
		setShowNotification(false) // Ocultamos la notificacion porque ya paso la validacion de campos

		setCargando(true)		// mostramos componente de cargando
		// Consulta para validar si existe un usuario con ese email y esa contraseña
		const res = await axios.get('http://localhost/trabajos/apiChat/Usuarios/?email='+email+'&password='+password)

		if(res.data.length > 0) {
			// Si hay una cuenta...
			// Extraemos los datos
			const email = res.data[0].email;
			const nombre = res.data[0].nombre;
			const apPaterno = res.data[0].ap_paterno;
			const apMaterno = res.data[0].ap_materno
			const estado = 'Conectado'

			// Creamos un objeto con 2 atributos
			const obj = {email, estado: 'Conectado'};
			// Consulta a la bd que actualiza el estado del usuario Conectado / Desconectado
    	await axios.put('http://localhost/trabajos/apiChat/Usuarios/', obj);

			// Mostramos la notificacion
			changeNotificationValues(
				1,
				'Sesión iniciada',
				'Iniciaste sesión correctamente.'
			)

			// Cargamos usuario en el contexto
			dispatch({
				type: types.USER_LOGIN,
				payload: {
					email,
					nombre,
					apPaterno,
					apMaterno,
					estado
				},
			})

			// Guardamos variables locales
      window.localStorage.setItem("email", email)

			// Espera 3.5s y despues hace lo que contiene esta funcion
			window.setTimeout(() => {
				setShowNotification(false)	// ocultamos la notificacion flotante
				setCargando(false)	// ocultamos el componente de carga
				navigate('/home')		// enviamos al usuario a la pantalla home
			}, 3500)
		
		} else {
			// Error
			changeNotificationValues(
				0,
				'Accesso denegado',
				'No se encontro la cuenta en nuestra base de datos.'
			)
		}
		setCargando(false)
	}

	// Funcion que reune todas las validaciones del formulario en una sola funcion (contiene TODAS las validaciones)
	const validarCampos = () => {
		if (!validarCamposVacios()) return false
		if (!validarEmail()) return false
		return true
	}

	// Valida los campos vacios
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
		return true
	}

	// Funcion que valida el email
	const validarEmail = () => {
		const emailRegex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		if (emailRegex.test(email)) return true
		changeNotificationValues(0, 'Error', 'El correo electrónico no es válido.')
		return false
	}

	// Funcion que cambia los valores de la notificacion flotente y la muestra
	const changeNotificationValues = (tipo, titulo, texto) => {
		setTipo(tipo)
		setTitulo(titulo)
		setTexto(texto)
		setShowNotification(true)
	}

	// EN el return va todo lo que va renderizar React
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
					<h1 className='text-3xl mb-5'>Iniciar sesión</h1>

					{/* Inputs */}
					<div className='flex flex-col gap-y-2'>
						{/* Fila 1 */}
						<div className='flex flex-col sm:flex-row w-full gap-x-3 gap-y-2 sm:gap-y-0'>
							<FormInput
								title='Correo electrónico'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>

						{/* Fila 2 */}
						<div className='flex w-full gap-x-3'>
							<FormInput
								title='Contraseña'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						<FormButton
							texto='Continuar al chat'
							onClick={e => handleClick(e)}
						/>

						{/* Link para redirigir a Login */}
						<p className='text-sm font-light mt-2'>
							¿No tienes una cuenta?{' '}
							<Link
								to='/register'
								className='font-medium text-[var(--colorPrincipal)]'
							>
								Registrarme
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
