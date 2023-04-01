import { lorem } from "@/Constants/values";
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
interface Props {
  badge: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}
export default function LandingLayout({
  badge,
  title,
  description,
  children,
}: Props) {
  const { classes, theme } = useStyles();

  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          {badge}
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        {title}
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        {description || lorem}
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {children}
      </SimpleGrid>
    </Container>
  );
}
