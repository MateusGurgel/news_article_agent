declare module 'fastify-request-context' {
    interface RequestContextData {
        user: null
    }

    interface RequestContext {
        get<K extends keyof RequestContextData>(key: K): RequestContextData[K];
    }
}