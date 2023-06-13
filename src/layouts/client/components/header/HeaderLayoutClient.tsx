import { Button, Form, Input, Menu, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import { ShoppingCartOutlined } from "@ant-design/icons"
import SignupPage from "../../../../pages/client/SignupPage";
import SigninPage from "../../../../pages/client/SigninPage";
export default function HeaderLayoutClient() {
    const cartItems = useSelector((state: any) => state.cart.cartItems);
    const [show, setshow] = useState(false);

    return (
        <div className="bg-white">
            <nav className="2xl:container 2xl:mx-auto sm:py-6">
                <div className="flex justify-between ">
                    <Link to="/" className="text-2xl text-gray-700 dark:text-gray-400 font-bold">SNEAKERCUTI</Link>
                    <div className="hidden sm:flex flex-row items-center space-x-6">
                        <ul className="hidden lg:w-auto lg:space-x-12 lg:items-center lg:flex ">
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
                    <div className="hidden sm:flex flex-row space-x-4">
                        <div>
                            <Link to="/cart" className="w-[50px] flex items-center dark:text-gray-400">
                                {cartItems.length === 0 ?
                                    <Badge text={0}>
                                        <ShoppingCartOutlined style={{ fontSize: '30px' }} className="text-gray-600" />
                                    </Badge>
                                    :
                                    <Badge count={cartItems.length}>
                                        <ShoppingCartOutlined style={{ fontSize: '30px' }} className="text-gray-600" />
                                    </Badge>
                                }
                            </Link>
                        </div>
                        <div>
                            <SignupPage />
                        </div>
                        <div>
                            <SigninPage />
                        </div>
                    </div>
                    {/* Burger Icon */}
                    <div id="bgIcon" onClick={() => setshow(!show)} className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  justify-center items-center sm:hidden cursor-pointer`}>
                        <svg className={`${show ? 'hidden' : ''}`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className=" transform duration-150" d="M4 6H20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path className=" transform duration-150" d="M4 18H20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg className={`${show ? 'block' : 'hidden'}`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                {/* Mobile and small-screen devices (toggle Menu) */}
                <div id="MobileNavigation" className={`${show ? 'block' : 'hidden'} sm:hidden mt-4 mx-auto`}>
                    <div className="flex flex-row items-center justify-center space-x-6">
                        <Menu className="sm:hidden md:block">
                            <Menu.Item key="home">
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="products">
                                <Link to="/products">product</Link>
                            </Menu.Item>
                            <Menu.Item key="products/sales">
                                <Link to="/products/sales">new sale</Link>
                            </Menu.Item>
                            <Menu.Item key="abouts">
                                <Link to="/abouts">about</Link>
                            </Menu.Item>
                            <Menu.Item key="contacts">
                                <Link to="/contacts">contact</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="ml-[180px]">
                        <div>
                            <Link to="/cart">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="currentColor"
                                    className="ml-[32px]"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="py-4">
                            <SignupPage />
                        </div>
                        <div>
                            <SigninPage />
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
}
