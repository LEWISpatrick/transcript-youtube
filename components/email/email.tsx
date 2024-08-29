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
    <Preview>Thanks for subscribing to Patrick's Newsletter 🙂</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hey!!</Text>
        <Text style={paragraph}>Thanks for subscribing to my newsletter</Text>
        <Text style={paragraph}>
          I will send you the latest news and updates about my Script-youtube or
          any other projects.
          <br />
          <br />
          If you have any suggestions or feedback, please check out the github
          repository.
        </Text>
        <Text style={paragraph}></Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href="https://github.com/LEWISpatrick/transcript-youtube"
          >
            Link To Github 👍💻
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          Patrick Henry{' '}
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
  color: 'black',
  marginBottom: '10px',
  marginTop: '10px',
  fontWeight: 'bold'
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
  padding: '12px',
  marginBottom: '10px'
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0'
}

const footer = {
  color: '#8898aa',
  fontSize: '12px'
}
