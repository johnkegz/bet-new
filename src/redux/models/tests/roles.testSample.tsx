import roles from '../roles';
let state = {
    roles: []
}


let payload = {}
describe("Organization model", () => {
    it("Should return organization reducer", () => {
        const result = roles.reducers.saveRoles(state, payload)
        expect(JSON.stringify(result)).toBe("{\"roles\":{}}");
    })
})
