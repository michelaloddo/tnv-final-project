import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Rating = db.define('ratings', {
  idRating: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  movieId: {
    type: DataTypes.INTEGER
  },
  ratingStars: {
    type: DataTypes.INTEGER
  },
  textComment: {
    type: DataTypes.STRING
  },
  timestamp: {
    type: DataTypes.DATE, // Utilizziamo il tipo di dato "DATE" per memorizzare la data e l'ora
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Impostiamo il valore predefinito come data e ora correnti
  }
}, {
  freezeTableName: true,
  timestamps: true
});
 
export default Rating;