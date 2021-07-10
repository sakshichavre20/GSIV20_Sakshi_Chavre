import React from "react";
import axios from 'axios';

const apikey = '82129b20ece7b87e8bb55c46b129712e';
const url = 'https://api.themoviedb.org/3';
const upcomingUrl = `${url}/movie/upcoming`;

export const fetchMovies = async () => {
  try {
    const {data} = await axios.get(upcomingUrl, {
      params: {
        api_key: apikey,
        language: 'en_US',
        page: 1,
      },
    });

    const posterUrl = 'https://image.tmdb.org/t/p/original/';
    const modifiedData = data['results'].map(m => ({
      id: m['id'],
      backPoster: posterUrl + m['backdrop_path'],
      title: m['title'],
      poster: posterUrl + m['poster_path'],
      overview: m['overview'],
      rating: m['vote_average'],
      year: m['release_date'],
    }));

    return modifiedData;
  } catch (error) { }
};

export const fetchMovieDetail = async id => {
  try {
    const {data} = await axios.get(`${movieUrl}/${id}`, {
      params: {
        api_key: apikey,
        language: 'en_US',
      },
    });
    return data;
  } catch (error) {}
};

export const fetchCasts = async id => {
  try {
    const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
      params: {
        api_key: apikey,
      },
    });
    const modifiedData = data['cast'].map(c => ({
      id: c['cast_id'],
      character: c['character'],
      name: c['name'],
      img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
    }));

    return modifiedData;
  } catch (error) {}
};
