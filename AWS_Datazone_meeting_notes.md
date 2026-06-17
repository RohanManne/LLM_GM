# AWS DataZone Meeting Notes

Source: AWS DataZone transcript  
Length: approximately 57 minutes

## Executive Summary

The meeting focused on getting a clear, executive-ready AWS DataZone status update for William by end of day. The main concern was that leadership has not had enough visible progress for the last two to three weeks, and they need more than meeting touchpoints: they need current status, owners, dates, blockers, dependencies, and a realistic view of what can be completed by June 30 and what moves into Q3.

The team confirmed that the pilot requirements have not changed. The same high-level requirement remains: harvest technical metadata from agreed sources and validate whether AWS DataZone or GCP is the better fit for the use case. However, the team also clarified that the existing requirements document is business/product-oriented and does not include the detailed AWS configuration and certification requirements needed by the cloud/security teams.

AWS remains the priority for William, while GCP can continue in parallel. The group agreed that the AWS and GCP paths should be managed separately so that GCP progress does not slow AWS progress or confuse leadership updates.

## Key Decisions / Alignments

- AWS DataZone is the immediate priority for executive status reporting.
- GCP work can continue in parallel, but AWS progress should not be slowed by GCP.
- The AWS and GCP tracks should be separated in reporting and planning.
- The requirements are considered stable from a product/business standpoint.
- A new configuration-level requirements document is needed for AWS services and certification.
- The AWS POC should remain time-bound and should not stretch into a multi-month project if avoidable.
- The data involved is metadata only, specifically E1 metadata, not transaction-level data or PII.
- Leadership needs a concise email-ready update, not just a Confluence link.

## Current AWS DataZone Status

### Completed / Mostly Complete

- Mars account has been created.
- Required roles for the Mars account have been created.
- Glue issue was resolved.
- Glue data source / crawler-related setup has been created for the Mars account.
- Glue database has been created.
- Glue security group blocker appears resolved.
- Crawler configuration is done, but actual execution depends on ACL completion.

### In Progress

- ACL requests have been raised for connectivity.
- NETSEC execution is needed for ACLs.
- Metadata connectivity requires both AWS-to-NSM portal connectivity and Illumio firewall work.
- Configuration documentation needs to be created by the solution/product/engineering group.
- Phase 1 certification needs to begin after configuration requirements are clear.

### Not Started / Pending

- AWS DataZone provisioning is not yet complete.
- SageMaker Unified Studio setup for the Mars account is not started.
- IAM roles tied to SageMaker/DataZone certification and domain enablement are pending.
- DataZone project creation, domain whitelisting, validation of access, and related tasks depend on earlier IAM/certification work.
- Technical metadata validation cannot begin until metadata is successfully harvested.

## Major Dependencies / Blockers

- ACL approval and implementation by NETSEC.
- Illumio firewall approval for database connectivity.
- Configuration-level requirements for AWS DataZone, Glue, SageMaker Studio, IAM roles, and related services.
- Phase 1 certification for required AWS services/features.
- Security/cloud leadership prioritization if certification becomes a delay.
- Clear ownership and dates for each dependency so William/leadership knows where to escalate if needed.

## Target Dates Mentioned

- End of day: provide William an AWS DataZone status update.
- Next 30 minutes after meeting: follow-up working session to refresh the status table.
- June 24: tentative target for ACL-related work.
- June 26: tentative target for SageMaker/DataZone-related role/dependency work, subject to configuration and certification dependencies.
- June 30: leadership wants clarity on what can realistically be produced by this date.
- Q3: leadership wants clarity on what will continue beyond June.
- GCP account/access expected by end of week, with POC possible starting next Monday.
- GCP demo may occur next Wednesday depending on product manager availability.

## Action Items

| Action | Owner(s) | Due / Timing | Notes |
|---|---|---:|---|
| Prepare email-ready AWS DataZone status update for William | Alex, Saumil, Pradeep, team | End of day | Must include current status, dates, blockers, owners, and dependencies. |
| Reshare detailed requirements document | Saumil | Immediate | Existing document is product/business focused. |
| Create AWS configuration requirements document | Saumil, Mukul, Rakesh | Target: Monday / June 22 | Should define required AWS features/configs/roles for DataZone, Glue, SageMaker Studio, etc. |
| Share configuration requirements with Sumit | Saumil, Mukul, Rakesh | After doc is ready | Needed for Phase 1 certification request. |
| Initiate/push Phase 1 certification | Sumit | After config requirements | Requires prioritization with cloud/security leadership if blocked. |
| Expedite ACL implementation | Divya | Target: June 24 | Divya to push NETSEC and reach out for leadership escalation if needed. |
| Confirm Mars account CAR ID and share with group | Rakesh / Mukul | Immediate | There may be more than one CAR ID. |
| Refresh task table with status, owner, ETA, dependency | Divya, Mukul, Rakesh, Karthik | Follow-up call | Needed for executive-ready reporting. |
| Add Alex to Confluence page and MDM channel | Divya / team | After call | Use MDM channel for ongoing communication/history. |
| Schedule follow-up call to clean up status table | Divya / team | 30 minutes after meeting | Alex requested to be invited regardless of availability. |
| Provide GCP POC account/access | Karthik | End of week | GCP can be ready for POC starting next Monday. |
| Schedule GCP demo / Dataplex visibility session | Karthik / team | Possibly next Wednesday | Product manager availability may affect timing. |

## Speaker-Separated Notes

### Alex

- Requested a concrete AWS DataZone status update for William by end of day.
- Emphasized that William wants visible progress, not just meeting cadence.
- Asked for owners, dates, blockers, dependencies, and realistic deliverables by June 30 and Q3.
- Clarified that he needs an email-ready write-up, not a Confluence link.
- Asked that AWS and GCP not be mixed in one reporting path.
- Stated that leadership needs enough detail to know where to escalate blockers.
- Emphasized that this is metadata only, not transaction-level data or PII.

### Saumil / Somil

- Clarified that pilot requirements have not changed.
- Noted that the same requirements apply regardless of AWS DataZone or GCP.
- Agreed to reshare the detailed requirements document.
- Clarified that the existing requirements are product/business requirements, not configuration-level cloud requirements.
- Agreed to work with Mukul and Rakesh on configuration requirements.
- Confirmed that metadata validation would be owned from the GAR/product side with Pradeep.

### Divya

- Drove the walkthrough of task status, dependencies, dates, and ownership.
- Stated the Confluence page needs timeline/task/dependency/risk updates.
- Identified Phase 1 certification as a critical dependency.
- Confirmed ACLs and NETSEC follow-up are being pushed.
- Planned a follow-up call to refresh the table and prepare the executive update.

### Rakesh / Mukul

- Confirmed the Mars account exists.
- Confirmed roles were created on the Mars account.
- Confirmed Glue-related setup is complete or mostly complete.
- Confirmed crawler configuration is complete, but execution depends on ACLs.
- Noted that ACLs were raised and are needed before metadata can be harvested.
- Will help create configuration-level requirements and update task status.

### Sumit

- Explained that Phase 1 certification requires detailed configuration requirements.
- Needs clarity on which AWS service features, roles, permissions, and security rules are required.
- Will work with the trust/security team once configuration details are available.
- Noted that leadership prioritization may be needed for certification.

### Karthik

- Suggested creating a clear date-by-date plan with end dates and dependencies.
- Said POC work should be time-bound and should not become a large extended project.
- Offered to help unblock CESA / security-related challenges.
- Mentioned low-risk exception as a possible fallback if certification delays the POC.
- Confirmed GCP account/access could be ready by end of week.
- Emphasized AWS needs a stronger, clearer point of view for William.

## Clean Timestamped Transcript

The cleaned timestamped transcript is saved separately as:

`AWS_Datazone_clean_timestamped_transcript.txt`
