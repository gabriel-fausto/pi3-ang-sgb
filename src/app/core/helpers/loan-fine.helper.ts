export function calculateFine(dueDate: Date): number {
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
        return 0;
    }

    return diffDays * 3;
}
