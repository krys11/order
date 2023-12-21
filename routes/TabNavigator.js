import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Badge, IconButton } from "react-native-paper";
//Screen
import Commande from "../screens/commande/Commande";
import Facture from "../screens/facture/Facture";
//Color
import { Colors } from "../constant/Colors";
//stack Navigator
import {
  HomeProductsStackNavigator,
  AccountStackNavigator,
  HomeAdminStackNavigator,
} from "./StackNavigator";
//mycontext
import { MyContext } from "../context/MyContext";
import { useNavigation } from "@react-navigation/native";
import Notification from "../screens/notification/Notification";
import SendsNotificationAdmin from "../screens/admin/sendAllNotifications/SendsNotificationAdmin";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const { valueUser } = useContext(MyContext);

  const { badgeCommande, setBadgeCommande, badgeFacture, setBadgeFacture } =
    useContext(MyContext);

  const render = valueUser.isAuthnticated ? (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          height: 50,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: Colors.colorWhite,
          borderRadius: 20,
        },
        // headerTitleAlign: "center",
        // headerStyle: {
        //   backgroundColor: Colors.colorBlackAlpha,
        //   borderWidth: 1,
        //   borderBottomColor: Colors.colorWhite,
        // },
        // headerTitleStyle: {
        //   fontWeight: "bold",
        //   textTransform: "uppercase",
        // },
        // headerTintColor: Colors.colorRed,
        // //TabHeader
        // tabBarIcon: ({ focused }) => {
        //   let iconName;
        //   if (route.name == "Acceuil") {
        //     iconName = "home";
        //     return (
        //       <IconButton
        //         icon={iconName}
        //         iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //         size={20}
        //       />
        //     );
        //   } else if (route.name == "Commandes") {
        //     iconName = "android-messages";
        //     return (
        //       <View style={styles.badgeAndIcon}>
        //         <IconButton
        //           icon={iconName}
        //           iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //           size={20}
        //         />
        //         {badgeCommande ? (
        //           <Badge
        //             size={10}
        //             style={{ position: "absolute", top: 20, left: 35 }}
        //           ></Badge>
        //         ) : (
        //           ""
        //         )}
        //       </View>
        //     );
        //   } else if (route.name == "Factures") {
        //     iconName = "animation";
        //     return (
        //       <View style={styles.badgeAndIcon}>
        //         <IconButton
        //           icon={iconName}
        //           iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //           size={20}
        //         />
        //         {badgeFacture ? (
        //           <Badge
        //             size={10}
        //             style={{ position: "absolute", top: 20, left: 35 }}
        //           ></Badge>
        //         ) : (
        //           ""
        //         )}
        //       </View>
        //     );
        //   } else if (route.name == "Compte") {
        //     iconName = "account";
        //     return (
        //       <IconButton
        //         icon={iconName}
        //         iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //         size={20}
        //       />
        //     );
        //   }
        // },
        // tabBarStyle: {
        //   backgroundColor: Colors.colorBlack,
        //   paddingBottom: 5,
        // },
        // tabBarLabelStyle: {
        //   color: Colors.colorWhite,
        //   paddingBottom: 5,
        //   fontSize: 10,
        //   fontWeight: "bold",
        // },
      })}
    >
      <Tab.Screen
        name="Acceuil"
        component={HomeProductsStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("Acceuil")}
            >
              <IconButton
                icon="home"
                iconColor={focused ? Colors.colorRed : Colors.colorBlack}
                size={20}
              />
              <Text
                style={{
                  color: focused ? Colors.colorRed : Colors.colorBlack,
                  fontSize: 12,
                  position: "relative",
                  bottom: 15,
                  fontWeight: "bold",
                }}
              >
                Acceuil
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Commandes"
        component={Commande}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                setBadgeCommande(false);
                navigation.navigate("Commandes");
              }}
            >
              <View>
                <IconButton
                  icon="android-messages"
                  iconColor={focused ? Colors.colorRed : Colors.colorBlack}
                  size={20}
                />
                {badgeCommande ? (
                  <Badge
                    size={10}
                    style={{ position: "absolute", top: 20, left: 35 }}
                  ></Badge>
                ) : (
                  ""
                )}
              </View>
              <Text
                style={{
                  color: focused ? Colors.colorRed : Colors.colorBlack,
                  position: "relative",
                  bottom: 15,
                  fontWeight: "bold",
                }}
              >
                Commandes
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Factures"
        component={Facture}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                setBadgeFacture(false);
                navigation.navigate("Factures");
              }}
            >
              <View>
                <IconButton
                  icon="animation"
                  iconColor={focused ? Colors.colorRed : Colors.colorBlack}
                  size={20}
                />
                {badgeFacture ? (
                  <Badge
                    size={10}
                    style={{ position: "absolute", top: 20, left: 35 }}
                  ></Badge>
                ) : (
                  ""
                )}
              </View>
              <Text
                style={{
                  color: focused ? Colors.colorRed : Colors.colorBlack,
                  position: "relative",
                  bottom: 15,
                  fontWeight: "bold",
                }}
              >
                Factures
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Compte"
        component={AccountStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("Compte")}
            >
              <IconButton
                icon="account"
                iconColor={focused ? Colors.colorRed : Colors.colorBlack}
                size={20}
              />
              <Text
                style={{
                  color: focused ? Colors.colorRed : Colors.colorBlack,
                  position: "relative",
                  bottom: 15,
                  fontWeight: "bold",
                }}
              >
                Compte
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Tab.Screen name="Notif" component={Notification} /> */}
    </Tab.Navigator>
  ) : (
    <Tab.Navigator
      initialRouteName="Acceuil"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          height: 50,
          left: 15,
          right: 15,
          elevation: 0,
          backgroundColor: Colors.colorWhite,
          borderRadius: 20,
        },
        // headerTitleAlign: "center",
        // headerStyle: {
        //   backgroundColor: Colors.colorBlackAlpha,
        //   borderWidth: 1,
        //   borderBottomColor: Colors.colorWhite,
        // },
        // headerTitleStyle: {
        //   fontWeight: "bold",
        //   textTransform: "uppercase",
        // },
        // headerTintColor: Colors.colorRed,
        // //TabHeader
        // tabBarIcon: ({ focused }) => {
        //   let iconName;
        //   if (route.name == "Acceuil") {
        //     iconName = "home";
        //     return (
        //       <IconButton
        //         icon={iconName}
        //         iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //         size={20}
        //       />
        //     );
        //   } else if (route.name == "Commandes") {
        //     iconName = "android-messages";
        //     return (
        //       <View style={styles.badgeAndIcon}>
        //         <IconButton
        //           icon={iconName}
        //           iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //           size={20}
        //         />
        //         {badgeCommande ? (
        //           <Badge
        //             size={10}
        //             style={{ position: "absolute", top: 20, left: 35 }}
        //           ></Badge>
        //         ) : (
        //           ""
        //         )}
        //       </View>
        //     );
        //   } else if (route.name == "Factures") {
        //     iconName = "animation";
        //     return (
        //       <View style={styles.badgeAndIcon}>
        //         <IconButton
        //           icon={iconName}
        //           iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //           size={20}
        //         />
        //         {badgeFacture ? (
        //           <Badge
        //             size={10}
        //             style={{ position: "absolute", top: 20, left: 35 }}
        //           ></Badge>
        //         ) : (
        //           ""
        //         )}
        //       </View>
        //     );
        //   } else if (route.name == "Compte") {
        //     iconName = "account";
        //     return (
        //       <IconButton
        //         icon={iconName}
        //         iconColor={focused ? Colors.colorRed : Colors.colorWhite}
        //         size={20}
        //       />
        //     );
        //   }
        // },
        // tabBarStyle: {
        //   backgroundColor: Colors.colorBlack,
        //   paddingBottom: 5,
        // },
        // tabBarLabelStyle: {
        //   color: Colors.colorWhite,
        //   paddingBottom: 5,
        //   fontSize: 10,
        //   fontWeight: "bold",
        // },
      })}
    >
      <Tab.Screen
        name="Acceuil"
        component={HomeAdminStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("Homeadmin")}
            >
              <IconButton
                icon="home"
                iconColor={focused ? Colors.colorRed : Colors.colorBlack}
                size={20}
              />
              <Text
                style={{
                  color: focused ? Colors.colorRed : Colors.colorBlack,
                  fontSize: 12,
                  position: "relative",
                  bottom: 15,
                  fontWeight: "bold",
                }}
              >
                Acceuil
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="SendsNotificationadmin"
        component={SendsNotificationAdmin}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("SendsNotificationadmin")}
            >
              <IconButton
                icon="home"
                iconColor={focused ? Colors.colorRed : Colors.colorBlack}
                size={20}
              />
              <Text
                style={{
                  color: focused ? Colors.colorRed : Colors.colorBlack,
                  fontSize: 12,
                  position: "relative",
                  bottom: 15,
                  fontWeight: "bold",
                }}
              >
                Notifications
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
  {
    return render;
  }
};

const styles = StyleSheet.create({
  badgeAndIcon: {
    position: "relative",
    flexDirection: "row",
  },
  back: {
    backgroundColor: Colors.colorRed,
  },
});

export default BottomTabNavigator;
