async function checkEndpoints() {
  const endpoints = [
    "/api/posts",
    "/api/events",
    "/api/marketplace",
    "/api/notifications",
    "/api/messages",
    "/api/users/suggested",
  ];

  console.log("Testing Core APIs...");
  let errors = 0;

  for (const ep of endpoints) {
    try {
      const res = await fetch(`http://localhost:3000${ep}`);
      if (!res.ok) {
        const text = await res.text();
        console.error(`❌ ${ep} failed with status ${res.status}: ${text}`);
        errors++;
      } else {
        console.log(`✅ ${ep} ok`);
      }
    } catch (e) {
      console.error(`❌ ${ep} network error:`, e.message);
      errors++;
    }
  }

  if (errors === 0) console.log("All endpoints passed.");
  process.exit(errors > 0 ? 1 : 0);
}

checkEndpoints();
