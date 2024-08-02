import { useState, useEffect } from 'react';

type FormProps = {
  cancelProp: () => void
  submitProp: (formData: FormData) => void
};

type FormData = {
  serviceName: string,
  login: string,
  password: string,
  url: string,
};

export default function Form({ cancelProp, submitProp } : FormProps) {
  const [formValid, setFormValid] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [formInfo, setFormInfo] = useState<FormData>(
    {
      serviceName: '',
      login: '',
      password: '',
      url: '',
    },
  );

  const validatePassword = () => {
    // verifica se a senha possui entre 8 a 16 caracteres
    const passwordMinLength = formInfo.password.length >= 8;
    const passwordMaxLength = formInfo.password.length <= 16;
    // reg exp que verifica se a senha possui letras e números
    const hasLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d)/.test(formInfo.password);
    // reg exp que verifica se a senha possui um caractere especial
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(formInfo.password);
    // retorna true se as três condições acima são verdadeiras ou false se pelo menos uma não for verdadeira
    return {
      passwordMinLength,
      passwordMaxLength,
      hasLettersAndNumbers,
      hasSpecialCharacter,
      valid: passwordMinLength
      && passwordMaxLength
      && hasLettersAndNumbers
      && hasSpecialCharacter,
    };
  };

  const toogleVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const validateForm = (): boolean => {
    return formInfo.serviceName !== ''
    && formInfo.login !== ''
    && validatePassword().valid;
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validateForm()) {
      submitProp(formInfo);
    }
    resetForm();
    cancelProp();
  }

  const { passwordMinLength,
    passwordMaxLength,
    hasLettersAndNumbers,
    hasSpecialCharacter,
  } = validatePassword();

  const verifyClassName = (verification : boolean) => {
    return verification ? 'valid-password-check' : 'invalid-password-check';
  };

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
          type={ inputType }
          onChange={ handleChange }
        />
        <button
          type="button"
          onClick={ toogleVisibility }
          data-testid="show-hide-form-password"
        >
          {inputType === 'password' ? 'mostrar senha' : 'esconder senha'}
        </button>
      </label>

      <ul>
        <li className={ verifyClassName(passwordMinLength) }>
          Possuir 8 ou mais caracteres
        </li>
        <li className={ verifyClassName(passwordMaxLength) }>
          Possuir até 16 caracteres
        </li>
        <li className={ verifyClassName(hasLettersAndNumbers) }>
          Possuir letras e números
        </li>
        <li className={ verifyClassName(hasSpecialCharacter) }>
          Possuir algum caractere especial
        </li>
      </ul>

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
