import "@mantine/core/styles.css";
import DistributionsData from "../distributions_data.json";
import { Select } from "@mantine/core";
import { Distribution } from "../interfaces/interfaces";

export default function DistributionSelect({
  distribution,
  distCategory,
  distributionOnChange,
}: {
  distribution: Distribution;
  distCategory: string;
  distributionOnChange: (value: string | null) => void;
}) {
  return (
    <Select
      placeholder="Select your favorite distribution!"
      data={ // Sort and filter distributions based on category.
        distCategory === "all"
          ? DistributionsData.distributions.sort((a, b) =>
              a.label.localeCompare(b.label)
            )
          : DistributionsData.distributions
              .filter((dist) => dist.type === distCategory)
              .sort((a, b) => a.label.localeCompare(b.label))
      }
      value={distribution.name || ""}
      onChange={(value) => distributionOnChange(value)}
      searchable={true}
      allowDeselect={false}
      clearable={true}
      nothingFoundMessage="No distribution found!"
      error={distribution.paramErrors["select"]}
    />
  );
}
