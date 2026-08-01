import { useNavigate } from 'react-router-dom'
import { Button } from '@/design-system'
import { Heading, Message, Wrapper } from './NotFoundPage.styles'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Heading>404</Heading>
      <Message>Page not found.</Message>
      <Button variant="secondary" onClick={() => navigate('/resources')}>
        Back to Resources
      </Button>
    </Wrapper>
  )
}
