import fileSystemAPI from './api/filesystem/api.ts'

interface Interfaces {
  filesystem: any
}

const requestInterfaces: Interfaces = {
  filesystem : fileSystemAPI
}

export const actionHandler = async (req: Request) => {
  const requestApi: string = req.headers.get('api') as string
  const requestAction: string = req.headers.get('action') as string
  const user: string = req.headers.get('authenticated-user') as string
  const providerCredentials: string = req.headers.get('provider-credentials') as string
  const providerType: string = req.headers.get('provider-type') as string
  
  const body = req.body ? await req.json() : {}

  const provider = {
    type: providerType,
    credentials: JSON.parse(providerCredentials)
  }
  
  try {
    const response = await requestInterfaces[requestApi as keyof Interfaces].api(user, body, provider, requestAction)
    const responseBody = response.body ? JSON.stringify(response.body) : ""
    return new Response(responseBody, { 
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080"
      }
    })
  } catch (e) {
    console.error(e)
    return new Response(e, { status: 500 });
  }
}