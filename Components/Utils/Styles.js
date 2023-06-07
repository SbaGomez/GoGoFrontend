import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // LOGO
    logo: {
        width: '100%',
        height: 150,
        maxWidth: 270,
        maxHeight: 150,
        marginBottom: 30
    },

    //OTROS
    divider: {
        width: '70%',
        marginBottom: 30,
        marginTop: 25,
        display: 'flex',
        justifyContent: 'center'
    },
    titulo: {
        width: '60%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 35,
        marginBottom: 20,
        maxWidth: "58%"
    },

    // MODAL ERROR
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 35,
        marginTop: 140,
        shadowColor: '#000',
        width: '80%',
        textAlign: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 4,
        width: 560,
        height: 'auto',
        left: '50%',
        marginLeft: -280,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        textAlign: 'center',
    },
    textModalError: {
        fontFamily: 'BebasNeue',
        fontSize: 18,
        color: 'black',
        marginTop: 4,
        marginLeft: 10
    },
    viewModalText: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        marginBottom: 20,
        justifyContent: 'center'
    },
    viewModalButton: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },

    // PERFIL
    FotoPerfil: {
        width: '50%',
        height: 150,
        maxWidth: 150,
        maxHeight: 200,
        marginBottom: 30,
        marginTop: 50
    },

    surfacePerfilInfoSinAuto: {
        alignItems: "center",
        marginTop: 20,
        width: 600,
        height: 600
    },

    surfacePerfilInfoConAuto: {
        alignItems: "center",
        marginTop: 20,
        width: 600,
        height: 660
    },

    textPerfil: {
        width: '60%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 35,
        maxWidth: "58%",
        color: "black"
    },

    textDniInfoPerfil: {
        width: '60%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        maxWidth: "58%"
    },

    textDniInfo: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 20,
        maxWidth: "58%",
        color: '#7c7a7a'
    },

    textInfoPerfil: {
        textAlign: 'left',
        fontSize: 20,
        marginBottom: 5
    },

    divisor: {
        width: '60%',
        borderBottomWidth: 2,
        borderBottomColor: '#680aef',
        marginVertical: 10,
        marginBottom: 20
    },

    buttonCambiarFoto: {
        backgroundColor: '#24CAE8',
        width: '70%',
        textAlign: 'center',
        maxWidth: "50%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 15
    },

    buttonRegistrarAuto: {
        width: '70%',
        textAlign: 'center',
        maxWidth: "50%",
        minWidth: "30%",
        height: 50,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center'
    },

    surfaceRegAuto: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 65,
        width: 600,
        height: 500
    },

    surfaceAuto: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 65,
        paddingBottom: 20,
        width: 600,
        height: 270
    },

    textTituloAuto: {
        width: '80%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        marginBottom: 10,
        fontSize: 25
    },

    textTituloRegAuto: {
        width: '80%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 30,
        marginBottom: 20
    },

    buttonRegAuto: {
        width: '80%',
        textAlign: 'center',
        maxWidth: "40%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        marginTop: 20,
        justifyContent: 'center'
    },

    buttonDeleteAuto: {
        width: '60%',
        textAlign: 'center',
        maxWidth: "40%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        marginTop: 10,
        justifyContent: 'center'
    },

    // LOGIN
    container: {
        width: '100%',
        alignItems: 'center',
        alignContent: 'center'
    },
    textInputContainer: {
        width: '88%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    textInputPasswordLogin: {
        width: '50%',
        marginBottom: 15,
        height: 40,
        color: '#000',
        justifyContent: 'center'
    },
    iconEyeOff: {
        marginLeft: 10,
        height: 40,
        lineHeight: 30,
        fontSize: 24,
        color: '#FF0000'
    },
    iconEyeOn: {
        marginLeft: 10,
        height: 40,
        lineHeight: 30,
        fontSize: 24,
        color: '#24CAE8'
    },
    textInputLogin: {
        width: '60%',
        maxWidth: "50%",
        minWidth: "30%",
        height: 40,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center',
    },
    buttonLogin: {
        backgroundColor: '#24CAE8',
        width: '70%',
        textAlign: 'center',
        maxWidth: "50%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonLoginRegistrarme: {
        width: '70%',
        textAlign: 'center',
        maxWidth: "50%",
        minWidth: "30%",
        height: 50,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    viewOlvideClave: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '50%'
    },
    textOlvideClave: {
        fontFamily: 'BebasNeue',
        fontSize: 18,
        marginTop: 20,
        flex: 1,
        textAlign: 'right',
        color: '#696969'
    },

    // RECUPERO DE CLAVE
    textTituloRecupero: {
        width: '60%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 35,
        marginBottom: 20,
        maxWidth: "58%"
    },
    textInputRecupero: {
        width: '70%',
        maxWidth: "50%",
        minWidth: "40%",
        height: 50,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonRecupero: {
        backgroundColor: '#24CAE8',
        width: '80%',
        textAlign: 'center',
        maxWidth: "50%",
        minWidth: "40%",
        height: 50,
        display: 'flex',
        marginTop: 40,
        justifyContent: 'center'
    },
    buttonRecuperoReenviar: {
        width: '80%',
        textAlign: 'center',
        maxWidth: "40%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        marginTop: 20,
        justifyContent: 'center'
    },
    viewIngreseCodigo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        flexDirection: 'column',
        width: '100%'
    },
    textExito: {
        width: '80%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 30,
        color: 'green'
    },
    buttonVolverLogin: {
        width: '80%',
        textAlign: 'center',
        maxWidth: "40%",
        minWidth: "30%",
        height: 50, display: 'flex',
        marginTop: 40,
        justifyContent: 'center'
    },

    // REGISTRO
    textTituloRegistro: {
        width: '80%',
        textAlign: 'center',
        fontFamily: 'BebasNeue',
        fontSize: 30,
        marginTop: 20
    },
    buttonExito: {
        width: '80%',
        textAlign: 'center',
        maxWidth: "40%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        marginTop: 40,
        justifyContent: 'center'
    },
    textInputRegistro: {
        width: '60%',
        maxWidth: "50%",
        minWidth: "30%",
        height: 50,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonRegistrarme: {
        backgroundColor: '#24CAE8',
        width: '70%',
        textAlign: 'center',
        maxWidth: "50%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonVolverLogin: {
        width: '70%',
        textAlign: 'center',
        maxWidth: "50%",
        minWidth: "30%",
        height: 50,
        marginTop: 15,
        marginBottom: 25,
        display: 'flex',
        justifyContent: 'center'
    },
    viewRegistro: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        flexDirection: 'column',
        width: '100%'
    },
    viewGeneroRegistro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    viewSwitchMale: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 80
    },
    viewSwitchFem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewRegistroTotal: {
        justifyContent: "center",
        alignItems: "center",
        width: 600,
        height: 700
    },
    viewRegistroVerificar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        flexDirection: 'column',
        width: '100%'
    },
    textInputRegistroCodigo: {
        width: '80%',
        maxWidth: "60%",
        minWidth: "30%",
        height: 50,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    buttonRegistroCodigo: {
        backgroundColor: '#24CAE8',
        width: '80%',
        textAlign: 'center',
        maxWidth: "40%",
        minWidth: "30%",
        height: 50,
        display: 'flex',
        marginTop: 40,
        justifyContent: 'center'
    },

    //Surface contenedor
    surfaceGeneral: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: 600,
        height: 600
    },

    //Surface Home
    surfaceTitle: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: 600,
        height: 150
    },

    surfaceViajes: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: 600,
        height: 300
    }

});

export default styles;