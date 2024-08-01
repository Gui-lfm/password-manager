import { useState, useEffect } from 'react';

type FormProps = {
  cancelProp: () => void
};

export default function Form({ cancelProp } : FormProps) {
  const [formValid, setFormValid] = useState(false);

  const [formInfo, setFormInfo] = useState(
    {
      serviceName: '',
      login: '',
      password: '',
      url: '',
    },
  );

  const validatePassword = () => {
    // verifica se a senha possui entre 8 a 16 caracteres
    const passwordLength = formInfo.password.length >= 8
    && formInfo.password.length <= 16;
    // reg exp que verifica se a senha possui letras e números
    const hasLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d)/.test(formInfo.password);
    // reg exp que verifica se a senha possui um caractere especial
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(formInfo.password);
    // retorna true se as três condições acima são verdadeiras ou false se pelo menos uma não for verdadeira
    return passwordLength && hasLettersAndNumbers && hasSpecialCharacter;
  };

  const validateForm = ():boolean => {
    return formInfo.serviceName !== '' && formInfo.login !== '' && validatePassword();
  };

  useEffect(() => {
    setFormValid(validateForm());
  }, [formInfo]);

  function resetForm() {
    setFormInfo({
      serviceName: '',
      login: '',
      password: '',
      url: '',
    });
    setFormValid(false);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetForm();
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        Nome do Serviço
        <input
          name="serviceName"
          value={ formInfo.serviceName }
          required
          type="text"
          onChange={ handleChange }
        />
      </label>

      <label>
        Login
        <input
          name="login"
          value={ formInfo.login }
          required
          type="text"
          onChange={ handleChange }
        />
      </label>

      <label>
        Senha
        <input
          name="password"
          value={ formInfo.password }
          required
          type="password"
          onChange={ handleChange }
        />
      </label>

      <label>
        URL
        <input
          name="url"
          value={ formInfo.url }
          type="text"
          onChange={ handleChange }
        />
      </label>

      <button type="submit" disabled={ !formValid }>
        Cadastrar
      </button>
      <button onClick={ cancelProp }>
        Cancelar
      </button>
    </form>
  );
}
