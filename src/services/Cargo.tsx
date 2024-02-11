import { ICargo } from "../interfaces/Cargo";

interface ICargoService {
    getCargos: () => Promise<ICargo[]>;
  }
  
  const CargoService: ICargoService = {
    getCargos: async () => {
      try {
        const response = await fetch('http://localhost:5001/cargos/get_cargos');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erro ao buscar os dados do endpoint:', error);
        throw error;
      }
    },
  };
  
  export default CargoService;
  