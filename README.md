# GinHealth

**GinHealth** é um aplicativo mobile desenvolvido com **React Native** e **Expo**, voltado para auxiliar usuários no acompanhamento de sua saúde física e bem-estar. Através de uma interface amigável, o app permite o cálculo de IMC, seleção de nível de atividade física e fornece orientações básicas com base nas informações inseridas.

## Funcionalidades

- Cálculo do Índice de Massa Corporal (IMC)
- Cadastro de informações: sexo, idade, peso, altura e nível de atividade física
- Retorno de mensagens com base nos dados preenchidos
- Navegação por abas para facilitar o uso
- Feedback tátil em caso de preenchimento incorreto

## Tecnologias e Bibliotecas Utilizadas

- **[React Native](https://reactnative.dev/)** – Framework para apps nativos multiplataforma
- **[Expo](https://expo.dev/)** – Plataforma de desenvolvimento, build e testes
- **[React Navigation](https://reactnavigation.org/)** – Navegação por abas (`@react-navigation/native` e `@react-navigation/bottom-tabs`)
- **[React Native Picker](https://github.com/react-native-picker/picker)** – Componente de seleção
- **[Expo Vector Icons](https://icons.expo.dev/)** – Ícones com `Ionicons`
- **Hooks do React (`useState`)** – Para controle de estado
- **Componentes do React Native** – `Text`, `View`, `TextInput`, `TouchableOpacity`, `ScrollView`, `KeyboardAvoidingView`, `Platform`
- **API `Vibration`** – Utilizada para alertas de erro

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **Expo CLI**:
  ```bash
  npm install -g expo-cli
