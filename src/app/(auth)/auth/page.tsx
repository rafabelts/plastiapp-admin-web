"use client";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { AUTH_FIELDS } from "@/src/config/forms/AUTH_FIELDS";
import { useAuth } from "@/src/context/AuthContext";
import { LogInModel, LogInModelType } from "@/src/models/logIn";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LogInModelType>({
    resolver: zodResolver(LogInModel)
  });

  const onSubmit: SubmitHandler<LogInModelType> = async (data) => {
    console.log("Datos enviados:", data);

    try {
      await login(data.email, data.password);
      router.replace("/")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ocurrió un error al iniciar sesión")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image
            src="logo.svg"
            className="mx-auto"
            alt="PlastiApp logo"
            width={150}
            height={90} />

          <CardTitle className="text-2xl">
            ¡Hola!
          </CardTitle>
          <CardDescription>
            Ingresa tus credenciales para iniciar sesión
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {AUTH_FIELDS.map((field) => (
                <Field key={field.name}>
                  <FieldLabel htmlFor={field.id}>
                    {field.label}
                  </FieldLabel>

                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name)}
                  />

                  {/* Renderizado dinámico de errores */}
                  {errors[field.name] && (
                    <FieldError>
                      {errors[field.name]?.message}
                    </FieldError>
                  )}
                </Field>
              ))}

              <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
                {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
              </Button>

            </FieldGroup>
          </form>
        </CardContent>

      </Card>


    </div>
  );
}