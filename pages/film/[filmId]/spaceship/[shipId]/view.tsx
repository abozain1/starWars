import { StarShip } from "@/Constants/ships";

export default function SpaceShipView({
  model,
  name,
  consumables,
  cargo_capacity,
}: StarShip) {
  return (
    <div>
      <p>{model}</p>
      <p>{name}</p>
      <p>{consumables}</p>
      <p>{cargo_capacity}</p>
    </div>
  );
}
