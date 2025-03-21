interface ContactFormData {
  nombre: string
  email: string
  telefono?: string
  asunto: string
  mensaje: string
}

export const sendContactForm = async (formData: ContactFormData): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, this would send the form data to a server or API
  // For GitHub Pages, we're just simulating the process

  console.log("Contact form submitted:", formData)

  // Simulate success or error
  if (Math.random() > 0.1) {
    // 90% success rate
    return Promise.resolve()
  } else {
    return Promise.reject(new Error("Error al enviar el formulario. Por favor intenta de nuevo."))
  }
}

