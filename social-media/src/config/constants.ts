

export const AUTH_CONFIG={
    passowordMinLength:8,
    passowordMaxLength:128,
    usernameMinLength:3,
    usernameMaxLength:30,
} as const


export const PAGINATION={
    defaultLimit:20,
    maxLimit:100,
} as const


export const ERROR_MESSAGES={
    uauthorized:"You must be logged in",
    forbidden:"You do not have persmission",
    notFound:"Resources not found",
    serverError:"Something went wrong",
    invaildCredentials:"Invaild email and password",
    emailTaken:"Email already used",
    usernameTaken:"Username already used",
} as const


export const SUCCESS_MESSAGES={
    userCreated:"Account created successfully",
    loginSuccess:"Login successfully",
    postCreated:"Post created successfully",
    postDeleted:"Post deleted successfully",
} as const

