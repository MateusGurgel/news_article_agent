import {cache} from "../../../start/cache";

export function CacheDecorator(expiresIn: number = 3600) {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const cacheKey = `cache:decoractor:${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`

            const cached = await cache.get(cacheKey)

            if (cached)
                try {
                    return JSON.parse(cached)
                } catch {
                    return cached
                }

            const result = await originalMethod.apply(this, args)

            await cache.set(cacheKey, result, expiresIn)

            return result
        }
    }
}