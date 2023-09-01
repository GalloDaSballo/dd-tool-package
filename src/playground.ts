import run from ".";
import encodeCall, { decodeResponse } from "./ethers";
import executeOne from "./executor";
import { CallInfo, DDCall, EthersContract, ExecutableContract } from "./types";

const RPC_URL = "https://mainnet.infura.io/v3/c7663ea6ddf54fdbaa673941846b176c";

const theContract: EthersContract = {
  functionString:
    "function getPricePerFullShare() external view returns (uint256)",
  address: "0xBA485b556399123261a5F9c95d413B4f93107407",
  inputs: [],
};

const theCallInfo: CallInfo = {
  from: "0xBA485b556399123261a5F9c95d413B4f93107407",
};

const theDDCall: DDCall = {
  contract: theContract,
  callInfo: theCallInfo,
};
// Call info
// value
// gas limit
// from

function makeExecutableTx(theCallDetails: DDCall): ExecutableContract {
  const theCalldata = encodeCall(theCallDetails.contract);
  return {
    calldata: theCalldata, // Encoded Calldata
    address: theCallDetails.contract.address, // Address
    callInfo: theCallDetails.callInfo, // Info
  };
}

function decodeTxOutput(data: string, theContractCall: EthersContract): any {
  const res = decodeResponse(data, theContractCall);
  return res;
}

run(async (ganache) => {
  const response = await executeOne(ganache, makeExecutableTx(theDDCall));

  return decodeTxOutput(response, theContract);
}, RPC_URL);
// export interface ExecutableContract {
//   // NOTE: We could add call vs static but I'm pretty sure it won't matter, except maybe for some weird edge case
//   calldata: string;
//   address: string; //
//   value: string; // Value to send
//   gasLimit?: string; // If unset we always use as much as possible
// }
