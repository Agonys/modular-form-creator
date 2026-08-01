import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import {
  TopBarWrapper,
  TopBarInner,
  TopBarLeft,
  TopBarRight,
  BackButton,
} from './TopBar.styles'
import type { TopBarProps } from './TopBar.model'

export function TopBar({ title, rightContent }: TopBarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length <= 1) {
      navigate('/resources')
    } else {
      segments.pop()
      navigate('/' + segments.join('/'))
    }
  }

  return (
    <TopBarWrapper>
      <TopBarInner>
        <TopBarLeft>
          <BackButton onClick={handleBack}>
            <ArrowLeft size={18} /> Back
          </BackButton>
        </TopBarLeft>
        <TopBarRight>
          {title}
          {rightContent}
        </TopBarRight>
      </TopBarInner>
    </TopBarWrapper>
  )
}
