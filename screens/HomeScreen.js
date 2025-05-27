import React, { useState } from 'react'; // Importa o React e o useState para gerenciar estados
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native'; // Importa os componentes do React Native
import { Picker } from '@react-native-picker/picker'; // Importa o Picker para seleção de sexo

// Componente principal do app
export default function HomeScreens() {
  // Definindo os estados das variáveis do formulário
  const [gender, setGender] = useState('male'); // Sexo: 'male' ou 'female'
  const [sport, setSport] = useState('sedentario'); // Nível de atividade física
  const [weight, setWeight] = useState('');     // Peso em kg
  const [height, setHeight] = useState('');     // Altura em cm
  const [age, setAge] = useState('');           // Idade em anos
  const [result, setResult] = useState(null);   // Resultado da TMB calculada

  // Função que realiza o cálculo da TMB
  const calculateTMB = () => {
    // Converte as entradas de string para número
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    // Verifica se todos os campos foram preenchidos corretamente
    if (!w || !h || !a) {
      setResult('Preencha todos os campos corretamente!');
      return;
    }

    let tmb = 0;

    // Fórmula de Harris-Benedict para homens e mulheres com base na atividade física
    if (gender === 'male') {
      if(sport === 'sedentario') {
      tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a))* 1.2; 
      }else if(sport === 'levemente ativo') {
        tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a))* 1.375;

      }
      else if(sport === 'moderadamente ativo') {
        tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a))* 1.55;
      }
      else if(sport === 'altamente ativo') {
        tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a))* 1.725;
      }
      else if(sport === 'extremamente ativo') {
        tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a))* 1.9;
      }
    } else {
      if(sport === 'sedentario') {
        tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a))* 1.2;
      }
      else if(sport === 'levemente ativo') {
        tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a))* 1.375;
      } else if(sport === 'moderadamente ativo') {
        tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a))* 1.55;
      }
      else if(sport === 'altamente ativo') {
        tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a))* 1.725;
      }
      else if(sport === 'extremamente ativo') {
        tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a))* 1.9;
      }
      // tmb = 655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a);
      // tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a))* 1.2;
    }

    // Define o resultado com 2 casas decimais
    setResult(`Sua TMB é aproximadamente ${tmb.toFixed(2)} calorias por dia.`);
  };

  // Interface do aplicativo
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewtitle}>
      <Text style={styles.title}>Calculadora de Metabolismo Basal</Text>
      </View>
      <View style={styles.form}>
      {/* Campo de seleção de sexo */}
      <Text style={styles.label}>Sexo:</Text>
      <Picker selectedValue={gender} onValueChange={setGender} style={styles.input}>
        <Picker.Item label="Masculino" value="male" />
        <Picker.Item label="Feminino" value="female" />
      </Picker>
      {/* Campo de seleção de sexo */}
      <Text style={styles.label}>Nível de atividade física:</Text>
      <Picker selectedValue={sport} onValueChange={setSport} style={styles.input}>
      <Picker.Item label="Sedentário" value="sedentario" />
      <Picker.Item label="Levemente ativo" value="levemente ativo"/>
      <Picker.Item label="Moderadamente ativo" value="moderadamente ativo"/>
      <Picker.Item label="Altamente ativo" value="altamente ativo"/>
      <Picker.Item label="Extremamente ativo" value="extremamente ativo"/>
      </Picker>

      {/* Campo de peso */}
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric" // Abre o teclado numérico
        value={weight}
        onChangeText={(text)=>setWeight(text.replace(',','.'))} // Substitui vírgula por ponto
      />

      {/* Campo de altura */}
      <Text style={styles.label}>Altura (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={(text) =>setHeight(text.replace(',','.')) } // Substitui vírgula por ponto
        //(text) => setHeight(...):  é uma função anônima que recebe o novo texto digitado como argumento (chamado aqui de text) e executa setHeight(...), que provavelmente é um setter vindo do useState
      />

      {/* Campo de idade */}
      <Text style={styles.label}>Idade (anos):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      </View>
      {/* Botão de calcular */}
      <Button title="Calcular" onPress={calculateTMB} />

      {/* Exibição do resultado */}
      {result && <Text style={styles.result}>{result}</Text>}
    </ScrollView>
  );
}

// Estilos do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#d3d3d3',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'white',
    //fontFamily: 'Arial',
    //textTransform: 'uppercase',
    fontStyle: 'italic',
    //textDecorationLine: 'underline',
  },
  label: {
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  result: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2e86de',
  },
  viewtitle: {
    marginBottom: 20,
    backgroundColor: 'red',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40, 
    width: '100%',
    paddingTop: 25,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    //flex: 1,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  //view do formulário 
  form: {
    backgroundColor: '#e9e9e9',
    //borderTopRightRadius: 40,
    //borderTopLeftRadius: 40, 
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  //view do botão
  button: {
    backgroundColor: '#2e86de',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  //view do resultado 
  result: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2e86de',
  },
});
