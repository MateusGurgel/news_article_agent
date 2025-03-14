import {createHash, pbkdf2Sync, randomBytes, timingSafeEqual} from 'node:crypto'

export namespace Crypto {
    export function compareString(a: string, b: string): boolean {
        try {
            return timingSafeEqual(Uint8Array.from(Buffer.from(a)), Uint8Array.from(Buffer.from(b)))
        } catch {
            return false
        }
    }

    export function compareEncryptedData(encryptedData: string, data: string, pepper: string): boolean {
        const parsedEncryptedData = parseEncryptedData(encryptedData)
        const encryptedDataWithParsedData = encrypt(data, pepper, parsedEncryptedData.iterations, parsedEncryptedData.salt)
        return compareString(encryptedDataWithParsedData, encryptedData)
    }

    export function encrypt(data: string, pepper: string, iterations: number = 10000, salt?: string): string {
        if (!salt) salt = generateSalt()
        const result = pbkdf2Sync(pepper + data, salt, iterations, 64, 'sha512').toString('hex')
        return `sha512$${iterations}$${salt}$${result}`
    }

    export function generateSalt(): string {
        return randomBytes(16).toString('hex')
    }

    export function hashString(data: string, algorithm: string = 'sha265'): string {
        return createHash(algorithm).update(data).digest('hex')
    }

    function parseEncryptedData(data: string) {
        const splitPass = data.split('$')
        if (splitPass.length !== 4)
            throw new Error('Invalid encrypted data')
        return {
            iterations: parseInt(splitPass[1]),
            salt: splitPass[2],
            data: splitPass[3],
        }
    }

    export function randomString(length: number, chars: string): string {
        if (!chars)
            throw new Error('Argument \'chars\' should not be empty')

        const charsLength = chars.length
        if (charsLength > 256)
            throw new Error(
                'Argument \'chars\' should not have more than 256 characters' +
                ', otherwise unpredictability will be broken',
            )

        const bytes = randomBytes(length)
        const result = new Array(length)
        let cursor = 0

        for (let i = 0; i < length; i++) {
            cursor += bytes[i]
            result[i] = chars[cursor % charsLength]
        }

        return result.join('')
    }
}