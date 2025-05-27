import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Vibration 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

// COMPONENTE PARA MOSTRAR RESULTADO IMC
function ResultImc({ messageResultImc, resultImc }) {
  return (
    <View style={styles.result}>
      <Text style={styles.resultImcText}>{messageResultImc}</Text>
      {resultImc !== '' && <Text style={styles.infoImc}>{resultImc}</Text>}
    </View>
  );
}

// TELA HOME (IMC)
function HomeScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [messageImc, setMessageImc] = useState("Preencha o peso e a altura");
  const [imcClassification, setImcClassification] = useState('');
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessagealt] = useState(null); //Exibirar o erro no campo altura
  const [errorMessagePeso, setErrorMessagepeso] = useState(null); //Exibirar o erro no campo altura


  function verificaIMC(){ //essa função verifica se todos os botões foram preenchidos
    if(height === ''){ //Verificando se a altura existe
      Vibration.vibrate(); //vai fazer o aparelho vibrar
      setErrorMessagealt("Preencha o campo altura ⚠️");
    }else{
      setErrorMessagealt(null); //Se a altura existir
    }
    if(weight === ''){ //Se o pesso for igual a ""
      Vibration.vibrate(); //vai fazer o aparelho vibrar
      setErrorMessagepeso("Preencha o campo peso ⚠️");
    }else{
      setErrorMessagepeso(null); //Caso o peso seja digitado
    }
  }
  
  function getImcClassification(imc) {
    const value = parseFloat(imc);
    if (value < 18.5) return 'Abaixo do peso';
    if (value < 25) return 'Peso normal';
    if (value < 30) return 'Sobrepeso';
    if (value < 35) return 'Obesidade grau I';
    if (value < 40) return 'Obesidade grau II';
    return 'Obesidade grau III';
  }

  function imcCalculator() {
    const heightFloat = parseFloat(height);
    const weightFloat = parseFloat(weight);

    if (heightFloat && weightFloat) {
      const result = (weightFloat / (heightFloat * heightFloat)).toFixed(2);
      const classification = getImcClassification(result);

      setImcClassification(`${result} - ${classification}`);
      setMessageImc("Seu IMC é:");
      setTextButton("Calcular novamente");

    } else {
      setImcClassification('');
      setMessageImc("Preencha o peso e a altura corretamente");
      setTextButton("Calcular");
      setErrorMessagealt(null);
      setErrorMessagepeso(null);
      
    }
  }
   
  function validationImc() {
    if (weight && height) {
      imcCalculator();
      setErrorMessagealt(null);
      setErrorMessagepeso(null);
      
    } else {
      setImcClassification('');
      setMessageImc("Preencha o peso e altura");
      setTextButton("Calcular");
      
    }
    verificaIMC();
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>IMC - Índice de massa corporal</Text>
          </View>

          <View style={styles.formContext}>
            <View style={styles.form}>
              <Text style={styles.formLabel}>Altura (m):</Text>
              <Text style={styles.errorMessage}>{errorMessage} </Text>
              <TextInput
                style={styles.formInput}
                placeholder="Ex: 1.75"
                keyboardType="numeric"
                value={height}
                onChangeText={(text) => setHeight(text.replace(',', '.'))}
              />

              <Text style={styles.formLabel}>Peso (Kg):</Text>
              <Text style={styles.errorMessage}>{errorMessagePeso} </Text>
              <TextInput
                style={styles.formInput}
                placeholder="Ex: 80.5"
                keyboardType="numeric"
                value={weight}
                onChangeText={(text) => setWeight(text.replace(',', '.'))}
              />

              <TouchableOpacity onPress={validationImc} style={styles.formButton}>
                <Text style={styles.formTextButton}>{textButton}</Text>
              </TouchableOpacity>
            </View>

            <ResultImc messageResultImc={messageImc} resultImc={imcClassification} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// TELA SETTINGS (TMB)
function SettingsScreen() {
  const [gender, setGender] = useState('male');
  const [sport, setSport] = useState('sedentario');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState(null);
  const [errorMessagePeso, setErrorMessagepeso] = useState(null); // Exibirar o erro no campo peso
  const [errorMessageIdade, setErrorMessageIdade] = useState(null); // Exibirar o erro no campo idade
  const [errorMessageAltura, setErrorMessageAltura] = useState(null); // Exibirar o erro no campo altura
  

  const verificaTMB = () => { //essa função verifica se todos os botões foram preenchidos 
    if (weight === '') { //Verificando se o peso existe
      Vibration.vibrate(); //vai fazer o aparelho vibrar
      setErrorMessagepeso("Preencha o campo peso ⚠️");
    } else {
      setErrorMessagepeso(null); //Se o peso existir
    }
    if (age === '') { //Se a idade for igual a ""
      Vibration.vibrate(); //vai fazer o aparelho vibrar
      setErrorMessageIdade("Preencha o campo idade ⚠️");
    } else {
      setErrorMessageIdade(null); //Caso a idade seja digitada
    }
    if (height === '') { //Se a altura for igual a ""
      Vibration.vibrate(); //vai fazer o aparelho vibrar
      setErrorMessageAltura("Preencha o campo altura ⚠️");
    } else {
      setErrorMessageAltura(null); //Caso a altura seja digitada
    }
  }
  const calculateTMB = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!w || !h || !a) {
      setResult('Preencha todos os campos corretamente!');
      verificaTMB();
      return;
    }

    let tmb = 0;
    if (gender === 'male') {
      if (sport === 'sedentario') tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a)) * 1.2;
      else if (sport === 'levemente ativo') tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a)) * 1.375;
      else if (sport === 'moderadamente ativo') tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a)) * 1.55;
      else if (sport === 'altamente ativo') tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a)) * 1.725;
      else if (sport === 'extremamente ativo') tmb = (66.5 + (13.8 * w) + (5 * h) - (6.8 * a)) * 1.9;
    } else {
      if (sport === 'sedentario') tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a)) * 1.2;
      else if (sport === 'levemente ativo') tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a)) * 1.375;
      else if (sport === 'moderadamente ativo') tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a)) * 1.55;
      else if (sport === 'altamente ativo') tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a)) * 1.725;
      else if (sport === 'extremamente ativo') tmb = (655.1 + (9.6 * w) + (1.8 * h) - (4.7 * a)) * 1.9;
    }
    setErrorMessagepeso(null);
      setErrorMessageIdade(null);
      setErrorMessageAltura(null);
    setResult(`Sua TMB é aproximadamente ${tmb.toFixed(2)} calorias por dia.`);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>TMB - Taxa Metabólica Basal</Text>
          </View>

          <View style={styles.formContext}>
            <View style={styles.form}>
              <Text style={styles.formLabel}>Sexo:</Text>
              <Picker selectedValue={gender} onValueChange={setGender} style={styles.input}>
                <Picker.Item label="Masculino" value="male" />
                <Picker.Item label="Feminino" value="female" />
              </Picker>

              <Text style={styles.formLabel}>Nível de atividade física:</Text>
              <Picker selectedValue={sport} onValueChange={setSport} style={styles.input}>
                <Picker.Item label="Sedentário" value="sedentario" />
                <Picker.Item label="Levemente ativo" value="levemente ativo" />
                <Picker.Item label="Moderadamente ativo" value="moderadamente ativo" />
                <Picker.Item label="Altamente ativo" value="altamente ativo" />
                <Picker.Item label="Extremamente ativo" value="extremamente ativo" />
              </Picker>

              <Text style={styles.formLabel}>Peso (kg):</Text>
              <Text style={styles.errorMessage}>{errorMessagePeso} </Text>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                value={weight}
                onChangeText={(text) => setWeight(text.replace(',', '.'))}
              />

              <Text style={styles.formLabel}>Altura (cm):</Text>
              <Text style={styles.errorMessage}>{errorMessageAltura} </Text>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                value={height}
                onChangeText={(text) => setHeight(text.replace(',', '.'))}
              />

              <Text style={styles.formLabel}>Idade (anos):</Text>
              <Text style={styles.errorMessage}>{errorMessageIdade} </Text>
              <TextInput
                style={styles.formInput}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>

            <TouchableOpacity style={styles.formButton} onPress={calculateTMB}>
              <Text style={styles.formTextButton}>Calcular</Text>
            </TouchableOpacity>
            <View style={styles.resultview}>
            {result && <Text style={styles.resultText}>{result}</Text>}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// CONFIGURANDO O NAVIGATOR
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'IMC') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'TMB') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#f0f0f0',
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="IMC" component={HomeScreen} />
        <Tab.Screen name="TMB" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


// ESTILOS
const styles = StyleSheet.create({
  // estilos do seu app (o que você já fez)...
  // Já está certinho, só evite duplicar o nome "result" em mais de um lugar
  result: {
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    width: "90%",
    borderRadius: 10,
  },
  resultText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
    container: {
  flex: 1,
  alignItems: 'center',
  padding: 24,
  backgroundColor: '#d3d3d3',
  flexGrow: 1, // Já garante que o conteúdo cresça
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
     width: "90%",
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
    height: 55,
    margin: 12,
    paddingLeft: 10,
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
  boxTitle: { // Estilo do título
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textTitle: { // Estilo do título
    color: "#FF0043",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
    padding: 10,
  },
  formContext: { // Estilo do formulário
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  form: { // Estilo do formulário
    width: "100%",
    padding: 10,
    marginTop: 20,
  },
  formLabel: { // Estilo do texto dos campos
    color: "#000000",
    fontSize: 18,
    paddingLeft: 20,
  },
  formInput: { // Estilo dos campos de entrada
    width: "90%",
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
    height: 55,
    margin: 12,
    paddingLeft: 10,
  },
  formButton: { // Botão de calcular
    backgroundColor: "#FF0043",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 12,
    marginTop: 30,
  },
  formTextButton: { // Texto do botão
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  result: { // Estilo do resultado
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    width: "90%",
    borderRadius: 10,
  }, 
  resultImcText: { // Texto do resultado 
    fontSize: 24,
    color: "#FF0043",
    textAlign: "center",
    fontWeight: "bold",
  },
  infoImc: { // Texto do resultado
    fontSize: 24,
    color: "#FF0043",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  resultview:{ //VIEW DOS RESULTADOS
    height:80,
  },
  errorMessage:{ //mensagem de erro na tela inicial
    fontSize:12, 
    color:"red",
    fontWeight:"bold",
    paddingLeft:20,
  },

  
});
