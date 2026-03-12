-- 1. Add public_key to users table
ALTER TABLE users ADD COLUMN public_key TEXT;

-- 2. Add E2EE metadata columns to the messages table
ALTER TABLE messages ADD COLUMN iv VARCHAR(255);
ALTER TABLE messages ADD COLUMN recipient_encrypted_key TEXT;
ALTER TABLE messages ADD COLUMN sender_encrypted_key TEXT;
