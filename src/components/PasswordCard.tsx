import React from 'react';

type FormData = {
  serviceName: string,
  login: string,
  password: string,
  url: string,
};

export default function PasswordCard({ serviceName, login, password, url }: FormData) {
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
        <p>{password}</p>
      </label>
    </div>
  );
}
