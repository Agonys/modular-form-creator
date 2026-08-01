import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {
  ResourcesListPage,
  ResourceLayout,
  ResourceOverviewPage,
  ResourceDetailsPage,
  BasicInfoPage,
  ProjectDetailsPage,
  NotFoundPage,
} from './pages'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/resources" replace />} />
        <Route path="/resources" element={<ResourcesListPage />} />
        <Route path="/resources/:resourceId" element={<ResourceLayout />}>
          <Route index element={<ResourceOverviewPage />} />
          <Route path="details" element={<ResourceDetailsPage />} />
          <Route path="basic-info" element={<BasicInfoPage />} />
          <Route path="project-details" element={<ProjectDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
