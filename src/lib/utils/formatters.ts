import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  // Round to 2 decimal places and strip trailing zeros
  const rounded = Math.round(num * 100) / 100;
  if (Number.isInteger(rounded)) return rounded.toString();
  return rounded.toFixed(2).replace(/\.?0+$/, '');
}

export function formatValue(value: number | undefined): string {
  if (value === undefined || value === null) return '—';
  return formatNumber(value);
}

export function formatTimeAgo(timestamp: number | Date): string {
  return dayjs(timestamp).fromNow();
}

export function formatDate(timestamp: number | Date): string {
  return dayjs(timestamp).format('MMM D, YYYY');
}

export function formatDateTime(timestamp: number | Date): string {
  return dayjs(timestamp).format('MMM D, YYYY h:mm A');
}

export function formatPercentChange(oldVal: number, newVal: number): string {
  if (oldVal === 0) return '+∞%';
  const change = ((newVal - oldVal) / oldVal) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}
