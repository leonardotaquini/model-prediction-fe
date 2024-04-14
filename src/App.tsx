import "./App.css";
import { useState } from "react";
import { predictModel, trainModel } from "./helpers/model.axios";
import { ModelStatus, Prediction } from "./types/model";

function App() {

  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    status: 'Presione para entrenar',
    isTrained: false,
    isLoading: false
  });

  const [input, setInput] = useState<number>(0);

  const [prediction, setPrediction] = useState<Prediction>({
    prediction: 0,
    done: false,
    excatly: undefined
  });

  const train = async () => {
    try {
      setModelStatus({
        ...modelStatus,
        isLoading: true
      })
      const { isTrained, msg } = await trainModel();
      setModelStatus({
        status: msg,
        isTrained,
        isLoading: false
      });
    } catch (error) {
      console.error('Error del servidor');
      setModelStatus({
        status: 'Error del servidor',
        isTrained: false
      })
    }
  }

  const predict = async () => {
    const res = await predictModel(input);
    const { prediction } = res;
    setPrediction({ 
      prediction: Math.round(res.prediction * 10) / 10,
      done: res.done,
      excatly: prediction
     });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(Number(e.target.value));
  }

  return (
    <>
      <h1 className="text-center m-4">Entrenar Modelo y hacer predicciones</h1>
      <div className="container d-flex shadow flex-column flex-sm-row flex-lg-row">
        <div className="d-flex flex-column p-3 col-12 col-sm-6 col-lg-6 justify-content-center">
          {
            modelStatus?.isLoading ? (
            <button className="btn btn-outline-primary" disabled>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Entrenando...</span>
            </button>   
            ):
            ( 
            <button className="btn btn-outline-primary"  onClick={ train }>
                Entrenar Modelo
             </button>
             )

          }
          <p className={`alert my-4 ${modelStatus?.isTrained ? 'alert-success' : 'alert-warning'}`} > Estado: { modelStatus?.status } </p>
        </div>

        <div className="d-flex flex-column p-3 col-12 col-sm-6 col-lg-6 justify-content-around">
          <label className="form-label">Ingrese valor de X:</label>
          <input type="number" className="form-control " onChange={ handleInputChange } placeholder="Ingrese valor ( por defecto: 0 )"/>
          <button className="btn btn-outline-primary my-2"  onClick={ predict } disabled={ !modelStatus?.isTrained }>
             Predecir Y 
          </button>
          <p className="alert alert-info">
            Predicción redondeada: { !prediction.done ? 'Presione para predecir' : prediction.prediction }
          </p>
          {
            prediction.excatly && (  
              <p className="alert alert-info">Predicción exacta: { !prediction.done ? 'Presione para predecir' : prediction.excatly }</p>
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;
