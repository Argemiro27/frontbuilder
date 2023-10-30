import { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-dracula';
import styled from 'styled-components';
import colors from '../theme/colors';
import { Btn } from './Button';
import axios from 'axios';

const StyledCard = styled(Card)`
  background-color: ${colors.navbg} !important;
`;

function Content() {
  const [sqlQuery, setSqlQuery] = useState('');
  const [resultTables, setResultTables] = useState([]);

  const executeSQL = () => {
    axios.post('http://localhost:5001/query', { query: sqlQuery })
      .then(response => {
        setResultTables(response.data.result);
      })
      .catch(error => {
        console.error('Erro ao executar a consulta SQL:', error);
      });
  };

  return (
    <StyledCard sx={{ minWidth: 275 }}>
      <CardContent>
        <AceEditor
          mode="sql"
          theme="dracula"
          editorProps={{ $blockScrolling: true }}
          onChange={value => setSqlQuery(value)}
        />
        <Btn
          variant="contained"
          disableElevation
          className='mb-3 mt-3'
          endIcon={<SendIcon />}
          onClick={executeSQL}
        >
          Executar SQL
        </Btn>

        <div>
          <h3>Tabelas Resultantes:</h3>
          <ul>
            {resultTables.map((tableName, index) => (
              <li key={index}>{tableName}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </StyledCard>
  );
}

export default Content;
