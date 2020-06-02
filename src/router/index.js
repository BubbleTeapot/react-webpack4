import Loadable from 'react-loadable';
import Loading from '@/components/Loading/Loading';
const App = Loadable({
    loader:() => import('@/App'), 
    loading: Loading
});
const NotFound404 = Loadable({
    loader: () => import('pages/NotFound404/NotFound404'),
    loading: Loading
});
const Home = Loadable({
    loader: () => import('pages/Home/Home'),
    loading: Loading
});
const SolidCarousel = Loadable({
    loader: () => import('pages/SolidCarousel/SolidCarousel'),
    loading: Loading
});
const Login = Loadable({
    loader: () => import('pages/Login/Login'),
    loading: Loading
});

export default [
    {
        component: App,
        routes: [
            {
                path: '/login',
                exact: true,
                component: Login
            },
            {
                path: '/solidCarousel',
                exact: true,
                component: SolidCarousel
            },
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '*',
                component: NotFound404
            }
        ]
    }
]