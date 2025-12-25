# Job Application Pipeline

This project is a simplified backend for an **Applicant Tracking System (ATS)**.  
It models job applications as a **state-driven workflow**, focusing on state transitions, eligibility checks, and immutable audit logs.


---

## Application State Model

Each application moves through a fixed set of states:
CREATED → ELIGIBLE → APPLIED → REJECTED


### Key ideas
- Current state is stored explicitly on the `Application`
- All state transitions are validated
- Invalid transitions are rejected
- Every state change is recorded in an audit log


---

## Why the APIs Are Designed This Way

### Main APIs
- `POST /jobs/:job_id/apply`  
  Creates an application and checks eligibility

- `POST /applications/:application_id/transition`  
  Explicitly moves an application to another state

- `GET /applications/:application_id`  
  Fetches application details along with audit history

### Design reasoning
- Controllers handle HTTP only
- Business rules live in services
- State transitions go through a single state machine


---

## Eligibility Rules

Eligibility rules are defined on the **Job** model (e.g. minimum CGPA, allowed branches).

### Flow
1. Candidate applies to a job
2. Job eligibility rules are evaluated
3. Application moves to:
   - `ELIGIBLE` if rules pass
   - `REJECTED` if rules fail
4. The decision is logged


---

## Audit Logs

All state transitions are recorded in `ApplicationLog`.

- Logs are append-only
- No update or delete operations are allowed
- Logs provide a complete and immutable history

This makes state changes traceable and auditable.

---

## Async Workers

The system is designed to support async workers such as:
- ATS evaluation (keyword matching)
- Notifications on state changes
- Background automation (timeouts, auto-rejection)

---

## Tech Stacks

- Node.js and Express.js
- MongoDB (with explicit state Modeling)