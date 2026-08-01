import { Outlet, useLocation, useParams } from 'react-router-dom'
import { TopBar } from '@/components'
import { BufferedEditsProvider } from '@/context/BufferedEditsContext'

const routeTitles: Record<string, string> = {
  '': 'Resource Overview',
  details: 'Resource Details',
  'basic-info': 'Basic Info',
  'project-details': 'Project Details',
}

export function ResourceLayout() {
  const location = useLocation()
  const { resourceId } = useParams()
  const segment = location.pathname.split('/').pop() || ''
  const title = routeTitles[segment] || 'Resource Overview'

  return (
    <BufferedEditsProvider>
      <TopBar title={title} />
      <Outlet context={{ resourceId }} />
    </BufferedEditsProvider>
  )
}
