import zod from "zod"

const registerSchema = zod.object({
    login: zod.string().trim().min(3, "Min 3 symbols required"),
    password: zod.string().trim().min(3, "Min 3 symbols required")
})

export default registerSchema
export type RegisterFormValues = zod.infer<typeof registerSchema>
