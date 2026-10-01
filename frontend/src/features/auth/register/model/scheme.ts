import zod from "zod"

const registerSchema = zod.object({
    login: zod.string().trim().min(3, "Min 3 symbols required").max(50, "Max 50 symbols allowed"),
    password: zod.string()
        .min(8, "Password must contain at least 8 characters")
        .refine((value) => new TextEncoder().encode(value).length <= 72, "Password must be at most 72 UTF-8 bytes")
})

export default registerSchema
export type RegisterFormValues = zod.infer<typeof registerSchema>
