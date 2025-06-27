const {certificaciones} = require('../models');

module.exports = {
    async getAllCertificaciones() {
        try {
            const certificacionesList = await certificaciones.findAll();
            return certificacionesList;
        } catch (error) {
            throw new Error('Error fetching certificaciones: ' + error.message);
        }
    },
    async getCertificacionById(id) {
        try {
            const certificacion = await certificaciones.findByPk(id);
            if (!certificacion) {
                throw new Error('Certificacion not found');
            }
            return certificacion;
        } catch (error) {
            throw new Error('Error fetching certificacion by ID: ' + error.message);
        }
    },
    async createCertificacion(certificacionData) {
        try {
            const newCertificacion = await certificaciones.create(certificacionData);
            return newCertificacion;
        } catch (error) {
            throw new Error('Error creating certificacion: ' + error.message);
        }
    },
    async updateCertificacion(id, certificacionData) {
        try {
            const [updated] = await certificaciones.update(certificacionData, { where: { id } });
            if (!updated) {
                throw new Error('Certificacion not found');
            }
            return await this.getCertificacionById(id);
        } catch (error) {
            throw new Error('Error updating certificacion: ' + error.message);
        }
    },
    async deleteCertificacion(id) {
        try {
            const deleted = await certificaciones.destroy({ where: { id } });
            if (!deleted) {
                throw new Error('Certificacion not found');
            }
            return { message: 'Certificacion deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting certificacion: ' + error.message);
        }
    }
};