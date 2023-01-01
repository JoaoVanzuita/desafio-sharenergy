import { EncryptStorage } from 'encrypt-storage'

import { Environment } from '../environment'

export const encryptStorage = new EncryptStorage(Environment.HASH_KEY)