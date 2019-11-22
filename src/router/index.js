import Loadable from '@loadable/component';
const Home = Loadable(() => import('pages/Home/Home'));
const SolidCarousel = Loadable(() => import('pages/SolidCarousel/SolidCarousel'));
const Login = Loadable(() => import('pages/Login/Login'));

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        layout: Home,
        component: Login
    },
    {
        path: '/solidCarousel',
        component: SolidCarousel
    }
]