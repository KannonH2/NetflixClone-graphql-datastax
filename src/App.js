import './App.css';
import {useEffect, useState} from 'react';
import Section from './Components/Section'
import HeroSection from './Components/HeroSection'
import Navbar from './Components/Navbar'

const App = () => {

    const genreIncrement = 4
    const [genres, setGenres] = useState(null);
    const [limit, setLimit] = useState(genreIncrement);

    const fetchData = async () => {
        const response = await fetch("/.netlify/functions/getGenres", {
            method: "POST",
            body: limit
        })
        const responseBody = await response.json()
        setGenres(responseBody.data.reference_list.values)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]) 


    return (
        <>
            <Navbar/>
            <HeroSection/> {
            genres && (
                <div className="container">
                    {
                    Object.values(genres).map((genre, index) => (
                        <Section key={index}
                            genre={
                                genre.value
                            }/>
                    ))
                } </div>
            )
        }
            <div className="page-end"
                onMouseEnter={
                    () => {
                        setLimit(limit + genreIncrement)
                    }
            }></div>
    </>
    );
}

export default App;
