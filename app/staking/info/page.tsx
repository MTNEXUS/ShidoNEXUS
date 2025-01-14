import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Staking() {
  return (
    <div className="container mx-auto p-6">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-4xl relative pb-4 uppercase mb-6">
          Staking on SHIDO Network
          <span className="absolute bottom-2.5 left-0 w-[40px] border-b-2 border-sidebar-primary"></span>
        </h1>

        <div className="mb-8">
          <p className="text-lg text-muted-foreground">
            Since SHIDO offers staking on both the Cosmos SDK-based staking
            module (native staking) and the EVM side via smart contracts, it can
            indeed be confusing for users. Here's a clear breakdown of the
            differences, along with pros and cons for each:
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="native-staking"
            className="border-none rounded-lg transition-colors data-[state=open]:bg-accent/50 hover:bg-accent/50 data-[state=open]:hover:bg-accent/50"
          >
            <AccordionTrigger className="text-xl font-semibold rounded-lg px-4 py-4 hover:no-underline hover:bg-transparent data-[state=open]:bg-transparent">
              Cosmos SDK-Based Staking (Native Staking)
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">How it works:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      Delegators stake their native SHIDO with validators.
                    </li>
                    <li>
                      Validators secure the blockchain by validating and
                      proposing blocks.
                    </li>
                    <li>
                      Staking is directly integrated into the chain's consensus
                      mechanism (Tendermint BFT).
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Pros:</h3>
                  <ul className="space-y-4">
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Integrated Security
                      </span>
                      <p className="text-muted-foreground">
                        Directly tied to the chain's consensus, helping secure
                        the network.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Governance Power
                      </span>
                      <p className="text-muted-foreground">
                        Staked tokens often give users voting rights in on-chain
                        governance decisions.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Higher Reliability
                      </span>
                      <p className="text-muted-foreground">
                        Since it's part of the base layer, there's no risk of
                        smart contract vulnerabilities.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">Lower Gas Costs</span>
                      <p className="text-muted-foreground">
                        Native staking transactions typically cost less compared
                        to EVM contract interactions.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Rewards Consistency
                      </span>
                      <p className="text-muted-foreground">
                        Rewards are calculated and distributed consistently by
                        the protocol.
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Cons:</h3>
                  <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
                    <li className="space-y-1">
                      <span className="font-medium block">Lock-Up Periods</span>
                      <p className="text-muted-foreground">
                        Staked tokens are subject to unbonding period (14 days)
                        during which they can't be moved or traded.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Less Flexibility
                      </span>
                      <p className="text-muted-foreground">
                        Native staking can lack advanced features like
                        composability or tokenized positions.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">Validator Risks</span>
                      <p className="text-muted-foreground">
                        Delegators are exposed to validator risks, such as
                        slashing for downtime or double-signing.
                      </p>
                    </li>
                  </ul>
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="evm-based-staking"
            className="border-none rounded-lg hover:bg-accent/50 transition-colors">
            <AccordionTrigger className="text-xl font-semibold rounded-lg px-4 py-4 hover:no-underline hover:bg-transparent data-[state=open]:bg-accent/50">
              EVM-Based Staking (Smart Contract Staking)
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">How it works:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      Users deposit tokens (native or wrapped) into a smart
                      contract on the EVM side.
                    </li>
                    <li>
                      The contract manages staking, rewards distribution, and
                      sometimes even features like auto-compounding or liquid
                      staking derivatives.
                    </li>
                    <li>
                      It's not directly tied to the chain's consensus but can be
                      integrated with DeFi ecosystems.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Pros:</h3>
                  <ul className="space-y-4">
                    <li className="space-y-1">
                      <span className="font-medium block">Flexibility</span>
                      <p className="text-muted-foreground">
                        Allows advanced features such as liquid staking
                        (tokenized staked positions) and auto-compounding
                        rewards.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">Composability</span>
                      <p className="text-muted-foreground">
                        Staked tokens often give users voting rights in on-chain
                        governance decisions.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        No Unbonding Periods
                      </span>
                      <p className="text-muted-foreground">
                        Some implementations allow for immediate withdrawal of
                        funds, enhancing liquidity.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Cross-Chain Support
                      </span>
                      <p className="text-muted-foreground">
                        Tokens staked on the EVM side can potentially interact
                        with other blockchains supporting EVM.
                      </p>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Cons:</h3>
                  <ul className="list-disc pl-6 space-y-4 text-muted-foreground">
                    <li className="space-y-1">
                      <span className="font-medium block">Security Risks</span>
                      <p className="text-muted-foreground">
                        Vulnerabilities in the contract could lead to loss of
                        funds (e.g., exploits, hacks).
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">Higher Gas Fees</span>
                      <p className="text-muted-foreground">
                        Interactions with EVM smart contracts are typically more
                        expensive than native staking transactions.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Not Linked to Consensus
                      </span>
                      <p className="text-muted-foreground">
                        Staking here does not contribute to the security of the
                        Cosmos SDK-based blockchain.
                      </p>
                    </li>
                    <li className="space-y-1">
                      <span className="font-medium block">
                        Reward Variability
                      </span>
                      <p className="text-muted-foreground">
                        Depending on the contract design, rewards may be less
                        predictable or dependent on market activity.
                      </p>
                    </li>
                  </ul>
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 className="text-2xl font-bold mt-12 mb-6 uppercase">
          When to Choose Each
        </h2>

        <div className="mb-8">
          <ul className="space-y-4">
            <li>
              <span className="font-medium block">Choose Native Staking</span>
              <ul className="mt-2 pl-6 space-y-2 text-muted-foreground">
                <li>If you want to support network security and governance.</li>
                <li>
                  If you prefer a simple, secure, and predictable staking
                  experience.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-medium block">Choose EVM Staking</span>
              <ul className="mt-2 pl-6 space-y-2 text-muted-foreground">
                <li>
                  If you are looking for liquidity or want to use your staked
                  tokens in DeFi.
                </li>
                <li>
                  If you are comfortable with smart contract risk and higher gas
                  fees.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
}
