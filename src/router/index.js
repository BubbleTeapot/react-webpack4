import Loadable from '@loadable/component';
import Login from 'pages/Login/Login';

const Home = Loadable(() => import('pages/Home/Home'));

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        layout: Home,
        component: Login
    }
]