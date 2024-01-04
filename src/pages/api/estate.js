import MindsDB from "mindsdb-js-sdk";

export default async function handler(req, res) {
  const { state, town, bedrooms, toilets, parking_space } = req.body;
  const { page } = req.query;
  if (req.method === "POST") {
    try {
      await MindsDB.connect({
        user: process.env.MINDDB_USER,
        password: process.env.MINDDB_PASS,
      });

      const real_estate_model = await MindsDB.Models.getModel(
        "real_estate_model",
        "mindsdb"
      );
      // status: 'complete',
      let queryOptions = {
        where: [
          `t.state = "${state}"`,
          `t.town = "${town}"`,
          `t.bedrooms = "${bedrooms}"`,
          `t.toilets = "${toilets}"`,
          `t.parking_space = "${parking_space}"`,
        ],
      };

      const real_estate_predictor = await real_estate_model.query(
        queryOptions
      );
      res.status(201).json(real_estate_predictor);
    } catch (error) {
      // Failed to authenticate.
      console.log(error);
      throw error;
    }
  } else {
    let page_number = parseInt(page) || 1;
    let offset = (page_number -1 ) * 9;
    try {
      const query = `SELECT * FROM files.real_estate ORDER BY price LIMIT 9 OFFSET ${offset}`;
      const count = `SELECT COUNT(*) FROM files.real_estate`;
      await MindsDB.connect({
        user: process.env.MINDDB_USER,
        password: process.env.MINDDB_PASS,
      });

      const queryResult = await MindsDB.SQL.runQuery(query);
      const countResult = await MindsDB.SQL.runQuery(count);

      if (queryResult.rows.length > 0) {
        res.status(201).json({rows:queryResult.rows, totals: countResult.rows});
      } else {
        res.status(201).json({ rows: "no data found" });
      }
    } catch (error) {
      // Failed to authenticate.
      console.log(error);
      throw error;
    }
  }
}
