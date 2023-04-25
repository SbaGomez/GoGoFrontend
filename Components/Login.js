import * as React from 'react-native';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import logoImage from '../assets/GOGO.png';

export default function Login() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation="1" style={{ width: '600px', height: '500px', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>

      <div style={{textAlign: 'center', margin: '20px' }}>
        <img src={logoImage} alt="logo" style={{ width: '100%', maxWidth: '270px', maxHeight: '150px' }} />
      </div>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '10px' }}>
        <TextField id="clave" label="Usuario" placeholder="Usuario" variant="outlined" style={{ width: '60%', marginBottom: '10px' }}/>
        <TextField id="user" label="Contraseña" placeholder="Contraseña" variant="outlined" style={{ width: '60%', marginBottom: '10px' }}/>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '40px' }}>
          <Button variant="contained" sx={{ width: '60%', height: '50px', marginBottom: '15px' }}>Ingresar</Button>
          <Button variant="contained" sx={{ width: '60%', height: '50px' }}>Registrarme</Button>
      </Box>

      </Paper>
    </Box>
  );
}