import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import PasswordCard from './components/PasswordCard';

type FormData = {
  serviceName: string;
  login: string;
  password: string;
  url: string;
};

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState<FormData[]>([]);

  const handleClick = () => {
    setFormVisible((visible) => !visible);
  };

  const handleFormData = (newFormData: FormData) => {
    setFormData([...formData, newFormData]);
  };

  return (
    <>
      <h1>Gerenciador de senhas</h1>
      {
        formVisible
          ? <Form cancelProp={ handleClick } submitProp={ handleFormData } />
          : (
            <button onClick={ handleClick }>
              Cadastrar nova senha
            </button>
          )
      }

      {
        formData.length === 0
          ? <p>Nenhuma senha cadastrada</p>
          : (formData.map((form, index) => (
            <PasswordCard
              key={ index }
              serviceName={ form.serviceName }
              login={ form.login }
              password={ form.password }
              url={ form.url }
            />
          )))
      }
    </>
  );
}

export default App;
