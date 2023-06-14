import { Outlet } from 'react-router-dom'
import { IProduct } from '../../types/product';
import HeaderLayoutClient from './components/header';
import FooterLayoutClient from './components/footer';
const LayoutClient = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto px-4">
                <HeaderLayoutClient/>
                <main className="">
                    <Outlet />
                </main>
                <FooterLayoutClient/>
            </div >
        </>
    )
}

export default LayoutClient