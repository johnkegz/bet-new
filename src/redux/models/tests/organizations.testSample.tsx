import organizations from '../organizations';
let state = {
    organizations: []
}

let payload = {}
describe("Organization model", () => {
    it("Should return organization reducer", () => {
        const result = organizations.reducers.saveOrganizations(state, payload)
        expect(JSON.stringify(result)).toBe("{\"organizations\":{}}");
    })
})
