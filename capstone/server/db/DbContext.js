import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { GroupSchema } from '../models/Group.js';
import { EventSchema } from '../models/Event.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Group = mongoose.model('Group', GroupSchema)

  Event = mongoose.model('Event', EventSchema)
}

export const dbContext = new DbContext()
