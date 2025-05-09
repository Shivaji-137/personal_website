export default {
  async fetch(request, env, ctx) {
    if (request.method === 'POST') {
      const data = await request.json();
      const { name, email, subject, message } = data;

      const query = `INSERT INTO contact_information (name, email, subject, message) VALUES (?, ?, ?, ?)`;
      try {
        await env.contactform.prepare(query).bind(name, email, subject, message).run();
        return new Response('Message stored successfully!', { status: 200 });
      } catch (error) {
        return new Response('Failed to store message.', { status: 500 });
      }
    }

    return new Response('Method Not Allowed', { status: 405 });
  },
};
