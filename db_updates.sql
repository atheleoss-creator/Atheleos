-- Update script to add the is_hidden column for the Hide Post feature
ALTER TABLE posts ADD COLUMN is_hidden BOOLEAN DEFAULT FALSE;
