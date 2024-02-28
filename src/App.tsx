import {useEffect} from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import {useGetGoodsApiMutation} from "./shared/api/baseApi.ts";

function App() {

    const [goods] = useGetGoodsApiMutation()

    useEffect(() => {
        goods({
            "action": "filter",
            "params": {"price": 17500.0}
        }).unwrap().then((data: any) => console.log('res',data))
    }, []);

    return (
        <>
            <img src={viteLogo} className="logo" alt="Vite logo"/>
        </>
    )
}

export default App


