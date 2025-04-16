import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Splash = () => {
    const navigate = useNavigate()

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate('/calculo_despesas/home')
        }, 3000)


        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className='d-flex gap-2'>
                    <div className="spinner-border text-info mt-auto mb-auto" role="status"></div>
                    <h1 className='text-center fw-bold fs-4 text-info mt-auto mb-auto'>Carregando...</h1>
                </div>
            </div>
        </div>
    )
}

export default Splash