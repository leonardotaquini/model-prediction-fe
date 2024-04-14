import axios from "axios";
import { Prediction, ResponseModel } from "../types/model";

const URL = 'https://model-prediction-back.onrender.com';

export const trainModel = async (): Promise<ResponseModel> => {

    const { data } = await axios.get(`${ URL }/model/train`);
    return data;

}

export const predictModel = async (x: number): Promise<Prediction> => {

    const { data } = await axios.post(`${ URL }/model/predict`, { x });
    return data;

}

export const welocme = async (): Promise<string> => {

    const { data } = await axios.get(`${ URL }/model/`);
    return data;
}