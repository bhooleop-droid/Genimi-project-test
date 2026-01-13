import { ScriptData } from './types';

export const INITIAL_SCRIPTS: ScriptData[] = [
  {
    id: '1',
    title: 'Nexus Hub V2 - Blox Fruits',
    description: 'The most powerful auto-farm for Blox Fruits. Includes auto-raid, fruit sniper, and ESP.',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/nexus/hub/main/loader.lua"))()',
    tags: ['Auto Farm', 'ESP', 'UI Library'],
    views: 12504,
    status: 'HOT',
    author: 'NexusDev',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Universal Aimbot & ESP',
    description: 'Works on 99% of FPS games. Silent aim, wallcheck, and tracers included.',
    code: 'getgenv().Setting = { SilentAim = true, ESP = true }; loadstring(game:HttpGet("https://script.site/universal.lua"))()',
    tags: ['Aimbot', 'ESP', 'Utility'],
    views: 8932,
    status: 'VERIFIED',
    author: 'ZeroCool',
    createdAt: Date.now() - 10000000
  },
  {
    id: '3',
    title: 'Infinite Yield FE',
    description: 'The classic admin commands script. Fly, noclip, spectate, and hundreds more commands.',
    code: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"))()',
    tags: ['Admin', 'Utility'],
    views: 45201,
    status: 'VERIFIED',
    author: 'Edge',
    createdAt: Date.now() - 50000000
  },
  {
    id: '4',
    title: 'Pet Simulator 99 - Auto Hatch',
    description: 'Fastest auto hatcher with multi-account support. Webhook integration.',
    code: 'print("Loading PS99 Script..."); wait(1); loadstring(game:HttpGet("https://ps99.xyz/loader"))()',
    tags: ['Auto Farm', 'Fun'],
    views: 3400,
    status: 'NEW',
    author: 'PetMaster',
    createdAt: Date.now() - 200000
  }
];

export const ADMIN_PASSWORD = "admin"; // In a real app, this would be backend validated