import { dynamicGetReq } from "@/Components/Helpers/apiHandler";
import { StarShip } from "@/Constants/ships";
import { createStyles, Text, Card, rem } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
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
interface Props {
  id: string;
}
export default function SpaceShip({ id }: Props) {
  const { classes } = useStyles();
  const { query } = useRouter();

  const { data } = useQuery<StarShip>(`starships${id}`, () =>
    dynamicGetReq(`starships/${id}`)
  );

  return (
    <Card
      key={data?.name}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Link href={`${query.filmId}/spaceship/${id}`}>
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {data?.name}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          Model : {data?.model}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          Cargo : {data?.cargo_capacity}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          Manufacturer : {data?.manufacturer}
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          Crew : {data?.crew}
        </Text>
      </Link>
    </Card>
  );
}
