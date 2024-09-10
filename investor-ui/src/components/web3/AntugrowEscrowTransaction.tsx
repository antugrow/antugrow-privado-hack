import { useCallback } from "react";
import { Transaction, TransactionButton, TransactionSponsor, TransactionStatus, TransactionStatusAction, TransactionStatusLabel } from "@coinbase/onchainkit/transaction";
import type { LifeCycleStatus } from "@coinbase/onchainkit/transaction";
import { useAccount } from "wagmi";
import WalletConnection from "./WalletConnection";
import { baseSepolia } from "viem/chains";
import { antugrowContractAddress } from "@/utils/contracts";
import { ContractFunctionParameters } from "viem";
import abi from "@/abis/antugrow-escrow-abi.json";
import { PAYMASTER_ENDPOINT } from "@/env";

interface IProps {
	amount: number;
}

const AntugrowEscrowTransaction = ({ amount }: IProps) => {
	const { address } = useAccount();

	const handleOnStatus = useCallback((status: LifeCycleStatus) => {
		console.log(status);
	}, []);

	const oneYearInMillisecs = 365 * 24 * 60 * 60 * 1000;

	const contracts = [
		{
			address: antugrowContractAddress,
			abi: abi.abi as any,
			functionName: "createLoan",
			args: [amount, oneYearInMillisecs],
		},
	] satisfies ContractFunctionParameters[];

	return address ? (
		<Transaction
			chainId={baseSepolia.id}
			contracts={contracts}
			onStatus={handleOnStatus}
			capabilities={{
				paymasterService: {
					url: PAYMASTER_ENDPOINT,
				},
			}}>
			<TransactionButton text="Deposit" disabled={amount === 0} />
			<TransactionSponsor />
			<TransactionStatus>
				<TransactionStatusLabel />
				<TransactionStatusAction />
			</TransactionStatus>
		</Transaction>
	) : (
		<WalletConnection />
	);
};

export default AntugrowEscrowTransaction;
