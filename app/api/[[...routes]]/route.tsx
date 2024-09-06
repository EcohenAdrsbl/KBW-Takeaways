/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { pinata } from 'frog/hubs'
import { neynar } from 'frog/middlewares'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import { NeynarAPIClient } from "@neynar/nodejs-sdk";



const app = new Frog({
  basePath: '/api',
  browserLocation: '/',
  title: 'Find out Your Warpcast KPIs',
  hub: pinata(),
}).use(
  neynar({
    apiKey: '3615D928-2CBC-4EA6-868B-16FCDADE37D9',
    features: ['interactor', 'cast'],
  }),
)
// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { status, frameData, verified } = c

  const { fid } = frameData || {}

  const { displayName, followerCount, pfpUrl, viewerContext } = c.var.interactor || {}

  const url = "https://api.neynar.com/v2/farcaster/frame/validate";
  const options = {
  method: 'POST',
  headers: {
    accept: 'application/json', 
    api_key: '3615D928-2CBC-4EA6-868B-16FCDADE37D9',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    cast_reaction_context: true,
    follow_context: true,
    signer_context: false,
    channel_follow_context: false ,
    message_bytes_in_hex: '0a49080d1085940118f6a6a32e20018201390a1a86db69b3ffdf6ab8acb6872b69ccbe7eb6a67af7ab71e95aa69f10021a1908ef011214237025b322fd03a9ddc7ec6c078fb9c56d1a72111214e3d88aeb2d0af356024e0c693f31c11b42c76b721801224043cb2f3fcbfb5dafce110e934b9369267cf3d1aef06f51ce653dc01700fc7b778522eb7873fd60dda4611376200076caf26d40a736d3919ce14e78a684e4d30b280132203a66717c82d728beb3511b05975c6603275c7f6a0600370bf637b9ecd2bd231e'
  })
};

  let actionUrl;
  if (viewerContext?.following === true) {
    actionUrl = '/second'
  } else {
    actionUrl = '/isntfollowing'
  }


  return c.res({
    image: 'https://i.postimg.cc/LY9CDp4k/Korea-Takeawys.png',
    intents: [
      <Button action = {actionUrl}>Read Inline</Button>,
    ],
  })
})

app.frame('/isntfollowing', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: 'https://i.postimg.cc/4Kb2pdGN/Go-Follow-Slide-takeway-1.png',
    
    intents: [
      <Button action = '/'>Go Back 💌</Button>,
    ],
  })
})

app.frame('/second', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: 'https://i.postimg.cc/qh1mZ5gP/Korean-Web3-Influence.png',
    
    intents: [
      <Button action = '/'>👈</Button>,
      <Button action = '/third'>👉</Button>,
    ],
  })
})

app.frame('/third', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: 'https://i.postimg.cc/t7mS3wKP/Trading.png',
    
    intents: [
      <Button action = '/second'>👈</Button>,
      <Button action = '/fourth'>👉</Button>,
    ],
  })
})

app.frame('/fourth', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: 'https://i.postimg.cc/dD0NTwxw/Web3-Gaming.png',
    
    intents: [
      <Button action = '/third'>👈</Button>,
      <Button action = '/fifth'>👉</Button>,
    ],
  })
})


app.frame('/fifth', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: 'https://i.postimg.cc/Cndvysqz/Side-Event.png',
    
    intents: [
      <Button action = '/fourth'>👈</Button>,
      <Button action = '/last'>👉</Button>,
    ],
  })
})

https://i.postimg.cc/jWrkWfGF/Closing-Slide-takeway-1.png

app.frame('/last', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: 'https://i.postimg.cc/jWrkWfGF/Closing-Slide-takeway-1.png',
    
    intents: [
      <Button.Link href = 'https://x.com/AsafNadler/status/1831574016777212364'>See What Asaf Says 🚀 </Button.Link>,
    ],
  })
})



devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
