import React from 'react';
import requests from '../../Requests';
import Banner from '../Banner/Banner';
import NavBar from '../NavBar/NavBar';
import Row from '../Row/Row';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <NavBar />
            <Banner />
            <Row title="NETFLIX ORIGINALS" fetchUrl = {requests.fetchNetflixOriginals} isLargeRow />
            <Row title="Trending Now" fetchUrl = {requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl = {requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl = {requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl = {requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl = {requests.fetchHorrorMovies} />
            <Row title="Romantic Movies" fetchUrl = {requests.fetchRomanticMovies} />
            <Row title="Documentaries" fetchUrl = {requests.fetchDocumentaries} />
        </div>
    );
};

export default HomeScreen;