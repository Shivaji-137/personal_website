const allowedOrigin = "https://www.shivajichaulagain.com.np";

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method === 'POST') {
      let data;
      try {
        data = await request.json();
      } catch {
        return new Response('Invalid JSON.', {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': allowedOrigin },
        });
      }

      const { name, email, subject, message } = data;

      if (!name || !email || !subject || !message) {
        return new Response('Missing required fields.', {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': allowedOrigin },
        });
      }

      try {
        const query = `INSERT INTO contact_information (name, email, subject, message) VALUES (?, ?, ?, ?)`;
        await env.contactform.prepare(query).bind(name, email, subject, message).run();
        return new Response('Message stored successfully!', {
          status: 200,
          headers: { 'Access-Control-Allow-Origin': allowedOrigin },
        });
      } catch (error) {
        console.error("DB error:", error);
        return new Response('Failed to store message.', {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': allowedOrigin },
        });
      }
    }

    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Access-Control-Allow-Origin': allowedOrigin },
    });
  },
};
