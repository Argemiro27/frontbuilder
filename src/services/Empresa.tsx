import { IEmpresa } from "../interfaces/Empresa";

interface IEmpresaService {
    getEmpresas: () => Promise<IEmpresa[]>;
  }
  
  const EmpresaService: IEmpresaService = {
    getEmpresas: async () => {
      try {
        const response = await fetch('http://localhost:5001/empresas/get_empresas');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erro ao buscar os dados do endpoint:', error);
        throw error;
      }
    },
  };
  
  export default EmpresaService;
  