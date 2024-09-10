import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const appToken = "0x5E3D1Bc59a8139Cb51EdDb667462acba4d3cBe85";

const AntugrowEscrowModule = buildModule("AntugrowEscrowModule", (m) => {
  const _tokenAddress = m.getParameter("token", appToken);

  let escrow = m.contract("AntugrowEscrow", [_tokenAddress]);

  return { escrow };
});

export default AntugrowEscrowModule;

