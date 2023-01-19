import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  games: [],
  prevPage: null,
  nextPage: null,

  activeGame: [],

  groups: [],
  activeGroup: [],
  activeGroupCreator: [],

  groupMembers: [],
  events: [],
  eventMember: [],
  eventCreator: [],

  activeEvent: [],


  myGroups: [],
  myEvents: [],

  comments: []
})
