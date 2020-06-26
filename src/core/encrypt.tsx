
//@ts-ignore
const CryptoJS = window.CryptoJS;
/* ------------------------ AES加密 ------------------------ */
const key = CryptoJS.enc.Utf8.parse('yulebaby88888888')             // 秘钥
const encrypt = (str: string): string => {
  let srcs = CryptoJS.enc.Utf8.parse(str);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

const iv = CryptoJS.enc.Utf8.parse('');
const _encrypt_ = (word: string): string => {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
const _decrypt_ = (word: string | null): string | null => {
  if (!word) { return null; }
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
export const Aes = { encrypt, _encrypt_, _decrypt_ };