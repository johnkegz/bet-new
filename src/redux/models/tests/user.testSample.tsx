import users from '../users';
let state = {
    users: []
}

let state2 = {
    auth: {
        loggedIn: false,
        token: null
    },
    profile: {},
    data: {
        message: ""
    },
    users: ""
}

let payload = {}
describe("Organization model", () => {
    it("Should return user saveUsers reducer", () => {
        const result = users.reducers.saveUsers(state, payload)
        expect(JSON.stringify(result)).toBe("{\"users\":{}}");
    });

    // it("Should return authenticateUser reducer", () => {
    //     const result = users.reducers.authenticateUser(state2, payload)
    //     expect(JSON.stringify(result)).toBe("{\"auth\":{\"loggedIn\":false,\"token\":null},\"profile\":{},\"data\":{\"message\":\"\"},\"users\":\"\"}"
    //     );
    // });

    // it("Should return unauthorizedUser reducer", () => {
    //     const result = users.reducers.unauthorizedUser(state2, payload)
    //     expect(JSON.stringify(result)).toBe("{\"auth\":{\"loggedIn\":false,\"token\":null,\"currentUser\":null},\"profile\":{},\"data\":{},\"users\":\"\"}"
    //     );
    // });
})
