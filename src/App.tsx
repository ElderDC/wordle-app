import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import { PublicRoutes } from '@/models/routes.model'

const Home = lazy(() => import('@/pages/Home/Home'))
const Error404 = lazy(() => import('@/pages/Error404/Error404'))

function App() {
	return (
		<ThemeProvider>
			<Suspense fallback={'Loading...'}>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Navigate to={PublicRoutes.HOME} />} />
					<Route path={PublicRoutes.HOME} element={<Home />} />
					<Route path='/*' element={<Error404 />} />
				</Routes>
			</Suspense>
		</ThemeProvider>
	)
}

export default App
