/* eslint-disable react/jsx-max-depth */
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

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

  const toggleVisibility = () => {
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
    Swal.fire({
      title: 'Serviço cadastrado com sucesso',
      timer: 1500,
      timerProgressBar: true,
    });
    cancelProp();
  }

  const { passwordMinLength,
    passwordMaxLength,
    hasLettersAndNumbers,
    hasSpecialCharacter,
  } = validatePassword();

  const verifyClassName = (verification : boolean) => {
    return verification ? 'text-green-500' : 'text-red-500';
  };

  // #252730

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-2/3 max-w-4xl"
        onSubmit={ handleSubmit }
      >
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="mb-4">
              <label
                htmlFor="serviceName"
                className="block text-white mb-2"
              >
                Nome do Serviço
              </label>
              <input
                id="serviceName"
                name="serviceName"
                value={ formInfo.serviceName }
                required
                type="text"
                onChange={ handleChange }
                className="w-full p-2 rounded-md
                bg-gray-700 text-white border
                border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="login" className="block text-white mb-2">Login</label>
                <input
                  id="login"
                  name="login"
                  value={ formInfo.login }
                  required
                  type="text"
                  onChange={ handleChange }
                  className="w-full p-2 rounded-md
                  bg-gray-700 text-white border
                  border-gray-600 focus:outline-none
                  focus:border-blue-500"
                />
              </div>

              <div className="w-1/2 relative">
                <label
                  htmlFor="password"
                  className="block text-white mb-2"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  value={ formInfo.password }
                  required
                  type={ inputType }
                  onChange={ handleChange }
                  className="w-full p-2 rounded-md
                  bg-gray-700 text-white border
                  border-gray-600 focus:outline-none
                  focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={ toggleVisibility }
                  className="absolute inset-y-0 right-2
                  flex items-center text-gray-400 hover:text-gray-200"
                  data-testid="show-hide-form-password"
                >
                  {inputType === 'password' ? (
                    <EyeIcon className="h-5 w-5 mt-8" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 mt-8" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="url" className="block text-white mb-2">URL</label>
              <input
                id="url"
                name="url"
                value={ formInfo.url }
                type="text"
                onChange={ handleChange }
                className="w-full p-2 rounded-md
                bg-gray-700 text-white border border-gray-600 focus:outline-none
                focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={ !formValid }
                className={ `w-full bg-blue-600 
                  text-white py-2 rounded-md 
                  ${formValid ? 'hover:bg-blue-500' : 'opacity-50 cursor-not-allowed'}` }
              >
                Cadastrar
              </button>
              <button
                type="button"
                onClick={ cancelProp }
                className="w-full bg-gray-600
                text-white py-2 rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>

          <div className="flex items-start justify-center">
            <ul className="bg-gray-800 p-4 rounded-md shadow-md text-white w-full mt-16">
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
          </div>
        </div>
      </form>
    </div>

  );
}
