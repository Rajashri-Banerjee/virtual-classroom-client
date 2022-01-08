const initialState = {
    user : null,
    authenticated : false,
    authenticated_as : '',
    token : ''
}

export default function auth(state = initialState, action) {
    switch (action.type) {
      case 'ADD_USER':
        return {
            user : action.user,
            authenticated : true,
            authenticated_as : action.authenticated_as,
            token : action.token
        }
      default:
        return state
    }
  }