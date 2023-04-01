import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import ErrorComp from "@/Components/Ui/ErrorComp";
import FilmComp from "@/Components/Ui/FilmComp";
import Loading from "@/Components/Ui/LoadingComp";
import { Film } from "@/Constants/films";
import React from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";
import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
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
const Home = () => {
  const { classes, theme } = useStyles();
  const { data, isError, isLoading } = useQuery<{ results: Film[] }>(
    "films",
    () => dynamicGetReq("films")
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
          Star Wars
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Learn effortlessly about any star wars movie
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id accusantium
        expedita distinctio eveniet asperiores quod, quibusdam autem dolore
        voluptatum ad sint alias. Sapiente cupiditate facere, in aut facilis
        fuga nemo.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {data?.results.map((film) => (
          <FilmComp {...film} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery("films", () => dynamicGetReq("films"));
  } catch (error) {}
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
