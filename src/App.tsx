import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppBar, drawerWidth } from './components/AppBar';
import { Main } from './components/Main';
import colors from './theme/colors';
import Content from './components/Content';
import axios from 'axios';
import { ListItem, ListItemText } from '@mui/material';



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tables, setTables] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios.get('http://localhost:5001/tables')
      .then(response => {
        console.log(response.data.tables); // Verificar o que está sendo retornado
        setTables(response.data.tables); // Utilizando a estrutura correta para definir as tabelas
      })
      .catch(error => {
        // Tratar erros ou exibir uma mensagem de erro, caso necessário
        console.error('Erro ao obter as tabelas:', error);
      });
  }, []);
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, color: colors.secondary, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>

      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: colors.navbg,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          BUILDER
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        <List>
          {tables.map((tableName, index) => (
            <ListItem button key={index}>
              <ListItemText primary={tableName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Content />
        </Box>
      </Main>
    </Box>
  );
}