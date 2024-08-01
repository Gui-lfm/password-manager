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
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState<FormData[]>([]);

  const handleClick = () => {
    setFormVisible((visible) => !visible);
  };

  const handleCheckBox = () => {
    setShowPassword((show) => !show);
  };

  const handleFormData = (newFormData: FormData) => {
    setFormData([...formData, newFormData]);
  };

  const handleRemoveFormData = (index: number) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1>Gerenciador de senhas</h1>
      <label>
        Esconder senhas
        <input type="checkbox" onChange={ handleCheckBox } />
      </label>
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
              onRemove={ () => handleRemoveFormData(index) }
              showPassword={ showPassword }
            />
          )))
      }
    </>
  );
}

export default App;
