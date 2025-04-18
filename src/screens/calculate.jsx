import React, { useEffect, useState } from 'react'
import Splash from './Splash'
import Home from './Home'


const Calculator = () => {

    const [isLoding, setIsLoding] = useState(true)

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsLoding(false)
        }, Math.floor(Math.random() * 4) * 1000)
        return () => clearTimeout(timer)
        
    }, [isLoding])

    return (
        <div>
            {
                isLoding ? <Splash/> : <Home/>
            }
        </div>
    )
}

export default Calculator