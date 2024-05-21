import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/windows/header/navbar.jsx';
import Hidenavbar from './components/windows/header/hideNavbar.jsx';
import Footer from './components/windows/footer/footer.jsx';
import Hidefooter from './components/windows/footer/hideFooter.jsx';
import Loading from './components/windows/loading/loading.jsx';
import AuthRouteWrapper from './utils/AuthRouteWrapper.jsx';

const Home = lazy(() => import('./pages/windows/home/home.jsx'));
const SingleProduct = lazy(() => import('./pages/windows/singleProduct/singleProduct.jsx'));
const Products = lazy(() => import('./pages/windows/products/product.jsx'));
const Account = lazy(() => import('./pages/windows/user/user.jsx'));
const Login = lazy(() => import('./components/windows/login/login.jsx'));
const Signup = lazy(() => import('./components/windows/signup/signuppage.jsx'));
const PageNotFound = lazy(() => import('./components/windows/pageNotFound/pageNotFound.jsx'));
const CategoryPage = lazy(() => import('./components/windows/CategoryPage/CategoryPage.jsx'));
const SearchPage = lazy(() => import('./components/windows/searchPage/searchPage.jsx'));
const ContactPage = lazy(() => import('./components/windows/contactPage/contactPage.jsx'));
const ShopPage = lazy(() => import('./pages/windows/shop/shopPage.jsx'));
const SingleShop = lazy(() => import('./pages/windows/singleShop/singleShop.jsx'));

const ROUTES = {
  HOME: '/',
  ACCOUNT: '/account',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PRODUCTS: '/products',
  CATEGORY: '/category/:category',
  CONTACT: '/contact',
  SEARCH:'/search/:keyword',
  PRODUCT: '/product/:productId',
  SHOPS: '/shop',
  SHOP: '/shop/:shopId',
  PAGE_NOT_FOUND: '*'
};

const ErrorBoundary = ({ children }) => {
  return <>{children}</>;
};

const WindowsApp = () => {
  return (
    <Router>
      <Hidenavbar>
        <Navbar />
      </Hidenavbar>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
        <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ACCOUNT} element={<AuthRouteWrapper element={<Account />} />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path={ROUTES.SEARCH} element={<SearchPage />} />
            <Route path={ROUTES.PRODUCT} element={<SingleProduct />}/>
            <Route path={ROUTES.SHOPS} element={<ShopPage />}/>
            <Route path={ROUTES.SHOP} element={<SingleShop />}/>
            <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />}/>
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Hidefooter>
        <Footer />
      </Hidefooter>
    </Router>
  );
};

export default WindowsApp;
