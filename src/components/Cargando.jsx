import '../css/loader.css';

const Cargando = ({ cargando }) => {
	return (
		cargando && (
			<div className='w-full h-full fixed z-50 bg-[#000000b9] flex justify-center items-center'>
				<div id='fountainG'>
					<div id='fountainG_1' className='fountainG'></div>
					<div id='fountainG_2' className='fountainG'></div>
					<div id='fountainG_3' className='fountainG'></div>
					<div id='fountainG_4' className='fountainG'></div>
					<div id='fountainG_5' className='fountainG'></div>
					<div id='fountainG_6' className='fountainG'></div>
					<div id='fountainG_7' className='fountainG'></div>
					<div id='fountainG_8' className='fountainG'></div>
				</div>
			</div>
		)
	)
}

export default Cargando
