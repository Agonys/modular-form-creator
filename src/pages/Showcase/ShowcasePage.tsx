import { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Card,
  Badge,
  IconButton,
  Drawer,
  theme,
} from '../../design-system'

export function ShowcasePage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const [groupValue, setGroupValue] = useState<string[]>(['FE devs'])
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  return (
    <ShowcaseWrapper>
      <h1>Design System Showcase</h1>

      <Section title="Colors">
        <ColorGrid>
          {Object.entries(theme.colors).map(([name, value]) => (
            <ColorSwatch key={name}>
              <ColorPreview style={{ background: value }} />
              <ColorLabel>{name}</ColorLabel>
              <ColorValue>{value}</ColorValue>
            </ColorSwatch>
          ))}
        </ColorGrid>
      </Section>

      <Section title="Typography">
        <TypographySample>
          <HeadingSample>Space Grotesk Heading</HeadingSample>
          <BodySample>Source Sans 3 body text — The quick brown fox jumps over the lazy dog.</BodySample>
        </TypographySample>
      </Section>

      <Section title="Badge">
        <BadgeRow>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </BadgeRow>
      </Section>

      <Section title="Card">
        <CardRow>
          <Card variant="outline" style={{ padding: theme.spacing.lg, maxWidth: 300 }}>
            <h3>Outline Card</h3>
            <p>Card with border outline variant.</p>
          </Card>
          <Card variant="elevated" style={{ padding: theme.spacing.lg, maxWidth: 300 }}>
            <h3>Elevated Card</h3>
            <p>Card with shadow and elevated appearance.</p>
          </Card>
        </CardRow>
      </Section>

      <Section title="Button">
        <ButtonGrid>
          {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
            <ButtonGroup key={variant}>
              <GroupLabel>{variant}</GroupLabel>
              {(['small', 'medium', 'large'] as const).map((size) => (
                <ButtonRow key={size}>
                  <Button variant={variant} size={size} state="normal">
                    {size}
                  </Button>
                  <Button variant={variant} size={size} state="disabled" disabled>
                    {size}
                  </Button>
                  <Button variant={variant} size={size} state="locked" lockedIcon={<LockIcon />}>
                    {size}
                  </Button>
                </ButtonRow>
              ))}
            </ButtonGroup>
          ))}
        </ButtonGrid>
      </Section>

      <Section title="IconButton">
        <ButtonGrid>
          {(['solid', 'ghost'] as const).map((variant) => (
            <ButtonGroup key={variant}>
              <GroupLabel>{variant}</GroupLabel>
              {(['small', 'medium', 'large'] as const).map((size) => (
                <ButtonRow key={size}>
                  <IconButton variant={variant} size={size} state="normal">
                    <Icon name="github-icon" />
                  </IconButton>
                  <IconButton variant={variant} size={size} state="disabled" disabled>
                    <Icon name="github-icon" />
                  </IconButton>
                  <IconButton variant={variant} size={size} state="locked" lockedIcon={<LockIcon />}>
                    <Icon name="github-icon" />
                  </IconButton>
                </ButtonRow>
              ))}
            </ButtonGroup>
          ))}
        </ButtonGrid>
      </Section>

      <Section title="Input">
        <InputColumn>
          <Input label="Default" placeholder="Enter text..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Input label="With helper text" placeholder="Enter text..." helperText="This is helper text" />
          <Input label="With error" placeholder="Enter text..." error="This field is required" />
          <Input label="Disabled" placeholder="Disabled input" state="disabled" disabled />
          <Input label="Locked" placeholder="Locked input" state="locked" />
          <Input label="Multiline" placeholder="Enter description..." multiline rows={3} />
        </InputColumn>
      </Section>

      <Section title="Select">
        <SelectColumn>
          <Select
            label="Default"
            options={[
              { label: 'Internal', value: 'internal' },
              { label: 'External', value: 'external' },
              { label: 'Vendor', value: 'vendor' },
            ]}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          />
          <Select
            label="With error"
            options={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
            ]}
            error="Selection is required"
          />
          <Select
            label="Disabled"
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
            ]}
            state="disabled"
            disabled
          />
        </SelectColumn>
      </Section>

      <Section title="Checkbox">
        <CheckboxRow>
          <Checkbox label="Single checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        </CheckboxRow>
      </Section>

      <Section title="CheckboxGroup">
        <CheckboxGroup
          label="Team Members"
          options={['FE devs', 'BE devs', 'Designer', 'Data Eng', 'Product Owner']}
          value={groupValue}
          onChange={setGroupValue}
        />
      </Section>

      <Section title="Drawer">
        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        <Drawer title="Drawer Title" isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <p style={{ padding: theme.spacing.md }}>Drawer content goes here.</p>
        </Drawer>
      </Section>
    </ShowcaseWrapper>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <SectionWrapper>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionWrapper>
  )
}

function Icon({ name }: { name: string }) {
  return (
    <svg width="16" height="16">
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}

function LockIcon() {
  return <span>🔒</span>
}

const ShowcaseWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing.xxl} ${theme.spacing.lg};
  font-family: ${theme.typography.body};
`

const SectionWrapper = styled.div`
  margin-bottom: ${theme.spacing.xxl};
`

const SectionTitle = styled.h2`
  font-family: ${theme.typography.heading};
  font-size: 1.5rem;
  color: ${theme.colors.inkStrong};
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.spacing.sm};
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${theme.spacing.md};
`

const ColorSwatch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
`

const ColorPreview = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${theme.radii.sm};
  border: 1px solid ${theme.colors.border};
`

const ColorLabel = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.inkMuted};
`

const ColorValue = styled.span`
  font-size: 0.75rem;
  font-family: monospace;
  color: ${theme.colors.ink};
`

const TypographySample = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const HeadingSample = styled.h3`
  font-family: ${theme.typography.heading};
  font-size: 2rem;
  color: ${theme.colors.inkStrong};
  margin: 0;
`

const BodySample = styled.p`
  font-size: 1rem;
  color: ${theme.colors.ink};
  margin: 0;
`

const BadgeRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`

const CardRow = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`

const ButtonGrid = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  flex-wrap: wrap;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

const GroupLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${theme.colors.inkMuted};
  text-transform: capitalize;
  margin-bottom: ${theme.spacing.xs};
`

const ButtonRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
`

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  max-width: 400px;
`

const SelectColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  max-width: 400px;
`

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
`
