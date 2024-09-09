import "dotenv/config"
import { core, CredentialRequest, CredentialStatusType, IdentityCreationOptions } from "@0xpolygonid/js-sdk";
import { initInMemoryDataStorageAndWallets } from "./walletSetup";

const rhsUrl = process.env.RHS_URL as string;

const defaultNetworkConnection = {
	rpcUrl: process.env.RPC_URL as string,
	contractAddress: process.env.CONTRACT_ADDRESS as string,
};

export const defaultIdentityCreationOptions: IdentityCreationOptions = {
	method: core.DidMethod.PolygonId,
	blockchain: core.Blockchain.Polygon,
	networkId: core.NetworkId.Amoy,
	revocationOpts: {
		type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
		id: rhsUrl,
	},
};

function createKYCAgeCredential(did: core.DID) {
	const credentialRequest: CredentialRequest = {
		credentialSchema: "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
		type: "KYCAgeCredential",
		credentialSubject: {
			id: did.string(),
			birthday: 19960424,
			documentType: 99,
		},
		expiration: 12345678888,
		revocationOpts: {
			type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
			id: rhsUrl,
		},
	};
	return credentialRequest;
}

export async function identityCreation() {
	const { identityWallet } = await initInMemoryDataStorageAndWallets(defaultNetworkConnection);
	const { did, credential } = await identityWallet.createIdentity({
		...defaultIdentityCreationOptions,
	});

	return { did: did.string(), creds: JSON.stringify(credential) };
}

export async function issueCredential() {
	const { dataStorage, identityWallet } = await initInMemoryDataStorageAndWallets(defaultNetworkConnection);

	const { did: userDID, credential: authBJJCredentialUser } = await identityWallet.createIdentity({
		...defaultIdentityCreationOptions,
	});


	// let userIdDID = userDID.string();

	// let newDID = core.DID.parse(userIdDID)

	const { did: issuerDID, credential: issuerAuthBJJCredential } = await identityWallet.createIdentity({ ...defaultIdentityCreationOptions });

	console.log("=============== issuer did ===============");
	const credentialRequest = createKYCAgeCredential(userDID);
	const credential = await identityWallet.issueCredential(issuerDID, credentialRequest);
	console.log("===============  credential ===============");

	await dataStorage.credential.saveCredential(credential);

	return { creds: credential };
}
