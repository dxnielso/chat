// * * * * * * * * * * * * * * * * * * * * * * * * * * * Bibliotecas * * * * * * * * * * * * * * * * * * * * * * * * * * *
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className='w-full h-[80px] bg-[var(--colorPrincipal)] px-[50px] md:px-[150px] flex items-center justify-start select-none'>
			<div>
				<Link to="/home" className='text-2xl text-white font-medium'>ChatApp</Link>
			</div>
		</header>
	)
}

export default Header
