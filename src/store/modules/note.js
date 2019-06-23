const namespaced = true

const state = {
  notes: [],
  opened: false
}

const mutations = {
  CREATE(state, payload) {
    let { name, content, parent } = payload
    let _id = makeUniqueId(id => {
      if (state.notes.filter(n => n._id === id).length) return false
      return true
    })
    state.notes.push({
      _id,
      name,
      content,
      parent
    })
    return _id
  },
  UPDATE_NAME(state, payload) {
    let { _id, name } = payload
    let index = state.notes.findIndex(n => n._id === _id)
    state.notes[index].name = name
  },
  UPDATE_CONTENT(state, payload) {
    let { _id, content } = payload
    let index = state.notes.findIndex(n => n._id === _id)
    state.notes[index].content = content
  },
  UPDATE_PARENT(state, payload) {
    let { _id, parent } = payload
    // this note
    let note = state.notes[state.notes.findIndex(n => n._id === _id)]
    // old parent
    let oldParent =
      state.categories[state.categories.findIndex(c => c._id === note.parent)]
    // new parent
    let newParent =
      state.categories[state.categories.findIndex(c => c._id === parent)]
    // change
    oldParent.notes = oldParent.notes.filter(n => n._id !== _id)
    newParent.notes.push(_id)
    note.parent = parent
  },
  DELETE(state, payload) {
    let { _id } = payload
    state.notes = state.notes.filter(n => n._id !== _id)
  },
  DELETE_MANY(state, payload) {
    state.notes = state.notes.filter(n => !payload.includes(n._id))
  },
  OPEN(state, payload) {
    state.opened = payload._id
  }
}

const actions = {
  create({ commit }, payload) {
    return commit('CREATE', payload)
  },
  update({ commit }, payload) {
    if (payload.content) return commit('UPDATE_CONTENT', payload)
    else if (payload.parent) return commit('UPDATE_PARENT', payload)
    else if (payload.name) return commit('UPADTE_NAME', payload)
    else return false
  },
  delete({ commit, dispatch, getters }, payload) {
    dispatch(
      'category/unlinkNote',
      {
        noteId: payload._id,
        categoryId: getters.getById(payload._id).parent
      },
      {
        root: true
      }
    )
    return commit('DELETE', payload)
  },
  deleteMany({ commit }, payload) {
    return commit('DELETE_MANY', payload)
  },
  open({ commit }, payload) {
    commit('OPEN', payload)
  }
}

const getters = {
  getById(state) {
    return id => state.notes.filter(n => n._id === id)[0]
  }
}

function makeUniqueId(checker) {
  let a = 'n' + Date.now().toString(32)
  let b = Math.round(Math.random() * 1000).toString(32)
  if (checker(a + b)) return a + b
  else return makeUniqueId(checker)
}

export default { namespaced, state, mutations, actions, getters }
