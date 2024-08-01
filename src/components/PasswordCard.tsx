import React from 'react';

type CardData = {
  serviceName: string,
  login: string,
  password: string,
  url: string,
  onRemove: () => void,
  showPassword: boolean
};

export default function PasswordCard(
  { serviceName, login, password, url, onRemove, showPassword }: CardData,
) {
  return (
    <div>
      <a href={ url }>
        <h3>
          {serviceName}
        </h3>
      </a>
      <label>
        Login
        <p>{login}</p>
      </label>
      <label>
        senha
        <p>{showPassword ? password : '************'}</p>
      </label>
      <button
        data-testid="remove-btn"
        onClick={ onRemove }
      >
        Apagar informações
      </button>
    </div>
  );
}
