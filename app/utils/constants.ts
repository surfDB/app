export const RegionOptions = [
  {
    label: "New York",
    value: "nyc3",
  },
  {
    label: "San Francisco",
    value: "sfo3",
  },
  {
    label: "Amsterdam",
    value: "ams3",
  },
  {
    label: "Singapore",
    value: "sgp1",
  },
  {
    label: "London",
    value: "lon1",
  },
  {
    label: "Frankfurt",
    value: "fra1",
  },
  {
    label: "Toronto",
    value: "tor1",
  },
  {
    label: "Bangalore",
    value: "blr1",
  },
];

export const SizeOptions = [
  { label: "Small", value: "s-1vcpu-1gb" },
  { label: "Medium", value: "s-2vcpu-4gb" },
  { label: "Large", value: "s-4vcpu-8gb" },
];

export const accessCondition = [
  {
    conditionType: "evmBasic",
    contractAddress: "",
    standardContractType: "",
    chain: "polygon",
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: "0x6304CE63F2EBf8C0Cc76b60d34Cc52a84aBB6057",
    },
  },
];
