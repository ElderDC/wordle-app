export const getWordLettersCount = (word: string) => {
    const count = word.split('').reduce((acc: Record<string, number>, item) => {
        if (acc[item]) acc[item] += 1
        else acc[item] = 1
        return acc
    }, {})

    return count
}
