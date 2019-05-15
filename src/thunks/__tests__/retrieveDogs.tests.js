import { retrieveDogs } from '../retrieveDogs'
import { hasErrored, setLoading, fetchDogsSuccess, setDogsNext, fetchAdditionalDogsSuccess } from '../../actions'
import * as cleaner from '../../helpers/dogCleaner'

describe('retrieveDogs', () => {
  
  let mockDogs
  let mockZipCode
  let mockDispatch
  let mockNextSearch
  
  beforeEach(() => {
    mockDispatch = jest.fn()
    mockDogs = ['Poodle']
    mockZipCode = 77043
    mockNextSearch = 'nextUrl'
  })
  
  
  it('calls dispatch with the setLoading action', () => {
    const thunk = retrieveDogs(mockZipCode, mockDogs )
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true))
  })
  
  it('should dispatch hasErrored with a message if the response is not "ok"', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      }))
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })
  
  it('should dispatch setLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
        pagination: {
          total_pages: 5,
          _links: {
            next: {
              href: 'previousLink'
            }
          }
        }
      })
      }))
    cleaner.dogCleaner = jest.fn().mockImplementation(() => ['Poodle'])
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false))
  })
  
  it('should dispatch setDogsNext() with the next link if there is one', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          pagination: {
            total_pages: 5,
            _links: {
              next: {
                href: 'nextLink'
              }
            }
          }
        })
      }))
    cleaner.dogCleaner = jest.fn().mockImplementation(() => ['Poodle'])
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setDogsNext('nextLink'))
  })
  
  it('should not dispatch setDogsNext() if there is no next link', async () => {
    const setDogsNext = jest.fn()
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          pagination: {
            total_pages: 5,
            _links: {
              prev: {
                href: 'nextLink'
              }
            }
          }
        })
      }))
    cleaner.dogCleaner = jest.fn().mockImplementation(() => ['Poodle'])
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(setDogsNext).not.toHaveBeenCalled()
  })

  it('should dispatch fetchDogsSuccess if retrieveDogs thunk does not receive a nextSearch argument', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          pagination: {
            total_pages: 5,
            _links: {
              next: {
                href: 'previousLink'
              }
            }
          }
        })
      }))
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(fetchDogsSuccess())
  })
  
  it('should dispatch fetchAdditionalDogsSuccess if retrieveDogs thunk receives a nextSearch argument', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          pagination: {
            total_pages: 5,
            _links: {
              next: {
                href: 'previousLink'
              }
            }
          }
        })
      }))
    const thunk = retrieveDogs(mockZipCode, mockDogs, mockNextSearch)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(fetchAdditionalDogsSuccess())
  })
  
})