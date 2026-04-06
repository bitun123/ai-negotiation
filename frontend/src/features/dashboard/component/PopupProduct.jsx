import React, { useState } from 'react'

import { usePage } from "../hooks/usePage"
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';

function PopupProduct() {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const products = [
        {
            name: "iPhone 14",
            image: "https://images.unsplash.com/photo-1736173155811-e8142fd553ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
            rating: 4.7,
            price: 90000
        },
        {
            name: "Gaming Laptop",
            image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.6,
            price: 120000
        },
        {
            name: "Wireless Headphones",
            image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.4,
            price: 15000
        },
        {
            name: "Smart Watch",
            image: "https://images.unsplash.com/photo-1617043983671-adaadcaa2460?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.3,
            price: 25000
        },
        {
            name: "Sneakers",
            image: "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.2,
            price: 12000
        },
        {
            name: "Backpack",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.1,
            price: 5000
        },
        {
            name: "Electric Scooter",
            image: "https://images.unsplash.com/photo-1614226170075-d338afcd9c53?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.5,
            price: 120000
        },
        {
            name: "4K TV",
            image: "https://images.unsplash.com/photo-1730909352933-614f1673ac21?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.6,
            price: 100000
        },
        {
            name: "Bluetooth Speaker",
            image: "https://images.unsplash.com/photo-1588131153911-a4ea5189fe19?q=80&w=881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.3,
            price: 10000
        },
        {
            name: "Fitness Tracker",
            image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.2,
            price: 8000
        },
        {
            name: "Coffee Maker",
            image: "https://images.unsplash.com/photo-1565452344518-47faca79dc69?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.4,
            price: 15000
        },
        {
            name: "Air Purifier",
            image: "https://images.unsplash.com/photo-1617775047746-5b36a40109f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.5,
            price: 40000
        },
        {
            name: "Digital Camera",
            image: "https://images.unsplash.com/photo-1603208234872-619ffa1209cb?q=80&w=674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.6,
            price: 150000
        },
        {
            name: "Smart Thermostat",
            image: "https://images.unsplash.com/photo-1636569608385-58efc32690ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            rating: 4.3,
            price: 20000
        }
    ];

    let defaultProps = [
        "easy", "medium", "hard"
    ]

    const { createNewGame, loading } = usePage()
    const navigate = useNavigate()

    const handleStartGame = async () => {
        if (!selectedProduct || !selectedDifficulty) {
            alert("Please select a product and difficulty level to start the game.");
            return;
        }
        await createNewGame(selectedProduct, selectedDifficulty);
        navigate("/game")
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center absolute top-0 left-0 bg-black/50'>
            <div className='w-[90%] max-w-6xl h-[38rem]  overflow-y-auto no-scrollbar bg-[#0c1126]'>


                <div className='w-full p-3 flex items-center justify-end gap-4 '>
                    {defaultProps.map((item) => {
                        const isActiveDifficulty = selectedDifficulty === item
                        return (
                            <button
                                key={item}
                                className={`cursor-pointer px-4 py-2 border rounded active:scale-95 text-sm transition ${isActiveDifficulty
                                    ? 'border-blue-400 bg-blue-500/20 text-blue-200'
                                    : 'border-gray-500 text-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => setSelectedDifficulty(item)}
                            >
                                {item}
                            </button>
                        )
                    })}
                </div>

                <div className='w-full  rounded-lg p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 '>
                    {products.map((product) => {
                        const isActiveProduct = selectedProduct === product.name
                        return (
                            <div
                                key={product.name}
                                className={`w-full relative mb-3 aspect-square rounded transition cursor-pointer border-2 ${isActiveProduct
                                    ? 'border-blue-400 ring-2 ring-blue-400/40'
                                    : 'border-transparent hover:border-gray-500'
                                    }`}
                                onClick={() => setSelectedProduct(product.name)}
                            >
                                <img
                                    src={product.image}
                                    alt=""
                                    className='w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-105'
                                />
                                <h1 className='absolute top-0 left-2 text-blue- '>{product.name}</h1>

                                <div className=' absolute bottom-0 left-0 w-full
  flex  justify-between gap-1 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b'>
                                    <p>Rating: {product.rating}</p>
                                    <p>Price: ${product.price.toLocaleString()}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='w-full p-4 flex justify-center'>
                    <button
                        onClick={handleStartGame}
                        className='px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
                        {loading ? <Loader/> : "Start Negotiation"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopupProduct