import zod from "zod"

const loginSchema = zod.object({
    email: zod.email().min(3),
    password: zod.string().min(5)
})

export default loginSchema
export type LoginFormValues = zod.infer<typeof loginSchema>