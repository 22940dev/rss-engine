const handler = (req, res) => {
  if (!req.method === "POST") {
    res.status(405).end();
    return;
  }

  const { name, email, blogurl, feedurl, notes } = req.body;
  const Airtable = require("airtable");

  const dotenv = require("dotenv");
  // read -- .env config gile
  dotenv.config();

  const base = new Airtable({ apiKey: process.env.API_KEY }).base(
    process.env.BASE_ID
  );

  base("Post").create(
    [{ fields: { name, email, blogurl, feedurl, notes } }],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }
    }
  );

  res.json({
    success: true,
  });
};

export default handler;
