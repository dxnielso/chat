// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import PuntoConectado from './PuntoConectado'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import clickSound from '../helpers/ClickSound'


const TarjetaChat = ({
	nombre,
	apPaterno,
	apMaterno,
	avatar,
	estado,
	onClick,
}) => {
	return (
		<div
			onClick={() => {
				onClick()
				clickSound()
			}}
			className='group duration-300 w-full h-[80px] bg-[#111B21] border-b border-b-gray-700 hover:bg-[var(--colorSecundario)] flex items-center px-4 gap-x-8 cursor-pointer'
		>
			{/* imagen */}
			<div className='relative w-[55px] h-[55px] rounded-full flex items-center'>
				<img
					src={avatar}
					alt=''
					className='w-full h-full object-cover rounded-full'
				/>
				{estado == 'Conectado' && <PuntoConectado />}
			</div>
			{/* chat */}
			<div className='flex-1 h-full flex flex-col py-2'>
				<h2 className='text-[#e9e9e9] font-light text-base'>{`${nombre} ${apPaterno} ${apMaterno}`}</h2>
				<p className='overflow-hidden text-gray-500 font-light duration-300 text-sm group-hover:text-white'>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem ipsam
					itaque, quibusdam nam dicta animi! Debitis voluptate porro aspernatur
					deserunt.
				</p>
			</div>
		</div>
	)
}

export default TarjetaChat
