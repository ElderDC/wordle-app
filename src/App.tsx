import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import { PublicRoutes } from '@/models/routes.model'
import { AnimatePresence } from 'framer-motion'
import { Progress } from '@/components/ui/atoms'

const Home = lazy(() => import('@/pages/Home/Home'))
const Error404 = lazy(() => import('@/pages/Error404/Error404'))

function App() {
	return (
		<ThemeProvider>
			<Suspense
				fallback={<Progress indeterminate color='bg-on-base' className='h-1' />}
			>
				<AnimatePresence mode='wait'>
					<Routes location={location} key={location.pathname}>
						<Route path='/' element={<Navigate to={PublicRoutes.HOME} />} />
						<Route path={PublicRoutes.HOME} element={<Home />} />
						<Route path='/*' element={<Error404 />} />
					</Routes>
				</AnimatePresence>
			</Suspense>
		</ThemeProvider>
	)
}

export default App
