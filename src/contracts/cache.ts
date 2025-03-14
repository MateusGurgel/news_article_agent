export type CacheTypes = number | string | Record<PropertyKey, any>

export abstract class Cache {
    abstract get(key: string): Promise<string | null>

    abstract set(key: string, value: CacheTypes, expiresIn: number): Promise<void>

    async it<T extends CacheTypes>(
        key: string,
        handler: () => Promise<T>,
        expiresIn: number = 3600,
        deserializer: (value: string) => T = JSON.parse,
        serializer: (value: T) => string = JSON.stringify,
    ) {
        const value = await this.get(key)

        if (value)
            return deserializer(value)

        const newValue = await handler()

        await this.set(key, serializer(newValue), expiresIn)

        return newValue
    }
}