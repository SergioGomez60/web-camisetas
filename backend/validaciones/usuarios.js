import z from "zod";

const validacionUsuario = z.object({
    username: z
    .string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres"})
    .max(30, { message:"El nombre de usuario puede tener como máximo 30 caracteres"})
    .regex(/^[a-zA-Z0-9_.-]+$/, { message:"El nombre de usuario solo puede contener letras, números, _ . -"}),

    email: z.string().email({ message: "Introduce un email válido" }),

    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }) .max(128, { message: "La contraseña es demasiado larga" })
    // Aquí el .refine también se puede usar con el objeto, aunque con string funciona.
    .refine(val => /[a-z]/.test(val), { message: "La contraseña debe contener al menos una letra minúscula" })
    .refine(val => /[A-Z]/.test(val), { message: "La contraseña debe contener al menos una letra mayúscula" })
    .refine(val => /[0-9]/.test(val), { message: "La contraseña debe contener al menos un número" })
    .refine(val => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), { message: "La contraseña debe contener al menos un carácter especial" })
})

export function validateUser(object){
    return validacionUsuario.safeParse(object);
}