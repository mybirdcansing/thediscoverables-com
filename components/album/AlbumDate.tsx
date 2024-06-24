import { format, parseISO } from 'date-fns'

export default function AlbumDate({ dateString }: { dateString: string }) {
  if (dateString) {
    const date = parseISO(dateString)

    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
  } else {
    return <em>publish date</em>
  }
}
