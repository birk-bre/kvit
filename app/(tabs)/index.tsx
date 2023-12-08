import { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book, Clock as ClockIcon, TrendingUp } from "@tamagui/lucide-icons";
import { format } from "date-fns";
import {
  Button,
  Card,
  Fieldset,
  H1,
  H2,
  H3,
  H4,
  H5,
  Image,
  Label,
  ScrollView,
  Separator,
  Spacer,
  Tabs,
  Text,
  XStack,
  YStack
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import { Gradient } from "../../components/AnimatedGradient";
import {
  OnboardingDialog,
  useTriggerOnboarding
} from "../../components/OnboardingDialog";
import { useDataStore } from "../../utils/coreData";

type CoreData = {
  stopDate?: string;
  name?: string;
  numberOfUnits?: number;
};

export default function Home() {
  const dimensons = Dimensions.get("window");
  const store = useDataStore();

  const data = store[0];
  const loading = store[2];

  return (
    <>
      <Button onPress={() => AsyncStorage.setItem("data", JSON.stringify({}))}>
        Reset
      </Button>
      <YStack
        gap="$4"
        p="$4"
        flex={1}
        position="relative"
      >
        {/* <LinearGradient
          borderRadius="$4"
          colors={["$blue10", "$pink10"]}
          start={[1, 1]}
          end={[0, 0]}
          opacity={0.15}
          width={dimensons.width}
          height={dimensons.height}
          position="absolute"
        /> */}

        <Gradient />
        {/* <AnimatedGradient /> */}

        <QuitOn data={data ?? undefined} />
      </YStack>
      <OnboardingDialog key={String(data) + String(loading)} />
    </>
  );
}

function QuitOn({ data }: { data?: CoreData }) {
  //check if data has NAaN
  if (
    !data ||
    Object.keys(data).length === 0 ||
    isNaN(data?.numberOfUnits) ||
    isNaN(new Date(data?.stopDate).getTime())
  )
    return <Intro />;

  const stopDate = new Date(data?.stopDate) ?? new Date();

  const daysSinceStop = Math.floor(
    (new Date().getTime() - stopDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <ScrollView height={"100%"}>
      <H2 fontWeight={"700"}>Hei 👋 {data.name}</H2>
      <YStack
        gap="$3.5"
        pt="$4"
      >
        <Clock />

        <Card
          px="$3.5"
          py="$2"
        >
          <XStack
            gap="$1.5"
            alignItems="center"
          >
            <TrendingUp color="steelblue" />
            <Text color={"steelblue"}>Du har spart kropppen for</Text>
          </XStack>
          <XStack alignItems="flex-end">
            <H2 fontWeight={"600"}>{data.numberOfUnits * daysSinceStop}</H2>
            <H5 color={"gray"}> enheter alkohol</H5>
          </XStack>
          <Separator m="$1.5" />
          <XStack alignItems="flex-end">
            <H2 fontWeight={"600"}>{data.numberOfUnits * daysSinceStop * 8}</H2>
            <H5 color="gray"> gram ren alkohol</H5>
          </XStack>
        </Card>

        <Motivation />
      </YStack>
    </ScrollView>
  );
}

function Clock() {
  const [data] = useDataStore();

  const quitDate = new Date(data?.stopDate) ?? new Date();

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
    <Card
      justifyContent="flex-start"
      alignItems="flex-start"
      px="$3.5"
      py="$2"
    >
      <XStack
        alignItems="center"
        gap="$1.5"
      >
        <ClockIcon color={"purple"} />
        <Text color={"purple"}>
          Du sluttet {format(quitDate, "dd. MMMM yyyy")}
        </Text>
      </XStack>
      <XStack
        alignItems="center"
        justifyContent="center"
        borderRadius="$5"
        gap="$2"
      >
        <YStack>
          <H2>{days} :</H2>
          <Text color={"gray"}>dager</Text>
        </YStack>

        <YStack>
          <H2>{hours} : </H2>
          <Text color={"gray"}>timer</Text>
        </YStack>

        <YStack>
          <H2>{minutes} : </H2>
          <Text
            ml={"$-2"}
            color={"gray"}
          >
            minutter
          </Text>
        </YStack>

        <YStack>
          <H2>{seconds}</H2>
          <Text color={"gray"}>sekunder</Text>
        </YStack>
      </XStack>
    </Card>
  );
}

function Motivation() {
  const quotes = [
    "Det er aldri for sent å bli den du kunne ha vært.",
    "Hva som ligger bak oss og hva som ligger foran oss er små saker sammenlignet med hva som ligger inne i oss",
    "Endring skjer ikke når vi har en sjanse; den skjer når vi har en beslutning.",
    "Du må være villig til å slippe livet du planla, for å finne livet som venter på deg.",
    "Vanskeligheter bryter noen mennesker, men får andre til å bryte rekorder. Ward",
    "Selv om ingen kan gå tilbake og lage en helt ny start, kan alle starte fra nå og lage en helt ny slutt.",
    "Vår største herlighet ligger ikke i å aldri falle, men i å reise oss hver gang vi faller.",
    "Fall ned syv ganger, reis deg opp åtte.",
    "Når alt virker å gå imot deg, husk at flyet tar av mot vinden, ikke med den.",
    "Motivasjon er det som får deg i gang. Vane er det som holder deg gående.",
    "Å endre vår atferd er den ultimate kraften til å endre våre liv.",
    "Vær ikke redd for å gi slipp på det gode for å gå etter det store.",
    "Hemmeligheten til forandring er å fokusere all din energi, ikke på å kjempe mot det gamle, men på å bygge det nye.lt du trenger er allerede inne i deg.",
    "Mot er motstand mot frykt, mestring av frykt, ikke fravær av frykt.",
    "Husk at ikke å få det du vil ha, noen ganger er et fantastisk tilfelle av flaks.",
    "Uten kamp, kan det ikke være noen fremgang.",
    "Menneskelig vilje er sterkere enn jern.",
    "Hver morgen vi våkner opp, er den første dagen av resten av vårt liv.et handler ikke om å finne deg selv. Livet handler om å skape deg selv",
    "Kronisk alkoholbruk stjeler mer enn bare øyeblikkene; det tar bort år fra livet og helse fra årene som er igjen.",
    "Å drikke tungt over tid kan forårsake uopprettelig skade på hjernen og andre deler av kroppen, et stille tyveri av livskvalitet.",
    "Kronisk alkoholmisbruk er som å sette kroppen i en konstant tilstand av nød, ødelegge organer bit for bit.",
    "Alkoholens fysiske skader er dype, fra levercirrhose til hjertesykdom, det er en langsom forgiftning av systemet.",
    "Alkoholisme er en tyst morder; den kommer ofte usett og forlater en sti av ødelagte organer og skadet helse.",
    "Kronisk drikking er en kamp mot ens egen kropp, der hvert glass etterlater et sår som kan bli umulig å helbrede.",
    "Over tid kan overdreven alkoholforbruk føre til et spekter av helseproblemer, fra psykiske lidelser til kroniske fysiske tilstander.",
    "Alkoholmisbruk ødelegger sakte men sikkert kroppens forsvar, og etterlater den sårbar for en rekke sykdommer og lidelser.",
    "Hver drink bærer med seg en skjult kostnad for helsen, en pris som blir stadig dyrere med kronisk bruk.",
    "Å gi slipp på alkohol kan være som å gi nytt liv til en kropp som har blitt utsatt for år med forsømmelse og skade."
  ];

  //display a random quote
  return (
    <Card
      px="$3.5"
      py="$2"
    >
      <XStack
        alignItems="center"
        gap="$1.5"
      >
        <Book color="orangered" />
        <Text color="orangered">Husk på</Text>
      </XStack>
      <Text
        fontStyle="italic"
        fontSize={20}
        pt="$1"
      >
        {quotes[Math.floor(Math.random() * quotes.length)]}
      </Text>
    </Card>
  );
}

function Intro() {
  const [_, setOpen] = useTriggerOnboarding();
  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      gap="$4"
      flex={1}
      p="$4"
    >
      <Image
        source={require("../../assets/happy.png")}
        height={100}
        width={100}
      />
      <H3 fontWeight={"700"}>Velkommen 👋</H3>
      <H4 fontWeight={"600"}>
        Dette er en app som hjelper deg å ha kontroll på hvor mye alkohol du
        drikker
      </H4>
      <Button
        theme="green_Button"
        onPress={() => {
          setOpen(true);
        }}
      >
        Kom i gang
      </Button>
    </YStack>
  );
}
