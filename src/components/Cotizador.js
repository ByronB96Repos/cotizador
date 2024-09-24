import React, { useState } from 'react'
import axios from 'axios';
const url = 'http://localhost:5221/api/Cotizador/Cotizador';

function Cotizador() {

    const periodoCapitalizacion = 'Diario';
    const [monto, setMonto] = useState(200);
    const [plazo, setPlazo] = useState(1);
    const [tasaInteres, setTasaInteres] = useState(0);
    const [valorRendimento, setValorRendimento] = useState(0);
    const [montoRecibir, setMontoRecibir] = useState(0);

    const calcular = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, {
                Monto: Number(monto),
                Plazo: Number(plazo),
            });
            if (response.data.msj === "No existe Error") {
                //console.log(response.data);
                setValorRendimento(response.data.interes || 0);
                setMontoRecibir(response.data.montoRecibir || 0);
                setTasaInteres(response.data.tasaInteres || 0);

            } else {
                console.error("Error en el monto ingresado debe estar entre 200 y 100000");
                setValorRendimento(0);
                setMontoRecibir(0);
                setTasaInteres(0);
            }

        } catch (error) {
            console.error("Error al realizar la solicitud", error);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='mt-3 me-4'>
                <h2>COTIZADOR</h2>
                <p>
                    Simulador de rentabilidad de depositos de ahorros del Banco Guayaquil.
                </p>
                <br /><br />
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <div className="card">
                            <div className="card-header" style={{ background: '#d9006c', color: 'white' }}>
                                COTIZADOR DE AHORROS
                            </div>
                            <form onSubmit={calcular}>
                                <div className='card-body' style={{ padding: '20px', border: '1px solid #d9006c' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <table style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '0px', textAlign: 'right' }}>Monto:</td>
                                                    <td style={{ padding: '1px', textAlign: 'left' }}>
                                                        <input id='monto' required={true} value={monto} onChange={(e) => setMonto(e.target.value)}
                                                            type="number" className='form-control' style={{ width: '200px' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '0px', textAlign: 'right' }}>Plazo:</td>
                                                    <td style={{ padding: '1px', textAlign: 'left' }}>
                                                        <select className='form-control' id='plazo' value={plazo} onChange={(e) => setPlazo(e.target.value)}>
                                                            {[...Array(12).keys()].map(i => (
                                                                <option key={i + 1} value={i + 1}>{i + 1} MESES</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '0px', textAlign: 'right' }}>Tasa de interés*:</td>
                                                    <td style={{ padding: '1px', textAlign: 'right' }}>
                                                        {tasaInteres * 100}%
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '0px', textAlign: 'right' }}>Periodo de capitalización:</td>
                                                    <td style={{ padding: '1px', textAlign: 'right' }}>
                                                        {periodoCapitalizacion}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '0px', textAlign: 'right' }}>Valor de rendimiento:</td>
                                                    <td style={{ padding: '1px', textAlign: 'right' }}>
                                                        ${valorRendimento}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '0px', textAlign: 'right' }}>Monto que recibirá el cliente**:</td>
                                                    <td style={{ padding: '1px', textAlign: 'right' }}>
                                                        ${montoRecibir}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ padding: '0px', textAlign: 'right' }}></td>
                                                    <td style={{ padding: '1px', textAlign: 'right' }}>
                                                        <br />
                                                        <button style={{ backgroundColor: '#d9006c', color: '#fff', padding: '8px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100px' }}>
                                                            Calcular
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <br />
                                    <p style={{ fontSize: '12px', marginTop: '10px' }}>
                                        (*) La tasa de interés varía de acuerdo al monto de capital de ahorros.<br />
                                        (**) El cálculo asume que el monto inicial será constante durante el periodo seleccionado.
                                    </p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cotizador
