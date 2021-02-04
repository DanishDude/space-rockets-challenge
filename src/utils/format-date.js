export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

export function formatDateTimeLocal(timestamp) {
  const date = new Date(timestamp);
  const tl = timestamp.length;
  const utcOffset = date.getTimezoneOffset();
  const localOffsetHours = timestamp.slice(tl - 6, tl - 3) * 60;
  const localOffsetMinutes =
    timestamp.slice(tl - 6, tl - 5) + timestamp.slice(tl - 2);
  const localOffset = localOffsetHours + localOffsetMinutes * 1;
  const sign = localOffset >= 0 ? "+" : "-";

  date.setMinutes(date.getMinutes() + utcOffset + localOffset);
  const gmtOffsetText = ` GMT${sign}${Math.abs(localOffset / 60)}`;

  return (
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date(date)) + gmtOffsetText
  );
}
