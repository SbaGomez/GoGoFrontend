import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        textAlign: 'center',
    },

    logo: {
        width: '100%',
        height: 150,
        maxWidth: 270,
        maxHeight: 150,
        marginBottom: 30
    },

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
});

export default styles;