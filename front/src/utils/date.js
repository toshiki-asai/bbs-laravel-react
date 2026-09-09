
export function formatDate(date_string) {
  const d = new Date(date_string);
  const pad = n => String(n).padStart(2, '0');

  return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())+" "
    +pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
}
