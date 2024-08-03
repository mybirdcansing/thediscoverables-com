import { format } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'
export const AlbumDate = ({ dateString }: { dateString?: string }) => {
  if (dateString) {
    const date = parseISO(dateString)

    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
  } else {
    return 'no publish date'
  }
}
