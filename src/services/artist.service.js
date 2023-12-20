import axios from '../config/axios';

const getArtists = async () => {
  try {
    const response = await axios.get('http://localhost:4001/artist/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getArtistById = async id => {
  try {
    const response = await axios.get(`http://localhost:4001/artist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateArtist = async (id, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:4001/artist/${id}`,
      formData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteArtist = async id => {
  try {
    const response = await axios.delete(`http://localhost:4001/artist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const searchArtists = async query => {
  try {
    const response = await axios.get(`/artist/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  searchArtists,
};
