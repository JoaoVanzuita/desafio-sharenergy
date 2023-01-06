declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEFAULT_USER_USERNAME: string
      DEFAULT_USER_PASSWORD: string
      DATABASE_URL: string
      JWT_SECRET: string
    }
  }
}

export { }