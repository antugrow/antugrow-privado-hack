import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AntugrowTokenModule = buildModule("AntugrowAppTokenModule", (m) => {
  const antugrowToken = m.contract("AntugrowAppToken");

  return { antugrowToken };
});

export default AntugrowTokenModule;
