export function displayDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString();
}