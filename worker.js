addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const data = await request.json();
    
    // Insert the data into the D1 database
    const { name, email, subject, message } = data;
    const query = `INSERT INTO contact_information (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    
    try {
      await contactform.prepare(query).bind(name, email, subject, message).run();
      return new Response('Message stored successfully!', { status: 200 });
    } catch (error) {
      return new Response('Failed to store message.', { status: 500 });
    }
  }
  return new Response('Method not allowed', { status: 405 });
} 