import Colors from "@/constants/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { JSX } from "react";

export enum Type {
  Arrow = "arrow",
  Toggle = "toggle",
  None = "none",
}

export type ProfileNavigation = {
  id: number;
  name: string;
  href: string;
  type: Type;
  icon: JSX.Element;
};

export const profileNavigation = [
  {
    id: 2,
    name: "Settings",
    href: "",
    type: Type.Arrow,
    icon: <AntDesign name="setting" size={24} color="black" />,
  },
  {
    id: 3,
    name: "Notification Settings",
    href: "",
    type: Type.Toggle,
    icon: <Ionicons name="notifications-outline" size={24} color="black" />,
  },
  {
    id: 4,
    name: "Help & Support",
    href: "",
    type: Type.Arrow,
    icon: <Ionicons name="help-circle-outline" size={24} color="black" />,
  },
  {
    id: 5,
    name: "Logout",
    href: "",
    type: Type.None,
    icon: <MaterialIcons name="logout" size={24} color={Colors.DESTRUCTIVE} />,
  },
];
