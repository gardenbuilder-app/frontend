import { graphql } from "msw"

export const handlers = [
  /*************************
      QUERY MOCKS
  ***************************/

  //Example query mock formatting, with data
  graphql.query("MOCK_QUERY", (req, res, ctx) => {
    return res(
      ctx.data({
        fake: {
          id: "abc123",
        },
      })
    )
  }),

  // //Example query mock formatting, with error
  // graphql.query("EXAMPLE_USER_QUERY", (req, res, ctx) => {
  //   return res(
  //     ctx.errors([
  //       {
  //         status: 400,
  //         message: 'OOPS'
  //       }
  //     ]))
  // }),

  graphql.query("GET_USER_GARDENS", (req, res, ctx) => {
    return res(
      ctx.data({
        gardens: [
          {
            id: "1",
            name: "Garden One",
            beds: [],
            endedAt: "2021-02-13T18:58:58.125Z",
            isActive: true,
            createdAt: "2021-02-13T18:58:58.125Z",
            updatedAt: "2021-02-13T18:58:58.125Z",
          },
          {
            id: "2",
            name: "Garden Two",
            beds: [
              { id: 1, name: "Bed One", isActive: true },
              { id: 2, name: "Bed Two", isActive: true },
            ],
            endedAt: "2021-02-13T18:58:58.125Z",
            isActive: false,
            createdAt: "2021-02-13T18:58:58.125Z",
            updatedAt: "2021-02-13T18:58:58.125Z",
          },
        ],
        errors: null,
      })
    )
  }),

  graphql.query("GET_USER_BEDS", (req, res, ctx) => {
    return res(
      ctx.data({
        beds: [
          {
            id: "1",
            name: "Bed One",
            endedAt: "2021-02-13T18:58:58.125Z",
            isActive: true,
            createdAt: "2021-02-13T18:58:58.125Z",
            updatedAt: "2021-02-13T18:58:58.125Z",
          },
          {
            id: "2",
            name: "Bed Two",
            endedAt: "2021-02-13T18:58:58.125Z",
            isActive: false,
            createdAt: "2021-02-13T18:58:58.125Z",
            updatedAt: "2021-02-13T18:58:58.125Z",
          },
        ],
        errors: null,
      })
    )
  }),

  graphql.query("GET_CURRENT_USER", (req, res, ctx) => {
    return res(
      ctx.data({
        currentUser: {
          user: {
            id: "abc123",
            email: "test@test.com",
          },
        },
      })
    )
  }),

  graphql.query("SINGLE_BED_QUERY", (req, res, ctx) => {
    return res(
      ctx.data({
        bed: {
          id: 1,
          length: 3,
          width: 3,
          unitOfMeasurement: "ft"
        },
      })
    )
  }),

  /*************************
      MUTATION MOCKS
  ***************************/

  graphql.mutation("SIGNUP_MUTATION", (req, res, ctx) => {
    const { email, password } = req.variables
    return res(
      ctx.data({
        createUser: {
          user: {
            id: "1",
            email,
            password,
          },
          token: "sometoken123",
        },
      })
    )
  }),

  graphql.mutation("SIGNIN_MUTATION", (req, res, ctx) => {
    const { email, password } = req.variables
    if (email === "test@test.com" && password === "testing!123") {
      return res(
        ctx.data({
          authenticateUser: {
            token: "sometoken123",
          },
        })
      )
    } else {
      return res(
        ctx.errors([
          {
            status: 400,
            message: "whoops",
          },
        ])
      )
    }
  }),

  graphql.mutation("CREATE_GARDEN_MUTATION", (req, res, ctx) => {
    return res(
      ctx.data({
        createGarden: {
          id,
          name,
        },
      })
    )
  }),

  graphql.mutation("MOCK_MUTATION", (req, res, ctx) => {
    const { id } = req.variables
    if (id === "abc123") {
      return res(
        ctx.data({
          makeThing: {
            id: "abc123",
          },
        })
      )
    } else {
      return res(
        ctx.errors([
          {
            status: 400,
            message: "Not a valid id",
          },
        ])
      )
    }
  }),

  //   //Example mutation mock formatting, with result
  //   graphql.mutation("EXAMPLE_LOGIN_MUTATION", (req, res, ctx) => {
  //     return res(
  //       ctx.data({
  //         login: {
  //           username,
  //         },
  //       })
  //     )
  //   }),
]
