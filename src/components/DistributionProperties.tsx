import { Distribution } from "../interfaces/interfaces";

export default function DistributionProperties({
  distribution,
}: {
  distribution: Distribution;
}) {
  return (
    <>
      <div>Mean is {distribution.properties.mean}</div>
      <div>Median is {distribution.properties.median}</div>
      <div>STD is {distribution.properties.std}</div>
    </>
  );
}
