import React from 'react'
import { mount } from 'enzyme'
import RoleAndCapability from '../index'
import { RolesAndCapabilitiesBody } from '../rolesAndCapabilities'
import { store } from '../../../redux/rematch'
import { Provider } from 'react-redux'
import notistack from 'notistack'

jest.mock('notistack', () => ({
    useSnackbar: jest.fn(),
}))
const enqueueSnackbar = jest.fn()

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
      push: jest.fn(),
      location: {
          search: ""
      }
    }),
  }));

  jest.mock("mapbox-gl", () => jest.fn());

describe('RoleAndCapability section', () => {
    let wrapper: any

    beforeEach(() => {
        Storage.prototype.getItem = jest.fn(() => 'token')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        document.getElementsByTagName('head')[0].appendChild(script)
        jest.spyOn(notistack, 'useSnackbar').mockImplementation((): any => {
            return { enqueueSnackbar }
        })
        wrapper = mount(
            <Provider store={store}>
                <RoleAndCapability />
            </Provider>
        )
    })
    afterAll(() => {
        wrapper.unmount()
    })

    it('RoleAndCapability section component should match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render my RoleAndCapability section', () => {
        // wrapper.find('#capabillitesSecondMenu').at(0).simulate('click')
        // wrapper.find('.capabilitiesTab').at(0).simulate('click')
        // wrapper.find('.MuiButtonBase-root').at(0).simulate('click')
        // expect(wrapper.find('#rolesCapabilitesBody').length).toBe(1)
    })
})

describe('RoleAndCapability Table', () => {
    let wrapper: any
    let props: any = {
        data: {
            id: 1,
            name: 'adc',
            code: 30092,
            permissions: [
                {
                    id: 1,
                    name: 'adc',
                    code: 30092,
                },
            ],
            role: [{
                id: 1,
                permissions: [
                {
                    id: 1,
                    name: 'adc',
                    code: 30092,
                },
            ]},]
        },
    }
    beforeEach(() => {
        wrapper = mount(<RolesAndCapabilitiesBody {...props}/>)
    })

    it('Should render my RoleAndCapability table', () => {
        expect(wrapper.find('tbody').length).toBe(1)
    })
})
