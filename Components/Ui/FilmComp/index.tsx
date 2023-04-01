import { Film } from "@/Constants/films";
import { createStyles, Text, Card, rem } from "@mantine/core";
import Link from "next/link";
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
export default function FilmComp({
  title,
  release_date,
  producer,
  director,
  url,
}: Film) {
  const { classes } = useStyles();

  const splitted = url.split("/");
  const id = splitted[splitted.length - 2];

  return (
    <Link href={`film/${id}`}>
      <Card
        key={title}
        shadow="md"
        radius="md"
        className={classes.card}
        padding="xl"
      >
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {title}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          Producer : {producer}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          Release Date : {release_date}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          Director : {director}
        </Text>
      </Card>
    </Link>
  );
}
