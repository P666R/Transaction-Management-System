const { z } = require('zod');

const transactionDto = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  sold: z.boolean(),
  dateOfSale: z.string().transform((str) => new Date(str)),
});

module.exports = { transactionDto };
