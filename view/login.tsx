"use client"

import { useForm } from 'react-hook-form'
import { loginSchema } from '@/types/login.schema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form'
import AuthImage from '@/app/(auth)/auth-image'
import { login } from '@/actions/auth/login'
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuthstore } from '@/stores/auth-store/login.store'


export const Login = () => {
  const router = useRouter()
  const {toast} = useToast()
  const isLogin = useAuthstore((state) => state.setIsLogin)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password:""
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const resp = await login(values)
      if(resp.ok){
        toast({
          variant: "default",
          title:`${resp.message}`
        })
        isLogin()
        form.reset()
        router.push("/")
      }else{
        toast({
          variant:"default",
          title:`${resp.message}`
        })
      }
    } catch (error) {
      console.log(error)
    }
  
  }
  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col mt-12 after:flex-1">
            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Bienvenido</h1>
              {/* Form */}
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                  control={form.control}
                  name='user'
                  render={({field}) => (
                    <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="usuario@usuario" className="form-input w-full" maxLength={20} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                  />
                   <FormField
                  control={form.control}
                  name='password'
                  render={({field}) => (
                    <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">Contraseña</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="usuario123" className="form-input w-full" maxLength={15} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                  />
                </div>
                <button
                disabled={form.formState.isSubmitting}
                type='submit'
                className="mt-6 btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3" 
                >{form.formState.isSubmitting ? "Iniciando..." : "Iniciar sesión"}</button>
              </form>
              </Form>
              {/* Footer */}
            </div>

          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  )
}
