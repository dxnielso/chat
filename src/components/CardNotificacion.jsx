// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'


const CardNotificacion = ({
	nueva,
	titulo,
	desc,
	cambiarEstadoNotificacion,
	fecha,
	hora,
}) => {
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
	// funcion para formatear hora con los valores que le son pasados a este componente
	const formatearHora = () => {
		const soloHora = hora.slice(0, 2)
		if (soloHora > 12) {
			return `${soloHora - 12}${hora.slice(2, 5)} pm`
		} else {
			return `${soloHora.slice(1)}${hora.slice(2, 5)} am`
		}
	}

	// Fucion para formatear la fecha
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

		return `${dia} de ${meses[mesNuevo - 1]} del ${anio}`
	}

	return (
		<div
			// data-aos='fade-right'
			className={`bg-white w-full flex items-center justify-between p-4 sm:px-8 sm:py-5 gap-x-5 sm:gap-x-10 duration-300 border border-gray-200 border-l-4 ${
				nueva ? 'border-l-yellow-500' : 'border-l-green-500'
			} hover:shadow-lg hover:translate-x-4 overflow-hidden`}
		>
			{/* Texto */}
			<div className='flex-1'>
				<h2 className='font-medium text-lg'>{titulo}</h2>
				<div className='flex justify-start items-center gap-x-2 text-xs font-light text-gray-800 mb-2'>
					<p>{formatearFecha()}</p>•<p>{formatearHora()}</p>
				</div>
				<p className='font-light text-sm text-gray-600'>{desc}</p>
			</div>
			{/* Botones */}
			<div className='flex justify-center items-center gap-x-5'>
				{nueva ? (
					<button
						onClick={cambiarEstadoNotificacion}
						className='text-green-600 hover:text-green-400 hover:scale-105 duration-200'
					>
						<AiOutlineCheck className='text-3xl' />
					</button>
				) : (
					<button
						onClick={cambiarEstadoNotificacion}
						className='text-red-600 hover:text-red-400 hover:scale-105 duration-200'
					>
						<AiOutlineClose className='text-3xl' />
					</button>
				)}
			</div>
		</div>
	)
}

export default CardNotificacion
