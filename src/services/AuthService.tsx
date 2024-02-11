// AuthService.ts

import axios from "axios";

interface AuthResponse {
  token: string;
}

class AuthService {
  static saveAuthToken(token: string): void {
    localStorage.setItem('token', token);
  }

  static async login(email: string, senha: string): Promise<AuthResponse> {
    const response = await fetch('http://localhost:5001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha}),
    });

    if (response.ok) {
      const data = await response.json();
      const { token } = data;
      this.saveAuthToken(token);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro desconhecido');
    }
  }

  
  static async saveUsuario(userData: any): Promise<void> {
    try {
      await axios.post('http://localhost:5001/auth/save-usuario', userData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      throw new Error('Erro ao salvar usuário: ' + errorMessage);
    }
  }
}

export default AuthService;
