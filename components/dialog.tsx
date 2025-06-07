import Colors from "@/constants/color";
import React, { createContext, useCallback, useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./button";

type DialogOptions = {
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const DialogContext = createContext<{
  show: (options: DialogOptions) => void;
  hide: () => void;
} | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<DialogOptions | null>(null);

  const show = useCallback((opts: DialogOptions) => {
    setOptions(opts);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setOptions(null);
    }, 200);
  }, []);

  const handleConfirm = () => {
    options?.onConfirm?.();
    hide();
  };

  const handleCancel = () => {
    options?.onCancel?.();
    hide();
  };

  return (
    <DialogContext.Provider value={{ show, hide }}>
      {children}

      <Modal transparent visible={visible} animationType="fade">
        <Pressable style={styles.backdrop} onPress={handleCancel}>
          <View />
        </Pressable>
        <SafeAreaView style={styles.container}>
          <View style={styles.dialog}>
            <Text style={styles.title}>{options?.title}</Text>
            {!!options?.description && (
              <Text style={styles.description}>{options.description}</Text>
            )}
            <View style={styles.actions}>
              <Button
                variant="secondary"
                onPress={handleCancel}
                style={{ backgroundColor: "#e5e7eb", borderRadius: 8 }}
                textStyle={{
                  fontSize: 14,
                  fontFamily: "DMSans-Regular",
                  color: Colors.TEXT,
                }}
              >
                {options?.cancelText || "Cancel"}
              </Button>
              <Button
                onPress={handleConfirm}
                textStyle={{ fontSize: 14, fontFamily: "DMSans-Regular" }}
              >
                {options?.confirmText || "Confirm"}
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#00000088",
  },
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  dialog: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    width: "100%",
    padding: 20,
    shadowColor: Colors.SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: "DMSans-SemiBold",
    marginBottom: 8,
    color: "#111827",
  },
  description: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    color: Colors.TEXT,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});
