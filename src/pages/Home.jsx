// * * * * * * * * * * * * * * * * * * * * * * * * * * * Componentes * * * * * * * * * * * * * * * * * * * * * * * * * *
import AvatarSelector from '../components/AvatarSelector'
import Chats from '../components/Chats'
import Contenedor from '../components/Contenedor'
import Cargando from '../components/Cargando'
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * Hooks * * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { useState } from 'react'


const home = () => {
	// useStates
	const [cargando, setCargando] = useState(false)

	// Lo que se renderiza en pantalla...
	return (
		<div className='w-full min-h-screen max-h-screen bg-[var(--fondoOscuro)] lg:flex overflow-hidden'>
			<Cargando cargando = {cargando} />
			<Chats />
			<Contenedor titulo='Cambiar Avatar'>
				<AvatarSelector setCargando={setCargando} />
			</Contenedor>
		</div>
	)
}

export default home
