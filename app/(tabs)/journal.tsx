import { Text, View, H1, H5, Card, Button, Dialog, TextArea, ScrollView } from "tamagui";
import {StyleSheet} from "react-native";
import {
  Adapt,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Sheet,
  TooltipSimple,
  Unspaced,
  XStack,
} from 'tamagui'
import { useState } from "react";
import { X } from '@tamagui/lucide-icons'
import { TextInput, Keyboard,  TouchableWithoutFeedback } from 'react-native';
import { green } from "@tamagui/themes";

const notes = [
  {
     header: 'Notat 1',
     content: 'Noe innhold her',
     time: "03/07/23"
  },
  {
    header: 'Notat 2',
    content: 'Noe innhold her',
    time: "03/07/23"
  },
  {
  header: 'Notat 3',
  content: 'Noe innhold her',
  time: "03/07/23"
  }
]



const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> {children}
  </TouchableWithoutFeedback>
  );

export default function Journal() {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                          accessible={false}>
    <View flex={1} backgroundColor={"$blue9Light"} paddingLeft={10} paddingRight={10}>
      <View marginTop={20} flex={1}>

      <H1>Journal</H1>  

      {
        notes.map((note, i) => {
          return (
            <Card key={i} style={styles.cardItem} >
              <View flexDirection="row">
                <H5>{note.header}</H5>
                <Text style={styles.cardDate}>{note.time}</Text>
              </View>
              <Text style={styles.cardContent}>{note.content}</Text>
            </Card>
          );
        })
      }


    
      {/* <Button style={styles.createButton}>
          Nytt notat
      </Button> */}
      <DialogInstance/>
    </View>
    </View>
    </TouchableWithoutFeedback>
  );
}


function DialogInstance() {
  const [open, setOpen] = useState(false)
  
  const [note, setNote] = useState({
    header: '',
    content: '',
    time: ''
  })

  return (
    <Dialog
      modal
      onOpenChange={(open) => {
        setOpen(open)
      }}>

    <Dialog.Trigger asChild>
      <Button style={styles.createButton}>
        Nytt notat
      </Button>
    </Dialog.Trigger>

    <Adapt when="sm" platform="touch">
      <Sheet zIndex={200000} modal dismissOnSnapToBottom>
        <Sheet.Frame padding="$4" gap="$4">
          <Adapt.Contents />
        </Sheet.Frame>
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
      </Sheet>
    </Adapt>

    <Dialog.Portal>
      <Dialog.Overlay
        key="overlay"
        animation="quick"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Dialog.Content
        bordered
        elevate
        key="content"
        animateOnly={['transform', 'opacity']}
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        gap="$4"
      >

    <Dialog.Title>Nytt notat</Dialog.Title>

      <Fieldset gap="$4" horizontal>
        <Label width="auto" justifyContent="flex-end" htmlFor="name">
          Tittel
        </Label>
        <Input marginLeft={20} flex={1} id="name" defaultValue="Notat" borderWidth={1}/>
      </Fieldset>

      <Fieldset gap="$4" horizontal>
        {/* <Input id="note" borderWidth={2} flex={1} flexGrow={2} height={"$20"} textAlignVertical={"top"} multiline value={note.content} 
               onChange = {(e) => setNote(prev => ({...prev, content: e.nativeEvent.text}))}/> */}
               <ScrollView>
                <TextArea minHeight={"$13"} maxHeight={"$13"} flex={1} />

               </ScrollView>
      </Fieldset>

      <XStack alignSelf="flex-end" gap="$4">
        <Dialog.Close displayWhenAdapted asChild>
          <Button theme="alt1" aria-label="Close" disabled={note.content.length <= 0}>
            Save changes
          </Button>
        </Dialog.Close>
      </XStack>

      <Unspaced>
        <Dialog.Close asChild>
          <Button
            position="absolute"
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
  )
}

const styles = StyleSheet.create({
  cardItem: {
    alignSelf: "stretch",
    backgroundColor: "darkmagenta",
    fontSize: 15,
    marginTop: 10,
    paddingLeft:10,
    paddingTop:10
  },
  cardHeader: {
    fontFamily: ""
  },
  cardDate: {
    paddingRight:10,
    position: "absolute",
    right: 0
  },
  cardContent: {
    paddingTop: 10,
    paddingBottom: 10
  },
  createButton: {
    position: "absolute",
    bottom:10,
    alignSelf: "center",
    backgroundColor: "darkmagenta",
    width: 200
  }
});



const tags = [
  { name: "Apple" },
  { name: "Pear" },
  { name: "Blackberry" },
  { name: "Peach" },
  { name: "Apricot" },
  { name: "Melon" },
  { name: "Honeydew" },
  { name: "Starfruit" },
  { name: "Blueberry" },
  { name: "Rasberry" },
  { name: "Strawberry" },
  { name: "Mango" },
  { name: "Pineapple" },
  { name: "Lime" },
  { name: "Lemon" },
  { name: "Coconut" },
  { name: "Guava" },
  { name: "Papaya" },
  { name: "Orange" },
  { name: "Grape" },
  { name: "Jackfruit" },
  { name: "Durian" }
];


