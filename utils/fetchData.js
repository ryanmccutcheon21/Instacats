import axios from "axios";

export const mediaUrl = 'http://catstagram.lofty.codes';

export const fetchData = async (url) => {
    const { data } = await axios.get(url)

    return data;
};