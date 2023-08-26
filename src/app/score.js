'use server'
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import jsonscore from './score.json' assert { type: 'json' };
export async function SubmitScore(Data) {
    console.log(JSON.parse(AES.decrypt(Data,new Date().toUTCString().split(" ").splice(0,4).join(" ")).toString(CryptoJS.enc.Utf8)));
}