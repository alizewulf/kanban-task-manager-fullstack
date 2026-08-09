import type { LoginFormValues } from "./scheme";
import loginSchema from "./scheme";

function validate(value:LoginFormValues) {
    const result = loginSchema.safeParse(value)
    if (result.success) {
        return {}
    } 

    const errors: Record<string, string> = {}
    result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        
        if (typeof field === "string") {
            errors[field] = issue.message
        }
    })
    return errors
}

export default validate