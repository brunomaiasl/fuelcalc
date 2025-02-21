import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

interface InfoProps{
  title: string
  gasolina: string | number
  alcool: string | number
  calculo: string
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault()

    let calculo = (alcoolInput / gasolinaInput)
    let calculoFormatado = (calculo * 100).toFixed(1) + "%"


    if (calculo <= 0.7){
      setInfo({
        title:"Compensa usar o Álcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
        calculo: `Razão: ${calculoFormatado} (Álcool/Gasolina)`
      })
    }else{
      setInfo({
        title:"Compensa usar a Gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
        calculo: `Razão: ${calculoFormatado} (Álcool/Gasolina)`
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
      {
        style: "currency",
        currency: "BRL"
      })

      return valorFormatado
  }

  return (
      <div>
        <main className='container'>
          <img
            className='logo'
            src={logoImg}
            alt='Logo da bomba de combustivel'
          />
          <h1 className='title'>Qual a melhor opção?</h1>

          <form className='form' onSubmit={calcular}>
            <label>Álcool (preço por litro):</label>
            <input
              className='input'
              type='number'
              placeholder='3,89'
              min="1"
              step="0.01"
              required
              value={alcoolInput}
              onChange={(e) => setAlcoolInput(Number(e.target.value))}
            />

            <label>Gasolina (preço por litro):</label>
            <input
              className='input'
              type='number'
              placeholder='5,00'
              min="1"
              step="0.01"
              required
              value={gasolinaInput}
              onChange={(e) => setGasolinaInput(Number(e.target.value))}
            />

            <input 
            type='submit' 
            value="Calcular" 
            className='button'
            />
          </form>

          {info && Object.keys(info).length > 0 && (
            <section className='result'>
              <h2 className='result-title'>
                {info.title}
              </h2>
    
              <span>Álcool: {info.alcool}</span>
              <span>Gasolina: {info.gasolina}</span>
              <span>{info.calculo}</span>
            </section>
          )}


        </main>
      </div>
  )
}

export default App
