/* eslint-disable no-useless-catch */
import axios from '../../utils/axios';

export const loginUser = async (correo, contraseña) => {
    try {
        const response = await axios.post('auth/login', { correo, contraseña });
        return response.data;
    } catch (error) {
        throw error;
    }
};
