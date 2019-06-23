const namespaced = true

const state = {
  categories: []
}

const mutations = {
  CREATE_ROOT(state) {
    state.categories.push({
      _id: 'c0',
      name: 'root',
      parent: '0',
      categories: [],
      notes: []
    })
  },
  CREATE(state, payload) {
    let { name, parent } = payload
    let _id = makeUniqueId(id => {
      if (state.categories.filter(c => c._id === id).length) return false
      return true
    })
    state.categories.push({
      _id,
      name,
      parent,
      categories: [],
      notes: []
    })
    state.categories.filter(c => c._id == parent)[0].categories.push(_id)
    return _id
  },
  UPDATE_NAME(state, payload) {
    let { _id, name } = payload
    let index = state.categories.findIndex(c => c._id === _id)
    state.categories[index].name = name
  },
  UPDATE_PARENT(state, payload) {
    let { _id, parent } = payload
    // this category
    let cat = state.categories[state.categories.findIndex(c => c._id === _id)]
    // old parent
    let oldParent =
      state.categories[state.categories.findIndex(c => c._id === cat.parent)]
    // new parent
    let newParent =
      state.categories[state.categories.findIndex(c => c._id === parent)]
    // change
    oldParent.categories = oldParent.categories.filter(c => c !== _id)
    newParent.notes.push(_id)
    cat.parent = parent
  },
  DELETE(state, payload) {
    state.categories = state.categories.filter(c => !payload.includes(c._id))
  },
  LINK_NOTE(state, payload) {
    let { categoryId, noteId } = payload
    let category =
      state.categories[state.categories.findIndex(c => c._id === categoryId)]
    category.notes.push(noteId)
  },
  UNLINK_NOTE(state, payload) {
    let { categoryId, noteId } = payload
    let category =
      state.categories[state.categories.findIndex(c => c._id === categoryId)]
    category.notes = category.notes.filter(n => n !== noteId)
  },
  UNLINK_CATEGORY(state, payload) {
    let { parentId, childId } = payload
    let parent =
      state.categories[state.categories.findIndex(c => c._id === parentId)]
    parent.categories = parent.categories.filter(n => n !== childId)
  }
}

const actions = {
  create({ commit }, payload) {
    return commit('CREATE', payload)
  },
  update({ commit }, payload) {
    if (payload.name) return commit('UPDATE_NAME', payload)
    else if (payload.parent) return commit('UPDATE_PARENT', payload)
    else return false
  },
  delete({ state, commit, dispatch }, payload) {
    let { _id } = payload
    // fetch this category
    let cat = state.categories[state.categories.findIndex(c => c._id === _id)]
    let toDelete = dig(cat, state, { categories: [], notes: [] })
    dispatch('unlinkCategory', { parentId: cat.parent, childId: _id })
    dispatch('note/deleteMany', toDelete.notes, { root: true })
    commit('DELETE', toDelete.categories)
  },
  linkNote({ commit }, payload) {
    commit('LINK_NOTE', payload)
  },
  unlinkNote({ commit }, payload) {
    commit('UNLINK_NOTE', payload)
  },
  unlinkCategory({ commit }, payload) {
    commit('UNLINK_CATEGORY', payload)
  }
}

const getters = {
  getById(state) {
    return id => state.categories.filter(c => c._id === id)[0]
  }
}

function makeUniqueId(checker) {
  let a = 'c' + Date.now().toString(32)
  let b = Math.round(Math.random() * 1000).toString(32)
  if (checker(a + b)) return a + b
  else return makeUniqueId(checker)
}

function dig(cat, state, collected) {
  collected.categories.push(cat._id)
  if (cat.notes.length) collected.notes = collected.notes.concat(cat.notes)
  if (cat.categories.length) {
    for (let i = 0; i < cat.categories.length; i++) {
      dig(
        state.categories[
          state.categories.findIndex(c => c._id === cat.categories[i])
        ],
        state,
        collected
      )
    }
  }
  return collected
}

export default { namespaced, state, mutations, actions, getters }
