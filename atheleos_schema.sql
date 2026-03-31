-- Atheleos Complete MySQL Database Schema

-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT '/default_avatar.svg',
    cover_url VARCHAR(255),
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_level VARCHAR(50) DEFAULT 'unverified', -- e.g., blue (pro), green (scout), gold (team)
    role VARCHAR(50) DEFAULT 'athlete',
    
    -- Athlete Specific Stats
    sport VARCHAR(100),
    position VARCHAR(100),
    height VARCHAR(20),  -- e.g., '6-2'
    weight VARCHAR(20),  -- e.g., '195 lbs'
    top_speed VARCHAR(50), 
    vertical_leap VARCHAR(50),
    recruiting_status VARCHAR(50) DEFAULT 'Not Looking', -- 'Looking', 'Signed', 'Free Agent'
    city VARCHAR(100),
    state VARCHAR(100),

    otp_code VARCHAR(6),
    otp_expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Posts Table (Images, Videos, Texts)
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    media_url VARCHAR(255),
    media_type ENUM('image', 'video', 'text') NOT NULL DEFAULT 'text',
    caption TEXT,
    location VARCHAR(100),
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Comments Table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Likes Table
CREATE TABLE likes (
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Saved Posts Table
CREATE TABLE saved_posts (
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Follows Table (Followers / Following)
CREATE TABLE follows (
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Teams Table
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Matches Table
CREATE TABLE matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    league VARCHAR(100),
    team_a_id INT NOT NULL,
    team_b_id INT NOT NULL,
    team_a_score INT DEFAULT 0,
    team_b_score INT DEFAULT 0,
    status ENUM('upcoming', 'live', 'finished') DEFAULT 'upcoming',
    match_date DATETIME NOT NULL,
    highlight_url VARCHAR(255),
    FOREIGN KEY (team_a_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (team_b_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- 9. Achievements Table
CREATE TABLE achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    year VARCHAR(10), -- e.g., '2023', '2022-2023'
    verified BOOLEAN DEFAULT FALSE,
    icon_type VARCHAR(50), -- e.g., 'medal', 'trophy', 'certificate'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 10. Notifications Table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    actor_id INT NOT NULL,
    type ENUM('like','comment','follow') NOT NULL,
    post_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert Dummy Data for initial testing
INSERT INTO users (username, email, password_hash, full_name, role, is_verified, verification_level) 
VALUES 
('athlete', 'pro@athlete.com', 'hashed_password_here', 'Pro Athlete', 'athlete', TRUE, 'international'),
('fitness_guru', 'guru@fitness.com', 'hashed_password_here', 'Fitness Guru', 'coach', FALSE, 'unverified');

INSERT INTO posts (user_id, media_url, media_type, caption)
VALUES 
(1, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&h=500&fit=crop', 'image', 'Just finished a brutal 5-mile run. Prepping for the marathon next month!'),
(2, NULL, 'text', 'New PR on the bench press today! 225lbs let’s go! 🏋️‍♂️💪'),
(1, NULL, 'text', 'Recovery day. Form rolling and stretching.');

-- Mock Achievement
INSERT INTO achievements (user_id, title, description, year, verified, icon_type) VALUES
(1, 'State Champion', '100m Dash Division 1', '2023', TRUE, 'medal');
