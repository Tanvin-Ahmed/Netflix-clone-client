import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../../axios';
import PopupVideoScreen from '../PopupVideoScreen/PopupVideoScreen';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {
                    movies?.map(movie => (
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) &&
                        <>
                            <img
                                onClick={openModal}
                                key={movie.id}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                            <PopupVideoScreen modalIsOpen={modalIsOpen} closeModal={closeModal} movie={movie} />
                        </>
                    )
                    )}
            </div>
        </div>
    );
};

export default Row;