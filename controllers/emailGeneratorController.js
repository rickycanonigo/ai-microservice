const { ChatOpenAI } = require('@langchain/openai');
const { z } = require('zod');

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4",
  temperature: 0.5,
  verbose: true
});

function setInstructions(params) {
  return `
  Your name is ${params.persona_name} and you are a ${params.persona_description}. Your company name is ${params.persona_company} and you offer services about ${params.persona_services}.Generate a personalized email for the lead based on the following details.
  Set also the calendy link for picking-up the schedule of the meeting. If there is no link given, don't include the calendly and do not mention that you don't have a link.

  Lead Company: ${params.lead_company}
  Lead Company Description: ${params.lead_company_description}
  Lead Name: ${params.lead_name}
  Lead Email: ${params.lead_email}
  calendlylink: ${params.calendly_link??''}

  Here is the email:
  Subject: [AI to generate]
  Body: [AI to generate]
  `;
}

exports.generate = async (req, res) => {
  try {
    const { persona,leadDetails,others } = req.body;
    const details = { ...leadDetails[0], ...persona ,...others};

    const email = z.object({
      subject: z.string().describe(`The email subject`),
      body: z.string().describe(`The email body`),
    });

    const structuredLlm = model.withStructuredOutput(email);
    res.status(200).json(await structuredLlm.invoke(setInstructions(details)));
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle potential errors
  }
}