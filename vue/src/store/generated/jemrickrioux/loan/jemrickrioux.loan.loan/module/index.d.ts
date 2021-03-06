import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgRepayLoan } from "./types/loan/tx";
import { MsgCancelLoan } from "./types/loan/tx";
import { MsgRequestLoan } from "./types/loan/tx";
import { MsgApproveLoan } from "./types/loan/tx";
import { MsgLiquidateLoan } from "./types/loan/tx";
export declare const MissingWalletError: Error;
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => any;
    msgRepayLoan: (data: MsgRepayLoan) => EncodeObject;
    msgCancelLoan: (data: MsgCancelLoan) => EncodeObject;
    msgRequestLoan: (data: MsgRequestLoan) => EncodeObject;
    msgApproveLoan: (data: MsgApproveLoan) => EncodeObject;
    msgLiquidateLoan: (data: MsgLiquidateLoan) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
