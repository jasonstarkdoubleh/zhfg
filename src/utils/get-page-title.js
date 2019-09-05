import defaultSettings from '@/settings'

const title = defaultSettings.title || '金价工程'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
