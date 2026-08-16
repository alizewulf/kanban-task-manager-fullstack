import zod from "zod"

const loginSchema = zod.object({
    login: zod.string().min(3),
    password: zod.string().min(3)
})

export default loginSchema
export type LoginFormValues = zod.infer<typeof loginSchema>