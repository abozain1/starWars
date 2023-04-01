import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import ErrorComp from "@/Components/Ui/ErrorComp";
import Loading from "@/Components/Ui/LoadingComp";
import SpaceShip from "@/Components/Ui/SpaceShipComp";
import { Film } from "@/Constants/films";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { QueryClient, dehydrate, useQuery } from "react-query";
import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));
export default function FilmPage() {
  const { query } = useRouter();
  const { classes, theme } = useStyles();

  const { data, isError, isLoading } = useQuery<Film>("film", () =>
    dynamicGetReq(`films/${query.filmId}`)
  );

  if (!!isError) {
    return <ErrorComp />;
  }
  return isLoading ? (
    <Loading />
  ) : (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          {data?.title}
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        {data?.director}
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        {data?.opening_crawl}
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {data?.starships.map((url) => {
          const splitted = url.split("/");
          const id = splitted[splitted.length - 2];
          return <SpaceShip id={id} />;
        })}
      </SimpleGrid>
    </Container>
  );
}
export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { filmId } = params as { filmId: string };
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery("film", () =>
      dynamicGetReq(`films/${filmId}`)
    );
  } catch (error) {}
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
