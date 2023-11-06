// * * * * * * * * * * * * * * * * * * * * * * * * * * * Contexto * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useUserContext } from '../context/User/UserState'

const Mensaje = ({
	float,
	asunto,
	mensaje,
	avatarDestinatario,
	fecha,
	hora,
}) => {
	// Contextos
	const [user, dispatch] = useUserContext()

	// Constantes
	const meses = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	]

	// * * * * * * * * * * * * * * * * * * * * * * * * * * * Funciones * * * * * * * * * * * * * * * * * * * * * * * * * * *
	// Funcion para formatear hora
	const formatearHora = () => {
		const soloHora = hora.slice(0, 2)
		// console.log(soloHora)
		if (soloHora >= 12) {
			return `${soloHora - 12}${hora.slice(2, 5)} pm`
		} else if (soloHora >= 10) {
			return `${soloHora}${hora.slice(2, 5)} am`
		} else {
			return `${soloHora.slice(1)}${hora.slice(2, 5)} am`
		}
	}
	// Funcion para formatear fecha
	const formatearFecha = () => {
		const anio = fecha.slice(0, 4)
		const mes = fecha.slice(5, 7)
		let mesNuevo = 0
		if (mes < 10) {
			mesNuevo = fecha.slice(6, 7)
		} else {
			mesNuevo = fecha.slice(5, 7)
		}
		const dia = fecha.slice(8)

		return `${dia} de ${meses[mesNuevo - 1]} ${anio}`
	}

	return (
		<div className='relative right-0 left-0 mb-8'>
			<div
				className={`flex items-end gap-x-5 mb-1 ${
					float == 1 ? 'justify-start flex-row-reverse' : 'justify-start'
				}`}
			>
				{/* Imagen */}
				<div className='w-[40px] h-[40px] bg-transparent rounded-full overflow-hidden'>
					<img
						src={float == 1 ? user?.avatar : avatarDestinatario}
						alt=''
						className='w-full h-full object-cover'
					/>
				</div>

				<div className='max-w-[80%] sm:max-w-[40%] min-w-[15%] h-max'>
					{/* Asunto */}
					<div
						className={`${
							float == 1
								? 'bg-blue-500 rounded-br-none'
								: 'bg-gray-300 rounded-bl-none'
						} w-full h-full py-3 sm:py-4 sm:px-10 rounded-3xl mb-2 relative`}
					>
						<p
							className={`text-xs sm:text-sm font-light w-full text-left ${
								float == 1 ? 'text-white' : 'text-black'
							}`}
						>
							{asunto}
						</p>
					</div>

					{/* Chat mensaje */}
					<div
						className={`${
							float == 1
								? 'bg-blue-500 rounded-br-none'
								: 'bg-gray-300 rounded-bl-none'
						} w-full h-full py-3 sm:py-5 px-6 sm:px-10 rounded-3xl`}
					>
						<p
							className={`text-xs sm:text-sm font-light w-full text-left ${
								float == 1 ? 'text-white' : 'text-black'
							}`}
						>
							{mensaje}
						</p>
					</div>
				</div>
			</div>
			{/* Fecha y hora */}
			<div
				className={`absolute w-full flex ${
					float == 1 ? 'justify-end right-[60px]' : 'justify-start left-[60px]'
				}`}
			>
				<p className='text-[10px] sm:text-xs font-light text-gray-800'>
					{formatearFecha()} • {formatearHora()}
				</p>
			</div>
		</div>
	)
}

export default Mensaje
