// React router dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Helpers
import PrivateRoutes from './helpers/PrivateRoutes'

// Contexto
import UserContext from './context/User/UserState'
import NotificacionContext from './context/Notificacion/NotificacionState'
import AmigosContext from './context/Amigos/AmigosState'
import MensajesContext from './context/Mensajes/MensajesState'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AgregarAmigo from './pages/AgregarAmigo'
import Notificaciones from './pages/Notificaciones'

function App() {
	return (
		<UserContext>
			<AmigosContext>
				<MensajesContext>
					<NotificacionContext>
						<Router>
							<Routes>
								{/* Rutas privadas */}
								<Route element={<PrivateRoutes />}>
									<Route path='/' element={<Home />} />
									<Route path='/home' element={<Home />} />
									<Route path='/agregar-amigo' element={<AgregarAmigo />} />
									<Route path='/notificaciones' element={<Notificaciones />} />
								</Route>

								{/* Rutas normales */}
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
							</Routes>
						</Router>
					</NotificacionContext>
				</MensajesContext>
			</AmigosContext>
		</UserContext>
	)
}

export default App
