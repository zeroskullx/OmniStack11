import React from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailCompose from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Ola ${
    incident.name
  } estou entando em contato pois gostaria de ajudar o caso ${
    incident.title
  } com o valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)}`;
  function navigateBack() {
    navigation.goBack();
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  function sendMail() {
    MailCompose.composeAsync({
      subject: `Quero ajudar: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="back" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={(styles.incidentProperty, { marginTop: 0 })}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>
        <Text style={(styles.incidentValue, { marginTop: 4 })}>
          {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <FontAwesome style={styles.actionIcon} name="whatsapp" />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <MaterialCommunityIcons
              style={styles.actionIcon}
              name="email-outline"
            />
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
