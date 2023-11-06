// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { AiOutlinePlusCircle } from 'react-icons/ai'

const CardAgregarAmigo = ({ nombre, email, handleClickAgregarAmigo, avatar }) => {
	return (
		<div className='bg-white w-full min-h-[80px] h-[80px] flex items-center justify-between px-2 sm:px-8 gap-x-2 md:px-3 lg:px-10 sm:gap-x-5 duration-300 border border-gray-200 border-l-4 border-l-transparent hover:border-l-[var(--colorPrincipal)] hover:shadow-lg overflow-hidden'>
			<div className='flex gap-x-4 items-center'>
				<div className='h-[50px] sm:w-[60px] w-[50px] sm:h-[60px] rounded-full overflow-hidden'>
					<img
						src={avatar}
						alt=''
						className='w-full h-full object-cover'
					/>
				</div>
				<div className='md:w-[200px] xl:w-[260px] h-min'>
					<h2 className='font-medium text-sm md:text-lg truncate'>{nombre}</h2>
					<p className='font-light text-xs md:text-sm text-gray-600 truncate'>
						{email}
					</p>
				</div>
			</div>
			<button
				className='text-base w-max text-[var(--colorPrincipal)] md:bg-[var(--colorPrincipal)] md:text-white md:px-3 md:py-2 rounded-md hover:opacity-75'
				onClick={handleClickAgregarAmigo}
			>
				<span className='hidden md:inline-block'>Agregar</span>
				<AiOutlinePlusCircle className='inline-block text-3xl md:hidden' />
			</button>
		</div>
	)
}

export default CardAgregarAmigo
