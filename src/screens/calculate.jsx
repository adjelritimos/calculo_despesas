import React, { useEffect, useState } from 'react'
import Splash from './Splash'
import Home from './Home'


const Calculator = () => {

    const [isLoding, setIsLoding] = useState(true)

    useEffect(() => {

        const timer = setTimeout(() => {
            setIsLoding(false)
        }, 3000)


        return () => clearTimeout(timer)
    }, [])

    return (
        <div>
            {
                isLoding ? <Splash/> : <Home/>
            }
        </div>
    )
}

export default Calculator