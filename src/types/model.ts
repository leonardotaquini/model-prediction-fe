export type ModelStatus = {
    status: string;
    isTrained: boolean;
    isLoading?: boolean;
}


export interface ResponseModel {
    msg:       string;
    isTrained: boolean;
}

export interface Prediction {
    prediction: number;
    done: boolean;
    excatly?: number;
}