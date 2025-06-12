import Link from "@/components/link";
import { useToast } from "@/components/toast";
import Colors from "@/constants/color";
import { usePostLogin } from "@/features/auth/api/use-post-login";
import LoginForm from "@/features/auth/components/login-form";
import { LoginFormSchema, loginFormSchema } from "@/features/auth/form/form";
import { saveAccessToken } from "@/lib/secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LoginPage() {
  const { show } = useToast();
  const router = useRouter();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate: login, isPending } = usePostLogin({
    onSuccess: async ({ token, message }) => {
      await saveAccessToken(token);
      form.reset();
      show({
        title: "Success!",
        description: message || "Login successful",
        variant: "success",
      });
      router.push("/home");
    },
    onError: (e: unknown) => {
      if (isAxiosError(e)) {
        show({
          title: "Error",
          description: e.response?.data?.error || "Something went wrong",
          variant: "error",
        });
      } else {
        console.error(e);
        show({
          title: "Error",
          description: "An unknown error occurred",
          variant: "error",
        });
      }
    },
  });

  const onSubmit = (data: LoginFormSchema) => {
    console.log("Form submitted:", data);
    login(data);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.wrapper}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              width={36}
              height={36}
              style={styles.logo}
              alt="logo"
              source={require("@/assets/images/logo.png")}
            />
            <Text style={styles.title}>Sign in to Sumora</Text>
            <Text style={styles.subtitle}>
              Monitor your water with confidence. Log in to track, analyze, and
              ensure its safety.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <FormProvider {...form}>
              <LoginForm onSubmit={onSubmit} loading={isPending} />
            </FormProvider>
            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don&apos;t have an account?</Text>
              <Link
                href={"/register"}
                style={{ textDecorationLine: "underline" }}
              >
                Sign up
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: Colors.WHITE,
    padding: 16,
    borderRadius: 12,
    gap: 20,
    shadowColor: "#C1C1C1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  scrollContainer: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  background: {
    flex: 1,
  },
  imageStyle: {
    height: 500,
  },
  wrapper: {
    marginTop: 52,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 36,
  },
  logo: {
    marginHorizontal: "auto",
    marginBottom: 32,
  },
  title: {
    fontFamily: "DMSans-Medium",
    fontSize: 24,
    color: Colors.WHITE,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "DMSans-Regular",
    textAlign: "center",
    lineHeight: 16,
    color: Colors.WHITE,
    maxWidth: 320,
    marginHorizontal: "auto",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginHorizontal: "auto",
  },
  footerText: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
  },
});
