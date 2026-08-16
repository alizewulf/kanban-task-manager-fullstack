import zod from "zod"

const registerSchema = zod.object({
    login: zod.string().trim().min(3, "Min 3 symbols need"),
    password: zod.string().trim().min(3, "Min 3 symbols need")
})

export default registerSchema
export type RegisterFormValues = zod.infer<typeof registerSchema>
