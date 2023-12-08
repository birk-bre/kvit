import { useState, useSyncExternalStore } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { X } from "@tamagui/lucide-icons";
import { set } from "date-fns";
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  ScrollView,
  Sheet,
  Text,
  TextArea,
  Unspaced,
  XStack,
  YStack
} from "tamagui";

import { useDataStore } from "../utils/coreData";

let listeners = [];
let onboardingTriggered = false;
const store = {
  set: (newValue: boolean) => {
    onboardingTriggered = newValue;
    emit();
  },
  subscribe(listener: any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return onboardingTriggered;
  }
};

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function useTriggerOnboarding() {
  const openStore = useSyncExternalStore(store.subscribe, store.getSnapshot);
  return [openStore, store.set] as const;
}

export function OnboardingDialog() {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState(0);
  const [_, { setData }] = useDataStore();
  const [open, setOpen] = useTriggerOnboarding();

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <Adapt
        when="sm"
        platform="touch"
      >
        <Sheet
          zIndex={200000}
          modal
          dismissOnSnapToBottom
        >
          <Sheet.Frame
            padding="$4"
            space
          >
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          o={0.5}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true
              }
            }
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          space
        >
          <Dialog.Title>Hei! 👋</Dialog.Title>
          <Dialog.Description>
            Fyll inn litt informasjon om deg selv sånn at vi kan gi deg en bedre
            opplevelse. Du kan endre dette senere.
          </Dialog.Description>
          <Fieldset>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Ola Nordmann"
              onChange={(e) => {
                setName(e.nativeEvent.text);
              }}
            />
          </Fieldset>

          <Fieldset alignItems="flex-start">
            <Label htmlFor="stopDate">Når sluttet du å drikke</Label>
            <DateTimePicker
              accentColor="green"
              mode="date"
              value={date}
              onChange={(_, newDate) => {
                if (newDate) {
                  setDate(newDate);
                }
              }}
            />
          </Fieldset>

          <Fieldset>
            <Label htmlFor="email">Alkoholforbruk</Label>
            <Text
              p="$1"
              pb="$2"
            >
              I løpet av en uke, hvor mange enheter drikker du i gjennomsnitt
              hver dag. 7 enheter på lørdag tilsvarer 1 enhet i gjennomsnitt
              hver dag f.eks.
            </Text>
            <NumberOfUnits setNumberOfUnits={setNumberOfUnits} />
          </Fieldset>

          <YStack
            alignItems="flex-end"
            marginTop="$2"
          >
            <Dialog.Close
              displayWhenAdapted
              asChild
            >
              <Button
                theme="green_Button"
                aria-label="Close"
                onPress={() => {
                  setData({ name, stopDate: date, numberOfUnits });
                  setOpen(false);
                }}
              >
                Save changes
              </Button>
            </Dialog.Close>
          </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                pos="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

function NumberOfUnits({
  setNumberOfUnits
}: {
  setNumberOfUnits: (value: number) => void;
}) {
  const [selected, setSelected] = useState<null | number>(null);

  return (
    <ScrollView horizontal>
      <XStack gap="$2">
        {[...Array(10)].map((_, index) => {
          return (
            <Button
              key={index}
              theme="green_Button"
              aria-label="Close"
              backgroundColor={selected === index ? "$green5" : "white"}
              onPress={() => {
                setSelected(index);
                setNumberOfUnits(index + 1);
              }}
              borderColor={selected === index ? "$green5" : "$gray5"}
            >
              <Text>{index + 1}</Text>
            </Button>
          );
        })}
      </XStack>
    </ScrollView>
  );
}
