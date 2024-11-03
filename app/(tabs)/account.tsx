
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Pressable, Text,useColorScheme,View,Appearance } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function account(){
        return <ThemedSafeAreaView style = {{flex: 1}}>  
          <ScrollView style = {{flex: 1}}>
            <Header/>
            <ThemedView style = {{flex: 1}}>
                <LoginButtons />
                <ThemeSelector/>  
                <About/>  
            </ThemedView>
            </ScrollView>  
    </ThemedSafeAreaView>
}

function About() {
    return <ThemedView style={styles.margin}>
        <ThemedText style={styles.textBig}>About</ThemedText>
        <ThemedText>Theme</ThemedText>
        <ThemedView style={{margin:10}}>
            <Pressable>
                <ThemedText style={{margin:9,fontSize:18}}>About</ThemedText>
            </Pressable>
            <Pressable>
                <ThemedText style={{margin:9,fontSize:18}}>Privacy Policy</ThemedText>
            </Pressable>
            <Pressable>
                <ThemedText style={{margin:9,fontSize:18}}>Terms Of Use</ThemedText>
            </Pressable>
            <Pressable>
                <ThemedText style={{margin:9,fontSize:18}}>Licences</ThemedText>
            </Pressable>
        </ThemedView>
    </ThemedView>
}

function ThemeSelector(){
    return <ThemedView style={styles.margin}>
        <ThemedText style={styles.textBig}>Panels</ThemedText>
        <ThemedText>Theme</ThemedText>
        <ThemedView style={{flexDirection: "row",justifyContent:"space-between",margin:10}}>
            <ThemeButton title="Dark" selected={false} colorScheme={"dark"}/>
            <ThemeButton title="Light" selected={false} colorScheme={"light"}/>
            <ThemeButton title="System" selected={false} colorScheme={null}/>
        </ThemedView>
    </ThemedView>
}

function ThemeButton({title,selected,colorScheme}:{selected:boolean,title:string,colorScheme:"dark"|"light"|null}){
    const theme = useColorScheme()
    return <Pressable style={{padding: 10,
        borderWidth:1,
        borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
        borderRadius:5, flex:0.3}} onPress={() => {
            Appearance.setColorScheme(colorScheme)
        }}>
        <ThemedText style={{textAlign:"center",width:"100%"}}>{title}</ThemedText>
    </Pressable>
}

function LoginButtons() {
    const theme = useColorScheme() 
    return <>
        <AuthButton label="Sign In" icon = {
            <Ionicons
                name={'logo-google'}
                size={18}
                color={theme === 'light' ? Colors.light.text : Colors.dark.icon}
                
            />}
        />
        <AuthButton label="Sign In" icon = {
            <Ionicons
                name={'logo-apple'}
                size={18}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
            />}
        />
    </>
}

function Header() {
    return <ThemedView style={styles.topbar}>
        <ThemedText style={styles.textBig}>Panels</ThemedText>
        <ThemedText>Sign in to save your data</ThemedText>
    </ThemedView>
}

function AuthButton({label,icon}: {
    label: string,
    icon: any
}) {
    const theme = useColorScheme();
    return <Pressable style={{
      //backgroundColor:  theme, 
      padding: 10,
      marginHorizontal:40,
      marginVertical:5,
      justifyContent: "center",
      flexDirection: "row",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon
    }}>
        {icon}
      <ThemedText style={{
         fontSize:20,
         fontWeight: "600"
      }}>{label}</ThemedText>
    </Pressable>
  }

  const styles = StyleSheet.create({
    textBig: {
        fontSize: 25,
        fontWeight: "600"
    },
    topbar: {
        padding:20
    },
    themeSelectorContainer: {
        flex: 1,
    },
    themeSelectorChild: {
        flex: 0.33,
    },
    margin: {
        padding:20
    }
  });