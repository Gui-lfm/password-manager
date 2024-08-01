import { useState } from 'react';

export default function Form() {
  return (
    <form>
      <label>
        Nome do Serviço
        <input type="text" />
      </label>

      <label>
        Login
        <input type="text" />
      </label>

      <label>
        Senha
        <input type="password" />
      </label>

      <label>
        URL
        <input type="text" />
      </label>

      <button>
        Cadastrar
      </button>
      <button>
        Cancelar
      </button>
    </form>
  );
}
