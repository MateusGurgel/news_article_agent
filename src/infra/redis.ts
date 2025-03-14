import {Redis as IORedis} from "ioredis";
import {Cache} from "../contracts/cache";

export class Redis extends Cache {
    private readonly client: IORedis

    constructor(url: string) {
        super()
        this.client = new IORedis(url);
    }

    get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async set(key: string, value: number | string | Record<PropertyKey, any>, expiresIn: number = 3600): Promise<void> {
        let val

        switch (typeof value) {
            case 'number':
                val = value
                break
            case 'string':
                val = value
                break
            case 'object':
                val = JSON.stringify(value)
                break
            default:
                throw new Error('Invalid value type')
        }

        await this.client.set(
            key,
            val,
            'EX',
            expiresIn
        );
    }
}