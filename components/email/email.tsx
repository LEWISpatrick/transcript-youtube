import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components'

import * as React from 'react'

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const RepoEmail = () => (
  <Html>
    <Head />
    <Preview>Your 50% discount code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hey!!</Text>
        <Text style={paragraph}>Your 50% discount code is: 1234567890</Text>
        <Text style={paragraph}>
          Enjoy Writing your next Video Script with it!
        </Text>
        <Text style={paragraph}>Use it before 31/12/2025</Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href="https://github.com/NizarAbiZaher/nizzy-starter"
          >
            Link Back to website 🖥️👀
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          Nizzy
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          1550 E Campbell Ave, Phoenix, AZ 85014, United States
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RepoEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px'
}

const logo = {
  margin: '0 auto'
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: 'black'
}

const btnContainer = {
  textAlign: 'center' as const
}

const button = {
  backgroundColor: '#1F8EEF',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px'
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0'
}

const footer = {
  color: '#8898aa',
  fontSize: '12px'
}
