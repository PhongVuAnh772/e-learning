import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import i18n from '@/translations';
import HomeIcon from '@/components/tab-icons/homeIcon';
import ReportIcon from '@/components/tab-icons/ReportIcon';
import CustomerIcon from '@/components/tab-icons/CustomerIcon';
import OrderIcon from '@/components/tab-icons/OrderIcon';
import SettingIcon from '@/components/tab-icons/SettingIcon';
import { useTranslation } from "react-i18next";

const Layout = () => {
   
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'quicksand-bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: i18n.t('home-tab'),
          tabBarIcon: ({ size, color,focused }) => <HomeIcon size={size} color={color} focused={focused}/>,
                    headerShown:false

        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarLabel: i18n.t('report-tab'),
          tabBarIcon: ({ size, color,focused }) => (
            <ReportIcon size={size} color={color} focused={focused}/>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: i18n.t('customer-tab'),
          tabBarIcon: ({ size, color,focused }) => <CustomerIcon size={size} color={color} focused={focused}/>,
        }}
        
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarLabel: i18n.t('order-tab'),
          tabBarIcon: ({ size, color,focused }) => (
            <OrderIcon size={size} color={color} focused={focused}/>
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          tabBarLabel: i18n.t('user-tab'),
          headerShown: false,
          tabBarIcon: ({ size, color,focused }) => (
            <SettingIcon size={size} color={color} focused={focused}/>
          ),
          
        }}
      />
    </Tabs>
  );
};

export default Layout;