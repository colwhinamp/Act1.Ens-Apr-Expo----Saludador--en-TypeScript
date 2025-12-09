import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  SafeAreaView, 
  Keyboard, 
  TouchableWithoutFeedback,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function App() {
  // --- ESTADOS ---
  const [name, setName] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  // Constante para longitud maxima
  const MAX_LENGTH = 20;

  // --- LoGICA ---
  
  // Funcion para manejar el cambio de texto
  const handleInputChange = (text: string) => {
    setName(text);
    // Si el usuario empieza a escribir limpiamos el saludo 
    if (greeting) setGreeting('');
    if (isError) setIsError(false);
  };

  // Funcion al presionar el boton
  const handlePress = () => {
    // Validación: Si está vacio o son solo espacios
    if (name.trim().length === 0) {
      setIsError(true);
      setGreeting('');
      Keyboard.dismiss();
      return;
    }

    // Exito
    setIsError(false);
    setGreeting(`👋 Hola, ${name}!`);
    Keyboard.dismiss(); // Ocultar teclado
  };

  // Variable derivada para saber si el botón debe verse "desactivado" visualmente
  const isButtonDisabled = name.trim().length === 0;

  return (
    // TouchableWithoutFeedback permite cerrar el teclado al tocar fuera del input
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          
          {/* Titulo */}
          <Text style={styles.title}>Saludador Expo</Text>
          <Text style={styles.subtitle}>Tu primer formulario en TypeScript</Text>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ingresa tu nombre:</Text>
            
            <TextInput
              style={[
                styles.input, 
                isError && styles.inputError // Estilo condicional si hay error
              ]}
              placeholder="Ej. Ana Perez"
              placeholderTextColor="#999"
              value={name}
              onChangeText={handleInputChange}
              maxLength={MAX_LENGTH} // Punto extra 3: Límite de caracteres
            />

            {/* Punto extra 3: Contador de caracteres */}
            <Text style={styles.counterText}>
              {name.length} / {MAX_LENGTH}
            </Text>
          </View>

          {/* Boton */}
          {/* Punto extra 1: Deshabilitar boton */}
          <Pressable 
            style={[styles.button, isButtonDisabled && styles.buttonDisabled]} 
            onPress={handlePress}
            disabled={isButtonDisabled}
          >
            <Ionicons name="hand-right-outline" size={24} color="white" style={{marginRight: 8}} />
            <Text style={styles.buttonText}>
              {isButtonDisabled ? 'Escribe un nombre' : 'Saludar'}
            </Text>
          </Pressable>

          {/* Mensaje de Resultado o Error */}
          <View style={styles.resultContainer}>
            {isError ? (
              <Text style={styles.errorText}>⚠️ Por favor, introduce un nombre válido.</Text>
            ) : null}

            {greeting ? (
              <Text style={styles.greetingText}>{greeting}</Text>
            ) : null}
          </View>

          {/* StatusBar para integrar con el sistema */}
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// ESTILOS 
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Ajuste para Android StatusBar
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    // Sombras sutiles (iOS y Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#ff4d4d',
    backgroundColor: '#fff0f0',
  },
  counterText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    marginRight: 4,
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4a90e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#a0c4e8', 
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
    height: 50, // Reservamos espacio para evitar saltos bruscos
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    marginTop: 10,
    fontWeight: '500',
  },
});