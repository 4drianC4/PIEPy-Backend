const fs = require('fs');
const {exec} = require('child_process');
const {promisify} = require('util');

const execAsync = promisify(exec);

module.exports = {
    async analizadorCodigo(codigo) {
        try {
            // Guardar el código en un archivo temporal
            const filePath = 'temp_code.py';
            fs.writeFileSync(filePath, codigo);

            // Ejecutar el código Python
            const {stdout, stderr} = await execAsync(`python ${filePath}`);

            // Eliminar el archivo temporal
            fs.unlinkSync(filePath);

            if (stderr) {
                throw new Error(stderr);
            }

            return stdout;
        } catch (error) {
            throw new Error('Error analizando el código: ' + error.message);
        }
    }
};