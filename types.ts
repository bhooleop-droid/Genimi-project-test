export interface ScriptData {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
  views: number;
  status: 'NEW' | 'HOT' | 'VERIFIED' | 'PATCHED';
  author: string;
  createdAt: number;
}

export type ViewState = 'HOME' | 'LIBRARY' | 'ADMIN';

export const TAG_OPTIONS = [
  'Aimbot', 'ESP', 'Auto Farm', 'Admin', 'Utility', 'Fun', 'UI Library', 'Key System'
];

export const STATUS_OPTIONS = ['NEW', 'HOT', 'VERIFIED', 'PATCHED'];