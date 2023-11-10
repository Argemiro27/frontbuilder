import { useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as C from './components';
import logo from './assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const homolog = useRef<HTMLAnchorElement | null>(null);
  const production = useRef<HTMLAnchorElement | null>(null);
  //const Production = document.getElementById('production');
  useEffect(() => {

    const checkHomolog = async () => {
      try {
        const response = await axios.head('http://localhost:4000/teste-wms');
        if (response.status === 200) {
          if (homolog.current) {

            homolog.current.href = 'http://testewms.cocatrel.com.br/login';
          }
        }
      } catch (error) {
        try {
          const secondResponse = await axios.head('http://localhost:4000/teste-wms-ip');
          if (secondResponse.status === 200) {
            if (homolog.current) {
              homolog.current.href = ('http://161.35.233.83/login');
            }
          }
         
        } catch (error) {
          toast.error("Endereços de homologação inativos!");
        }
      }
    };
    checkHomolog();

    const checkProduction = async () => {

      try {
        const response = await axios.head('http://localhost:4000/wms-prod');
        if (response.status === 200) {
          if (production.current) {
            production.current.href = 'http://wms.cocatrel.com.br/login';
          }
        }
      } catch (error) {
        const secondResponse = await axios.head('http://localhost:4000/wms-prod-ip');

        
        if (secondResponse.status != 200){
          return ("Deu ruim!");
        }
        if (secondResponse.status === 200) {
          if (production.current) {
            production.current.href = ('http://15.229.114.188/login');
          }

        }
        
      }

    };
    checkProduction();
  }, []);

  return (
    <>
      <div>
        <ToastContainer/>
        <C.StyledCard>
          <img src={logo} alt="" />
          <C.Typography variant="h3">Ambiente</C.Typography>
          <C.StyledBtn id="homolog" ref={homolog} className='m-2'>HOMOLOGAÇÃO</C.StyledBtn>
          <C.StyledBtn id="production" ref={production} className='m-2'>PRODUÇÃO</C.StyledBtn>
        </C.StyledCard>
      </div>
    </>
  );
}

export default App;
