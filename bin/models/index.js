import dbconnect from '../services/db/connect.js'
import Blocks from './Blocks.js'
import Config from './Config.js'
import Likes from './Likes.js'
import Match from './Match.js'
import Moderators from './Moderators.js'
import Cpa from './Cpa.js'
import ModeratorsActivity from './ModeratorsActivity.js'
import Payments from './Payments.js'
import ProfilesSchema from './Profiles.js'
import Reports from './Reports.js'

const Schema = dbconnect.mongoose.Schema

export default {
  Config: dbconnect.mongoose.model('Config', new Schema(Config)),
  Moderators: dbconnect.mongoose.model('Moderators', new Schema(Moderators)),
  Cpa: dbconnect.mongoose.model('Cpa', new Schema(Cpa)),
  Reports: dbconnect.mongoose.model('Reports', new Schema(Reports)),
  Match: dbconnect.mongoose.model('Match', new Schema(Match)),
  Likes: dbconnect.mongoose.model('Likes', new Schema(Likes)),
  Blocks: dbconnect.mongoose.model('Blocks', new Schema(Blocks)),
  ModeratorsActivity: dbconnect.mongoose.model('ModeratorsActivity', new Schema(ModeratorsActivity)),
  Payments: dbconnect.mongoose.model('Payments', new Schema(Payments)),
  Profiles: ProfilesSchema,
}
