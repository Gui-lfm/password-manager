import { useState } from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  const [formVisible, setFormVisible] = useState(false);

  const handleClick = () => {
    setFormVisible((visible) => !visible);
  };

  return (
    <>
      <h1>Gerenciador de senhas</h1>
      {
        formVisible
          ? <Form cancelProp={ handleClick } />
          : (
            <button onClick={ handleClick }>
              Cadastrar nova senha
            </button>
          )
      }
    </>
  );
}

export default App;
