
export function formatDate(dateString: string): string {
  const d = new Date(dateString);
  const pad = (n:number) => String(n).padStart(2, '0');

  return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())+" "
    +pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
}
