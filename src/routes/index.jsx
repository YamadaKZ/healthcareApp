// routes/index.jsx
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Home from '../pages/home-screen/Home';
import Protected from './protected';

import Blog from '../pages/Blog-screen/Blog';
import { PATH_URL } from '../utils/constant';
import Login from '../pages/login-screen/Login';

const router = createBrowserRouter(
createRoutesFromElements(
    <Route path="/">
    <Route element={<Protected />}>
        <Route index element={<Home />} />
        <Route path={PATH_URL.blogPage} element={<Blog />} />
    </Route>
    <Route path={PATH_URL.signIn} element={<Login />} />
    <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
)
);

export default function AppRouter() {
return <RouterProvider router={router} />;
}
