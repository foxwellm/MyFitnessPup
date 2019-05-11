export const nextUrlReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_DOGS_NEXT':
      return action.nextUrl;
    default:
      return state
  }
}