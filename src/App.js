//Bloco de importações do código onde o codigo da inicio
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

//Criado duas variáveis para declarar e indicar
function App() {

  const [input, setInput] = useState('');
  const [cep, setCEP] = useState({});
//uma função assicrona 
  async function handleSearch(){
//verifica se o usuario preencheu o campo do cep se não preencheu ele avisa o que está em ""
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }
// try executa o que quer que aconteça para dar certo, se der errado ele se dirige para o catch
    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CEP!")
      setInput("")
    }
  } 
  
//retorna o comando, input: mostra a informação que deve inserir ; onclick possibilita a chamda de uma equisição
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)} 
      />
        
       <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
        </button>          
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

//exportando o app, tonando ela publica, para ser utilizada 
export default App;
