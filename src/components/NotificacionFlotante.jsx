// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import {
	AiOutlineCheckCircle,
	AiOutlineClose,
	AiOutlineCloseCircle,
} from 'react-icons/ai'


const NotificacionFlotante = ({ tipo, titulo, texto, show, hide }) => {
	return (
		// Notificacion flotante
		<div
			id='notificacionFlotante'
			className={`fixed duration-500 top-24 z-40 bg-white w-[250px] sm:w-[300px] md:w-[350px] shadow-md py-6 px-8 flex justify-between items-start gap-x-3 select-none border-l-4 ${
				tipo == 1 ? 'border-l-green-600' : 'border-l-red-600 '
			} ${!show ? 'right-[-100%]' : 'right-8'}`}
		>
			{tipo == 1 ? (
				<AiOutlineCheckCircle className='w-min text-2xl text-green-600' />
			) : (
				<AiOutlineCloseCircle className='w-min text-2xl text-red-600' />
			)}
			<div className='flex-1'>
				<h2 className='font-medium'>{titulo}</h2>
				<p className='font-light text-sm text-gray-800'>{texto}</p>
			</div>
			<button onClick={hide}>
				<AiOutlineClose className='w-min text-xl text-gray-500' />
			</button>
		</div>
	)
}

export default NotificacionFlotante
