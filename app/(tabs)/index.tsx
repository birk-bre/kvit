import { useEffect, useRef, useState } from "react";
import ClockLive from "react-live-clock";
import { Dimensions } from "react-native";
import {
  Card,
  H2,
  H3,
  H4,
  H5,
  Image,
  Tabs,
  Text,
  XStack,
  YStack
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

export default function Home() {
  const dimensons = Dimensions.get("window");

  return (
    <YStack
      gap="$4"
      p="$4"
      flex={1}
      position="relative"
    >
      <LinearGradient
        borderRadius="$4"
        colors={["$blue10", "$pink10"]}
        start={[1, 1]}
        end={[0, 0]}
        opacity={0.15}
        width={dimensons.width}
        height={dimensons.height}
        position="absolute"
      />
      <Tabs
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        display="flex"
        width="100%"
      >
        <Tabs.List
          display="flex"
          justifyContent="center"
        >
          <Tabs.Tab value="tab1">
            <Text>Fri for</Text>
          </Tabs.Tab>
          <Tabs.Tab value="tab2">
            <Text>Spart</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content
          value="tab1"
          p="$4"
        >
          <QuitOn />
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <H5>Connections</H5>
        </Tabs.Content>
      </Tabs>
    </YStack>
  );
}

function QuitOn() {
  return (
    <YStack
      alignItems="center"
      gap="$5"
    >
      <Image
        source={require("../../assets/heart.png")}
        height={150}
        width={150}
      />
      <YStack alignItems="center">
        <H5>Du sluttet med alkohol</H5>
        <H4> 22. november</H4>
      </YStack>
      <Clock />
      <Motivation />
    </YStack>
  );
}

function Clock() {
  const quitDate = new Date(2023, 10, 22);
  const [time, setTime] = useState(new Date());
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDiff(time.getTime() - quitDate.getTime());
  }, [time]);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, "0");
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((diff / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      borderRadius="$5"
      padding="$4"
      gap="$2"
    >
      <YStack>
        <H2>{days} :</H2>
        <Text>dager</Text>
      </YStack>
      <YStack>
        <H2>{hours} :</H2>
        <Text>timer</Text>
      </YStack>
      <YStack>
        <H2>{minutes} :</H2>
        <Text>minutter</Text>
      </YStack>

      <YStack>
        <H2>{seconds}</H2>
        <Text>sekunder</Text>
      </YStack>
    </XStack>
  );
}

function Motivation() {
  const quotes = [
    "Det er aldri for sent å bli den du kunne ha vært.",
    "Hva som ligger bak oss og hva som ligger foran oss er små saker sammenlignet med hva som ligger inne i oss. Emerson",
    "Endring skjer ikke når vi har en sjanse; den skjer når vi har en beslutning.",
    "Du må være villig til å slippe livet du planla, for å finne livet som venter på deg.",
    "Vanskeligheter bryter noen mennesker, men får andre til å bryte rekorder. Ward",
    "Selv om ingen kan gå tilbake og lage en helt ny start, kan alle starte fra nå og lage en helt ny slutt.",
    "Vår største herlighet ligger ikke i å aldri falle, men i å reise oss hver gang vi faller.",
    "Fall ned syv ganger, reis deg opp åtte.",
    "Når alt virker å gå imot deg, husk at flyet tar av mot vinden, ikke med den.",
    "Motivasjon er det som får deg i gang. Vane er det som holder deg gående.",
    "Å endre vår atferd er den ultimate kraften til å endre våre liv.",
    "Vær ikke redd for å gi slipp på det gode for å gå etter det store.D. Rockefeller",
    "Hemmeligheten til forandring er å fokusere all din energi, ikke på å kjempe mot det gamle, men på å bygge det nye.lt du trenger er allerede inne i deg.",
    "Mot er motstand mot frykt, mestring av frykt, ikke fravær av frykt.",
    "Husk at ikke å få det du vil ha, noen ganger er et fantastisk tilfelle av flaks.",
    "Uten kamp, kan det ikke være noen fremgang.",
    "Menneskelig vilje er sterkere enn jern.",
    "Hver morgen vi våkner opp, er den første dagen av resten av vårt liv.et handler ikke om å finne deg selv. Livet handler om å skape deg selv"
  ];

  //display a random quote
  return (
    <Card
      p="$4"
      shadowColor={"$red10"}
      shadowOffset={{ height: 5, width: 5 }}
    >
      <H4>{quotes[Math.floor(Math.random() * quotes.length)]}</H4>
    </Card>
  );
}
