export function calculateFine(dueDate: Date): number {
    const today = new Date();
    const due = new Date(dueDate);

    const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utcDue = Date.UTC(due.getFullYear(), due.getMonth(), due.getDate());

    const diffDays = Math.floor((utcToday - utcDue) / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays * 3 : 0;
}
