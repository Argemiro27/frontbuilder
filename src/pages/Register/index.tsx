import React, { useEffect, useState } from 'react';
import { TextField, Box, Divider, InputAdornment, FormControl, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material';
import BoxAuthImg from '../../components/BoxAuthImg';
import { BtnAuth, BtnAuthSec } from '../../components/BtnAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock'; // Adicionado ícone de cadeado
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import WcIcon from '@mui/icons-material/Wc';
import colors from '../../theme/colors';
import axios from 'axios';
import CargoService from '../../services/Cargo';
import EmpresaService from '../../services/Empresa';
import AuthService from '../../services/AuthService';
import { ICargo } from '../../interfaces/Cargo';
import { IEmpresa } from '../../interfaces/Empresa';
import { toast } from 'react-toastify';

function Register() {
    const [email, setEmail] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [cargos, setCargos] = useState<ICargo[]>([]);
    const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
    const [cargo, setCargo] = useState<ICargo | undefined>(undefined); // Alterado para undefined
    const [empresa, setEmpresa] = useState<IEmpresa | undefined>(undefined); // Alterado para undefined

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cargosData = await CargoService.getCargos();
                setCargos(cargosData);

                const empresasData = await EmpresaService.getEmpresas();
                setEmpresas(empresasData);
            } catch (error) {
                console.error('Erro ao buscar os dados do endpoint:', error);
            }
        };

        fetchData();
    }, []);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            email,
            nome,
            senha,
            telefone,
            endereco,
            id_cargo: cargo,
            id_empresa: empresa?.id_empresa,
        };


        console.log(userData);

        try {
            // Faz a requisição POST para o endpoint
            await AuthService.saveUsuario(userData);

            // Se a requisição for bem-sucedida
            toast.success('Usuário cadastrado com sucesso!');

            // Aguardar 4 segundos antes do redirecionamento
            setTimeout(() => {
                // Redirecionar para a página de dashboard
                window.location.href = '/login';
            }, 1000);
        } catch (error) {
            toast.error('Erro ao tentar cadastrar usuário!');
        }
    };

    return (
        <div className='d-flex'>
            <BoxAuthImg className="vh-100 w-50 justify-content-center align-items-center" />
            <Box className="vh-100 w-50 d-flex justify-content-center align-items-center overflow-auto">
                <form
                    onSubmit={handleRegister}
                    className='w-50 text-center m-5'
                >
                    <h2>
                        É grátis...
                        <br />
                        <span style={{ color: colors.secondary }}> Registre-se!</span>
                    </h2>
                    <AccountCircleIcon sx={{ fontSize: '200px' }} />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ContactMailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Nome de Usuário:"
                        variant="outlined"
                        margin="normal"
                        name="nome"
                        fullWidth
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Senha"
                        type="senha"
                        variant="outlined"
                        margin="normal"
                        name="senha"
                        fullWidth
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Telefone"
                        variant="outlined"
                        margin="normal"
                        name="telefone"
                        type='number'
                        fullWidth
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Endereço"
                        variant="outlined"
                        margin="normal"
                        name="endereco"
                        fullWidth
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="cargo-label">Cargo:</InputLabel>
                        <Select
                            labelId="cargo-label"
                            id="cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value as ICargo)}
                            label="Cargo"
                            startAdornment={
                                <InputAdornment position="start">
                                    <WcIcon />
                                </InputAdornment>
                            }
                        >
                            {cargos.map((cargo) => (
                                <MenuItem key={cargo.id_cargo} value={cargo.id_cargo}>{cargo.nom_cargo}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                    <Autocomplete
                        disablePortal
                        id="empresa"
                        options={empresas}
                        value={empresa}
                        onChange={(_event, newEmpresa) => {
                            const updatedEmpresa = newEmpresa ?? undefined;
                            setEmpresa(updatedEmpresa);
                        }}
                        getOptionLabel={(option) => option.nome_empresa}

                        renderInput={(params) => <TextField {...params} label="Empresa" />}
                    />

                    <BtnAuth
                        type="submit"
                        variant="contained"
                        className='mt-2 mb-2'
                        endIcon={<PersonAddAltIcon />}
                    >
                        Cadastrar
                    </BtnAuth>
                    <Box mt={2} mb={1}>
                        <Divider className='mt-4 mb-4' />
                        <p>Já possui uma conta?</p>
                        <Link to={'/login'}>
                            <BtnAuthSec startIcon={<LoginIcon />}>Faça login!</BtnAuthSec>
                        </Link>
                    </Box>
                </form>
            </Box>
        </div>
    );
}
export default Register;
