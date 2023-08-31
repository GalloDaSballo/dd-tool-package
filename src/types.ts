/** NEW SPEC */

// Implies a return value and a way to handle it, as well as a single function which will be called

// == UI == //
export interface EthersContract {
  functionString: string; // Abi Function e.g. "function getRewards() external"
  address: string; // Address of the receiving contract
  inputs: string[]; // variableName[] A list of variables
}

// Details Pertaining to properties of the call not specifically imputable to ethers
export interface CallInfo {
  value?: string;
  gasLimit?: string;
  from: string;
}

// == INTERNAL == //
export interface ExecutableContract {
  // Byproduct of Ethers parsing the data
  calldata: string;
  address: string;

  callInfo: CallInfo; // Call info
}

// == THIS IS THE OUTCOME OF THE UI == //
export interface DDCall {
  callInfo: CallInfo; // Details wrt to how to perform the call
  contract: EthersContract; // Details wrt to the Contract and the function being called
}

export interface DDStep {
  call: DDCall;
  ouputMappings: string[]; // Empty string means we skip
  inputMappings: string[]; // 0, 1, 2 are just variables for `EthersContract.inputs[]`
}

export type DDSequence = DDStep[];

export interface GlobalState {
  [variableName: string]: [value: any]; // Prob a base type for now | Has to be interpreted at assignment || Is passed back from and to Ethers
}

// Any insertion into GlobalState will be performed by
