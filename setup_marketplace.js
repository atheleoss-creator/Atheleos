import { pool } from './lib/db';

async function setupMarketplace() {
    try {
        console.log('Creating marketplace_items table...');
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS marketplace_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                seller_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                category VARCHAR(100) DEFAULT 'Equipment',
                condition_state ENUM('New', 'Like New', 'Used', 'Heavily Used') DEFAULT 'Used',
                image_url VARCHAR(500),
                status ENUM('listed', 'sold', 'delisted') DEFAULT 'listed',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Insert some dummy data to make the UI look active
        const [existingItems]: any = await pool.query('SELECT COUNT(*) as count FROM marketplace_items');
        
        if (existingItems[0].count === 0) {
            console.log('Inserting dummy data...');
            await pool.query(`
                INSERT INTO marketplace_items (seller_id, title, description, price, category, condition_state, image_url)
                VALUES 
                (1, 'Nike Air Zoom Alphafly NEXT%', 'Only worn twice. Great for marathons.', 180.00, 'Footwear', 'Like New', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'),
                (1, 'Wilson Pro Staff 97 Tennis Racket', 'Small scuff on the bumper guard. Freshly strung.', 120.00, 'Equipment', 'Used', 'https://images.unsplash.com/photo-1622279457486-640c4cb4e6ba?w=500&h=500&fit=crop'),
                (2, 'Gymshark Vital Seamless Leggings', 'Wrong size for me. Tags still on.', 35.00, 'Apparel', 'New', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop')
            `);
        }
        
        console.log('Marketplace setup complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error setting up marketplace:', error);
        process.exit(1);
    }
}

setupMarketplace();
