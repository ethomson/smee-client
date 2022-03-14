"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client = require("../src/client");
const nock = require("nock");
describe('client', () => {
    describe('createChannel', () => {
        test('returns a new channel', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = nock('https://smee.io').head('/new').reply(302, '', {
                Location: 'https://smee.io/abc123'
            });
            const channel = yield Client.createChannel();
            expect(channel).toEqual('https://smee.io/abc123');
            expect(req.isDone()).toBe(true);
        }));
    });
});
