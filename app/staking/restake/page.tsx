export default function Restake() {
  return (
    <div className="container mx-auto p-6">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-4xl relative pb-4 mb-6">
          REStake ON SHIDO
          <span className="absolute bottom-2.5 left-0 w-[50px] border-b-2 border-sidebar-primary"></span>
        </h1>

        <div className="mb-8">
          <p className="text-lg text-muted-foreground">
            Since I'm seeing loads of questions about the security of restaking
            on Cosmos-based chains like $SHIDO, especially concerning the use of
            REStake, I want to address these concerns and provide a
            comprehensive explanation.
          </p>

          <p className="text-lg text-muted-foreground mt-4">
            Many users are worried about the potential risks involved in
            granting staking permissions to validators. This article aims to
            reassure you about the safety measures in place and explain why
            StakeAuthorization is a secure method that ensures validators can
            only withdraw and restake your funds within strict limits. Let's
            delve into the specifics of StakeAuthorization and understand why it
            provides robust security for your delegations.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6 uppercase">
          Understanding StakeAuthorization
        </h2>

        <p className="text-muted-foreground mb-6">
          StakeAuthorization is a robust mechanism designed to authorise
          specific staking-related actions on behalf of a delegator. It allows a
          delegator (the granter) to authorise another account (the grantee) to
          perform actions such as delegating, undelegating, or redelegating
          tokens within predefined limits.
        </p>

        <h3 className="text-xl font-semibold mb-4 uppercase">
          Here's a breakdown of the key components of StakeAuthorization:
        </h3>

        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
          <li>
            <span className="font-medium">Authorization Type:</span> Specifies
            the type of action authorised—delegation, undelegation, or
            redelegation. Each action requires separate authorization.
          </li>
          <li>
            <span className="font-medium">MaxTokens:</span> Sets a cap on the
            amount of tokens that can be managed under this authorization. If
            left empty, there is no limit, allowing flexibility in token
            management.
          </li>
          <li>
            <span className="font-medium">Validators List:</span> Includes
            either an AllowList or a DenyList. The AllowList specifies which
            validators the grantee can delegate to, while the DenyList lists
            validators to which delegation is prohibited.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-6 uppercase">
          Security Features of StakeAuthorization
        </h2>

        <ul className="list-disc pl-6 space-y-4 text-muted-foreground mb-8">
          <li>
            <span className="font-medium block">Granular Control</span>
            <p>
              Delegators can precisely control which validators their tokens can
              be delegated to through the AllowList and DenyList. This ensures
              that even if a validator is compromised, the tokens can only be
              staked with approved validators.
            </p>
          </li>
          <li>
            <span className="font-medium block">Limited Scope</span>
            <p>
              By setting the MaxTokens limit, delegators can restrict the
              maximum amount of tokens that can be managed, preventing excessive
              delegation that could risk their holdings.
            </p>
          </li>
          <li>
            <span className="font-medium block">
              Action-Specific Authorization
            </span>
            <p>
              StakeAuthorization requires separate permissions for delegating,
              undelegating, and redelegating. This separation of concerns adds
              an extra layer of security, ensuring that even if one
              authorization is granted, it does not automatically grant the
              others.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-6 uppercase">
          Safety Measures for Delegators
        </h2>

        <ul className="list-disc pl-6 space-y-4 text-muted-foreground mb-8">
          <li>
            <span className="font-medium block">Control Over Funds</span>
            <p>
              The coins delegated through StakeAuthorization remain in the
              delegator's Keplr wallet. Validators, or any other entity, do not
              have the ability to withdraw, transfer, or dispose of these funds.
              Even if a validator or the restake app gets hacked, the funds are
              secure and remain under the control of the delegator.
            </p>
          </li>
          <li>
            <span className="font-medium block">Explicit Validator Lists</span>
            <p>
              By carefully defining the AllowList and DenyList, delegators can
              ensure their tokens are only staked with trusted validators. This
              prevents unauthorized staking actions with untrusted or malicious
              validators.
            </p>
          </li>
          <li>
            <span className="font-medium block">Gas Costs as a Deterrent</span>
            <p>
              The Cosmos SDK charges gas for each validator listed in the
              AllowList or DenyList. This cost structure discourages the
              creation of excessively large lists, which could complicate
              management and auditing of staking permissions.
            </p>
          </li>
          <li>
            <span className="font-medium block">Revocation and Management</span>
            <p>
              Delegators retain the ability to revoke or modify
              StakeAuthorizations as needed. The system is designed to iterate
              over and manage the state of these authorizations efficiently,
              ensuring that any changes or revocations are promptly reflected.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-6 uppercase">Conclusion</h2>

        <p className="text-muted-foreground mb-6">
          StakeAuthorization on Cosmos-based chains like $SHIDO provides a
          secure and flexible framework for delegating staking responsibilities.
          By allowing detailed control over staking actions and imposing strict
          limits on what can be done with delegator funds, it ensures that
          validators can only withdraw and restake tokens within the predefined
          boundaries set by the delegator. This granular control and security
          measures help maintain trust and safety in the delegation process,
          providing peace of mind to users.
        </p>

        <p className="text-muted-foreground mb-8">
          For those interested in exploring the technical specifics, the Cosmos
          SDK documentation and GitHub repositories offer detailed examples and
          implementations. By understanding and utilising these features,
          delegators can confidently engage with validators while maintaining
          full control over their assets.
        </p>
      </article>
    </div>
  );
}
