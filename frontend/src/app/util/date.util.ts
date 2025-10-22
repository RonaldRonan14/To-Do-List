export function isSameDay(dateA: Date, dateB: Date) {
  return dateA.getFullYear() === dateB.getFullYear()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getDate() === dateB.getDate();
}

export function isDueToday(taskDueDateIso?: string | null): boolean {
  if (!taskDueDateIso) return false;
  const due = new Date(taskDueDateIso);
  const today = new Date();
  return isSameDay(due, today);
}