import MindsDB from "mindsdb-js-sdk";

export default async function handler(req, res) {
  const { state, town, bedrooms, toilets, parking_space } = req.body;
  if (req.method === "POST") {
    try {
      await MindsDB.connect({
        user: process.env.MINDDB_USER,
        password: process.env.MINDDB_PASS,
      });

      real_estate_model = await MindsDB.Models.getModel(
        "real_estate_model",
        "mindsdb"
      );

      let queryOptions = {
        // Join model to this data source.
        join: "files.real_estate",
        where: [
          `t.state = "${state}"`,
          `t.town = "${town}"`,
          `t.bedrooms = "${bedrooms}"`,
          `t.toilets = "${toilets}"`,
          `t.parking_space = "${parking_space}"`,
        ],
      };

      const real_estate_predictor = await real_estate_model.batchQuery(
        queryOptions
      );
      res.status(201).json(real_estate_predictor);
    } catch (error) {
      // Failed to authenticate.
      console.log(error);
      throw error;
    }
  } else {
    try {
      const query = `SELECT * FROM files.real_estate`;
      await MindsDB.connect({
        user: process.env.MINDDB_USER,
        password: process.env.MINDDB_PASS,
      });

      const queryResult = await MindsDB.SQL.runQuery(query);

      if (queryResult.rows.length > 0) {
        res.status(201).json(queryResult.rows);
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
