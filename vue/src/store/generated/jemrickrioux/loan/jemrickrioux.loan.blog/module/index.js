// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreatePost } from "./types/blog/tx";
import { MsgDeleteSentPost } from "./types/blog/tx";
import { MsgDeletePost } from "./types/blog/tx";
import { MsgUpdateSentPost } from "./types/blog/tx";
import { MsgCreateTimedoutPost } from "./types/blog/tx";
import { MsgCreateSentPost } from "./types/blog/tx";
import { MsgSendIbcPost } from "./types/blog/tx";
import { MsgUpdatePost } from "./types/blog/tx";
import { MsgUpdateTimedoutPost } from "./types/blog/tx";
import { MsgDeleteTimedoutPost } from "./types/blog/tx";
const types = [
    ["/jemrickrioux.loan.blog.MsgCreatePost", MsgCreatePost],
    ["/jemrickrioux.loan.blog.MsgDeleteSentPost", MsgDeleteSentPost],
    ["/jemrickrioux.loan.blog.MsgDeletePost", MsgDeletePost],
    ["/jemrickrioux.loan.blog.MsgUpdateSentPost", MsgUpdateSentPost],
    ["/jemrickrioux.loan.blog.MsgCreateTimedoutPost", MsgCreateTimedoutPost],
    ["/jemrickrioux.loan.blog.MsgCreateSentPost", MsgCreateSentPost],
    ["/jemrickrioux.loan.blog.MsgSendIbcPost", MsgSendIbcPost],
    ["/jemrickrioux.loan.blog.MsgUpdatePost", MsgUpdatePost],
    ["/jemrickrioux.loan.blog.MsgUpdateTimedoutPost", MsgUpdateTimedoutPost],
    ["/jemrickrioux.loan.blog.MsgDeleteTimedoutPost", MsgDeleteTimedoutPost],
];
export const MissingWalletError = new Error("wallet is required");
export const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgCreatePost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgCreatePost", value: MsgCreatePost.fromPartial(data) }),
        msgDeleteSentPost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgDeleteSentPost", value: MsgDeleteSentPost.fromPartial(data) }),
        msgDeletePost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgDeletePost", value: MsgDeletePost.fromPartial(data) }),
        msgUpdateSentPost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgUpdateSentPost", value: MsgUpdateSentPost.fromPartial(data) }),
        msgCreateTimedoutPost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgCreateTimedoutPost", value: MsgCreateTimedoutPost.fromPartial(data) }),
        msgCreateSentPost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgCreateSentPost", value: MsgCreateSentPost.fromPartial(data) }),
        msgSendIbcPost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgSendIbcPost", value: MsgSendIbcPost.fromPartial(data) }),
        msgUpdatePost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgUpdatePost", value: MsgUpdatePost.fromPartial(data) }),
        msgUpdateTimedoutPost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgUpdateTimedoutPost", value: MsgUpdateTimedoutPost.fromPartial(data) }),
        msgDeleteTimedoutPost: (data) => ({ typeUrl: "/jemrickrioux.loan.blog.MsgDeleteTimedoutPost", value: MsgDeleteTimedoutPost.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
