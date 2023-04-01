import { StarShip } from "@/Constants/ships";
import { Card, Image, Text, Badge, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: "40rem",
    margin: " 2rem auto",
    minHeight: "30rem",
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },
}));

export function SpaceShipView({
  model,
  name,
  crew,
  manufacturer,
  cargo_capacity,
}: StarShip) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        {" "}
        <Image height={300} src={"/starship.jpg"} />
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        {name}
      </Badge>

      <Text className={classes.title} fw={500} component="a">
        Model : {model}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        Cargo : {cargo_capacity}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        Manufacturer : {manufacturer}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        Crew : {crew}
      </Text>
    </Card>
  );
}
