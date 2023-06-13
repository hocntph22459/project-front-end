import { Link } from 'react-router-dom'
const FooterLayoutClient = () => {
    return (
        <footer className="border-t mt-12 pt-12 pb-32 px-4 lg:px-0">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm font-bold text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                </span>
                <ul className="w-auto space-x-12 items-center flex">
                    <li className="pb-3">
                        <Link to='/' className="text-sm text-gray-700 hover:text-blue-400 font-bold dark:text-gray-400">Home</Link>
                    </li>
                    <li className="pb-3">
                        <Link to='/products' className="text-sm text-gray-700 hover:text-blue-400 font-bold dark:text-gray-400">products</Link>
                    </li>
                    <li className="pb-3">
                        <Link to='/products/sales' className="text-sm text-[red] font-bold">news sale</Link>
                    </li>
                    <li className="pb-3">
                        <Link to='/abouts' className="text-sm text-gray-700 font-bold hover:text-blue-400 dark:text-gray-400">About us</Link>
                    </li>
                    <li className="pb-3">
                        <Link to='/contacts' className="text-sm text-gray-700 font-bold hover:text-blue-400 dark:text-gray-400">contacts</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default FooterLayoutClient