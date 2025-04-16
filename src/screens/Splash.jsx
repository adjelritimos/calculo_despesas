import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Splash = () => {
    const navigate = useNavigate()

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate('./home')
        }, 3000)


        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div >
                    <img className="text-light m-0" role="status" src="/icon.ico" alt="Logo" style={{ height: '200px', width: '200px' }} />
                    <h1 className='text-center fw-bold fs-4 text-info'><div class="spinner-border text-info mt-auto mb-auto me-2" role="status"></div>Carregando...</h1>
                </div>
            </div>
        </div>
    )
}

export default Splash