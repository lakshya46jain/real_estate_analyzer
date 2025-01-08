import { query } from "../database.js";

export const getAnalyzerLog = async () => {
  const { rows } = await query("SELECT * FROM analyzer_log");
  return rows;
};

export const addAnalyzerLog = async (log_data) => {
  const {
    bed,
    bath,
    acre_lot,
    house_size,
    city,
    state,
    zip_code,
    predicted_price,
  } = log_data;
  const { rows } = await query(
    "INSERT INTO analyzer_log (bed, bath, acre_lot, house_size, city, state, zip_code, predicted_price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [bed, bath, acre_lot, house_size, city, state, zip_code, predicted_price]
  );
  return rows[0];
};

export const updateAnalyzerLog = async (log_id, log_data) => {
  const {
    bed,
    bath,
    acre_lot,
    house_size,
    city,
    state,
    zip_code,
    predicted_price,
  } = log_data;
  const { rows } = await query(
    "UPDATE analyzer_log SET bed = $2, bath = $3, acre_lot = $4, house_size = $5, city = $6, state = $7, zip_code = $8, predicted_price = $9 WHERE id = $1 RETURNING *",
    [
      log_id,
      bed,
      bath,
      acre_lot,
      house_size,
      city,
      state,
      zip_code,
      predicted_price,
    ]
  );
  return rows[0];
};

export const deleteLogData = async (log_id) => {
  const { row_count } = await query("DELETE FROM analyzer_log WHERE id = $1", [
    log_id,
  ]);
  return row_count > 0; // Returns true if a row was deleted, false otherwise
};
