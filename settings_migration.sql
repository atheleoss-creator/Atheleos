-- Settings Feature Migration
-- Run this on your Hostinger MySQL database

-- Add is_private column to users table (if not exists)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_private BOOLEAN DEFAULT FALSE;
