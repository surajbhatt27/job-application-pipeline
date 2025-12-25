export function generateAtsScore({ resume_txt, jobDescription }) {

    const normalize = (text) =>
        text
        .toLowerCase()                       //convert text in lower case.
        .replace(/[^a-z0-9\s]/g, '')         // regex ([^...] - neglected character class), g-global flag(replace all)
        .split(/\s+/)                        //Split on one or more whitespace characters(creates array of using it).

    const resumeWords = new Set(normalize(resume_txt))
    const jdWords = new Set(normalize(jobDescription))

    const matchedKeywords = []
    const missingKeywords = []

    for (const word of jdWords) {
        if (resumeWords.has(word)) {
            matchedKeywords.push(word)
        } else {
            missingKeywords.push(word)
        }
    }

    const score =
        jdWords.size === 0
        ? 0
        : Math.round((matchedKeywords.length / jdWords.size) * 100)

    return {
        score,
        matchedKeywords,
        missingKeywords
    }
}
