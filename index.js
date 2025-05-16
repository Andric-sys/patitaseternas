  // Obtener elementos del DOM
        const btnContacto = document.getElementById('btn-contacto');
        const modal = document.getElementById('modal-contacto');
        const cerrarModal = document.getElementById('cerrar-modal');

        // Mostrar el modal al hacer clic en el botón
        btnContacto.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        // Cerrar el modal al hacer clic en la 'X'
        cerrarModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Cerrar el modal al hacer clic fuera del contenido
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });

        // Manejar el envío del formulario
        window.addEventListener('DOMContentLoaded', () => {
            const client = window.supabase.createClient(
                'https://euwfnkpjxcrbhlgqhfpk.supabase.co',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d2Zua3BqeGNyYmhsZ3FoZnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzQ3NjQsImV4cCI6MjA2MjgxMDc2NH0.fT0Q1iLQbLYDTL_JdlEE9sDYBwgdaroUO_DxqYC-Ipo'
            );

            const form = document.getElementById("contactForm");
            const respuesta = document.getElementById("respuesta");

            form.addEventListener("submit", async function (e) {
                e.preventDefault();

                const nombre = document.getElementById("nombre").value;
                const correo = document.getElementById("correo").value;
                const mensaje = document.getElementById("mensaje").value;

                const { data, error } = await client
                    .from('mensajes_contacto')
                    .insert([{ nombre, correo, mensaje }]);

                if (error) {
                    respuesta.textContent = "Error al enviar mensaje 😓";
                    console.error(error);
                } else {
                    respuesta.textContent = "¡Mensaje enviado con éxito! 🎉";
                    form.reset();
                }
            });
        });