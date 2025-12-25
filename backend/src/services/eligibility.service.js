export function checkEligibility({ job, candidate }) {
    const { minCgpa, allowedBranches } = job
    const { cgpa, branch } = candidate

    // CGPA check
    if (cgpa < minCgpa) {
        return {
        eligible: false,
        reason: `CGPA ${cgpa} is below required ${minCgpa}`
        }
    }

    // Branch check
    if (!allowedBranches.includes(branch)) {
        return {
        eligible: false,
        reason: `Branch ${branch} is not eligible`
        }
    }

    return {
        eligible: true,
        reason: 'Candidate meets all eligibility criteria'
    }
}
