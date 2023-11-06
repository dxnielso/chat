const Contenedor = ({children, titulo}) => {
	return (
		<div className='pt-8 lg:pt-0 lg:flex-1 max-h-screen w-full bg-[var(--fondoOscuro)] flex justify-center items-start md:items-center select-none'>
			<div className='w-[90%] md:w-[85%] lg:w-[70%] md:min-h-[50%] md:max-h-[80%]'>
				<h2 className='text-2xl font-semibold mb-5'>{titulo}</h2>
        {children}
			</div>
		</div>
	)
}

export default Contenedor
